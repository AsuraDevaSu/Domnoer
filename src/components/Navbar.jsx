import { useState, useRef, useEffect } from 'react';
import { MAP_TILE_LAYERS } from '../data/cambodiaData';

export default function Navbar({ lang, onToggleLang, activeLayer, onChangeLayer, isNavActive, onToggleNavigation, onRecenterMap, originLabel, canNavigate = true }) {
  const [openMenu, setOpenMenu] = useState(null);
  const headerRef = useRef(null);
  const currentLayer = MAP_TILE_LAYERS.find(layer => layer.key === activeLayer) || MAP_TILE_LAYERS[0];
  useEffect(() => {
    const closeOutside = event => { if (!headerRef.current?.contains(event.target)) setOpenMenu(null); };
    const closeEscape = event => { if (event.key === 'Escape') setOpenMenu(null); };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeEscape);
    };
  }, []);
  const fullscreen = () => {
    setOpenMenu(null);
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  };
  return (
    <header className="top-app-header" ref={headerRef}>
      <div className="header-brand-group">
        <div className="brand-badge" aria-label="TerraRoute"><span className="material-symbols-outlined">explore</span><span className="brand-name">TerraRoute</span></div>
        <span className="header-origin" title={originLabel}>{originLabel}</span>
      </div>
      <nav className="header-actions" aria-label="Map tools">
        <button className={`btn-pill header-nav-btn ${isNavActive ? 'active' : ''}`} onClick={onToggleNavigation} disabled={!isNavActive && !canNavigate} title={isNavActive ? 'Exit navigation' : 'Navigate with GPS'} aria-label={isNavActive ? 'Exit navigation' : 'Navigate with GPS'}>
          <span className="material-symbols-outlined">{isNavActive ? 'stop_circle' : 'my_location'}</span>
          <span className="header-button-label">{lang === 'km' ? (isNavActive ? 'បញ្ចប់' : 'នាំផ្លូវ GPS') : (isNavActive ? 'Exit navigation' : 'Navigate')}</span>
        </button>
        <div className="layer-dropdown-container">
          <button className="btn-pill" title="Switch Map Tile Cartography" aria-label="Map style" aria-expanded={openMenu === 'layers'} aria-controls="map-style-menu" onClick={() => setOpenMenu(openMenu === 'layers' ? null : 'layers')}>
            <span className="material-symbols-outlined">layers</span><span className="header-button-label">{currentLayer.name.replace('Mapbox ', '')}</span>
          </button>
          {openMenu === 'layers' && <div className="layer-menu" id="map-style-menu">
            <p className="menu-heading">{lang === 'km' ? 'ស្រទាប់ផែនទី' : 'Map style'}</p>
            {MAP_TILE_LAYERS.map(layer => <button key={layer.key} className={`layer-item-btn ${layer.key === activeLayer ? 'selected' : ''}`} aria-pressed={layer.key === activeLayer} onClick={() => { onChangeLayer(layer.key); setOpenMenu(null); }}>
              <span className="material-symbols-outlined">{layer.icon}</span><span><strong>{layer.name}</strong><small>{layer.subtext}</small></span>
              {layer.key === activeLayer && <span className="material-symbols-outlined">check</span>}
            </button>)}
          </div>}
        </div>
        <button className="btn-pill lang-btn" onClick={() => onToggleLang(lang === 'km' ? 'en' : 'km')} aria-label={lang === 'km' ? 'Switch to English' : 'ប្ដូរទៅភាសាខ្មែរ'}>{lang === 'km' ? 'EN' : 'ខ្មែរ'}</button>
        <button className="btn-icon-square" onClick={onRecenterMap} aria-label="Recenter map" title="Recenter map"><span className="material-symbols-outlined">near_me</span></button>
        <div className="header-more">
          <button className="btn-icon-square" aria-label="More map tools" aria-expanded={openMenu === 'more'} onClick={() => setOpenMenu(openMenu === 'more' ? null : 'more')}><span className="material-symbols-outlined">more_horiz</span></button>
          {openMenu === 'more' && <div className="layer-menu"><button className="layer-item-btn" onClick={fullscreen}><span className="material-symbols-outlined">fullscreen</span>{lang === 'km' ? 'ពេញអេក្រង់' : 'Toggle fullscreen'}</button></div>}
        </div>
      </nav>
    </header>
  );
}
