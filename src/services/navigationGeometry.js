const R = 6371000;
const rad = value => value * Math.PI / 180;
export const coordinate = fix => [fix.lat, fix.lng];

export function distanceMeters(a, b) {
  const dLat = rad(b[0] - a[0]);
  const dLng = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function bearing(a, b) {
  const delta = rad(b[1] - a[1]);
  return (Math.atan2(Math.sin(delta) * Math.cos(rad(b[0])),
    Math.cos(rad(a[0])) * Math.sin(rad(b[0])) - Math.sin(rad(a[0])) * Math.cos(rad(b[0])) * Math.cos(delta)) * 180 / Math.PI + 360) % 360;
}

export function measureRoute(coordinates) {
  const cumulative = [0];
  for (let index = 1; index < coordinates.length; index++) {
    cumulative.push(cumulative[index - 1] + distanceMeters(coordinates[index - 1], coordinates[index]));
  }
  return { coordinates, cumulative, total: cumulative.at(-1) || 0 };
}

// Project onto each road segment in local meter coordinates, not onto vertices.
export function projectOnRoute(point, route) {
  let closest = null;
  const scaleX = R * Math.cos(rad(point[0])) * Math.PI / 180;
  const scaleY = R * Math.PI / 180;
  for (let i = 0; i < route.coordinates.length - 1; i++) {
    const a = route.coordinates[i];
    const b = route.coordinates[i + 1];
    const ax = (a[1] - point[1]) * scaleX;
    const ay = (a[0] - point[0]) * scaleY;
    const dx = (b[1] - a[1]) * scaleX;
    const dy = (b[0] - a[0]) * scaleY;
    const length2 = dx * dx + dy * dy;
    const t = length2 ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / length2)) : 0;
    const distance = Math.hypot(ax + t * dx, ay + t * dy);
    if (!closest || distance < closest.distance) {
      const traveled = route.cumulative[i] + t * (route.cumulative[i + 1] - route.cumulative[i]);
      closest = {
        distance, traveled, remaining: route.total - traveled, segmentIndex: i,
        point: [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])],
        heading: bearing(a, b), progress: route.total ? traveled / route.total : 1
      };
    }
  }
  return closest;
}

export function isUsableFix(fix, now = Date.now()) {
  return !!fix && Number.isFinite(fix.lat) && Math.abs(fix.lat) <= 90 &&
    Number.isFinite(fix.lng) && Math.abs(fix.lng) <= 180 &&
    Number.isFinite(fix.accuracy) && fix.accuracy >= 0 && fix.accuracy <= 100 &&
    Number.isFinite(fix.timestamp) && now - fix.timestamp <= 20000 && fix.timestamp <= now + 5000;
}

export function offRouteThreshold(fix) {
  return Math.max(45, fix.accuracy * 1.5);
}

export function navigationProgress(route, fix) {
  if (!route || !fix) return null;
  const match = projectOnRoute(coordinate(fix), route.measured);
  if (!match) return null;
  const offRoute = match.distance > offRouteThreshold(fix);
  const traveledMeters = match.progress * route.distanceMeters;
  const steps = route.maneuvers;
  const index = steps.findIndex(step => step.endDistance > traveledMeters);
  const currentIndex = index < 0 ? Math.max(0, steps.length - 1) : index;
  const current = steps[currentIndex] || steps.at(-1);
  const next = steps[currentIndex + 1] || steps.at(-1);
  const stepFraction = current?.distanceMeters ? Math.max(0, Math.min(1, (current.endDistance - traveledMeters) / current.distanceMeters)) : 0;
  const remainingSeconds = current
    ? current.durationSeconds * stepFraction + steps.slice(currentIndex + 1).reduce((sum, step) => sum + step.durationSeconds, 0)
    : route.durationSeconds * (1 - match.progress);
  const arrived = !offRoute && match.remaining < 30 && distanceMeters(coordinate(fix), route.coordinates.at(-1)) < 40;
  return {
    ...match, offRoute, arrived,
    maneuver: arrived ? steps.at(-1) : next,
    distanceToTurn: arrived ? 0 : Math.max(0, (current?.endDistance || 0) - traveledMeters),
    remainingMeters: arrived ? 0 : Math.max(0, route.distanceMeters - traveledMeters),
    remainingSeconds: arrived ? 0 : remainingSeconds,
    roadName: current?.sector || ''
  };
}
