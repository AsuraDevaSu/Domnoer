import test from 'node:test';
import assert from 'node:assert/strict';
import { selectVoice, createGuidancePlayer, guidanceAnnouncement, mapboxSpeechUrl } from '../src/services/voiceGuidance.js';
const voices = [{lang:'en-US',name:'English'}, {lang:'km-KH',name:'Khmer'}];

function fixture(installed = voices) {
  const timers = new Map(); let timerId = 0;
  const spoken = [], media = [], states = [];
  const environment = {
    setTimeout: fn => { timers.set(++timerId, fn); return timerId; },
    clearTimeout: id => timers.delete(id),
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    speechSynthesis: { getVoices: () => installed, cancel() {}, resume() {}, speak: item => spoken.push(item) },
    Audio: class {
      constructor() { media.push(this); this.paused = true; this.plays = []; }
      play() { this.paused = false; this.plays.push(this.src); return this.failure ? Promise.reject(this.failure) : Promise.resolve(); }
      pause() { this.paused = true; }
      removeAttribute() { this.src = ''; }
      load() {}
    }
  };
  const player = createGuidancePlayer({ token: 'public-test-token', environment, onState: state => states.push(state) });
  return { player, environment, spoken, media, states, timers, latest: () => states.at(-1), timeout: () => [...timers.values()][0]() };
}
const prompt = { text: 'បត់ស្តាំ', englishText: 'Turn right', lang: 'km' };

test('native speech reports playing only after it starts, using the selected language', () => {
  const f = fixture();
  f.player.play(prompt, { gesture: true });
  assert.equal(f.spoken[0].lang, 'km-KH');
  assert.equal(f.spoken[0].text, prompt.text);
  assert.equal(f.latest().status, 'loading');
  f.spoken[0].onstart();
  assert.equal(f.latest().status, 'speaking');
  assert.equal(f.timers.size, 0);
  f.spoken[0].onend();
  assert.equal(f.latest().status, 'ready');
  f.player.play({ ...prompt, lang: 'en', text: prompt.englishText });
  assert.equal(f.spoken[1].lang, 'en-US');
});

test('missing Khmer voice speaks translated English, never Khmer text with an English voice', () => {
  const f = fixture([voices[0]]);
  f.player.play(prompt);
  assert.equal(f.spoken[0].text, 'Turn right');
  assert.equal(f.latest().language, 'en');
});

test('empty or unsupported browser voices play online audio immediately', () => {
  for (const unsupported of [false, true]) {
    const f = fixture([]);
    if (unsupported) delete f.environment.SpeechSynthesisUtterance;
    f.player.play(prompt, { gesture: true });
    assert.equal(f.spoken.length, 0);
    assert.match(f.media[0].src, /speak\/Turn%20right\?/);
    assert.equal(f.media[0].plays.length, 1);
    assert.equal(f.latest().language, 'en');
    assert.equal(f.latest().source, 'online');
    assert.equal(f.latest().status, 'loading');
    f.media[0].onplaying();
    assert.equal(f.latest().status, 'speaking');
    f.media[0].onended();
    assert.equal(f.latest().status, 'ready');
  }
});

test('silent native speech and explicit speech errors recover with online audio', () => {
  for (const error of [false, true]) {
    const f = fixture();
    f.player.play(prompt, { gesture: true });
    if (error) f.spoken[0].onerror({ error: 'synthesis-failed' }); else f.timeout();
    assert.equal(f.latest().source, 'online');
    assert.match(f.media[0].src, /speak\/Turn%20right/);
    assert.equal(f.spoken[0].onstart, null);
  }
});

test('blocked playback is actionable and a replay can recover', async () => {
  const f = fixture([]);
  f.player.play(prompt);
  f.media[0].failure = { name: 'NotAllowedError' };
  f.player.play(prompt);
  await Promise.resolve();
  assert.equal(f.latest().status, 'blocked');
  f.media[0].failure = null;
  f.player.play(prompt, { gesture: true });
  f.media[0].onplaying();
  assert.equal(f.latest().status, 'speaking');
});

test('mute or exit cancels pending fallback and ignores old media events', async () => {
  const f = fixture();
  f.player.play(prompt);
  const oldError = f.spoken[0].onerror;
  f.player.stop();
  oldError();
  assert.equal(f.media.length, 0);
  assert.equal(f.timers.size, 0);
  const online = fixture([]);
  online.player.play(prompt);
  const oldPlaying = online.media[0].onplaying;
  online.player.stop();
  const count = online.states.length;
  oldPlaying();
  await Promise.resolve();
  assert.equal(online.states.length, count);
  assert.equal(online.media[0].paused, true);
});

test('online loading failures are visible and text is encoded as plain text', () => {
  const f = fixture([]);
  f.player.play(prompt);
  f.timeout();
  assert.equal(f.latest().status, 'error');
  assert.equal(f.media[0].paused, true);
  const url = new URL(mapboxSpeechUrl('Turn / right? & <speak>', 'token'));
  assert.equal(decodeURIComponent(url.pathname.split('/').at(-1)), 'Turn / right? & <speak>');
  assert.equal(url.searchParams.get('textType'), 'text');
});

test('starting GPS does not cancel the initial spoken prompt', () => {
  const idle = guidanceAnnouncement('km', { ready: false, status: 'idle' }, {});
  const locating = guidanceAnnouncement('km', { ready: false, status: 'locating' }, {});
  assert.equal(idle.key, locating.key);
});

test('selects Khmer and English voices explicitly without a different-language fallback', () => {
  assert.equal(selectVoice(voices,'km').name,'Khmer');
  assert.equal(selectVoice(voices,'en').name,'English');
  assert.equal(selectVoice([voices[0]],'km'),null);
});

test('turn prompts repeat at approach thresholds, not on every GPS update', () => {
  const location={ready:true};
  const navigation={route:{coordinates:[[11,104]]},progress:{maneuver:{en:'Turn right',km:'បត់ស្តាំ',startDistance:100},distanceToTurn:450}};
  const first=guidanceAnnouncement('en',location,navigation);
  assert.match(first.text,/In 450 meters, Turn right/);
  navigation.progress.distanceToTurn=400;
  assert.equal(guidanceAnnouncement('en',location,navigation).key,first.key);
  navigation.progress.distanceToTurn=80;
  assert.notEqual(guidanceAnnouncement('en',location,navigation).key,first.key);
  assert.match(guidanceAnnouncement('km',location,navigation).text,/បត់ស្តាំ/);
  navigation.progress.arrived=true;
  assert.match(guidanceAnnouncement('en',location,navigation).text,/arrived/);
});
