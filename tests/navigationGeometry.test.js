import test from 'node:test';
import assert from 'node:assert/strict';
import { distanceMeters, measureRoute, projectOnRoute, isUsableFix, navigationProgress } from '../src/services/navigationGeometry.js';

const coords = [[11,104], [11.01,104], [11.01,104.01]];
const measured = measureRoute(coords);

test('progress follows traveled road length across a bend, rather than coordinate count', () => {
  const match = projectOnRoute([11.005,104], measured);
  assert.ok(match.distance < 0.01);
  assert.ok(Math.abs(match.traveled - distanceMeters(coords[0], [11.005,104])) < 1);
  assert.ok(match.progress > .24 && match.progress < .26);
  assert.ok(projectOnRoute([11.005,104.005], measured).distance > 500);
});

test('weak, stale, invalid and future fixes cannot drive rerouting', () => {
  const now = 100000;
  const fix = { lat:11, lng:104, accuracy:8, timestamp:now };
  assert.ok(isUsableFix(fix,now));
  for (const patch of [{accuracy:500}, {accuracy:-1}, {timestamp:now-21000}, {timestamp:now+6000}, {lat:NaN}, {lng:181}]) {
    assert.equal(isUsableFix({...fix,...patch},now),false);
  }
});

test('next maneuver, remaining distance and ETA change as the user passes a turn', () => {
  const route = { measured, coordinates:coords, distanceMeters:measured.total, durationSeconds:200,
    maneuvers:[
      {endDistance:measured.cumulative[1], distanceMeters:measured.cumulative[1], durationSeconds:100, en:'Depart', sector:'Road A'},
      {endDistance:measured.total, distanceMeters:measured.total-measured.cumulative[1], durationSeconds:100, en:'Turn right', sector:'Road B'},
      {endDistance:measured.total, distanceMeters:0, durationSeconds:0, en:'Arrive', sector:'Destination'}
    ]};
  const start = navigationProgress(route,{lat:11.005,lng:104,accuracy:8});
  const later = navigationProgress(route,{lat:11.01,lng:104.005,accuracy:8});
  assert.equal(start.maneuver.en,'Turn right');
  assert.equal(later.maneuver.en,'Arrive');
  assert.ok(later.remainingMeters < start.remainingMeters);
  assert.ok(later.remainingSeconds < start.remainingSeconds);
  const end = navigationProgress(route,{lat:11.01,lng:104.01,accuracy:8});
  assert.equal(end.arrived,true);
  assert.equal(end.remainingSeconds,0);
  assert.equal(navigationProgress(route,{lat:11.005,lng:104.005,accuracy:8}).offRoute,true);
});
