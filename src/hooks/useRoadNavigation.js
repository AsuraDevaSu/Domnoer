import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchFastestRoadRoute } from '../services/routingService.js';
import { coordinate, distanceMeters, isUsableFix, navigationProgress, offRouteThreshold, projectOnRoute } from '../services/navigationGeometry.js';

export default function useRoadNavigation(destination, location, attempt) {
  const [result, setResult] = useState(null);
  const requestRef = useRef(null);
  const key = `${destination?.id}:${attempt}:${location.session}:${location.tracking}`;
  const { fix, ready, now, tracking } = location;

  useEffect(() => {
    let current = requestRef.current;
    if (current?.key !== key) {
      current?.controller?.abort();
      current = { key, route: null, pending: false, lastRequest: 0, offCount: 0, lastFix: 0 };
      requestRef.current = current;
    }
    if (!destination) return;
    // Every route starts at a fresh GPS fix. Never substitute a city or an old session.
    if (!tracking || !ready || !isUsableFix(fix, now)) return;
    if (current.pending) return;
    const origin = coordinate(fix);
    let needsRoute = !current.route;
    if (current.route && tracking) {
      const match = projectOnRoute(origin, current.route.measured);
      if (fix.timestamp !== current.lastFix) {
        current.offCount = match.distance > offRouteThreshold(fix) ? current.offCount + 1 : 0;
        current.lastFix = fix.timestamp;
      }
      // Confirm off-road movement with two accurate fixes; throttle requests.
      const deviated = current.offCount >= 2 && now - current.lastRequest >= 10000;
      const refresh = now - current.lastRequest >= 60000 && distanceMeters(origin, current.origin) > 500;
      needsRoute = deviated || refresh;
    }
    if (!needsRoute || (current.lastRequest && now - current.lastRequest < 10000)) return;
    const controller = new AbortController();
    current.controller = controller;
    current.pending = true;
    current.lastRequest = now;
    current.origin = origin;
    // Synchronize loading state with this external directions request.
    // eslint-disable-next-line react/set-state-in-effect
    setResult({ key, route: current.route, status: 'loading' });
    fetchFastestRoadRoute(origin, [destination.targetLat, destination.targetLng], {}, {
      signal: controller.signal, skipCache: tracking
    }).then(route => {
      if (controller.signal.aborted || requestRef.current !== current) return;
      current.pending = false;
      if (route) { current.route = route; current.offCount = 0; }
      setResult({ key, route: current.route, status: route ? 'ready' : 'error' });
    });
  }, [destination, key, fix, ready, now, tracking]);

  useEffect(() => () => {
    requestRef.current?.controller?.abort();
    requestRef.current = null;
  }, []);

  const route = result?.key === key ? result.route : null;
  const progress = useMemo(() => tracking && route && fix ? navigationProgress(route, fix) : null, [route, fix, tracking]);
  const status = !destination ? 'idle' : !tracking || !ready ? 'awaiting-location' : result?.key === key ? result.status : 'loading';
  return { route, progress, status };
}
