---
title: Çanakkale Hat & Sefer
layout: splash
permalink: /projects/canakkale-hat-sefer/
use_mermaid: true
classes: wide
header:
  title: Çanakkale Hat & Sefer
  overlay_color: "#1a3a5cff"
  overlay_image: /assets/images/canakkale-hat-sefer.png
  overlay_filter: 0.35
  actions:
    - label: "<i class='fas fa-code'></i> View On GitHub"
      url: "https://github.com/GamehunterKaan/canakkale-hat-sefer/"
excerpt: >
  Mobile-first PWA for Çanakkale's public bus network — live tracking, trip planning, schedules, and push notifications. No app store, no backend, no frameworks.
---

# Introduction

Çanakkale's municipal bus system has no official app. Passengers rely on a seasonal PDF timetable buried on the municipality website, with no way to know where a bus actually is, which bus to take between two points, or when to expect the next one.

**Çanakkale Hat & Sefer** solves all of that in a single HTML file served from GitHub Pages. It parses the municipality's PDF timetables automatically, pulls live bus positions from the kentkart API, plans trips with real-time ETA estimates, and delivers push notifications when your bus is approaching — even when your phone screen is off.

No app store, no native install, no backend server. Everything runs in the browser.

---

# Features

## Seferler — Live Schedule

Automatically fetches the municipality's PDF timetables and parses them into structured schedules. Shows all routes with departure times split by direction, highlights the next upcoming departure, and greys out past times. Separate weekday and weekend tabs.

Each route card shows the kentkart route color badge and a **🚌 Canlı** button that launches the live tracker for that line.

![Schedule tab](/assets/images/17hatsefer-seferler.png)

---

## Rota & Durak — Trip Planner & Live Map

Tap the map (or use GPS) to pick a start and destination. The planner finds all direct routes connecting them and ranks results by **total ETA** — walk to stop + wait for next bus + ride + walk to destination.

- **Plan ahead** — time offset buttons (+30 dk, +1 sa, +2 sa) plan for departures later in the day
- **Live bus data** — shows buses approaching your boarding stop right now with stop-level ETAs
- **Schedule fallback** — when kentkart returns no live data, the next scheduled departure is used instead
- **Stop browser** — tap any stop on the map to see which routes serve it and when the next bus comes

![Trip planner](/assets/images/17hatsefer-planner.png)

---

## Live Bus Tracker

Draws the full route polyline on the map and shows all active buses as animated markers. Direction buttons switch between outbound and inbound. Auto-refreshes every 15 seconds.

Accessible from the **🚌 Canlı** button on any route card in the Seferler tab, or from a trip detail in the planner.

![Live tracker](/assets/images/17hatsefer-tracker.png)

---

## Push Notifications

Subscribe to arrival alerts from any trip detail. Notifications fire at **10, 5, and 2 stops away** — delivered through Google FCM / Apple APNs by a Cloudflare Worker, so they arrive even when the browser tab is backgrounded or the screen is off.

---

## Saved Locations

Bookmark home, work, or any frequent spot. Saved locations appear in a dropdown next to the app title — tap 📍 or 🏁 to instantly set one as your origin or destination without touching the map.

---

# How It Works

## High-level runtime flow

1. **GitHub Actions** runs daily at midnight Turkey time, downloading both weekday and weekend PDF timetables from the municipality website.
2. A Node.js script parses the PDFs with pdf.js (server-side), extracts departure times per route and direction using column-based coordinate matching, and writes `data/schedule.json`.
3. A second script fetches all kentkart route, stop, and path data and writes `data/stops.json`, stripping the live bus positions (which change every minute) so the file stays cacheable.
4. Both JSON files are committed to the repository and served as static assets via GitHub Pages.
5. **The browser app** fetches these two files on first load and caches them in localStorage until the next midnight.
6. Live bus positions are fetched directly from the kentkart API by the browser on demand (trip planner, live tracker, stop panel) — no proxy needed.
7. **The Cloudflare Worker** polls kentkart every minute for subscribed routes and sends Web Push notifications when the target bus is approaching.

---

## Sequence diagram — trip planning

<div class="mermaid">
sequenceDiagram
    participant User
    participant Browser as Browser (index.html)
    participant GHPages as GitHub Pages
    participant Kentkart as Kentkart API

    User->>Browser: Open app
    Browser->>GHPages: GET data/schedule.json
    GHPages-->>Browser: Weekday/weekend schedules + route colors
    Browser->>GHPages: GET data/stops.json
    GHPages-->>Browser: Routes, stop coords, path polylines

    User->>Browser: Tap map origin + destination
    Browser->>Browser: Find routes connecting stops
    Browser->>Kentkart: GET /pathInfo for each candidate route
    Kentkart-->>Browser: Live bus positions
    Browser->>Browser: Compute ETA = walk + wait + ride + walk
    Browser-->>User: Ranked trip list
</div>

---

## Sequence diagram — push notifications

<div class="mermaid">
sequenceDiagram
    participant User
    participant Browser
    participant SW as Service Worker
    participant Worker as Cloudflare Worker
    participant Kentkart as Kentkart API
    participant FCM as FCM / APNs

    User->>Browser: Tap Bildir on trip detail
    Browser->>SW: Subscribe (VAPID Web Push)
    SW-->>Browser: PushSubscription object
    Browser->>Worker: POST /subscribe {subscription, routeCode, stopId, direction}
    Worker->>Worker: Store in KV (all_subs JSON blob)

    loop Every 60 seconds (Cloudflare Cron)
        Worker->>Kentkart: GET /pathInfo for each subscribed route
        Kentkart-->>Worker: busList with stop positions
        Worker->>Worker: Check stops remaining for each subscriber
        Worker->>FCM: Web Push at 10, 5, 2 stops away
        FCM-->>User: Push notification 🔔
    end
</div>

---

## Flow diagram — data pipeline (GitHub Actions)

<div class="mermaid">
flowchart TD
    A["Schedule: daily at 00:00 Turkey time"] --> B["fetch-schedule.mjs"]
    B --> C["Fetch municipality HTML page"]
    C --> D["Extract weekday + weekend PDF URLs"]
    D --> E["Download PDFs via fetch()"]
    E --> F["pdf.js: extract text items with X/Y coordinates"]
    F --> G["Group items into Y-band rows per route table"]
    G --> H["Detect KALKIŞ columns by X position"]
    H --> I["Assign times by column (±20pt tolerance)"]
    I --> J["Filter ÖĞRENCI / DOSYA routes"]
    J --> K["data/schedule.json"]

    A --> L["fetch-stops.mjs"]
    L --> M["GET kentkart /nearest/find — route list"]
    M --> N["GET /pathInfo × routes × 2 directions"]
    N --> O["Strip busList (live data, not cacheable)"]
    O --> P["data/stops.json"]

    K --> Q["git commit && git push"]
    P --> Q

    style A fill:#1a3a5c,stroke:#4a90d9,color:#fff
    style K fill:#166534,stroke:#4ade80,color:#fff
    style P fill:#166534,stroke:#4ade80,color:#fff
    style Q fill:#166534,stroke:#4ade80,color:#fff
</div>

---

# Architecture

## Component overview

| Component | Where it runs | Purpose |
|-----------|--------------|---------|
| `index.html` | Browser | Entire app — schedule display, trip planner, live map, notifications UI |
| `sw.js` | Browser (Service Worker) | Web Push subscription, background notification receipt |
| `data/schedule.json` | GitHub Pages (static) | Parsed timetables + kentkart route colors, rebuilt daily |
| `data/stops.json` | GitHub Pages (static) | All stops, route paths, kentkart route metadata, rebuilt daily |
| `scripts/fetch-schedule.mjs` | GitHub Actions (Node.js) | PDF download + parsing → schedule.json |
| `scripts/fetch-stops.mjs` | GitHub Actions (Node.js) | Kentkart bulk fetch → stops.json |
| `worker/index.js` | Cloudflare Workers | Push notification delivery — cron trigger, KV subscription storage |

---

## PDF parsing detail

The municipality publishes timetables as PDFs with multi-column tables. The parser uses pdf.js in Node to extract all text items with their X/Y pixel coordinates, then:

1. Groups items into rows by Y-coordinate (5pt bucket)
2. Identifies route headers matching `Ç\d+`, `ÇT\d+`, `\d+[ÇGK]`, or `960`
3. Finds `KALKIŞ`/`HAREKET` column headers to locate departure columns
4. Assigns `HH:MM` times to direction 0 or 1 based on whether their X falls within **±20pt of a departure column X** — arrival (`VARIŞ`) columns are excluded automatically since they have no `KALKIŞ` marker
5. Filters out student (`ÖĞRENCİ`) and file-header (`DOSYA`) false positives

---

## Key data structures

### schedule.json

```json
{
  "weekday": {
    "Ç2 ESENLER": {
      "name": "Ç2 ESENLER ÜNİVERSİTE",
      "dir0": { "label": "ÜNİVERSİTE KALKIŞ", "times": ["06:30", "07:00", "..."] },
      "dir1": { "label": "ESENLER KALKIŞ",    "times": ["06:45", "07:15", "..."] }
    }
  },
  "weekend": { "...": "same shape" },
  "routes": [ { "displayRouteCode": "Ç2", "routeColor": "e63946", "name": "..." } ],
  "fetchedAt": 1747612800000,
  "wdUrl": "https://ulasim.canakkale.bel.tr/...",
  "weUrl": "https://ulasim.canakkale.bel.tr/..."
}
```

### stops.json

```json
{
  "routes": [ { "displayRouteCode": "Ç2", "routeColor": "e63946" } ],
  "paths": [
    {
      "path": {
        "displayRouteCode": "Ç2",
        "direction": "0",
        "headSign": "Ç-2 ÜNİVERSİTE-ESENLER",
        "pointList": [ { "seq": "1", "lat": "40.152", "lng": "26.410" } ],
        "busStopList": [ { "stopId": "1234", "stopName": "Üniversite", "lat": "40.152", "lng": "26.410", "seq": "1" } ]
      },
      "route": { "displayRouteCode": "Ç2", "routeColor": "e63946" }
    }
  ],
  "stops": [ ["1234", { "stopId": "1234", "stopName": "Üniversite", "lat": 40.152, "lng": 26.41 }] ],
  "stopToRoutes": [ ["1234", [ { "routeCode": "Ç2", "direction": "0", "seq": 1 } ]] ],
  "fetchedAt": 1747612800000
}
```

---

## ETA calculation

```
totalETA = walkToStop + waitForBus + rideTime + walkToDestination

walkToStop       = haversine(userLat, userLng, stopLat, stopLng) / walkingSpeedMs
waitForBus       = live: stopsAway × avgSecondsPerStop
                   schedule: secondsUntilNextDeparture + stopsToBoard × avgSecondsPerStop
rideTime         = stopsFromBoardToAlight × avgSecondsPerStop
walkToDestination= haversine(alightLat, alightLng, destLat, destLng) / walkingSpeedMs
```

Results are sorted ascending. The blue highlight in the Seferler tab marks the earliest upcoming departure using the same schedule data.

---

# Tech

| Layer | Library / Service |
|-------|------------------|
| Maps | [Leaflet 1.9](https://leafletjs.com/) + OpenStreetMap tiles, canvas renderer |
| PDF parsing | [pdf.js](https://mozilla.github.io/pdf.js/) (Node.js, server-side in CI) |
| Live bus data | [Kentkart](https://kentkart.com) public API |
| Push notifications | Web Push (RFC 8030 / 8291 / 8292) via [Cloudflare Workers](https://workers.cloudflare.com/) |
| CI/CD | GitHub Actions — daily cron, commits JSON to repo |
| Hosting | GitHub Pages |
| Runtime dependencies | **None** — no frameworks, no build step |

---

# Deployment

The app runs entirely on free tiers:

- **GitHub Pages** — hosts the static files including the pre-built JSON data
- **GitHub Actions** — rebuilds schedule and stop data daily (2 minutes of compute)
- **Cloudflare Workers** — push notification delivery (free tier: 100k requests/day, 1k KV ops/day)

To deploy your own instance:

1. Fork the repository
2. Enable GitHub Pages (source: `main` branch, root)
3. Create a Cloudflare Worker, set `VAPID_PUBLIC`, `VAPID_PRIVATE`, `VAPID_SUBJECT` secrets and a KV namespace bound as `BUS_SUBS`
4. Update `WORKER_URL` in `index.html` to your Worker's URL and `VAPID_PUBLIC_KEY` to match

The GitHub Actions workflow triggers automatically at midnight Turkey time and commits updated JSON files.
