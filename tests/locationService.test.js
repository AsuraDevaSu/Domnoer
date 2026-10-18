import test from 'node:test';
import assert from 'node:assert/strict';
import { reverseGeocode } from '../src/services/locationService.js';

test('reverse geocoding uses the current coordinates and returns the available address or place', async () => {
  const originalFetch = globalThis.fetch;
  let properties = { full_address: '123 Test Street, Phnom Penh' };
  let requested;
  globalThis.fetch = async url => {
    requested = new URL(url);
    return { ok:true, json:async()=>({features:[{properties}]}) };
  };
  try {
    assert.equal(await reverseGeocode({lat:11.55,lng:104.92},{accessToken:'test'}),'123 Test Street, Phnom Penh');
    assert.equal(requested.searchParams.get('latitude'),'11.55');
    assert.equal(requested.searchParams.get('longitude'),'104.92');
    properties = { name:'Phnom Penh', place_formatted:'Cambodia' };
    assert.equal(await reverseGeocode({lat:11.55,lng:104.92},{accessToken:'test'}),'Phnom Penh, Cambodia');
    properties = {};
    assert.equal(await reverseGeocode({lat:11.55,lng:104.92},{accessToken:'test'}),'');
  } finally { globalThis.fetch=originalFetch; }
});
