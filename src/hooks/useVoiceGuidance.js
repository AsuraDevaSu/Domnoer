import { useEffect, useRef, useState } from 'react';
import { createGuidancePlayer, guidanceAnnouncement } from '../services/voiceGuidance.js';
import { MAPBOX_ACCESS_TOKEN } from '../config/mapbox.js';

export default function useVoiceGuidance({ lang, active, location, navigation }) {
  const [enabled, setEnabled] = useState(true);
  const [playback, setPlayback] = useState({ status: 'ready', language: lang, source: 'device' });
  const player = useRef(null);
  const getPlayer = () => player.current ||= createGuidancePlayer({ token: MAPBOX_ACCESS_TOKEN, onState: setPlayback });
  const lastAnnouncement = useRef('');
  const announcement = guidanceAnnouncement(lang, location, navigation);
  const english = guidanceAnnouncement('en', location, navigation);

  useEffect(() => {
    // Prime asynchronous voice loading; query again for each turn or replay.
    window.speechSynthesis?.getVoices();
    return () => player.current?.stop();
  }, []);

  useEffect(() => {
    if (!active || !enabled) {
      player.current?.stop();
      lastAnnouncement.current = '';
      return;
    }
    if (lastAnnouncement.current === announcement.key) return;
    lastAnnouncement.current = announcement.key;
    getPlayer().play({ text: announcement.text, englishText: english.text, lang });
  }, [active, enabled, announcement.key, announcement.text, english.text, lang]);

  const replay = () => {
    setEnabled(true);
    lastAnnouncement.current = announcement.key;
    getPlayer().play({ text: announcement.text, englishText: english.text, lang }, { gesture: true });
  };
  return {
    enabled, ...playback,
    // Called inside the Start button's gesture so browser audio can begin immediately.
    start: replay,
    replay,
    toggle: () => {
      if (enabled) { player.current?.stop(); setEnabled(false); }
      else replay();
    }
  };
}
