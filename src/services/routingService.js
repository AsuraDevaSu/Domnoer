// Full road geometry and estimated fastest driving routes from Mapbox Directions.
import { MAPBOX_ACCESS_TOKEN } from '../config/mapbox.js';
import { measureRoute } from './navigationGeometry.js';

const routeCache = new Map();

/**
 * Translates Mapbox maneuver instructions into bilingual English and Khmer text
 */
function translateManeuver(step) {
  const m = step.maneuver;
  const roadName = step.name ? step.name.trim() : '';
  const type = m.type;
  const modifier = m.modifier || '';

  let en = '';
  let km = '';
  let icon = 'straight';

  if (type === 'depart') {
    en = roadName ? `Depart on ${roadName}` : 'Depart towards destination';
    km = roadName ? `ចាប់ផ្តើមចេញដំណើរតាម ${roadName}` : 'ចាប់ផ្តើមធ្វើដំណើរឆ្ពោះទៅគោលដៅ';
    icon = 'near_me';
  } else if (type === 'arrive') {
    en = roadName ? `Arrive at destination on ${roadName}` : 'Arrive at destination';
    km = roadName ? `មកដល់គោលដៅតាម ${roadName}` : 'មកដល់គោលដៅដោយសុវត្ថិភាព';
    icon = 'flag';
  } else if (type === 'roundabout' || type === 'rotary') {
    const exit = m.exit || 1;
    en = `At roundabout, take exit ${exit}${roadName ? ' onto ' + roadName : ''}`;
    km = `នៅរង្វង់មូល យកផ្លូវចេញទី ${exit}${roadName ? ' ឆ្ពោះទៅ ' + roadName : ''}`;
    icon = 'roundabout_right';
  } else if (modifier.includes('right')) {
    icon = modifier.includes('slight') ? 'turn_slight_right' : 'turn_right';
    en = roadName ? `Turn ${modifier} onto ${roadName}` : `Turn ${modifier}`;
    km = roadName ? `បត់ស្តាំចូល ${roadName}` : 'បត់ស្តាំ';
  } else if (modifier.includes('left')) {
    icon = modifier.includes('slight') ? 'turn_slight_left' : 'turn_left';
    en = roadName ? `Turn ${modifier} onto ${roadName}` : `Turn ${modifier}`;
    km = roadName ? `បត់ឆ្វេងចូល ${roadName}` : 'បត់ឆ្វេង';
  } else if (modifier.includes('u-turn')) {
    icon = 'u_turn_left';
    en = roadName ? `Make U-turn onto ${roadName}` : 'Make U-turn';
    km = roadName ? `ត្រឡប់ក្រោយចូល ${roadName}` : 'ត្រឡប់ក្រោយ';
  } else {
    icon = 'straight';
    en = roadName ? `Continue straight on ${roadName}` : 'Continue on current route';
    km = roadName ? `បន្តដំណើរត្រង់តាម ${roadName}` : 'បន្តដំណើរត្រង់ទៅមុខ';
  }

  return { en, km, icon };
}

/**
 * Fetches the fastest driving route between start and destination using Mapbox Directions
 * following mapped road curves and contours.
 */
export async function fetchFastestRoadRoute(startCoord, endCoord, _destinationMeta = {}, { signal, accessToken = MAPBOX_ACCESS_TOKEN, skipCache = false } = {}) {
  if (!accessToken || signal?.aborted) return null;
  // startCoord: [lat, lng], endCoord: [lat, lng]
  const cacheKey = JSON.stringify([startCoord, endCoord]);

  if (!skipCache && routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey);
  }

  const startLng = startCoord[1];
  const startLat = startCoord[0];
  const endLng = endCoord[1];
  const endLat = endCoord[0];

  const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true&alternatives=true&access_token=${encodeURIComponent(accessToken)}`;

  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) controller.abort();
  const timeoutId = setTimeout(abort, 15000);
  try {

    const response = await fetch(directionsUrl, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Mapbox Directions HTTP error: ${response.status}`);
    }

    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('No route returned by Mapbox');
    }

    const candidates = data.routes.filter(candidate =>
      Number.isFinite(candidate.duration) && candidate.duration >= 0 &&
      Number.isFinite(candidate.distance) && candidate.distance >= 0 &&
      candidate.geometry?.coordinates?.length >= 2 &&
      candidate.geometry.coordinates.every(coord =>
        Array.isArray(coord) && Number.isFinite(coord[0]) && Number.isFinite(coord[1]) &&
        Math.abs(coord[0]) <= 180 && Math.abs(coord[1]) <= 90)
    );
    const route = candidates.sort((a, b) => a.duration - b.duration || a.distance - b.distance)[0];
    if (!route) throw new Error('No valid road geometry returned');
    const rawCoords = route.geometry.coordinates; // [[lng, lat], ...]

    // Keep application coordinates in [lat, lng] order.
    const roadCoordinates = rawCoords.map(coord => [coord[1], coord[0]]);

    // Distance in km and duration in hours & minutes
    const distanceKm = Math.round(route.distance / 1000);
    const durationTotalMin = Math.round(route.duration / 60);
    const durHours = Math.floor(durationTotalMin / 60);
    const durMins = durationTotalMin % 60;
    const durationFormatted = `${durHours}h ${durMins < 10 ? '0' : ''}${durMins}m`;

    // Process turn-by-turn maneuvers from Mapbox steps
    const rawSteps = route.legs?.flatMap(leg => leg.steps || []) || [];
    let stepDistance = 0;
    const maneuvers = rawSteps
      .map(step => {
        const { en, km, icon } = translateManeuver(step);
        const distKm = (step.distance / 1000).toFixed(1);
        const distText = step.distance < 1000 ? `In ${Math.round(step.distance)} m` : `In ${distKm} km`;
        const hwy = step.name ? step.name.split(' ')[0] : 'NR';

        const startDistance = stepDistance;
        stepDistance += step.distance;
        return {
          startDistance, endDistance: stepDistance, distanceMeters: step.distance,
          durationSeconds: step.duration || 0,
          dist: distText,
          hwy: hwy,
          en: en,
          km: km,
          icon: icon,

          sector: step.name || 'Optimal Roadway',
          sectorKm: step.name || 'ផ្លូវធ្វើដំណើរ'
        };
      });

    // Only display verified road geometry; the routing response does not report road hazards.
    const corridorSegments = [{ points: roadCoordinates, type: 'optimal', color: '#059669' }];

    const calculatedRoute = {
      isRealRoadEngine: true,
      distanceKm,
      distanceMeters: route.distance,
      durationSeconds: route.duration,
      measured: measureRoute(roadCoordinates),
      distanceFormatted: `${distanceKm} km`,
      durationFormatted,
      coordinates: roadCoordinates,
      corridorSegments,
      midpointCoords: null,
      maneuvers
    };

    if (!skipCache) {
      if (routeCache.size >= 40) routeCache.delete(routeCache.keys().next().value);
      routeCache.set(cacheKey, calculatedRoute);
    }
    return calculatedRoute;
  } catch (err) {
    if (!signal?.aborted) console.warn('Road routing unavailable:', err.name === 'AbortError' ? 'Request timed out' : 'Unable to calculate road route');
    return null;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', abort);
  }
}
