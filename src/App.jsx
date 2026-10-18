import { useState, useMemo, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProvinceSearchBar from './components/ProvinceSearchBar';
import MapEngine from './components/MapEngine';
import PlacesDrawer from './components/PlacesDrawer';
import NavigationCockpit from './components/NavigationCockpit';
import TelemetrySheet from './components/TelemetrySheet';
import Toast from './components/Toast';

import {
  CAMBODIA_PROVINCES,
  DESTINATIONS_DATA
} from './data/cambodiaData';

import useLiveLocation from './hooks/useLiveLocation';
import useRoadNavigation from './hooks/useRoadNavigation';
import useVoiceGuidance from './hooks/useVoiceGuidance';
import LocationStatus from './components/LocationStatus';
import './App.css';
import './responsive.css';

export default function App() {
  const [lang, setLang] = useState('km');
  const [activeLayer, setActiveLayer] = useState('mapbox-standard');
  const [activeProvinceId, setActiveProvinceId] = useState(null);
  const [activeDestinationId, setActiveDestinationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recenterRequest, setRecenterRequest] = useState(0);
  const [panelExpanded, setPanelExpanded] = useState(false);
  const [panelTab, setPanelTab] = useState('places');
  const [compactLayout, setCompactLayout] = useState(() => window.matchMedia('(max-width: 700px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 700px)');
    const update = () => {
      setCompactLayout(query.matches);
      setRecenterRequest(value => value + 1);
    };
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const [isNavActive, setIsNavActive] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [routingAttempt, setRoutingAttempt] = useState(0);
  const location = useLiveLocation();

  // Current active province and destinations list
  const activeProvince = useMemo(() => {
    return CAMBODIA_PROVINCES.find(p => p.id === activeProvinceId) || null;
  }, [activeProvinceId]);

  const destinations = useMemo(() => {
    if (!activeProvince) return [];
    const list = DESTINATIONS_DATA[activeProvinceId];
    if (list && list.length > 0) return list;

    // Fallback for provinces without custom attractions
    const prov = activeProvince;
    return [
      {
        id: `${prov.id}_center`,
        title: `${prov.nameEn} Center Hub`,
        khmer: `តំបន់កណ្តាល ${prov.nameKm}`,
        tag: 'Provincial Capital',
        image:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAnx-ocuBQ58zgnpIrwq65zCnpBc--y8L8KLLXRoEPZOrDzbJI3PCuDuL_fbvQFvWs9FJseQvcvbGRmJPyKnhd-_nVXZ7KDnP9feasfNFtAL9j1Y7eSpKpz-HUJ5vqRf_SNwBPaaM5Zek3M1pj4xl-3EWpZCzmJd3iRWhqFoaHLXkKeB9xie0jbmqwsRzDYg_Ds-egLGY8gkf2RUptQYhtUwP0X8sleIroj7iHXVY8',
        elevation: '45m',
        distance: `${prov.distanceKm} km`,
        duration: '3h 45m',
        elevDelta: '+35 m',
        highway: prov.highway,
        conditionBadge: `${prov.statusText} · ${prov.highway}`,
        passIndex: prov.statusColor === 'emerald' ? '92%' : '76%',
        passLabel: prov.statusText,
        goodPct: prov.statusColor === 'emerald' ? 88 : 65,
        cautionPct: prov.statusColor === 'emerald' ? 10 : 25,
        badPct: prov.statusColor === 'emerald' ? 2 : 10,
        targetLat: prov.lat,
        targetLng: prov.lng,
        advisory: `ផ្លូវឆ្ពោះទៅ ${prov.nameKm} (${prov.highway}) ស្ថិតក្នុងលក្ខខណ្ឌ ${prov.statusText}។ បើកបរដោយការប្រុងប្រយ័ត្ន។`,
        advisoryEn: `Corridor to ${prov.nameEn} via ${prov.highway} is graded as ${prov.statusText}. Maintain steady speed.`,
        midpointCoords: null,
        midpointText: `En route to ${prov.nameEn}`,
        midpointTextKm: `ឆ្ពោះទៅ ${prov.nameKm}`,
        corridorSegments: [],
        maneuvers: [
          {
            dist: 'In 3.0 km',
            hwy: prov.highway.split(' ')[0],
            en: `Head toward ${prov.nameEn} on ${prov.highway}`,
            km: `ឆ្ពោះទៅកាន់ ${prov.nameKm}`,
            icon: 'straight',
            speed: 70,
            limit: 80,
            sector: prov.statusText,
            sectorKm: prov.statusText
          }
        ]
      }
    ];
  }, [activeProvinceId, activeProvince]);

  const selectedDestination = useMemo(() => {
    return destinations.find(d => d.id === activeDestinationId) || null;
  }, [destinations, activeDestinationId]);

  const navigation = useRoadNavigation(selectedDestination, location, routingAttempt);
  const voice = useVoiceGuidance({ lang, active: isNavActive, location, navigation });
  const activeDestination = useMemo(() => selectedDestination && ({
    ...selectedDestination, coordinates: [], corridorSegments: [], midpointCoords: null,
    maneuvers: [], distance: '—', duration: '—', isRealRoadEngine: false,
    ...navigation.route,
    ...(navigation.route ? { distance: navigation.route.distanceFormatted, duration: navigation.route.durationFormatted } : {})
  }), [selectedDestination, navigation.route]);
  const currentRouteCoords = activeDestination?.coordinates;
  const originLabel = location.ready
    ? (location.address || `${location.fix.lat.toFixed(5)}, ${location.fix.lng.toFixed(5)}`)
    : location.status === 'locating'
      ? (lang === 'km' ? 'កំពុងរកទីតាំងរបស់អ្នក…' : 'Getting your location…')
      : (lang === 'km' ? 'ត្រូវការទីតាំងរបស់អ្នក' : 'Your location required');

  const resetRoute = useCallback(() => setRoutingAttempt(value => value + 1), []);

  // Toast helper
  const showToast = msg => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Select Province handler
  const handleSelectProvince = useCallback(provId => {
    resetRoute();
    setActiveProvinceId(provId);
    setPanelTab('places');
    setPanelExpanded(true);
    setActiveDestinationId(null);
  }, [resetRoute]);

  // Select Destination handler
  const handleSelectDestination = useCallback(dest => {
    resetRoute();
    setActiveDestinationId(dest.id);
    setPanelTab('route');
  }, [resetRoute]);

  const handleStartNav = () => {
    if (!activeDestination) return;
    voice.start();
    setRecenterRequest(value => value + 1);
    setIsNavActive(true);
    if (!location.tracking || !location.ready) location.start();
  };
  const handleStopNav = () => {
    setIsNavActive(false);
    location.stop();
  };
  const handleToggleNavigation = () => {
    if (isNavActive) handleStopNav();
    else handleStartNav();
  };

  // Export GPX handler
  const handleExportGpx = () => {
    if (!currentRouteCoords || currentRouteCoords.length === 0) return;

    let gpxXml = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Domnoer GIS" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${activeDestination.title} Corridor</name>
    <desc>Road route to ${activeDestination.title}</desc>
  </metadata>
  <trk>
    <name>${activeDestination.title}</name>
    <trkseg>
`;

    currentRouteCoords.forEach(pt => {
      gpxXml += `      <trkpt lat="${pt[0]}" lon="${pt[1]}"></trkpt>\n`;
    });

    gpxXml += `    </trkseg>
  </trk>
</gpx>`;

    const blob = new Blob([gpxXml], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Domnoer-${activeDestination.id}.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(lang === 'km' ? 'បានទាញយកឯកសារ GPX ដោយជោគជ័យ!' : 'GPX corridor file exported!');
  };

  // Share Route handler
  const handleShareRoute = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('province', activeProvinceId);
    url.searchParams.set('dest', activeDestinationId);
    navigator.clipboard?.writeText(url.toString()).then(() => {
      showToast(lang === 'km' ? 'បានចម្លងតំណភ្ជាប់ផ្លូវ!' : 'Route link copied to clipboard!');
    }).catch(() => {
      showToast('URL: ' + url.toString());
    });
  };

  return (
    <div className={`terra-app ${isNavActive ? 'is-navigating' : ''}`}>
      {/* 1. Mapbox Interactive GIS Cartography Engine */}
      <MapEngine
        recenterRequest={recenterRequest}
        activeLayer={activeLayer}
        activeProvinceId={activeProvinceId}
        onSelectProvince={handleSelectProvince}
        activeDestination={activeDestination}
        isNavActive={isNavActive}
        userLocation={location.ready ? location.fix : null}
        navigationProgress={navigation.progress}
      />

      {/* 2. Top Floating Navigation Header */}
      <Navbar
        lang={lang}
        onToggleLang={setLang}
        activeLayer={activeLayer}
        onChangeLayer={setActiveLayer}
        isNavActive={isNavActive}
        onToggleNavigation={handleToggleNavigation}
        onRecenterMap={() => setRecenterRequest(value => value + 1)}
        originLabel={originLabel}
        userLocation={location.fix}
        canNavigate={Boolean(activeDestination)}
      />

      {!isNavActive && (
        <aside className={`trip-panel ${panelExpanded ? 'is-expanded' : ''}`} aria-label="Plan your trip">
          <div className="trip-panel-summary">
            <button className="panel-expand-btn" aria-expanded={!compactLayout || panelExpanded} aria-controls="trip-panel-content" onClick={() => { setPanelExpanded(value => !value); setRecenterRequest(value => value + 1); }}>
              <span className="panel-destination">{activeDestination ? activeDestination.title : (lang === 'km' ? 'ជ្រើសរើសគោលដៅ' : 'Choose a destination')}</span>
              <span className="panel-route-meta">{activeDestination ? `${activeDestination.distance} · ${activeDestination.duration}` : (lang === 'km' ? 'ជ្រើសរើសខេត្តមួយ ដើម្បីចាប់ផ្តើម' : 'Pick a province to start')}</span>
              <span className="material-symbols-outlined panel-chevron">{panelExpanded ? 'expand_more' : 'expand_less'}</span>
            </button>
            <button className="cta-start-route-btn panel-start-btn" onClick={handleStartNav} disabled={!activeDestination}>
              <span className="material-symbols-outlined">navigation</span>
              <span>{lang === 'km' ? 'នាំផ្លូវ' : 'Start'}</span>
            </button>
          </div>
          <div className="trip-panel-content" id="trip-panel-content">
            <ProvinceSearchBar lang={lang} activeProvinceId={activeProvinceId} onSelectProvince={handleSelectProvince} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <div className="trip-panel-tabs" aria-label="Trip sections">
              <button className={panelTab === 'route' ? 'selected' : ''} aria-pressed={panelTab === 'route'} onClick={() => setPanelTab('route')}>{lang === 'km' ? 'ព័ត៌មានផ្លូវ' : 'Route details'}</button>
              <button className={panelTab === 'places' ? 'selected' : ''} aria-pressed={panelTab === 'places'} onClick={() => setPanelTab('places')}>{lang === 'km' ? 'គោលដៅ' : 'Destinations'} <span>{destinations.length}</span></button>
            </div>
            <div className="trip-panel-body">
              {panelTab === 'places' && !activeProvince ? <p className="panel-empty-hint">{lang === 'km' ? 'ជ្រើសរើសខេត្តពីបញ្ជីខាងលើ ឬនៅលើផែនទី ដើម្បីមើលគោលដៅ។' : 'Choose a province above or on the map to see its destinations.'}</p>
                : panelTab === 'route' && !activeDestination ? <p className="panel-empty-hint">{lang === 'km' ? 'ជ្រើសរើសគោលដៅមួយ ដើម្បីមើលព័ត៌មានផ្លូវ។' : 'Choose a destination to see route details.'}</p>
                : panelTab === 'places' ? <PlacesDrawer lang={lang} activeProvince={activeProvince} destinations={destinations} activeDestinationId={activeDestinationId} onSelectDestination={handleSelectDestination} /> : <>
                <LocationStatus location={location} lang={lang} onStop={handleStopNav} />
                <TelemetrySheet lang={lang} activeProvince={activeProvince} activeDestination={activeDestination} isNavActive={isNavActive}
                  onShareRoute={handleShareRoute} onExportGpx={handleExportGpx}
                  isRoutingLoading={navigation.status === 'loading'} isRoutingError={navigation.status === 'error'}
                  originLabel={originLabel} isAwaitingLocation={navigation.status === 'awaiting-location'} onRetryRoute={resetRoute} />
              </>}
            </div>
          </div>
        </aside>
      )}

      <NavigationCockpit lang={lang} isNavActive={isNavActive} onStopNav={handleStopNav}
        location={location} navigation={navigation} voice={voice} onRetryRoute={resetRoute} />

      {/* 7. Toast Alerts */}
      <Toast message={toastMessage} />
    </div>
  );
}
