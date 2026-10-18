export const speechLocale = lang => lang === 'km' ? 'km-KH' : 'en-US';

const SILENT_AUDIO = 'data:audio/wav;base64,UklGRnQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==';

export function mapboxSpeechUrl(text, token) {
  return `https://api.mapbox.com/voice/v1/speak/${encodeURIComponent(text)}?${new URLSearchParams({
    access_token: token, language: 'en-US', textType: 'text', outputFormat: 'mp3'
  })}`;
}

// Retain playback objects; ignore late events after mute, exit or a newer turn.
export function createGuidancePlayer({ token = '', onState = () => {}, environment = globalThis } = {}) {
  const synth = environment.speechSynthesis;
  let audio;
  let utterance;
  let timer;
  let generation = 0;
  const clearTimer = () => { environment.clearTimeout(timer); timer = undefined; };
  const cancelNative = () => {
    if (utterance) utterance.onstart = utterance.onend = utterance.onerror = null;
    utterance = null;
    synth?.cancel();
  };
  const stop = () => {
    generation++;
    clearTimer();
    cancelNative();
    if (audio) {
      audio.onplaying = audio.onended = audio.onerror = null;
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }
  };
  const getAudio = () => audio ||= new environment.Audio();
  const play = ({ text, englishText, lang }, { gesture = false } = {}) => {
    stop();
    const current = generation;
    const valid = () => generation === current;
    const report = (status, language, source) => { if (valid()) onState({ status, language, source }); };
    const online = () => {
      if (!valid()) return;
      clearTimer();
      cancelNative();
      if (!token || !environment.Audio) { report('unavailable', lang, 'device'); return; }
      const media = getAudio();
      const fail = error => {
        if (!valid()) return;
        clearTimer();
        media.onplaying = media.onended = media.onerror = null;
        media.pause();
        report(error?.name === 'NotAllowedError' ? 'blocked' : 'error', 'en', 'online');
      };
      report('loading', 'en', 'online');
      media.onplaying = () => { if (valid()) { clearTimer(); report('speaking', 'en', 'online'); } };
      media.onended = () => { if (valid()) { clearTimer(); report('ready', 'en', 'online'); } };
      media.onerror = fail;
      media.src = mapboxSpeechUrl(englishText, token);
      media.volume = 1;
      timer = environment.setTimeout(() => fail(), 15000);
      try { media.play()?.catch(fail); } catch (error) { fail(error); }
    };
    const voices = synth?.getVoices() || [];
    const voice = selectVoice(voices, lang) || (lang === 'km' ? selectVoice(voices, 'en') : null);
    if (!voice || !environment.SpeechSynthesisUtterance) { online(); return; }
    // Unlock the same media element in the Start/Replay gesture for mobile.
    if (gesture && environment.Audio) {
      try {
        const media = getAudio();
        media.src = SILENT_AUDIO;
        media.play()?.catch(() => {});
      } catch { /* Online playback exposes any permission failure. */ }
    }
    const actualLang = voice.lang.toLowerCase().startsWith('km') ? 'km' : 'en';
    utterance = new environment.SpeechSynthesisUtterance(actualLang === lang ? text : englishText);
    utterance.lang = speechLocale(actualLang);
    utterance.voice = voice;
    utterance.rate = actualLang === 'km' ? 0.9 : 0.95;
    utterance.volume = 1;
    report('loading', actualLang, 'device');
    utterance.onstart = () => { if (valid()) { clearTimer(); report('speaking', actualLang, 'device'); } };
    utterance.onend = () => { if (valid()) { clearTimer(); report('ready', actualLang, 'device'); } };
    utterance.onerror = () => online();
    // Some browsers expose speechSynthesis but never start playback.
    timer = environment.setTimeout(online, 3000);
    try { synth.resume(); synth.speak(utterance); } catch { online(); }
  };
  return { play, stop };
}

export function selectVoice(voices, lang) {
  const locale = speechLocale(lang).toLowerCase();
  const matching = voices.filter(voice => voice.lang?.toLowerCase().replace('_', '-').split('-')[0] === lang);
  return matching.find(voice => voice.lang.toLowerCase().replace('_', '-') === locale) || matching.find(voice => voice.default) || matching[0] || null;
}

export function guidanceAnnouncement(lang, location, navigation) {
  const km = lang === 'km';
  if (!location.ready) return { key: `gps:${lang}:${location.status === 'stale' ? 'stale' : 'waiting'}`, text: location.status === 'stale'
    ? (km ? 'បាត់សញ្ញា GPS។ កំពុងរង់ចាំទីតាំងថ្មី។' : 'GPS signal lost. Waiting for your location.')
    : (km ? 'ចាប់ផ្តើមការនាំផ្លូវ។ កំពុងស្វែងរកទីតាំងរបស់អ្នក។' : 'Starting navigation. Getting your location.') };
  const progress = navigation.progress;
  if (!progress || progress.offRoute) return { key: `routing:${lang}:${navigation.status}`, text: navigation.status === 'error'
    ? (km ? 'មិនអាចធ្វើបច្ចុប្បន្នភាពផ្លូវបាន។ សូមព្យាយាមម្តងទៀត។' : 'Unable to update the route. Please retry.')
    : (km ? 'កំពុងគណនាផ្លូវឡើងវិញ។' : 'Calculating your road route.') };
  if (progress.arrived) return { key: `arrived:${lang}`, text: km ? 'អ្នកបានមកដល់គោលដៅ។' : 'You have arrived at your destination.' };
  const distance = progress.distanceToTurn;
  const bucket = distance <= 30 ? 'now' : distance <= 100 ? 'near' : distance <= 500 ? 'approaching' : distance <= 1000 ? 'one-km' : 'far';
  const maneuver = progress.maneuver;
  const instruction = (km ? maneuver?.km : maneuver?.en) || (km ? 'បន្តដំណើរទៅមុខ' : 'Continue ahead');
  const value = distance < 1000 ? Math.max(10, Math.round(distance / 10) * 10) : Math.round(distance / 100) / 10;
  const unit = distance < 1000 ? (km ? 'ម៉ែត្រ' : 'meters') : (km ? 'គីឡូម៉ែត្រ' : 'kilometers');
  return {
    key: `${lang}:${navigation.route?.coordinates?.[0]?.join(',')}:${maneuver?.startDistance}:${instruction}:${bucket}`,
    text: bucket === 'now' ? (km ? `ឥឡូវនេះ ${instruction}` : `Now, ${instruction}`)
      : (km ? `នៅចម្ងាយ ${value} ${unit} ${instruction}` : `In ${value} ${unit}, ${instruction}`)
  };
}

