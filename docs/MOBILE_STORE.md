# Portfolio mobile apps — Android & iOS

This repo includes a **Capacitor** shell that wraps your live portfolio (`https://srujanchidarla.com`) so GitHub activity, AI chat, and API routes keep working on Vercel without rewriting the site.

## Architecture

```
┌─────────────────────┐
│  Play Store /       │
│  App Store app      │
│  (Capacitor shell)  │
└──────────┬──────────┘
           │ WebView
           ▼
┌─────────────────────┐
│  srujanchidarla.com │  ← Next.js on Vercel (API routes, chat, etc.)
└─────────────────────┘
```

**Why not a pure static export?** The site uses `/api/chat`, `/api/github/*`, and server rendering. Loading the production URL is the reliable path.

## Prerequisites

| Requirement | Android | iOS |
|-------------|---------|-----|
| Dev account | [Google Play Console](https://play.google.com/console) — **$25 one-time** | [Apple Developer](https://developer.apple.com/programs/) — **$99/year** |
| Build machine | Android Studio | **Mac** + Xcode |
| Extra tools | JDK 17+ (via Android Studio) | **CocoaPods** — `brew install cocoapods` |
| Node | 20 LTS recommended (avoid Node 26 for Capacitor CLI if issues) | Same |

## One-time setup

```bash
cd portfolio
npm install
npm run mobile:init    # adds ios/ if missing (android/ already in repo)
brew install cocoapods # required once for iOS
```

### App icons & splash

Replace placeholder assets before store submission:

- **Android:** `android/app/src/main/res/` (mipmap icons + drawable splash)
- **iOS:** `ios/App/App/Assets.xcassets/`

Use a 1024×1024 PNG for store listing. Tools: [capacitor-assets](https://github.com/ionic-team/capacitor-assets) or Figma export.

## Local dev on a physical device

```bash
# Terminal 1 — site (use webpack if Turbopack crashes on Node 26)
npm run dev -- --webpack -H 0.0.0.0 -p 3000

# Terminal 2 — point app at your Mac's LAN IP
CAPACITOR_SERVER_URL=http://192.168.x.x:3000 npm run mobile:sync
npm run mobile:android   # or mobile:ios
```

## Production build flow

1. Deploy latest portfolio to Vercel (production URL must match `capacitor.config.ts`).
2. Sync native projects:

```bash
npm run mobile:sync
```

3. Open in IDE and archive:

```bash
npm run mobile:android   # Android Studio → Build → Generate signed bundle (.aab)
npm run mobile:ios       # Xcode → Product → Archive → Distribute
```

## Store listing checklist

Both stores need:

- [ ] **Privacy policy URL** — `https://srujanchidarla.com/privacy`
- [ ] **Data processing URL** — `https://srujanchidarla.com/data`
- [ ] **Terms URL** — `https://srujanchidarla.com/terms`
- [ ] **Security / vulnerability disclosure** — `https://srujanchidarla.com/security`
- [ ] **App description** (portfolio + contact + AI avatar — not a job board)
- [ ] **Screenshots** — phone + tablet sizes per store specs
- [ ] **Category** — Productivity or Business (not Games)
- [ ] **Content rating** questionnaire
- [ ] **Support email** — `srujanchidarla.uof@gmail.com`

### Apple-specific (Guideline 4.2)

Apple rejects apps that are “just a website.” Add native value:

- Capacitor **Share** plugin for resume link
- Custom splash + app icon
- Optional: **Universal Links** (`applinks:srujanchidarla.com`)

Mention in review notes: *“Native shell for portfolio with offline fallback; primary content served from owned domain with AI chat and GitHub integrations.”*

### Google Play

- Upload **AAB** (Android App Bundle), not APK
- Target API level per [Play requirements](https://developer.android.com/google/play/requires)
- Data safety form: declare network usage, optional Anthropic API if chat collects prompts

## Environment variables

| Variable | Purpose |
|----------|---------|
| `CAPACITOR_SERVER_URL` | Dev — load local Next.js from device |
| `CAPACITOR_PRODUCTION_URL` | Override production URL (default: srujanchidarla.com) |

## Alternative: PWA only (no stores)

Add a web manifest + service worker for “Add to Home Screen” without store fees. Stores give discoverability; PWA is faster to ship but not in Play/App search.

## Timeline estimate

| Phase | Time |
|-------|------|
| Capacitor setup + icons | 1–2 days |
| Android internal testing | 2–3 days |
| iOS TestFlight | 3–5 days (Apple review) |
| First public release | 1–2 weeks total |

## Commands reference

```bash
npm run mobile:sync      # copy web assets + update native projects
npm run mobile:android   # open Android Studio
npm run mobile:ios       # open Xcode
npm run mobile:run:android
npm run mobile:run:ios
```
