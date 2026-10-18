import { useCallback, useEffect, useState } from 'react';
import { bearing, coordinate, distanceMeters, isUsableFix } from '../services/navigationGeometry.js';
import { reverseGeocode } from '../services/locationService.js';

export default function useLiveLocation() {
  // Begin GPS acquisition on opening the map; the browser controls permission.
  const [tracking, setTracking] = useState(() => window.isSecureContext && !!navigator.geolocation);
  const [attempt, setAttempt] = useState(0);
  const [fix, setFix] = useState(null);
  const [status, setStatus] = useState(() => !window.isSecureContext ? 'insecure' : navigator.geolocation ? 'locating' : 'unsupported');
  const [address, setAddress] = useState('');
  const [now, setNow] = useState(Date.now);

  const start = useCallback(() => {
    if (!window.isSecureContext) { setStatus('insecure'); return; }
    if (!navigator.geolocation) { setStatus('unsupported'); return; }
    setFix(null);
    setAddress('');
    setStatus('locating');
    setTracking(true);
    setAttempt(value => value + 1);
  }, []);

  const stop = useCallback(() => {
    setTracking(false);
    setFix(null);
    setAddress('');
    setStatus('idle');
  }, []);

  useEffect(() => {
    if (!tracking) return;
    let active = true;
    let previous = null;
    let addressFix = null;
    let addressTime = 0;
    let addressController;
    const watch = navigator.geolocation.watchPosition(position => {
      if (!active || (previous && position.timestamp <= previous.timestamp)) return;
      const c = position.coords;
      const next = { lat: c.latitude, lng: c.longitude, accuracy: c.accuracy, timestamp: position.timestamp,
        speed: Number.isFinite(c.speed) && c.speed >= 0 ? c.speed * 3.6 : null,
        heading: Number.isFinite(c.heading) && c.heading >= 0 ? c.heading : null };
      if (next.heading === null && previous && distanceMeters(coordinate(previous), coordinate(next)) > Math.max(8, next.accuracy)) {
        next.heading = bearing(coordinate(previous), coordinate(next));
      }
      setFix(next);
      setNow(Date.now());
      setStatus(next.accuracy > 100 ? 'weak' : 'ready');
      previous = next;
      if (!isUsableFix(next)) return;
      if (!addressFix || (Date.now() - addressTime >= 30000 && distanceMeters(coordinate(addressFix), coordinate(next)) >= 100)) {
        addressFix = next;
        addressTime = Date.now();
        addressController?.abort();
        const controller = new AbortController();
        addressController = controller;
        setAddress('');
        const timeout = setTimeout(() => controller.abort(), 10000);
        reverseGeocode(next, { signal: controller.signal }).then(value => {
          if (active && !controller.signal.aborted) setAddress(value);
        }).catch(() => {}).finally(() => clearTimeout(timeout));
      }
    }, error => {
      if (active) setStatus(error.code === 1 ? 'denied' : error.code === 3 ? 'timeout' : 'unavailable');
    }, { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 });
    const timer = setInterval(() => setNow(Date.now()), 2000);
    return () => {
      active = false;
      navigator.geolocation.clearWatch(watch);
      clearInterval(timer);
      addressController?.abort();
    };
  }, [tracking, attempt]);

  const effectiveStatus = status === 'ready' && !isUsableFix(fix, now) ? 'stale' : status;
  return { tracking, session: attempt, fix, address, now, status: effectiveStatus, ready: tracking && effectiveStatus === 'ready', start, stop };
}
