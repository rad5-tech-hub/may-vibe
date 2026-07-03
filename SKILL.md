# Mayvibe AI Agent Skill File

## Project Identity

- **Name**: Mayvibe
- **Type**: Music distribution platform (single-artist dashboard with public homepage)
- **Audience**: African and global independent artists
- **Competitors**: DistroKid, UnitedMasters, TuneCore
- **Brand pillars**: Fast distribution, real earnings, full artist control

## Stack Summary

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | React 18.3 + Vite 5.4 | `createRoot` in `main.jsx` |
| Routing | React Router DOM v7 | `BrowserRouter` in `App.jsx` |
| Styling | Tailwind CSS v4 | `@import "tailwindcss"` in `App.css` |
| HTTP | Axios v1.13 | Inline in components |
| Toasts | Sonner v2 | `<Toaster>` in `App.jsx` |
| Icons | `react-icons/fa` + `lucide-react` | Both used interchangeably |
| Calendar | `react-datepicker` v8 | Wrapped in `.custom-calendar` class |
| Font | Google Poppins | Via `font-display` CSS variable |
| Animation | CSS transitions only | `framer-motion` is installed but **zero usage** |

## Folder Structure Convention

```
src/
├── App.jsx                          # Root router + Toaster
├── App.css                          # Tailwind import + @theme
├── index.css                        # Background images + calendar overrides
├── main.jsx                         # Entry point
├── assets/                          # Static images
├── utils/
│   └── errorHelper.js               # getErrorMessage() utility
└── Pages/
    ├── Homepage/
    │   ├── Homepage.jsx
    │   └── components/
    │       ├── Navbar.jsx
    │       ├── Hero.jsx
    │       ├── DistributeSection.jsx
    │       ├── PricingSection.jsx
    │       ├── QuoteSection.jsx
    │       ├── PublisingSection.jsx
    │       ├── FloatingPills.jsx
    │       ├── FooterLinks.jsx
    │       └── Footer.jsx
    ├── NotFound/
    │   └── NotFound.jsx
    ├── Onboarding Pages/         # Auth pages (note: space in dir name)
    │   ├── signup.jsx
    │   ├── login.jsx
    │   ├── welcome.jsx
    │   ├── verifyOTP.jsx
    │   ├── forgetPassword.jsx
    │   └── resetPassword.jsx
    └── Dashboard/
        ├── dashboard.jsx            # Shell: sidebar + header + switch
        ├── sidebar.jsx              # Navigation with Lucide icons
        ├── PlaceholderPage.jsx
        ├── Overview/
        │   ├── overview.jsx
        │   └── components/
        │       ├── StatsCard.jsx
        │       ├── MonthlyListeners.jsx
        │       ├── TopsongChart.jsx
        │       ├── TopAlbum.jsx
        │       ├── CurrentPlayingBar.jsx
        │       ├── UploadButton.jsx
        │       ├── ProjectSection.jsx
        │       ├── Releases.jsx
        │       ├── Payouts.jsx
        │       ├── RoyaltiesSection.jsx
        │       ├── Referrals.jsx
        │       ├── SectionHeader.jsx
        │       └── OverviewHeader.jsx
        ├── Music Upload/
        │   ├── Music.jsx
        │   └── components/
        │       ├── AudioUploadCard.jsx
        │       ├── ArtworkUploadCard.jsx
        │       ├── MetadataForm.jsx
        │       └── ReleaseDatePicker.jsx
        ├── Releases/
        │   ├── releases.jsx
        │   └── components/
        │       ├── ReleaseStats.jsx
        │       ├── Analytics.jsx
        │       ├── MonthlyListeners.jsx
        │       ├── LineChart.jsx
        │       ├── CountriesChart.jsx
        │       ├── editRelease.jsx
        │       ├── ViewReleaseModal.jsx
        │       └── viewDeleteModal.jsx
        ├── Royalties/
        │   ├── Royalties.jsx
        │   └── components/
        │       ├── TrackEarnings.jsx
        │       ├── TrackDspEarning.jsx
        │       └── EarningsByCountry.jsx
        ├── Payouts/
        │   ├── payouts.jsx
        │   └── components/
        │       ├── BalanceCards.jsx
        │       ├── PayoutHistory.jsx
        │       └── RoyaltiesSection.jsx
        ├── Profile/
        │   └── profile.jsx
        ├── Notifications/
        │   └── notifications.jsx
        └── Support & Academy/       # Note: space in dir name
            ├── support.jsx
            ├── ContactForm.jsx
            ├── FAQSection.jsx
            ├── AcademyVideo.jsx
            └── FloatingChat.jsx
```

## Coding Conventions

### Naming

| Item | Convention | Example |
|------|-----------|---------|
| Files (components) | PascalCase `.jsx` | `StatsCard.jsx`, `ReleaseDatePicker.jsx` |
| Files (pages) | lowercase `kebab-case` or camelCase | `signup.jsx`, `forgetPassword.jsx` |
| Directory names | Title Case with spaces | `Onboarding Pages/`, `Music Upload/`, `Support & Academy/` |
| Exported components | PascalCase default export | `export default function StatCard(...)` |
| Variables/functions | camelCase | `handleSubmit`, `formData`, `isEmailEditable` |
| Constants | UPPER_SNAKE_CASE | `BASE_URL`, `GENRES` |
| PropTypes | `ComponentName.propTypes` after export | `Sidebar.propTypes = { ... }` |

### File Structure per Component

```jsx
// 1. Imports (React, Router, Axios, Icons, CSS)
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { FaIcon } from "react-icons/fa";
import { LucideIcon } from "lucide-react";
import "../../index.css";
import { getErrorMessage } from "../../utils/errorHelper";

// 2. Constants outside component
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 3. Component function with default export
const ComponentName = () => {
  // 4. Hooks at top
  const navigate = useNavigate();

  // 5. State declarations
  const [formData, setFormData] = useState({ ... });

  // 6. Handlers
  const handleSubmit = async (e) => { ... };

  // 7. Return JSX
  return ( ... );
};

export default ComponentName;

// 8. PropTypes at bottom
ComponentName.propTypes = { ... };
```

### Import Order

1. React / React Router
2. Third-party libraries (axios, sonner, react-icons, lucide-react, react-datepicker)
3. Local components (`./ComponentName`)
4. Utilities (`../../utils/errorHelper`)
5. Assets (`../../assets/image.png`)
6. Stylesheets (`../../index.css`)

### What to Import from Where

- **Icons**: Use `lucide-react` for modern UI icons (dashboard sidebar, actions). Use `react-icons/fa` for social media and form visibility toggles (`FaEye`, `FaEyeSlash`, `FaFacebookF`, `FaApple`, `FaGoogle`).
- **CSS**: Only `src/index.css` is imported into page components (for background classes). `App.css` is imported only in `App.jsx`.
- **Images**: Import with `import name from '../../assets/name.png'` and use `src={name}`.

## Authentication Architecture

### Flow

```
Signup → /verifyOtp → Login → 
  ├── onBoarded=false → /welcome (3-step wizard) → POST onboarding → /dashboard
  └── onBoarded=true  → /dashboard
```

### Token Storage

```js
// Save on login
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(decoded));

// Read for API calls
const token = localStorage.getItem("token");
// Used in Authorization header:
Authorization: `Bearer ${token}`
```

### JWT Decode (No Library)

```js
const decodeJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
};
```

### JWT Payload Fields (Expected)

| Field | Type | Purpose |
|-------|------|---------|
| `userId` | string | User identifier |
| `onBoarded` | boolean | Onboarding completion flag **note the capital B** |
| `email` | string | User email |
| `fullName` | string | User full name |

### Onboarding Guard

The welcome page checks if `userId` was passed via `location.state`:
```js
useEffect(() => {
  if (!userId) {
    toast.error("Session expired. Please log in again.");
    navigate("/login", { replace: true });
  }
}, [userId, navigate]);
```

## API Integration Patterns

### Base URL

```js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Current: https://mayvibe.bookbank.com.ng/
```

**CRITICAL**: Always ensure there's exactly one `/` between base URL and endpoint.
```js
// CORRECT
`${BASE_URL}/auth/login`
`${BASE_URL}/images/upload`

// WRONG (missing /) — BUG exists in verifyOTP.jsx line 87:
`${BASE_URL}auth/resend-otp`  // ← results in mayvibe.bookbank.com.ngauth/resend-otp
```

### Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `${BASE_URL}/auth/sign-up` | Register (body: `{fullname, email, password}`) |
| POST | `${BASE_URL}/auth/verify` | Verify OTP (body: `{email, otp}`) |
| POST | `${BASE_URL}/auth/resend-otp` | Resend OTP (body: `{email}`) — **note: missing `/` in code** |
| POST | `${BASE_URL}/auth/login` | Login (body: `{email, password}`) |
| POST | `${BASE_URL}/auth/forgot-url` | Send password reset email (body: `{email}`) |
| PATCH | `${BASE_URL}/auth/reset-password` | Reset password (body: `{email, token, password, confirmPassword}`) |
| POST | `${BASE_URL}/images/upload` | Upload image (multipart/form-data + Bearer token) |
| POST | `${BASE_URL}/auth/register/onboarding/{userId}` | Complete onboarding (body: `{username, bio, genre, gender, profilePhoto, paymentMethod}`) |

### Standard API Call Pattern

```js
const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (!field) return toast.error("Message");

  setLoading(true);
  try {
    const response = await axios.post(`${BASE_URL}/endpoint`, payload);
    toast.success("Success message");
    // Navigate after delay
    setTimeout(() => navigate("/path", { replace: true }), 1500);
  } catch (err) {
    const msg = getErrorMessage(err, "Default error message");
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};
```

### Image Upload Pattern

```js
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    toast.error("Only JPG, PNG, or WebP images allowed");
    return;
  }

  // Preview
  const reader = new FileReader();
  reader.onloadend = () => setImagePreview(reader.result);
  reader.readAsDataURL(file);

  // Upload
  const data = new FormData();
  data.append("image", file);

  setUploadingImage(true);
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${BASE_URL}/images/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const imageUrl = res.data.url || res.data.imageUrl || res.data.data?.url;
    setFormData((prev) => ({ ...prev, profilePhoto: imageUrl }));
    toast.success("Uploaded!");
  } catch (err) {
    toast.error("Upload failed");
    setImagePreview(null);
  } finally {
    setUploadingImage(false);
  }
};
```

## UI / Design System

### Dark Theme Auth Pages

Each auth page uses a CSS background class with an overlay container:

```jsx
<div className="signup font-display">           <!-- or .login, .welcome -->
  <div className="min-h-screen relative flex flex-col lg:flex-row items-center justify-center py-10">
    <div className="relative z-10 w-[90%] max-w-7xl h-[90%] lg:h-[85vh] flex flex-col lg:flex-row rounded-xl overflow-hidden backdrop-blur-xl border border-white/10">

      <!-- LEFT: Description -->
      <div className="w-full lg:w-1/2 px-16 py-16 lg:py-0 flex flex-col justify-center text-white bg-white/5 backdrop-blur-xl">

      <!-- RIGHT: Form -->
      <div className="w-full lg:w-1/2 relative flex flex-col lg:flex-row px-16 text-white bg-black/40 backdrop-blur-xl">
```

### Auth Form Element Patterns

**Inputs** (bottom-border style):
```jsx
<input
  type="text"
  value={formData.field}
  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
  className="w-full bg-transparent px-2 border-b border-white focus:border-orange-500 outline-none text-sm py-1"
  required
/>
```

**Password with visibility toggle**:
```jsx
<div className="relative">
  <input type={showPassword ? "text" : "password"} ... />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-2 top-7 text-gray-400 hover:text-white transition cursor-pointer"
  >
    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
  </button>
</div>
```

**Primary button**:
```jsx
<button
  type="submit"
  disabled={loading}
  className="w-full bg-orange-600 hover:bg-orange-500 cursor-pointer text-white font-semibold py-3 text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-full"
>
  {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
  Button Text
</button>
```

**Social login buttons**:
```jsx
<button className="w-10 h-10 bg-white hover:bg-orange-500 cursor-pointer rounded-full flex items-center justify-center transition">
  <FaFacebookF className="text-black text-lg" />
</button>
```

**"OR" divider**:
```jsx
<div className="hidden absolute right-30 top-1/2 -translate-y-1/2 lg:flex flex-col items-center gap-6">
  <div className="h-40 w-px bg-white/20" />
  <span className="text-gray-400 text-xs tracking-widest">OR</span>
  <div className="h-40 w-px bg-white/20" />
</div>
```

**Links**:
```jsx
<Link to="/login" className="text-orange-500 hover:text-orange-400">
  Login here
</Link>
```

### Dashboard Theme (White/Gray)

Dashboard uses a completely different color scheme — **white background with gray cards**, not dark mode:

```jsx
<div className="min-h-screen bg-white px-6 py-4">
  <div className="max-w-7xl mx-auto">
```

**Cards**:
```jsx
<div className="bg-gray-50 rounded-3xl shadow-sm border border-gray-200 p-6">
```

**Section headers**:
```jsx
<div className="flex items-center justify-between mb-6">
  <h3 className="text-sm font-medium text-gray-500">{title}</h3>
</div>
```

**Orange badge/pill**:
```jsx
<div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
  {badge}
</div>
```

### Dashboard Navigation (Sidebar)

Sidebar uses `lucide-react` icons, not `react-icons/fa`. Active state is `bg-orange-500 text-white` with a shadow:

```jsx
<button
  onClick={() => { setCurrentPage(item.id); setIsOpen(false); }}
  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all cursor-pointer duration-200 group ${
    isActive
      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  }`}
>
  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
  <span className="font-medium text-sm">{item.label}</span>
</button>
```

### Dashboard Header

```jsx
<header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
  <div className="flex items-center justify-between">
    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
      <Menu size={24} />
    </button>
    <div className="flex items-center gap-2 sm:gap-4">
      <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
        <Search size={20} className="text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg relative">
        <Bell size={20} className="text-gray-600" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
      </button>
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-sm font-medium text-gray-900 hidden sm:block">Junior Achebe</span>
        <img src="..." alt="Profile" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-gray-100" />
      </div>
    </div>
  </div>
</header>
```

### Modal Pattern

```jsx
export default function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}  // optional: e.target === e.currentTarget
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}>
        {/* Modal content */}
      </div>
    </div>
  );
}
```

### Chart Pattern (Animated SVG)

Charts in this project use custom SVG/div-based rendering, NOT chart libraries. Pattern:

```jsx
<div className="flex items-end gap-1 h-32">
  {data.map((value, i) => (
    <div
      key={i}
      className="flex-1 bg-orange-200 rounded-t transition-all"
      style={{ height: `${value}%` }}
    />
  ))}
</div>
```

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Orange-500 | `#f97316` | Primary accent (buttons, active states, links, badges) |
| Orange-600 | `#ea580c` | Button hover, strong accents |
| Orange-400 | `#fb923c` | Border accents, lighter highlights |
| bg-white | `#ffffff` | Dashboard background |
| bg-gray-50 | `#f9fafb` | Card backgrounds (dashboard) |
| bg-gray-900 | `#111827` | Dark backgrounds (auth overlay text) |
| black/40 | Overlay | Auth form glass backdrop |
| black/70 | Overlay | Modals, forget-password backdrop |
| white/10 | Border | Glassmorphism borders |

## Dashboard Routing Architecture

**IMPORTANT**: Dashboard uses **client-side SPA navigation** via `useState` + `switch`, NOT React Router. The URL does NOT change when navigating between dashboard sub-pages.

```jsx
// dashboard.jsx
const [currentPage, setCurrentPage] = useState('overview');

const renderPage = () => {
  switch (currentPage) {
    case 'overview': return <OverviewPage setCurrentPage={setCurrentPage} />;
    case 'upload':   return <Music title="Upload Music" />;
    case 'releases': return <Releases title="My Releases" />;
    // ... etc
  }
};
```

This means:
- Dashboard sub-pages receive `title` and optionally `setCurrentPage` as props
- There is NO `<ProtectedRoute>` wrapper — auth is not checked at the route level
- To add a new dashboard page, add a case to the switch and a sidebar item in `sidebar.jsx`

## Error Handling

Always use the `getErrorMessage` utility:

```js
import { getErrorMessage } from "../../utils/errorHelper";

try {
  // API call
} catch (err) {
  const msg = getErrorMessage(err, "Fallback message");
  toast.error(msg);
}
```

The utility checks `err.response?.data?.message → err.response?.data?.error → err.message → defaultMessage`.

## Loading States

All async operations use a `loading` state variable. The pattern:

```jsx
const [loading, setLoading] = useState(false);

// In button
<button disabled={loading} className="disabled:opacity-70 disabled:cursor-not-allowed">
  {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
  Button Text
</button>
```

For image uploads, use a separate `uploadingImage` state.

## OTP Input Pattern

6-digit individual inputs with auto-focus:

```jsx
const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const inputRefs = useRef([]);

const handleOtpChange = (index, value) => {
  if (!/^\d*$/.test(value)) return;
  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);
  if (value && index < 5) inputRefs.current[index + 1]?.focus();
};

const handleKeyDown = (index, e) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};
```

## SEO / Head

No `react-helmet` or head management. Page titles are hardcoded in component JSX (`<h1>` tags). The only meta is in `index.html`.

## Common Tasks

### Adding a New Auth Page

1. Create file in `src/Pages/Onboarding Pages/`
2. Use `{ background }` CSS class (`.signup`, `.login`, or `.welcome`)
3. Apply `.font-display` to root div
4. Use bottom-border input pattern
5. Import and use `getErrorMessage`
6. Add route in `App.jsx` `<Routes>`
7. Use `toast.success/error` for user feedback

### Adding a New Dashboard Page

1. Create file in `src/Pages/Dashboard/{SectionName}/`
2. Wrap in a container with `min-h-screen bg-white`
3. Use `max-w-7xl mx-auto` for content width
4. Use `bg-gray-50 rounded-3xl shadow-sm border border-gray-200 p-6` for cards
5. Accept optional `title` prop from parent
6. Add `case` in `dashboard.jsx` switch
7. Add item to `sidebar.jsx` menuItems array (with `lucide-react` icon)

### Making an API Call

Always follow the standard pattern: validate → setLoading → try/catch/finally → toast feedback → optional navigation delay.

## Known Issues & Gotchas

1. **verifyOTP.jsx line 87**: `${BASE_URL}auth/resend-otp` is missing `/` after base URL. Should be `${BASE_URL}/auth/resend-otp`.
2. **SidebarItem.jsx**: Empty file (0 bytes) — do not import or reference it.
3. **Framer motion**: Listed in `package.json` but never used. Do not add new framer-motion code unless specifically requested.
4. **Space in directory names**: `Onboarding Pages/`, `Support & Academy/` have spaces. Use quotes or escaped paths in imports.
5. **No API interceptor**: Axios is called inline with no base URL or auth interceptor configured. Every call manually prepends `BASE_URL` and manually reads `localStorage.getItem("token")`.
6. **No route guards**: There is no `<ProtectedRoute>` component. Auth is only checked in `login.jsx` (which redirects based on `onBoarded`). The dashboard pages do not verify auth.
7. **ForgotPassword.jsx**: The `navigate` call to `/resetpassword` is commented out. The flow currently stops at "OTP sent" toast.
8. **ForgotPassword navigation bug**: On error, `resetPassword.jsx` navigates to `/forgot-password` (with hyphen) but the route is `/forgotPassword` (camelCase) — will cause a 404.
9. **Dashboard URL**: `/dashboard` route is the shell. Each sub-page is also registered as its own route in `App.jsx` (e.g., `/dashboard/overview`), but these are interchangeable since the sub-pages are rendered standalone too.

## Best Practices

1. **Always use `getErrorMessage`** for API error handling — never inline `err.response?.data?.message`.
2. **Always use `setTimeout` with `navigate`** after success toasts (1200–1800ms) so users can read the message.
3. **Use `replace: true`** with `navigate` for auth flow redirects to prevent back-button issues.
4. **Import images** rather than using string paths — Vite handles asset hashing this way.
5. **Keep PropTypes** on reusable components for documentation.
6. **Do NOT add new npm packages** unless explicitly necessary. The project already has everything needed.
7. **Use Tailwind classes directly** in JSX — do not create custom CSS class names unless absolutely necessary. Background images in `index.css` are the exception.
8. **Avoid inline styles** — prefer Tailwind utility classes.
9. **Use `cursor-pointer`** on all interactive elements (buttons, clickable divs).
10. **Mobile-first responsive design** — use `lg:`, `sm:`, `md:` prefixes for breakpoints.
11. **Never use `grep` for `find`** — Stick to dedicated tools.
12. **Toast durations** are 4000ms globally. Keep messages short and actionable.
13. **Font class `font-display`** should be on every page's root element.
14. **Social buttons** are UI-only — no backend integration exists for Facebook/Apple/Google auth.
15. **All dashboard data is mock data** — hardcoded arrays and objects. Real API integration will replace these.
