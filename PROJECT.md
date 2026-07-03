# Mayvibe — Music Distribution Platform

> A modern, full-featured music distribution platform for independent artists, with a focus on African and global talent. Artists can sign up, verify their identity, complete onboarding, upload music, distribute to digital stores, and track earnings — all from a single dashboard.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Key Features](#key-features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)
- [Pages & Routes](#pages--routes)
- [API Integration](#api-integration)
- [Design System](#design-system)
- [Known Issues](#known-issues)
- [Roadmap Ideas](#roadmap-ideas)

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^18.3.1 | UI framework |
| Vite | ^5.4.10 | Build tool & dev server |
| React Router DOM | ^7.9.6 | Client-side routing |
| Tailwind CSS | ^4.1.17 | Utility-first styling |
| Axios | ^1.13.2 | HTTP client |
| Sonner | ^2.0.7 | Toast notifications |
| react-icons (Fa) | ^5.5.0 | Font Awesome icons (social, form toggles) |
| lucide-react | ^0.554.0 | Modern icon set (dashboard, actions) |
| react-datepicker | ^8.10.0 | Calendar date picker |
| Google Fonts (Poppins) | — | Primary typeface |

### Dev Tools

| Tool | Purpose |
|------|---------|
| ESLint 9 | Linting |
| `@tailwindcss/vite` | Tailwind CSS v4 Vite plugin (no PostCSS needed) |

---

## Architecture Overview

```
index.html
└── src/main.jsx
    └── src/App.jsx
        ├── <Toaster /> (Sonner — global notifications)
        └── <Routes>
            ├── Public Routes (Homepage, Signup, Login, etc.)
            │   └── Direct React Router v7 routes
            └── Dashboard Routes
                ├── /dashboard → dashboard.jsx (Shell)
                │   ├── Sidebar (lucide-react navigation)
                │   ├── Header (search, bell, avatar)
                │   └── Main content area
                │       └── Switch(useState) → sub-page
                └── Individual route per sub-page
```

### Key Architectural Decisions

1. **Dashboard uses SPA-style navigation** — `useState('currentPage')` + `switch()` in `dashboard.jsx`. The browser URL does not change when navigating between Overview, Releases, Royalties, etc. Each sub-page also has its own direct route in `App.jsx` (e.g., `/dashboard/overview`), but the primary entry is through the sidebar shell.

2. **No centralized API layer** — All Axios calls are made inline within components. There is no Axios instance, no interceptors, and no API service directory. Future refactoring should extract these into a `/src/services/` layer.

3. **No auth context or route guards** — Authentication is handled entirely through `localStorage.getItem("token")` and an inline JWT decoder in `login.jsx`. There is no `<ProtectedRoute>` wrapper. Dashboard pages do not verify the user is authenticated.

4. **Mock data dominance** — All charts, tables, lists, and stats in the dashboard currently use hardcoded data. No real API integrations exist for streaming numbers, earnings, or user content.

5. **Two visual themes** — Public/auth pages use a **dark cinematic theme** with full-bleed background images, glassmorphism, and orange accents. Dashboard pages use a **light theme** with white background, gray cards, and orange accent highlights.

---

## Key Features

### Implemented

- **Artist Signup** — Full name, email, password with social login UI (Facebook, Apple, Google — frontend only)
- **Email Verification** — 6-digit OTP input with auto-focus, resend capability
- **Login** — JWT-based authentication with token decode, onboarding-aware redirect
- **Password Reset** — Email-based OTP via `forgot-url` endpoint, token-based reset via `?token=...&email=...` URL params
- **Artist Onboarding** — 3-step wizard: welcome screen → 3-step guide → profile setup (username, bio, genre with search, gender, profile photo upload, payment method)
- **Image Upload** — Profile photo with file type validation, preview, and cloud upload via API
- **Dashboard** — Sidebar navigation (8 sections), header with search/bell/avatar
- **Overview** — Monthly listeners, top song, top album, current playing bar, projects, releases, payouts, royalties, referrals (all mock data)
- **Music Upload** — Audio upload card, artwork upload card, metadata form (song title, artist, contributors, language, genre), ISRC auto/manual toggle, DSP multi-select, release date picker with review/publish modal
- **Releases** — Release stats, analytics dashboard (monthly listeners, line chart, country chart), edit/view/delete modals
- **Royalties** — Royalties overview, track earnings, DSP-level earnings table, earnings by country
- **Payouts** — Balance cards, payout history
- **Profile** — Edit profile with photo upload, personal info, country/region, bio, progress tracker
- **Notifications** — User notifications and system notifications with color-coded indicators
- **Support/Academy** — Contact form, FAQ, academy video, floating chat

### Not Yet Implemented

- Real payment/monetization integration
- Actual music file distribution to stores
- Storefront/artist public profile page
- Admin panel
- Real-time streaming data from DSPs

---

## Folder Structure

```
mayvibe/
├── .env                              # Environment variables
├── .gitignore
├── eslint.config.js                  # ESLint 9 flat config
├── index.html                        # HTML entry point (Poppins font CDN)
├── package.json
├── vite.config.js                    # Vite + React + Tailwind v4 plugin
├── README.md
├── SKILL.md                          # AI agent skill file
├── PROJECT.md                        # This file
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx                      # React entry point
    ├── App.jsx                       # Root: BrowserRouter + Toaster + Routes
    ├── App.css                       # Tailwind import + @theme (Poppins font)
    ├── index.css                     # Background image classes + calendar styles
    ├── assets/                       # Static images (backgrounds, icons, mock data)
    ├── utils/
    │   └── errorHelper.js            # getErrorMessage() utility
    └── Pages/
        ├── Homepage/                 # Public landing page
        │   ├── Homepage.jsx
        │   └── components/           # Navbar, Hero, PricingSection, Footer, etc.
        ├── NotFound/
        │   └── NotFound.jsx          # 404 page
        ├── Onboarding Pages/         # Auth & onboarding flow
        │   ├── signup.jsx
        │   ├── login.jsx
        │   ├── verifyOTP.jsx
        │   ├── welcome.jsx
        │   ├── forgetPassword.jsx
        │   └── resetPassword.jsx
        └── Dashboard/                # Artist dashboard
            ├── dashboard.jsx         # Shell (sidebar + header + content switch)
            ├── sidebar.jsx           # Navigation menu
            ├── PlaceholderPage.jsx
            ├── Overview/             # Main dashboard overview
            │   ├── overview.jsx
            │   └── components/
            ├── Music Upload/         # Upload flow
            │   ├── Music.jsx
            │   └── components/
            ├── Releases/             # Release management
            │   ├── releases.jsx
            │   └── components/
            ├── Royalties/            # Earnings tracking
            │   ├── Royalties.jsx
            │   └── components/
            ├── Payouts/              # Payout management
            │   ├── payouts.jsx
            │   └── components/
            ├── Profile/              # User profile
            │   └── profile.jsx
            ├── Notifications/        # Notification center
            │   └── notifications.jsx
            └── Support & Academy/    # Help center
                ├── support.jsx
                ├── ContactForm.jsx
                ├── FAQSection.jsx
                ├── AcademyVideo.jsx
                └── FloatingChat.jsx
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd mayvibe

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server starts at `http://localhost:5173` by default.

### Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start development server with HMR |
| `build` | `vite build` | Production build to `dist/` |
| `preview` | `vite preview` | Preview the production build locally |
| `lint` | `eslint .` | Run ESLint on all files |

---

## Environment Variables

Create a `.env` file in the project root with:

```env
VITE_API_BASE_URL=https://mayvibe.bookbank.com.ng/
```

All Vite environment variables must be prefixed with `VITE_`. They are accessed via `import.meta.env.VITE_*` in code.

---

## Authentication Flow

```
[Signup] ──POST /auth/sign-up──→ [Save token to localStorage]
    │                                   │
    │                                   ▼
    │                            [Verify OTP Page]
    │                              POST /auth/verify
    │                                   │
    │                                   ▼
    └─────────── [Login Page] ←─── "Email verified" toast
                      │
                      ▼
              POST /auth/login
                      │
                      ▼
              Decode JWT locally
                      │
                      ├── onBoarded=true  → /dashboard
                      └── onBoarded=false → /welcome (onboarding)
                                              │
                                              ├── Step 1: Welcome screen
                                              ├── Step 2: 3-step guide
                                              └── Step 3: Profile setup
                                                      │
                                              POST /auth/register/onboarding/{userId}
                                                      │
                                                      ▼
                                              /dashboard
```

### Password Reset Flow

```
[Forgot Password] ──POST /auth/forgot-url──→ Email with magic link
                                                   │
                                                   ▼
                                    /resetPassword?token=XXX&email=YYY
                                                   │
                                        PATCH /auth/reset-password
                                                   │
                                                   ▼
                                               /login
```

### Token Handling

- Token is saved to `localStorage` under the key `"token"`
- User info (decoded JWT) is saved under `"user"` as JSON
- No refresh token mechanism is currently implemented
- No auth interceptor — every API call that needs auth manually reads `localStorage.getItem("token")` and sets the `Authorization: Bearer {token}` header

---

## Pages & Routes

### Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Homepage | Landing page with hero, features, pricing, footer |
| `/signup` | Signup | Registration form (fullName, email, password) + social login UI |
| `/verifyOtp` | VerifyOTP | 6-digit OTP input, resend button, redirects to login on success |
| `/login` | Login | Email + password, JWT decode, onboarding-aware redirect |
| `/forgotPassword` | ForgotPassword | Email input → sends OTP via `/auth/forgot-url` |
| `/resetPassword` | ResetPassword | Reads `?token=` and `?email=` from URL, new password + confirm |
| `/welcome` | Welcome | 3-step onboarding wizard (guarded: requires userId in location.state) |
| `*` | NotFound | 404 fallback page |

### Dashboard Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/dashboard` | Dashboard | Shell with sidebar + header, defaults to Overview |
| `/dashboard/overview` | Overview | Full overview page (also rendered inside shell) |
| `/dashboard/music-upload` | Music | Upload audio + artwork + metadata + release date |
| `/dashboard/releases` | Releases | Release stats + analytics + modals |
| `/dashboard/royalties` | RoyaltiesPage | Earnings overview, track earnings, DSP table, country breakdown |
| `/dashboard/payouts` | Payouts | Balance cards + payout history |
| `/dashboard/profile` | Profile | Edit profile, personal info, bio, progress tracker |
| `/dashboard/notifications` | Notifications | User + system notifications, payout status list |
| `/dashboard/support` | Support | Contact form, FAQ, academy video, floating chat |

---

## API Integration

### Base URL

```
https://mayvibe.bookbank.com.ng/
```

Configured via `VITE_API_BASE_URL` in `.env`. Accessed in code as:

```js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

### Endpoints

| Method | Endpoint | Auth | Body / Params | Response |
|--------|----------|------|---------------|----------|
| POST | `/auth/sign-up` | No | `{ fullname, email, password }` | `{ token, userId }` |
| POST | `/auth/verify` | No | `{ email, otp }` | Success confirmation |
| POST | `/auth/resend-otp` | No | `{ email }` | Success confirmation |
| POST | `/auth/login` | No | `{ email, password }` | `{ token, accessToken }` |
| POST | `/auth/forgot-url` | No | `{ email }` | Sends reset email |
| PATCH | `/auth/reset-password` | No | `{ email, token, password, confirmPassword }` | Success confirmation |
| POST | `/images/upload` | Bearer | `multipart/form-data: { image }` | `{ url, imageUrl, data.url }` |
| POST | `/auth/register/onboarding/{userId}` | Bearer | `{ username, bio, genre, gender, profilePhoto, paymentMethod }` | Success confirmation |

### Error Handling

All API errors are processed through `getErrorMessage(err, fallbackMessage)` from `src/utils/errorHelper.js`. It checks the response in this order:

1. `err.response.data.message`
2. `err.response.data.error`
3. `err.message`
4. `fallbackMessage` parameter

### Image Upload

- Accepts: JPG, JPEG, PNG, WebP
- Sends: `multipart/form-data` with field name `"image"`
- Auth: Bearer token required
- Response URL extraction (in priority order): `res.data.url → res.data.imageUrl → res.data.data.url`

---

## Design System

### Colors

| Token | Usage |
|-------|-------|
| `#f97316` (orange-500) | Primary accent, active sidebar, links, badges, buttons |
| `#ea580c` (orange-600) | Button hover states, strong accents |
| `#fb923c` (orange-400) | Border accents, secondary highlights |
| `#fed7aa` (orange-200) | Chart bars, light backgrounds |
| `#ffffff` | Dashboard backgrounds, text |
| `#f9fafb` (gray-50) | Card backgrounds in dashboard |
| `#111827` (gray-900) | Dark backgrounds in auth pages |

### Typography

- **Font Family**: Poppins (Google Fonts, weights 100–900)
- **CSS Variable**: `--font-display` defined in `@theme` of `App.css`
- **Usage**: Apply `className="font-display"` to root element of every page
- **Headings**: Auth pages use `text-3xl lg:text-5xl font-bold`. Dashboard headings use `text-4xl font-bold text-gray-900`.

### Common Class Patterns

| Pattern | Where |
|---------|-------|
| `bg-white/5 backdrop-blur-xl` | Auth page left panel |
| `bg-black/40 backdrop-blur-xl` | Auth page right panel (form) |
| `bg-orange-600 hover:bg-orange-500` | Primary buttons |
| `w-full bg-transparent border-b border-white focus:border-orange-500 outline-none text-sm py-1` | Auth form inputs |
| `bg-gray-50 rounded-3xl shadow-sm border border-gray-200 p-6` | Dashboard cards |
| `fixed inset-0 z-50 bg-black/50 backdrop-blur-sm` | Modal overlays |
| `grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8` | Responsive grid layouts |
| `max-w-7xl mx-auto` | Content width constraint |

### Background Images (CSS Classes in `index.css`)

| Class | Image | Blend Mode |
|-------|-------|------------|
| `.signup` | `signup.png` | `overlay` with `rgb(56,56,56)` |
| `.login` | `login.png` | `overlay` with `rgb(56,56,56)` |
| `.welcome` | `welcome.png` | None (full image) |

### Responsive Breakpoints

- **Default**: Mobile-first
- **`sm:`** — 640px+
- **`md:`** — 768px+
- **`lg:`** — 1024px+
- **`xl:`** — 1280px+

---

## Known Issues

1. **Missing slash in verifyOTP.jsx** (line 87): `${BASE_URL}auth/resend-otp` should be `${BASE_URL}/auth/resend-otp`. This causes a malformed URL.
2. **SidebarItem.jsx is empty** — 0-byte file in `Dashboard/components/`. Not imported anywhere but should be removed or implemented.
3. **Framer Motion unused** — Package is in `package.json` but never imported. All animations use CSS transitions.
4. **Dashboard navigation doesn't update URL** — Using `useState` + `switch` means browser back/forward buttons don't navigate dashboard sub-pages.
5. **No protected routes** — Dashboard pages are directly accessible via URL without any auth check.
6. **Forgot password navigation**: `resetPassword.jsx` redirects to `/forgot-password` (hyphenated) on error, but the actual route is `/forgotPassword` (camelCase). This will show a 404 page.
7. **Commented-out navigation** in `forgetPassword.jsx`: After sending OTP, the redirect to `/resetpassword` is commented out. User has to manually navigate.
8. **All dashboard data is mock** — No real API integrations for streaming numbers, earnings, releases, etc.
9. **Social login buttons are UI only** — Facebook, Apple, Google buttons have no backend wiring.
10. **No TypeScript** — The project uses plain JavaScript with basic PropTypes.

---

## Roadmap Ideas

### Near-Term

- [ ] Extract API calls into a centralized service layer (`src/services/`)
- [ ] Add Axios interceptor for automatic Bearer token injection
- [ ] Implement `<ProtectedRoute>` wrapper for dashboard routes
- [ ] Replace mock dashboard data with real API responses
- [ ] Fix missing `/` in verifyOTP.jsx resend endpoint
- [ ] Remove empty `SidebarItem.jsx` file

### Medium-Term

- [ ] Real music file upload & distribution pipeline to DSPs (Spotify, Apple Music, Boomplay, etc.)
- [ ] Payment/payout integration (PayPal, bank transfer, mobile money)
- [ ] Real-time streaming analytics from DSP APIs
- [ ] Artist public profile/storefront page
- [ ] Admin dashboard for platform management
- [ ] Add react-helmet-async for per-page SEO metadata
- [ ] Internationalization (i18n) support

### Long-Term

- [ ] Mobile app (React Native)
- [ ] Collaborative features (collaborators, splits)
- [ ] AI-powered music promotion tools
- [ ] Direct fan subscriptions / tipping
- [ ] Publishing administration & royalties collection
- [ ] Integration with African mobile money services (M-Pesa, Airtel Money, etc.)
