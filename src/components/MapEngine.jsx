import { useEffect, useMemo, useRef, useState } from 'react';
import * as mapboxgl from 'mapbox-gl/esm';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CAMBODIA_PROVINCES, MAP_TILE_LAYERS } from '../data/cambodiaData';
import { MAPBOX_ACCESS_TOKEN } from '../config/mapbox';

const EMPTY_ROUTE = { type: 'FeatureCollection', features: [] };
const EMPTY_COORDINATES = [];

function visibleMapPadding(map) {
  const container = map.getContainer();
  const { width, height } = container.getBoundingClientRect();
  const app = container.closest('.terra-app');
  const header = app?.querySelector('.top-app-header')?.getBoundingClientRect();
  const panel = app?.querySelector('.trip-panel, .nav-cockpit-overlay')?.getBoundingClientRect();
  const padding = { top: (header?.bottom || 48) + 12, bottom: 32, left: 20, right: 68 };
  if (panel) {
    if (width <= 700) padding.bottom = height - panel.top + 12;
    else padding.left = panel.right + 16;
  }
  // Keep a usable camera area even when a keyboard reduces viewport height.
  const verticalScale = Math.min(1, Math.max(1, height - 60) / (padding.top + padding.bottom));
  padding.top *= verticalScale;
  padding.bottom *= verticalScale;
  return padding;
}

function fitRoute(map, coordinates) {
  if (coordinates.length < 2) {
    map.flyTo({ center: [104.991, 12.5657], zoom: 6.7, pitch: 0, bearing: 0 });
    return;
  }
  const bounds = coordinates.reduce(
    (result, [lat, lng]) => result.extend([lng, lat]), new mapboxgl.LngLatBounds()
  );
  map.fitBounds(bounds, {
    padding: visibleMapPadding(map), retainPadding: false,
    maxZoom: 13, pitch: 0, bearing: 0, duration: 800
  });
}

function drawRoute(map, coordinates) {
  const data = coordinates.length < 2 ? EMPTY_ROUTE : {
    type: 'Feature', properties: {},
    geometry: { type: 'LineString', coordinates: coordinates.map(([lat, lng]) => [lng, lat]) }
  };
  const source = map.getSource('road-route');
  if (source) {
    source.setData(data);
    return;
  }
  map.addSource('road-route', { type: 'geojson', data, tolerance: 0 });
  const slot = map.getSlots().includes('middle') ? { slot: 'middle' } : {};
  map.addLayer({
    id: 'road-route-outline', type: 'line', source: 'road-route', ...slot,
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: { 'line-color': '#ffffff', 'line-width': 9, 'line-opacity': 0.95 }
  });
  map.addLayer({
    id: 'road-route-line', type: 'line', source: 'road-route', ...slot,
    layout: { 'line-join': 'round', 'line-cap': 'round' },
    paint: { 'line-color': '#059669', 'line-width': 5 }
  });
}

export default function MapEngine({
  activeLayer, activeProvinceId, onSelectProvince, activeDestination,
  isNavActive, userLocation, navigationProgress, recenterRequest = 0
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const vehicleRef = useRef(null);
  const followRef = useRef(true);
  const navigationStartedRef = useRef(false);
  const recenterRef = useRef(0);
  const [mapError, setMapError] = useState(MAPBOX_ACCESS_TOKEN ? '' : 'Map setup is incomplete. Add a Mapbox public token to continue.');
  const [retryAttempt, setRetryAttempt] = useState(0);
  const fullCoordinates = activeDestination?.isRealRoadEngine ? activeDestination.coordinates : EMPTY_COORDINATES;
  const coordinates = useMemo(() => {
    if (isNavActive && userLocation && navigationProgress && !navigationProgress.offRoute) {
      return [navigationProgress.point, ...fullCoordinates.slice(navigationProgress.segmentIndex + 1)];
    }
    return fullCoordinates;
  }, [fullCoordinates, navigationProgress, isNavActive, userLocation]);

  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) return;
    let map;
    try {
      map = new mapboxgl.Map({
        container: containerRef.current,
        accessToken: MAPBOX_ACCESS_TOKEN,
        style: null,
        center: [104.991, 12.5657], zoom: 6.7,
        attributionControl: false,
        logoPosition: 'bottom-left'
      });
    } catch {
      // Report an external WebGL initialization failure to the user.
      // eslint-disable-next-line react/set-state-in-effect
      setMapError('Your browser could not start the map. Enable hardware acceleration and reload.');
      return;
    }
    mapRef.current = map;
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
    map.on('error', () => setMapError('The map could not load. Check your connection or Mapbox access and retry.'));
    map.on('idle', () => setMapError(''));
    map.on('dragstart', event => { if (event.originalEvent) followRef.current = false; });
    map.on('rotatestart', event => { if (event.originalEvent) followRef.current = false; });
    const observer = new ResizeObserver(() => map.resize());
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      vehicleRef.current?.remove();
      vehicleRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [retryAttempt]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const layer = MAP_TILE_LAYERS.find(item => item.key === activeLayer) || MAP_TILE_LAYERS[0];
    map.setStyle(layer.style, { config: layer.config || {} });
  }, [activeLayer, retryAttempt]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const markers = CAMBODIA_PROVINCES.map(province => {
      const selected = province.id === activeProvinceId;
      const hub = province.id === 'phnom_penh';
      const color = hub ? '#002218' : selected ? '#059669' : '#64748b';
      const element = document.createElement('button');
      element.type = 'button';
      element.className = 'custom-province-pin';
      element.setAttribute('aria-label', `Select ${province.nameEn}`);
      element.setAttribute('aria-pressed', String(selected));
      const dot = document.createElement('span');
      dot.className = 'pin-core-dot';
      dot.style.backgroundColor = color;
      const label = document.createElement('span');
      label.className = `pin-label-pill ${selected ? 'selected' : ''}`;
      label.textContent = province.nameEn;
      element.append(dot, label);
      element.addEventListener('click', () => onSelectProvince(province.id));
      return new mapboxgl.Marker({ element }).setLngLat([province.lng, province.lat]).addTo(map);
    });
    return () => markers.forEach(marker => marker.remove());
  }, [activeProvinceId, onSelectProvince, retryAttempt]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let applied = false;
    const update = () => {
      drawRoute(map, coordinates);
      applied = true;
    };
    const updateWhenReady = () => {
      if (!applied && map.isStyleLoaded()) update();
    };
    // Style changes remove custom sources, so restore the latest route after each load.
    map.on('style.load', update);
    // Directions may arrive after style.load while map tiles are still loading.
    map.on('idle', updateWhenReady);
    // Existing GeoJSON sources can update while new viewport tiles are loading.
    if (map.getSource('road-route') || map.isStyleLoaded()) update();
    if (!isNavActive && coordinates.length > 1) fitRoute(map, coordinates);
    const endpoints = coordinates.length > 1 ? [coordinates[0], coordinates.at(-1)].map((point, index) => {
      const element = document.createElement('div');
      element.className = 'route-endpoint';
      element.textContent = index === 0 ? 'A' : 'B';
      element.setAttribute('aria-label', index === 0 ? 'Road route start' : 'Road route destination');
      return new mapboxgl.Marker({ element }).setLngLat([point[1], point[0]]).addTo(map);
    }) : [];
    return () => {
      map.off('style.load', update);
      map.off('idle', updateWhenReady);
      endpoints.forEach(marker => marker.remove());
    };
  }, [coordinates, retryAttempt, isNavActive]);

  useEffect(() => {
    if (navigationStartedRef.current === isNavActive) return;
    navigationStartedRef.current = isNavActive;
    followRef.current = true;
    const map = mapRef.current;
    if (isNavActive && map && userLocation) {
      map.easeTo({ center: [userLocation.lng, userLocation.lat],
        zoom: 16, padding: visibleMapPadding(map), retainPadding: false, duration: 900 });
    }
  }, [isNavActive, userLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || recenterRef.current === recenterRequest) return;
    recenterRef.current = recenterRequest;
    followRef.current = true;
    if (userLocation) {
      map.easeTo({ center: [userLocation.lng, userLocation.lat], padding: visibleMapPadding(map), retainPadding: false, zoom: 16, bearing: userLocation.heading ?? 0, duration: 700 });
    } else if (!isNavActive) fitRoute(map, coordinates);
  }, [recenterRequest, coordinates, retryAttempt, userLocation, isNavActive]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!userLocation) {
      vehicleRef.current?.remove();
      vehicleRef.current = null;
      return;
    }
    const { lat, lng, heading, speed } = userLocation;
    const position = navigationProgress && !navigationProgress.offRoute ? navigationProgress.point : [lat, lng];
    const direction = heading ?? (navigationProgress && !navigationProgress.offRoute ? navigationProgress.heading : null);
    if (!vehicleRef.current) {
      const element = document.createElement('div');
      element.className = 'map-vehicle';
      element.setAttribute('aria-label', 'Your current location');
      const arrow = document.createElement('span');
      arrow.className = 'map-vehicle-arrow';
      arrow.textContent = '▲';
      const speedLabel = document.createElement('span');
      speedLabel.className = 'map-vehicle-speed';
      element.append(arrow, speedLabel);
      vehicleRef.current = new mapboxgl.Marker({ element })
        .setLngLat([position[1], position[0]]).addTo(map);
    }
    const marker = vehicleRef.current;
    marker.setLngLat([position[1], position[0]]);
    const rotate = () => {
      marker.getElement().querySelector('.map-vehicle-arrow').style.transform = `rotate(${(direction ?? 0) - map.getBearing()}deg)`;
    };
    rotate();
    map.on('rotate', rotate);
    marker.getElement().querySelector('.map-vehicle-speed').textContent = speed === null ? 'GPS' : `${Math.round(speed)} km/h`;
    if (isNavActive && followRef.current) {
      map.easeTo({ center: [position[1], position[0]], zoom: Math.max(15, map.getZoom()),
        padding: visibleMapPadding(map), retainPadding: false,
        ...(direction === null ? {} : { bearing: direction }), duration: 900 });
    }
    return () => map.off('rotate', rotate);
  }, [userLocation, navigationProgress, isNavActive, retryAttempt]);


  return (
    <>
      <div className="map-viewport" ref={containerRef} aria-label="Mapbox road map of Cambodia" />
      {mapError && (
        <div className="map-error" role="alert">
          <span>{mapError}</span>
          <button onClick={() => { setMapError(''); setRetryAttempt(value => value + 1); }}>Retry map</button>
        </div>
      )}
      <div className="map-view-controls">
        <div className="view-controls-card">
          <button className="ctrl-btn" onClick={() => mapRef.current?.zoomIn()} title="Zoom in" aria-label="Zoom in">
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className="ctrl-btn" onClick={() => mapRef.current?.zoomOut()} title="Zoom out" aria-label="Zoom out">
            <span className="material-symbols-outlined">remove</span>
          </button>
          <div className="ctrl-divider" />
          <button className="ctrl-btn" onClick={() => { followRef.current = false; if (mapRef.current) fitRoute(mapRef.current, fullCoordinates); }} title="Fit road route" aria-label="Fit road route">
            <span className="material-symbols-outlined">alt_route</span>
          </button>
          {userLocation && <button className="ctrl-btn" aria-label="Follow my location" title="Follow my location" onClick={() => {
            followRef.current = true;
            if (mapRef.current) mapRef.current.easeTo({ center: [userLocation.lng, userLocation.lat], padding: visibleMapPadding(mapRef.current), retainPadding: false, zoom: 16, bearing: userLocation.heading ?? 0, duration: 700 });
          }}><span className="material-symbols-outlined">my_location</span></button>}
          <button className="ctrl-btn" onClick={() => mapRef.current?.easeTo({ pitch: mapRef.current.getPitch() > 0 ? 0 : 50, duration: 700 })} title="Toggle 3D view" aria-label="Toggle 3D view">
            <span className="material-symbols-outlined">3d_rotation</span>
          </button>
        </div>
      </div>
    </>
  );
}
