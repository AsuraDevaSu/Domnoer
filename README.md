# TerraRoute Cambodia

A bilingual Cambodia travel map built with React, Vite, and Mapbox GL JS.

## Run locally

```sh
npm install
cp .env.example .env.local
```

Set `VITE_MAPBOX_ACCESS_TOKEN` in `.env.local` to your public Mapbox token, then run:

```sh
npm run dev
```

Open http://localhost:5173. Restart Vite after changing the environment file. The local token file is ignored by Git. For deployment, configure the same environment variable before building. Browser tokens are included in the client bundle; use a public token restricted to your application URLs.

## Maps and road routes

- Mapbox Standard, Satellite, and Night styles, with zoom, route fit, and 3D controls.
- Allow browser location access to preview a driving route from your current GPS position to the selected province or attraction. Routes wait for an accurate location; there is no default city origin. Tap **Use my location** to retry if location access fails.
- Compare returned alternatives by estimated duration, with distance as the tie-breaker.
- Render full road geometry without simplification. During navigation the map displays the remaining road route; GPX exports the current calculated route.
- Cancel outdated requests when the destination changes. Cache successful routes in memory and provide a retry button on failure.
- Style changes preserve the road route, destination markers, and live location marker.

Map rendering and routing require internet access and a valid Mapbox token. Requests count toward your Mapbox account usage. Driving times are estimates without live traffic. GPS speed is shown only when supplied by the device; the existing road-condition and attraction metadata are sample data, not a live road safety feed.

## Checks

```sh
npm run build
npm run lint
npm test
```

Mapbox references: [GL JS](https://docs.mapbox.com/mapbox-gl-js/) and [Directions API](https://docs.mapbox.com/api/navigation/directions/).

## Live location

- Requests location when opening the map and uses `watchPosition` with browser permission. Requires HTTPS in deployment (localhost works for development). Stop GPS / Exit navigation clears the watch, live position, and route. Starting again waits for a fresh GPS fix.
- Mapbox reverse geocoding supplies the current address or nearby place. Coordinates remain visible when an address is unavailable. Address requests are refreshed after moving at least 100 m and at least 30 seconds, and remain only in memory.
- Road progress, next turn, remaining distance and estimated arrival update with position. The map follows the user and rotates with travel heading. Drag the map to explore; **Follow my location** resumes following.
- Two accurate off-route positions trigger a new driving route, with at least 10 seconds between requests. Routes also refresh after one minute when the origin moved more than 500 m. Failed reroutes keep the last route and expose a retry action.
- Positions older than 20 seconds or with accuracy worse than 100 m do not trigger rerouting. Permission denial, poor accuracy, timeouts and lost GPS have visible status messages.
- Address coverage and GPS accuracy depend on the device and location. This browser app does not provide background tracking when the browser suspends the page.

## Navigation and responsive layout

- Starting a route enables spoken directions and zooms to your current GPS position once available. While GPS is pending, it keeps the current map view instead of centering on a default city.
- Voice guidance follows the selected language: Khmer (`km-KH`) or English (`en-US`). It announces turns as you approach them; use the sound button to mute or replay the current instruction.
- Speech prefers browser/device voices. If Khmer is unavailable, it reads the English instruction and displays an English-voice notice. If device speech is missing, fails, or does not begin within three seconds, Mapbox speech supplies English audio over the internet using the configured public token. These voice requests count toward Mapbox usage and contain the spoken instruction.
- Start and Replay initiate playback from a user gesture. The audio status stays beside the sound controls; blocked playback asks the user to tap Replay. Mute and Exit cancel both device and online speech. Khmer audio still requires a working device Khmer voice.
- Trip details use a sidebar on larger screens and an expandable bottom panel on phones. Navigation details scroll independently so sound and exit controls stay accessible on small screens.
