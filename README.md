# EV Test Drive Scorer

A mobile-first Progressive Web App (PWA) for scoring and comparing electric vehicle test drives. Built for a family of 4 shopping for a full EV lease in Germany.

## What It Does

- **Score 9 shortlisted EVs** across 14 family-focused criteria (child seats, trunk space, comfort, etc.)
- **Tap-to-check** each criterion right at the dealership
- **Compare all cars** side-by-side in a scrollable matrix
- **Add notes** and drive dates per car
- **Works offline** — install it on your phone and use it without internet
- **Dark mode** — respects system preference, or toggle manually
- **Data stays on your phone** — all scores saved to localStorage

## Cars on the Shortlist

| Model | Body | Boot | Range | Lease/mo |
|-------|------|------|-------|----------|
| Skoda Enyaq 85 | SUV | 585 L | ~560 km | 330-470 |
| Kia EV5 | SUV | 566 L | ~530 km | 430-560 |
| VW ID.7 Tourer | Wagon | 605 L | ~620 km | 500-680 |
| Hyundai IONIQ 5 FL | CUV | 520 L | ~570 km | 380-520 |
| VW ID. Buzz | Van | 1,121 L | ~450 km | 483-700 |
| Ford Explorer EV | SUV | 450 L | ~600 km | 380-520 |
| BYD Sealion 7 | SUV-Coupe | 520+58 L | ~502 km | 550-700 |
| NIO EL6 | SUV | 579 L | ~580 km | 700-900 |
| NIO ET5 Touring | Wagon | 450 L | ~580 km | 625-800 |

## Scoring Criteria

1. Easy child-seat loading / buckle access
2. Rear-seat space for two child seats
3. Stroller fits without removing wheels
4. Trunk opening shape is practical
5. Family weekend luggage fit
6. Front-seat comfort
7. Rear-seat comfort
8. Visibility / confidence when driving
9. Ride comfort over rough roads
10. Cabin quietness
11. Infotainment usability
12. Parking / maneuvering ease
13. Dealer experience / trust
14. Lease quote feels acceptable

## Install on Your Phone

1. Open the app URL in your mobile browser
2. **iOS**: Tap Share > "Add to Home Screen"
3. **Android**: Tap the browser menu > "Install app" or "Add to Home Screen"
4. The app icon appears on your home screen and works offline

## Tech

- Vanilla HTML / CSS / JS — no build step, no dependencies
- PWA with service worker for offline caching
- localStorage for data persistence
- Responsive, mobile-first design

## Project Structure

```
├── index.html          Main app entry point
├── css/style.css       Styles (light + dark mode)
├── js/app.js           App logic and car data
├── sw.js               Service worker for offline support
├── manifest.json       PWA manifest
├── icons/              App icons (SVG)
├── reference/          Original paper form (HTML)
└── README.md
```

## Development

Just serve the files with any static server:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000` on your phone (same Wi-Fi network) or browser.

## License

Personal use.
