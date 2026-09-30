# srujanchidarla.com

My personal portfolio — a recruiter-focused Next.js site built to show real, shipped work instead of a static resume page. Live at **[srujanchidarla.com](https://srujanchidarla.com)**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com)

## What's in it

- **Hero + proof sections** — system design, networking, and full-stack shipping framed as capability pillars, not job titles
- **Selected work** — tabbed project case studies (problem → what I built → what I learned) with live previews, pulled from a single content file, no CMS
- **Live GitHub activity** — contribution heatmap, language breakdown, and recent repos fetched via the GitHub GraphQL API at request time, with a graceful fallback UI if the API or token isn't available
- **Daily DSA tracker** — pulls live streak/problem data from a companion repo
- **Certifications** — each card renders the real brand mark for its subject (React, Angular, MySQL, AWS, etc.) via `simple-icons`, not just text
- **AI avatar chat** — a portfolio-grounded assistant backed by the Claude API, with an offline fallback when no API key is configured
- **Research & writing** — long-form essays and short "working notes," plus a standalone `/research` index
- **Printable resume** — `/resume` renders a clean, print-optimized one-pager (`File → Print → Save as PDF`)
- **Athlete gallery, Local Guide stats, legal pages** (privacy, terms, cookies, accessibility, etc.)
- **Native mobile shells** for iOS/Android via Capacitor, wrapping the same live site
- **Dark/light theme**, a boot-sequence loader, and a custom cursor — all respecting `prefers-reduced-motion`

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | React 19, TypeScript, [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [lucide-react](https://lucide.dev), [simple-icons](https://simpleicons.org) |
| AI chat | [Claude API](https://www.anthropic.com/api) (Anthropic), with a static fallback |
| Live data | GitHub GraphQL API, a companion DSA-tracking repo |
| Mobile | [Capacitor](https://capacitorjs.com) (iOS + Android) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) |
| Hosting | [Vercel](https://vercel.com) |

## Getting started

```bash
git clone https://github.com/srujanchidarla/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs fine with zero configuration — every external integration below degrades gracefully without its env var.

## Environment variables

All optional. Create a `.env.local` in the project root for any you want live locally.

| Variable | Required for | Without it |
| --- | --- | --- |
| `GITHUB_TOKEN` | Live contribution heatmap + language breakdown on the GitHub Activity section | Falls back to the public REST API — profile/repo stats still show, but the heatmap and language chart show an empty state (GitHub's GraphQL API has no anonymous tier) |
| `ANTHROPIC_API_KEY` | The "Ask my AI avatar" chat actually calling Claude | Chat still works, using canned offline responses instead |
| `ANTHROPIC_MODEL` | Overriding the Claude model used by the chat | Defaults to `claude-sonnet-4-20250514` |
| `GITHUB_WEBHOOK_SECRET` | `/api/github/webhook` revalidating cached GitHub stats on push | Webhook route returns `501`; stats still revalidate on their normal TTL |
| `NEXT_PUBLIC_SCHEDULE_URL` | "Schedule a call" linking to a real booking page (e.g. Cal.com) | Falls back to a prefilled `mailto:` link |

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run mobile:sync` | Sync web build into the Capacitor iOS/Android shells |
| `npm run mobile:ios` / `mobile:android` | Open the native project in Xcode / Android Studio |
| `npm run mobile:run:ios` / `mobile:run:android` | Build and run on a connected device or simulator |

## Project structure

```
src/
├── app/              # Routes (App Router) — home, about, resume, research, legal, API routes
├── components/       # UI, grouped by feature (recruiter/, avatar/, skills/, experience/, ...)
└── lib/              # Content + data: site config, projects, skills, certifications,
                       # experience, GitHub/DSA integrations, AI chat logic
public/                # Static assets — images, project preview screenshots, media
```

Nearly all copy and data lives in `src/lib/*.ts` as plain, typed objects — updating a project, cert, or bio line never requires touching a component.

## Mobile app

The iOS/Android shells (`@capacitor/*`) wrap the live web app in a native container — same codebase, no separate mobile build. After changing web code:

```bash
npm run build
npm run mobile:sync
npm run mobile:ios      # or mobile:android
```

## Deployment

Deployed on [Vercel](https://vercel.com) — pushes to `main` deploy automatically. To deploy your own copy, import the repo into Vercel and set whichever environment variables above you need.

## License

This is my personal portfolio. The code is public for anyone curious how it's built, but the content — copy, photos, resume, and project details — is mine. Feel free to reference the code; please don't republish the content as your own.

---

Built by [Srujan Chidarla](https://srujanchidarla.com) · [LinkedIn](https://www.linkedin.com/in/srujan-chidarla) · [GitHub](https://github.com/srujanchidarla)


by srujan chidarla
