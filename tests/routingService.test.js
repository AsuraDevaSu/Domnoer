import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchFastestRoadRoute as fetchRoute } from '../src/services/routingService.js';

const fetchFastestRoadRoute = (start, end, meta, options = {}) => fetchRoute(start, end, meta, { accessToken: 'pk.test-token', ...options });

const route = (duration, distance, coordinates) => ({
  duration, distance, geometry: { coordinates }, legs: [{ steps: [] }]
});

test('selects lowest travel time and preserves every road coordinate for rendering and export', async () => {
  const originalFetch = globalThis.fetch;
  let requestUrl;
  globalThis.fetch = async url => {
    requestUrl = url;
    return { ok: true, json: async () => ({ code: 'Ok', routes: [
      route(9000, 100000, [[104, 11], [105, 12]]),
      route(6000, 120000, [[104, 11], [104.2, 11.1], [104.3, 11.5], [105, 12]])
    ] }) };
  };
  try {
    const result = await fetchFastestRoadRoute([11, 104], [12, 105]);
    assert.equal(new URL(requestUrl).hostname, 'api.mapbox.com');
    assert.equal(new URL(requestUrl).searchParams.get('access_token'), 'pk.test-token');
    assert.match(requestUrl, /overview=full&geometries=geojson&steps=true&alternatives=true/);
    assert.equal(result.distanceFormatted, '120 km');
    assert.equal(result.durationFormatted, '1h 40m');
    assert.deepEqual(result.coordinates, [[11, 104], [11.1, 104.2], [11.5, 104.3], [12, 105]]);
    assert.deepEqual(result.corridorSegments[0].points, result.coordinates);
    assert.equal(result.midpointCoords, null);
    globalThis.fetch = () => { throw new Error('Cached route should not fetch'); };
    assert.deepEqual(await fetchFastestRoadRoute([11, 104], [12, 105]), result);
  } finally { globalThis.fetch = originalFetch; }
});

test('no-road responses return no geometry rather than a straight-line fallback', async () => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  console.warn = () => {};
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ code: 'NoRoute', routes: [] }) });
  try {
    assert.equal(await fetchFastestRoadRoute([10, 104], [13, 105]), null);
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ code: 'Ok', routes: [route(60, 10, [[NaN, 10], [105, 13]])] }) });
    assert.equal(await fetchFastestRoadRoute([10, 104], [13, 105]), null);
  } finally { globalThis.fetch = originalFetch; console.warn = originalWarn; }
});

test('switching destination can abort an in-flight request', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true });
  });
  try {
    const controller = new AbortController();
    const pending = fetchFastestRoadRoute([11, 103], [12, 106], {}, { signal: controller.signal });
    controller.abort();
    assert.equal(await pending, null);
  } finally { globalThis.fetch = originalFetch; }
});

test('missing or cancelled Mapbox credentials never start a request', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('Unexpected network request'); };
  try {
    assert.equal(await fetchRoute([11, 104], [12, 105], {}, { accessToken: '' }), null);
    const controller = new AbortController();
    controller.abort();
    assert.equal(await fetchFastestRoadRoute([11, 104], [12, 105], {}, { signal: controller.signal }), null);
  } finally { globalThis.fetch = originalFetch; }
});
