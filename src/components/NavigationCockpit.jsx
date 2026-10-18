import { UI_STRINGS } from '../data/cambodiaData';
import LocationStatus from './LocationStatus';

export default function NavigationCockpit({ lang, isNavActive, onStopNav, location, navigation, voice, onRetryRoute }) {
  const t = UI_STRINGS[lang];
  const progress = navigation.progress;
  const usable = location.ready && progress && !progress.offRoute;
  const maneuver = usable ? progress.maneuver : null;
  const instruction = progress?.arrived && usable ? (lang === 'km' ? 'អ្នកបានមកដល់គោលដៅ' : 'You have arrived')
    : maneuver ? (lang === 'km' ? maneuver.km : maneuver.en) : '';

  if (!isNavActive) return null;
  const minutes = usable ? Math.ceil(progress.remainingSeconds / 60) : null;
  const arrival = minutes === null ? '—' : new Date(location.now + minutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const turnDistance = !usable ? '—' : progress.distanceToTurn < 1000 ? `${Math.round(progress.distanceToTurn)} m` : `${(progress.distanceToTurn / 1000).toFixed(1)} km`;
  const pendingText = !location.ready ? (lang === 'km' ? 'កំពុងរង់ចាំ GPS' : 'Waiting for GPS')
    : navigation.status === 'error' ? (lang === 'km' ? 'មិនអាចគណនាផ្លូវបាន' : 'Route update unavailable')
    : (lang === 'km' ? 'កំពុងគណនាផ្លូវឡើងវិញ…' : 'Updating road route…');
  const voiceError = ['unavailable', 'blocked', 'error'].includes(voice.status);
  const voiceMessage = !voice.enabled ? (lang === 'km' ? 'បានបិទសំឡេង' : 'Voice muted')
    : voice.status === 'blocked' ? (lang === 'km' ? 'សូមចុចស្ដាប់ម្ដងទៀត ដើម្បីអនុញ្ញាតសំឡេង។' : 'Tap Replay to allow audio in this browser.')
    : voiceError ? (lang === 'km' ? 'មិនអាចបញ្ចេញសំឡេងបាន។ ពិនិត្យអ៊ីនធឺណិត និងសំឡេងឧបករណ៍ រួចចុចស្ដាប់ម្ដងទៀត។' : 'Audio unavailable. Check internet and media volume, then tap Replay.')
    : lang === 'km' && voice.language === 'en' ? 'សំឡេងខ្មែរមិនអាចប្រើបាន។ កំពុងប្រើសំឡេងអង់គ្លេស។ / English voice'
    : voice.status === 'loading' ? (lang === 'km' ? 'កំពុងផ្ទុកសំឡេង…' : 'Loading voice…')
    : voice.status === 'speaking' ? (lang === 'km' ? 'កំពុងអានការណែនាំ…' : 'Speaking directions…')
    : (lang === 'km' ? 'សំឡេងខ្មែរបានបើក' : 'English voice enabled');

  return (
    <div className="nav-cockpit-overlay">
      <div className="cockpit-card">
        <div className="cockpit-scroll-area">
        <div className="maneuver-top-row">
          <div className="maneuver-icon-box"><span className="material-symbols-outlined">{progress?.arrived && usable ? 'flag' : maneuver?.icon || 'my_location'}</span></div>
          <div className="maneuver-content">
            <div className="maneuver-badges"><span className="maneuver-dist-label">{turnDistance}</span><span className="maneuver-hwy-badge">LIVE GPS</span></div>
            <h2 className="maneuver-main-text">{instruction || pendingText}</h2>
            {maneuver && <p className="maneuver-km-text">{lang === 'km' ? maneuver.en : maneuver.km}</p>}
            {navigation.status === 'error' && usable && <p className="maneuver-km-text">{pendingText}</p>}
          </div>
        </div>
        <details className="navigation-location-details">
          <summary>{lang === 'km' ? 'ទីតាំង និងសញ្ញា GPS' : 'Location & GPS status'}<span>{location.ready ? `±${Math.round(location.fix.accuracy)} m` : location.status}</span></summary>
          <LocationStatus location={location} lang={lang} inline />
        </details>
        {navigation.status === 'error' && <button className="cockpit-action-btn" onClick={onRetryRoute}>{lang === 'km' ? 'ព្យាយាមម្ដងទៀត' : 'Retry route'}</button>}
        <div className="telemetry-grid">
          <div className="telemetry-col"><div className="tel-label">{t.currentSpeed}</div><div className="tel-val accent" data-testid="live-speed">{location.ready && location.fix?.speed !== null ? Math.round(location.fix.speed) : '—'} <small>km/h</small></div><div className="tel-sub">{lang === 'km' ? 'ល្បឿនពី GPS' : 'Measured by GPS'}</div></div>
          <div className="telemetry-col"><div className="tel-label">{t.remaining}</div><div className="tel-val" data-testid="remaining-distance">{usable ? (progress.remainingMeters / 1000).toFixed(1) : '—'} <small>km</small></div><div className="tel-sub">{usable ? Math.round(progress.progress * 100) : '—'}% {t.traveled}</div></div>
          <div className="telemetry-col"><div className="tel-label">{t.liveEta}</div><div className="tel-val">{minutes === null ? '—' : `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`}</div><div className="tel-sub">{t.arrival} {arrival}</div></div>
          <div className="telemetry-col"><div className="tel-label">{lang === 'km' ? 'ផ្លូវបច្ចុប្បន្ន' : 'Current road'}</div><div className="tel-val current-road">{usable ? progress.roadName : '—'}</div><div className="tel-sub">{navigation.status === 'loading' ? pendingText : 'Mapbox'}</div></div>
        </div>
        </div>
        <div className="cockpit-footer-controls">
          <div className={`voice-feedback ${voiceError ? 'has-error' : ''}`} role="status" data-status={voice.status}>
            {voiceMessage}
          </div>
          <div className="cockpit-btn-group">
            <button className="cockpit-action-btn voice-toggle" aria-pressed={voice.enabled} aria-label={voice.enabled ? 'Mute voice guidance' : 'Enable voice guidance'} onClick={voice.toggle}><span className="material-symbols-outlined">{voice.enabled ? 'volume_up' : 'volume_off'}</span>{lang === 'km' ? (voice.enabled ? 'បិទសំឡេង' : 'បើកសំឡេង') : (voice.enabled ? 'Mute' : 'Sound')}</button>
            <button className="cockpit-action-btn voice-replay" onClick={voice.replay} aria-label="Replay direction"><span className="material-symbols-outlined">replay</span>{lang === 'km' ? 'ស្ដាប់ម្ដងទៀត' : 'Replay'}</button>
            <button className="cockpit-action-btn danger" onClick={onStopNav}><span className="material-symbols-outlined">close</span>{t.exitNav}</button>
          </div>
          <span className="tel-sub">{lang === 'km' ? 'ទីតាំងផ្ទាល់' : 'Live location'}</span>
        </div>
      </div>
    </div>
  );
}
