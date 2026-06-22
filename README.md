# Mayvibe

**Africa's music distribution, promotion, and artist management platform.**  
Artists upload their music, distribute to 150+ stores, track earnings, and grow their career — all from one dashboard.

---

## Tech Stack

**React 18** · **Vite 5** · **Tailwind CSS v4** · **React Router DOM v7** · **Axios** · **Framer Motion** · **Sonner** · **Lucide React**

---

## Quick Start

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Environment

Copy `.env` (already present) — configure `VITE_API_BASE_URL` to point to the backend.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint across the project |

---

## Project Map

```
src/
├── main.jsx                        React entry point
├── App.jsx                         Router + Toaster
├── App.css                         Tailwind v4 + theme
├── index.css                       Background images + calendar theme
├── utils/
│   └── errorHelper.js              Axios error extractor
├── assets/                         Static images (hero, avatars, backgrounds)
└── Components/Pages/
    ├── Homepage/                   9 components — landing page
    ├── Onboarding Pages/           6 pages — auth flow
    └── Dashboard/                  10 section folders — main app
```

See **[PROJECT.md](./PROJECT.md)** for the full architecture, component catalogue, route table, API endpoints, and implementation details.

---

## Features

- **Public homepage** — Navbar, hero, pricing, publishing, quotes, footer
- **Authentication** — Signup, login, email verification (OTP), password reset, onboarding wizard
- **Dashboard** — Overview analytics, music upload, release management, royalties, payouts, profile, support
- **Animated charts** — SVG line/bar/donut charts with simulated real-time rotation
- **Fully responsive** — Mobile-first with sidebar overlay, accordion menus, adaptive tables

---

## API

Base URL configured via `VITE_API_BASE_URL`. Endpoints include authentication (`/auth/*`), file upload (`/images/upload`), and onboarding registration.

---

## License

Private — Mayvibe Technologies Global Limited
