import { MAPBOX_ACCESS_TOKEN } from '../config/mapbox.js';

export async function reverseGeocode(fix, { signal, accessToken = MAPBOX_ACCESS_TOKEN } = {}) {
  if (!accessToken) return '';
  const params = new URLSearchParams({ longitude: fix.lng, latitude: fix.lat, access_token: accessToken });
  const response = await fetch(`https://api.mapbox.com/search/geocode/v6/reverse?${params}`, { signal });
  if (!response.ok) throw new Error('Address lookup unavailable');
  const data = await response.json();
  const properties = data.features?.[0]?.properties;
  return properties?.full_address || [properties?.name, properties?.place_formatted].filter(Boolean).join(', ');
}
