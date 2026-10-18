const messages = {
  idle: ['Use your current location for directions', 'ប្រើទីតាំងបច្ចុប្បន្នសម្រាប់ការនាំផ្លូវ'],
  locating: ['Waiting for location permission / GPS…', 'កំពុងរង់ចាំការអនុញ្ញាតទីតាំង / GPS…'],
  ready: ['Live GPS', 'GPS ផ្ទាល់'],
  weak: ['GPS accuracy is low. Waiting for a better position…', 'GPS មិនច្បាស់។ កំពុងរង់ចាំទីតាំងប្រសើរជាងនេះ…'],
  stale: ['GPS signal lost. Waiting for a fresh location…', 'បាត់សញ្ញា GPS។ កំពុងរង់ចាំទីតាំងថ្មី…'],
  denied: ['Location blocked. Allow location in your browser settings, then retry.', 'ទីតាំងត្រូវបានបិទ។ អនុញ្ញាតទីតាំងក្នុងការកំណត់កម្មវិធីរុករក ហើយព្យាយាមម្ដងទៀត។'],
  timeout: ['GPS timed out. Move to an open area or retry.', 'GPS អស់ពេលរង់ចាំ។ សូមទៅកន្លែងទូលាយ ឬព្យាយាមម្ដងទៀត។'],
  unavailable: ['Location is unavailable. Check device location settings.', 'មិនអាចរកទីតាំងបាន។ ពិនិត្យការកំណត់ទីតាំងឧបករណ៍។'],
  unsupported: ['This browser does not support location.', 'កម្មវិធីរុករកនេះមិនគាំទ្រទីតាំងទេ។'],
  insecure: ['Open this app over HTTPS to enable location.', 'បើកកម្មវិធីតាម HTTPS ដើម្បីប្រើទីតាំង។']
};
export default function LocationStatus({ location, lang, onStop, inline = false }) {
  const { status, fix, address, tracking } = location;
  const message = (messages[status] || messages.unavailable)[lang === 'km' ? 1 : 0];
  return (
    <div className={`location-status ${inline ? 'location-status-inline' : ''}`}>
      <div className="location-status-copy" role="status">
        <strong>{message}{location.ready && fix ? ` · ±${Math.round(fix.accuracy)} m` : ''}</strong>
        {fix && <span className="current-address">{address || `${fix.lat.toFixed(5)}, ${fix.lng.toFixed(5)}`}</span>}
      </div>
      {status !== 'ready' && status !== 'locating' && <button className="sheet-tool-btn" onClick={location.start} aria-label="Use my location">{lang === 'km' ? 'ប្រើទីតាំងខ្ញុំ' : 'Use my location'}</button>}
      {tracking && !inline && <button className="sheet-tool-btn" onClick={onStop}>{lang === 'km' ? 'បញ្ឈប់' : 'Stop GPS'}</button>}
    </div>
  );
}
