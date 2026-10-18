import { useRef, useEffect } from 'react';
import { CAMBODIA_PROVINCES, UI_STRINGS } from '../data/cambodiaData';

export default function ProvinceSearchBar({
  lang,
  activeProvinceId,
  onSelectProvince,
  searchQuery,
  onSearchChange
}) {
  const pillsContainerRef = useRef(null);
  const t = UI_STRINGS[lang];

  const filteredProvinces = searchQuery.trim()
    ? CAMBODIA_PROVINCES.filter(p => {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.nameEn.toLowerCase().includes(q) ||
          p.nameKm.includes(q) ||
          p.highway.toLowerCase().includes(q)
        );
      })
    : CAMBODIA_PROVINCES;

  // Auto-scroll selected pill into view
  useEffect(() => {
    if (pillsContainerRef.current) {
      const activeBtn = pillsContainerRef.current.querySelector('.quick-pill-btn.active');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeProvinceId]);

  return (
    <div className="search-filter-wrapper">
      <div className="search-filter-bar">
        {/* Search Input Box */}
        <div className="search-input-box">
          <span className="material-symbols-outlined search-icon-left">
            search
          </span>
          <input
            type="search"
            aria-label={t.searchPlaceholder}
            className="search-input font-km"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              title="Clear Search"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                close
              </span>
            </button>
          )}
        </div>

        {/* Quick Province Pill Bar */}
        <div className="quick-pills-bar hide-scrollbar" ref={pillsContainerRef}>
          {filteredProvinces.length === 0 && <span className="search-empty">{lang === 'km' ? 'រកមិនឃើញខេត្ត' : 'No provinces found'}</span>}
          {filteredProvinces.map(prov => {
            const isSel = prov.id === activeProvinceId;
            const dotColor =
              prov.statusColor === 'emerald'
                ? '#10b981'
                : prov.statusColor === 'amber'
                ? '#f59e0b'
                : '#f43f5e';

            return (
              <button
                key={prov.id}
                className={`quick-pill-btn ${isSel ? 'active' : ''}`}
                onClick={() => onSelectProvince(prov.id)}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: dotColor,
                    flexShrink: 0
                  }}
                />
                <span>{prov.nameEn}</span>
                <span
                  className="font-km"
                  style={{
                    fontSize: '10px',
                    opacity: isSel ? 0.9 : 0.7,
                    fontWeight: 500
                  }}
                >
                  {prov.nameKm.replace('ខេត្ត', '').replace('រាជធានី', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
