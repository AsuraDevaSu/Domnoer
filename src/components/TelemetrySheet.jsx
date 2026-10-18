import { UI_STRINGS } from '../data/cambodiaData';

export default function TelemetrySheet({
  lang,
  activeProvince,
  activeDestination,
  onShareRoute,
  onExportGpx,
  isRoutingLoading,
  isRoutingError,
  isAwaitingLocation,
  onRetryRoute,
  originLabel
}) {
  const t = UI_STRINGS[lang];

  if (!activeDestination) return null;

  const passBadgeClass = activeDestination.passLabel.includes('Optimal')
    ? 'optimal'
    : activeDestination.passLabel.includes('4WD')
    ? 'rough'
    : 'caution';

  const dotColor =
    passBadgeClass === 'optimal'
      ? '#10b981'
      : passBadgeClass === 'rough'
      ? '#f43f5e'
      : '#f59e0b';

  return (
    <div className="docked-sheet-wrapper">
      <div className="docked-sheet-card">
        {/* Main Content Row */}
        <div className="sheet-main-row">
          {/* Left: Origin ➔ Destination Meta */}
          <div className="route-meta-group">
            <div className="route-compass-icon">
              <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
                navigation
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  className="font-mono-num"
                  style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}
                >
                  {t.nationalCorridor}
                </span>

                <span className={`passability-tag ${passBadgeClass}`}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: dotColor }} />
                  <span>{t.passability} {activeDestination.passIndex} {activeDestination.passLabel}</span>
                </span>

                {/* Fastest Road Snapping Status Badge */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: activeDestination.isRealRoadEngine ? '#047857' : '#d97706',
                    background: activeDestination.isRealRoadEngine ? '#ecfdf5' : '#fffbeb',
                    border: `1px solid ${activeDestination.isRealRoadEngine ? '#a7f3d0' : '#fde68a'}`,
                    padding: '2px 7px',
                    borderRadius: '9999px'
                  }}
                  title="Fastest estimated driving route calculated by Mapbox Directions"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: '12px', animation: isRoutingLoading ? 'spin 1s linear infinite' : 'none' }}
                  >
                    {isRoutingLoading ? 'sync' : 'alt_route'}
                  </span>
                  <span role="status">{isAwaitingLocation ? (lang === 'km' ? 'រង់ចាំទីតាំងរបស់អ្នក ដើម្បីគណនាផ្លូវ' : 'Waiting for your location to calculate the route') : isRoutingLoading ? t.calculatingRoute : !isRoutingError && activeDestination.isRealRoadEngine ? t.roadFollowing : (lang === 'km' ? 'មិនអាចគណនាផ្លូវបាន សូមព្យាយាមម្តងទៀត' : 'Road route update unavailable')}</span>
                </span>
                {!isAwaitingLocation && !isRoutingLoading && (isRoutingError || !activeDestination.isRealRoadEngine) && (
                  <button className="sheet-tool-btn" onClick={onRetryRoute}>
                    {lang === 'km' ? 'ព្យាយាមម្តងទៀត' : 'Retry route'}
                  </button>
                )}
              </div>

              <h2 className="route-headline">
                <span className="origin-label" title={originLabel}>{originLabel}</span>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>➔</span>
                <span style={{ color: '#002218' }}>{activeDestination.title}</span>
                {activeProvince && (
                  <span className="font-km" style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                    ({activeProvince.nameKm})
                  </span>
                )}
              </h2>
            </div>
          </div>

          {/* Center: Key Metrics 4-Column Strip */}
          <div className="sheet-metrics-strip">
            <div className="metric-item-col">
              <div className="metric-lbl">{t.distance}</div>
              <div className="metric-val">{activeDestination.distance}</div>
            </div>
            <div className="metric-item-col">
              <div className="metric-lbl">{t.etaTime}</div>
              <div className="metric-val">{activeDestination.duration}</div>
            </div>
            <div className="metric-item-col">
              <div className="metric-lbl">{t.elevation}</div>
              <div className="metric-val" style={{ color: '#047857' }}>
                {activeDestination.elevDelta}
              </div>
            </div>
            <div className="metric-item-col">
              <div className="metric-lbl">{t.corridor}</div>
              <div className="metric-val" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                {activeDestination.highway.split(' ')[0]}
              </div>
            </div>
          </div>

          {/* Center-Right: Road Surface Breakdown Bar */}
          <div className="surface-breakdown-box">
            <div className="breakdown-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#059669' }}>
                  linear_scale
                </span>
                <span>{t.surfaceBreakdown}</span>
              </span>
              <span className="font-mono-num" style={{ fontSize: '10px', color: '#64748b' }}>
                {activeDestination.distance} {t.totalKm}
              </span>
            </div>

            <div className="segmented-progress-bar">
              <div
                className="seg-paved"
                style={{ width: `${activeDestination.goodPct}%` }}
                title={`${activeDestination.goodPct}% Paved`}
              />
              <div
                className="seg-caution"
                style={{ width: `${activeDestination.cautionPct}%` }}
                title={`${activeDestination.cautionPct}% Caution / Works`}
              />
              <div
                className="seg-rough"
                style={{ width: `${activeDestination.badPct}%` }}
                title={`${activeDestination.badPct}% 4WD Rough`}
              />
            </div>

            <div className="breakdown-footer">
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                <span>{activeDestination.goodPct}% {t.paved}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} />
                <span>{activeDestination.cautionPct}% {t.bypass}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e' }} />
                <span>{activeDestination.badPct}% {t.rough}</span>
              </span>
            </div>
          </div>

          {/* Right: Primary Action & Extra Tools */}
          <div className="route-actions">
            <div className="sheet-extra-actions">
              <button className="sheet-tool-btn" onClick={onExportGpx} disabled={!activeDestination.isRealRoadEngine} title="Export GPX waypoint file">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#047857' }}>
                  download
                </span>
                <span>{t.exportGpx}</span>
              </button>

              <button className="sheet-tool-btn" onClick={onShareRoute} title="Copy share link">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#0f382c' }}>
                  share
                </span>
                <span>{t.shareRoute}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Safety Advisory Footer */}
        <div className="sheet-advisory-row">
          <div className="advisory-badge-text">
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d97706', flexShrink: 0 }}>
              info
            </span>
            <span style={{ fontWeight: 800, color: '#1e293b', flexShrink: 0 }}>
              {t.liveAdvisory}
            </span>
            <span className="advisory-text font-km">
              {lang === 'km' ? activeDestination.advisory : activeDestination.advisoryEn || activeDestination.advisory}
            </span>
          </div>

          <div
            className="font-mono-num"
            style={{ display: 'none', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#94a3b8', flexShrink: 0 }}
            id="sheetGisFeedBadge"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
            <span>Mapbox · Road directions</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          #sheetGisFeedBadge { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
