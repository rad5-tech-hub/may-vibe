# Mayvibe — Music Distribution & Artist Management Platform

## Overview

Mayvibe is a full-featured web application that enables musicians to distribute their music across digital streaming platforms (DSPs), track earnings and royalties, manage releases, view analytics, and grow their audience. It is built as a **React 18 Single-Page Application** with a Node.js/Vite toolchain and a Tailwind CSS v4 design system.

> **Live API Base:** `https://mayvibe.bookbank.com.ng/` (configured via `.env`)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | ^18.3.1 |
| Build Tool | Vite | ^5.4.10 |
| Plugin | @vitejs/plugin-react | ^4.3.3 |
| CSS Framework | Tailwind CSS (via @tailwindcss/vite) | ^4.1.17 |
| Routing | React Router DOM | ^7.9.6 |
| HTTP Client | Axios | ^1.13.2 |
| Animation | Framer Motion | ^12.23.24 |
| Notifications | Sonner (Toast) | ^2.0.7 |
| Icons | Lucide React + React Icons | ^0.554.0 / ^5.5.0 |
| Date Picker | react-datepicker | ^8.10.0 |
| Linting | ESLint (with React + Hooks plugins) | ^9.13.0 |

---

## Project Structure

```
mayvibe/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/              # Static images (hero, profile, onboarding backgrounds)
│   ├── Components/
│   │   └── Pages/
│   │       ├── Dashboard/   # Main authenticated app (10 section folders)
│   │       ├── Homepage/    # Public landing page (9 sub-components)
│   │       └── Onboarding Pages/  # Auth flow (6 pages)
│   ├── utils/
│   │   └── errorHelper.js   # Axios error message extractor
│   ├── App.css              # Tailwind v4 import + @theme config
│   ├── App.jsx              # Root router + Toaster
│   ├── index.css            # Background images + react-datepicker theme
│   └── main.jsx             # ReactDOM entry point
├── .env                     # VITE_API_BASE_URL
├── eslint.config.js         # ESLint flat config
├── index.html               # HTML entry (Poppins font, Vite entry)
├── package.json
├── vite.config.js           # Vite + Tailwind + React plugins
└── README.md
```

---

## Routing Architecture

Routes are defined in `src/App.jsx` using React Router DOM v7 `<Routes>`:

### Public Routes (no auth wall)

| Path | Component | File |
|---|---|---|
| `/` | `<Homepage />` | `Homepage.jsx` |
| `/signup` | `<Signup />` | `signup.jsx` |
| `/login` | `<Login />` | `login.jsx` |
| `/welcome` | `<Welcome />` | `welcome.jsx` |
| `/forgotPassword` | `<ForgotPassword />` | `forgetPassword.jsx` |
| `/resetPassword` | `<ResetPassword />` | `resetPassword.jsx` |
| `/verifyOtp` | `<VerifyOTP />` | `verifyOTP.jsx` |

### Dashboard Routes (nested under `/dashboard/*`)

| Path | Component | File |
|---|---|---|
| `/dashboard/overview` | `<Overview />` | `Overview/overview.jsx` |
| `/dashboard/releases` | `<Releases />` | `Releases/releases.jsx` |
| `/dashboard/music-upload` | `<Music />` | `Music Upload/Music.jsx` |
| `/dashboard/royalties` | `<RoyaltiesPage />` | `Royalties/Royalties.jsx` |
| `/dashboard/support` | `<Support />` | `Support &Academy/support.jsx` |
| `/dashboard/notifications` | `<Notifications />` | `Notifications/notifications.jsx` |
| `/dashboard/profile` | `<Profile />` | `Profile/profile.jsx` |
| `/dashboard` | `<Dashboard />` | `dashboard.jsx` |

The `<Dashboard />` component (`dashboard.jsx`) uses a **client-side SPA pattern** with `useState` to toggle between sub-views via a `currentPage` state variable and a `switch` statement. This means navigation within the dashboard works without page reload. The `<Sidebar />` component is rendered alongside a shared `<header>` with search and notification icons.

### Fallback

Any unmatched route renders a `404 - Page Not Found` inline component with a link back to `/`.

---

## Homepage (Public Landing Page)

The homepage is a single-page marketing site composed of 9 sections rendered sequentially in `Homepage.jsx`:

| Section | Component | Highlights |
|---|---|---|
| **Navbar** | `Navbar.jsx` | Fixed sticky nav, "Business Solutions" + "Who We Are" dropdowns, Login/Get Started CTAs. Mobile accordion menu. |
| **Hero** | `Hero.jsx` | "Music is power — Amplify it" headline, CTA, social proof ("20K+ Active Subscribers"), artist image + music wave graphic. |
| **Distribute** | `DistributeSection.jsx` | Orange callout band — "Distribute Music" headline + Join Mayvibe button. |
| **Pricing** | `PricingSection.jsx` | 3-tier: Starter ($99), Standard ($150, "BEST VALUE"), Premium ($390). Hover scale, feature checklists. |
| **Quote** | `QuoteSection.jsx` | Full-bleed background image with "Music is your own experience..." — Charlie Parker quote + Join Now CTA. |
| **Publishing** | `PublisingSection.jsx` | Dark-overlay background image, "Publishing" headline, description, Join Now button. |
| **Floating Pills** | `FloatingPills.jsx` | Orange pill badges (Playlist Pitching, Academy, Blog, etc.) + Charlie Parker quote with Quote icons. |
| **Footer Links** | `FooterLinks.jsx` | 4-column grid: Top Features, Useful Links, Legal, Contact (address, email, phone). |
| **Footer** | `Footer.jsx` | Copyright notice — "Mayvibe Technologies Global Limited". |

---

## Authentication Flow (Onboarding Pages)

### Signup (`signup.jsx`)
- Collects: full name, email, password
- Password visibility toggle (`FaEye`/`FaEyeSlash`)
- Posts to `${BASE_URL}/auth/sign-up`
- Saves token to `localStorage`
- Redirects to `/verifyOtp` with email + userId + token in router state
- Social login buttons (Facebook, Apple, Google) — UI only, no logic wired

### Login (`login.jsx`)
- Collects: email, password
- Client-side JWT decoder to extract `userId` + `onBoarded` fields
- Posts to `${BASE_URL}/auth/login`
- Routes onboarded users to `/dashboard`, others to `/welcome`
- "Forgot password" link to `/forgotPassword`

### Email Verification (`verifyOTP.jsx`)
- 6-digit OTP input (individual boxes with auto-focus/focus-trap)
- Posts to `${BASE_URL}/auth/verify`
- Resend OTP via `${BASE_URL}auth/resend-otp` (note: missing `/` after `BASE_URL`)
- On success, redirects to `/login`

### Forgot Password (`forgetPassword.jsx`)
- Email input → posts to `${BASE_URL}/auth/forgot-url`
- OTP sent notification (navigation to reset page is commented out)

### Reset Password (`resetPassword.jsx`)
- Reads `token` and `email` from URL search params
- Shows error state if token is missing (Request New Reset Link)
- Posts to `${BASE_URL}/auth/reset-password` with email + token + password + confirmPassword
- Password visibility toggles for both fields
- Redirects to `/login` on success

### Welcome/Onboarding (`welcome.jsx`)
- 3-step wizard:
  1. "Welcome to Mayvibe" splash with Get Started CTA
  2. Quick tutorial video placeholders + 3-step guide (Upload → Distribute → Earn)
  3. Profile setup form: username, bio, genre (searchable dropdown from 21 genres), gender, profile photo (upload to `${BASE_URL}/images/upload`), optional payment method
- Submits via `${BASE_URL}/auth/register/onboarding/${userId}`
- Requires `userId` from location state; redirects to `/login` if missing

### Error Handling Utility (`utils/errorHelper.js`)
- `getErrorMessage(err, defaultMessage)` — extracts `response.data.message` → `response.data.error` → `err.message` → default

---

## Dashboard

### Layout (`dashboard.jsx` + `sidebar.jsx`)

The dashboard uses a fixed sidebar + top header layout:
- **Sidebar**: 8 nav items (Overview, Upload Music, My Releases, Royalties, Payouts, Profile, Notifications, Support/Academy) with active orange highlight, mobile overlay, sign-out button
- **Header**: Hamburger menu (mobile), search icon, bell with notification dot, user avatar + name
- **Body**: Content area that renders the selected page component

### Overview (`overview.jsx`)

Central analytics hub composed of:

| Component | Description |
|---|---|
| `StatsCard` | Wrapper card with title, value, change indicator, optional badge and dropdown |
| `MonthlyListeners` | Dynamic bar chart (32 bars, auto-cycles through 5 growth patterns every 8s) |
| `TopSongChart` | SVG line chart for "God is good (ft. Donseih Beat)" — 123M+ plays |
| `TopAlbumChart` | SVG line chart for "5ive" — 54M+ plays |
| `CurrentPlayingBar` | Mini player card with play button, song/album info, duration |
| `UploadButton` | Orange gradient upload CTA with Upload/Cancel actions |
| `ProjectSection` | Circular album artwork grid (5 projects) |
| `MyReleases` | Track table: checkbox, cover, title, artist, date, duration, more menu |
| `Payouts` | Payout history list: ID, amount, date (desktop grid + mobile vertical layout) |
| `RoyaltiesSection` | Animated bar chart (12 months, auto-cycles 4 datasets every 8s), payment info, live indicator |
| `ReferralDashboard` | Referral wallet ($3,500), SVG line chart, invite by email, share link + social buttons |

### Music Upload (`Music.jsx`)

Multi-step upload flow:
1. **AudioUploadCard** — Drag/click to upload audio (Mp3, WAV, M4A, max 40MB)
2. **ArtworkUploadCard** — Image upload with preview (JPG, PNG, max 40MB)
3. **MetadataForm** — Song title, artist, contributors, language, genre + ISRC (auto/manual) + DSP multi-select (Apple Music, Spotify, Boomplay, Deezer, Audiomack)
4. **ReleaseDatePicker** — Calendar date picker (custom themed react-datepicker) + AM/PM time selector → Review & Publish modal

### Releases (`releases.jsx`)

Full release management with:
- **ReleaseStats** — Table with cover art, title, artist, status badges (draft/pending/rejected/live), streams, revenue, play button + action menu
- **AnalyticsDashboard** — Top song/album line charts, monthly listeners bar chart, countries donut chart (auto-rotating, 6 countries)
- **EditReleaseModal** — Inline editing for song title, artist, contributors, language, genre, release date
- **ViewReleaseModal** — Full release details view
- **DeleteReleaseModal** — Confirmation dialog for removal

### Royalties (`Royalties.jsx`)

Dedicated royalties page with:
- Shared `RoyaltiesSection` (animated chart + payment info)
- `Payouts` component (history table)
- `TrackEarnings` — Table: album title, total earnings, this month, ROC (rate of change with trend arrows), DSP earnings
- `DSPEarningsTable` — Per-DSP breakdown (Spotify, Apple Music, etc.) with plays, revenue, share
- `EarningsByCountry` — Country-based earnings breakdown

### Payouts (`payouts.jsx`)
- **BalanceCards** — Total balance ($24,092.75), income ($4,500), payment method (Flutterwave) + Withdraw button
- **PayoutHistory** — Transaction list (ID, amount, date)
- **RoyaltiesSection** — Chart with most recent/next payment info

### Profile (`profile.jsx`)
- Avatar upload (800x800px recommended, JPG/PNG)
- Personal info (name, stage name, email) with edit toggle
- Country & region input
- Bio text area
- Profile completion progress card (40%, 7-step checklist with check/cross icons, SVG donut chart)

### Notifications (`notifications.jsx`)
> No file read available — see directory listing only.

### Support & Academy (`support.jsx`)
- **ContactForm** — Textarea + Send Message button
- **FAQSection** — Accordion FAQ (7 items, all the same question with toggle answers)
- **AcademyVideo** — Gradient video placeholder with play button
- **FloatingChat** — Fixed bottom-right chat bubble button

---

## Styling Approach

### Tailwind CSS v4
- `@import "tailwindcss"` in `App.css` with `@theme` defining `--font-display: "Poppins", sans-serif`
- The `font-display` class is used across virtually all components

### Background Images
- `index.css` defines `.signup`, `.login`, `.welcome` classes with background-image + overlay blend modes
- Onboarding pages import `index.css` to use these background classes

### Custom Calendar Theme
- `index.css` contains extensive react-datepicker overrides under `.custom-calendar`:
  - Transparent background, no borders
  - Grid layout for day names and weeks
  - Orange selected-day ring effect
  - Responsive font sizing with `clamp()`
  - Hover/grid line styles

### Color Palette
- **Primary:** Orange-500/600 (`#f97316` / `#ea580c`)
- **Neutral:** Gray-50 through Gray-900 for backgrounds, text, borders
- **Success:** Green-600 (`#16a34a`)
- **Error:** Red-600 (`#dc2626`)

---

## API Integration

All API calls point to `VITE_API_BASE_URL` from `.env`:

| Endpoint | Method | Used In |
|---|---|---|
| `/auth/sign-up` | POST | signup.jsx |
| `/auth/login` | POST | login.jsx |
| `/auth/verify` | POST | verifyOTP.jsx |
| `/auth/resend-otp` | POST | verifyOTP.jsx |
| `/auth/forgot-url` | POST | forgetPassword.jsx |
| `/auth/reset-password` | PATCH | resetPassword.jsx |
| `/auth/register/onboarding/:userId` | POST | welcome.jsx |
| `/images/upload` | POST | welcome.jsx |

**Bug note:** `verifyOTP.jsx` calls `${BASE_URL}auth/resend-otp` — missing `/` between the base URL and path.

---

## Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint across the project |

---

## Noteworthy Implementation Details

1. **SPA Dashboard Navigation** — Uses `useState` + conditional rendering instead of nested router routes. This avoids full page reloads but means browser URL doesn't change for sub-views.
2. **Animated Charts** — `MonthlyListeners` and `RoyaltiesSection` use `useEffect` intervals to cycle through hardcoded datasets every 8 seconds, simulating real-time data.
3. **JWT Decoding** — `login.jsx` includes an inline Base64 JWT decoder to extract `userId` and `onBoarded` fields without any external library.
4. **Modal Architecture** — Three release modals (Edit, View, Delete) with backdrop click-to-close and event propagation stopping.
5. **Responsive Patterns** — Components use `grid-cols-*` and `hidden/sm:block/lg:grid` patterns extensively. Mobile-first with `-translate-x-full` sidebar overlay approach.
6. **Sonner Toaster** — Configured at the app root (`App.jsx`) with rich colors, close button, expand mode, and 4-second duration.
