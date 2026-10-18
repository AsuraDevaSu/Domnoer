import { UI_STRINGS } from '../data/cambodiaData';

export default function PlacesDrawer({
  lang,
  activeProvince,
  destinations,
  activeDestinationId,
  onSelectDestination
}) {
  const t = UI_STRINGS[lang];

  if (!activeProvince || !destinations || destinations.length === 0) {
    return null;
  }

  return (
    <div className="places-drawer-wrapper">
      <div className="places-drawer-card">
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <span className="province-active-dot" />
            <h3 className="drawer-province-title">
              <span>{activeProvince.nameEn}</span>
              <span className="province-km-badge font-km">{activeProvince.nameKm}</span>
            </h3>
            <span
              className="font-mono-num"
              style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '4px' }}
            >
              {destinations.length} {t.placesCount}
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }} className="font-km">
            {t.selectDestHint}
          </span>
        </div>

        {/* Horizontal Destination Cards Scroll */}
        <div className="places-cards-scroll hide-scrollbar">
          {destinations.map(dest => {
            const isSel = dest.id === activeDestinationId;

            return (
              <button
                type="button"
                aria-pressed={isSel}
                key={dest.id}
                className={`destination-card ${isSel ? 'selected' : ''}`}
                onClick={() => onSelectDestination(dest)}
              >
                {/* Image Box */}
                <div className="card-image-box">
                  <img src={dest.image} alt={dest.title} className="card-img" />
                  <span className="card-elev-tag">{dest.elevation}</span>
                  <span className="card-dist-badge">{dest.distance}</span>
                </div>

                {/* Info */}
                <div>
                  <div className="card-info-top">
                    <span>{dest.tag}</span>
                    <span className="font-mono-num" style={{ color: '#64748b' }}>
                      {dest.duration}
                    </span>
                  </div>
                  <h4 className="card-title">{dest.title}</h4>
                  <p className="card-sub-km font-km">{dest.khmer}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
