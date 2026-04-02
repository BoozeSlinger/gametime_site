# GameTime Sports Bar & Grill — Handoff Documentation

**Project:** GameTime Sports Bar & Grill Bespoke Website
**Framework:** Next.js 16.2.1 (App Router, TypeScript)
**Repository:** `/Users/ryanstevens/Desktop/gametime/gametime-site`
**Last Updated:** March 29, 2026

---

## 1. Project Overview

GameTime is an award-winning, high-end sports bar website built with modern web technologies. The site features:

- **Vibe Toggle:** Dynamic Gameday ↔ After Hours mode that transforms the entire experience
- **Live Sports Schedule:** Real-time ESPN integration showing games for the next 7 days
- **Custom Animations:** GSAP scroll triggers, Framer Motion spring animations, canvas-based interactivity
- **Professional Design:** Crimson/charcoal/white color palette with custom SVG components (stopwatch loader, isometric bar map)
- **Responsive Design:** Mobile-first approach with fluid typography and adaptive layouts

### Key URLs
- **Homepage:** `/` (main landing page)
- **Our Girls (Bartenders):** `/our-girls` (bartender profiles, features section)
- **Live Schedule API:** `/api/schedule` (ESPN data, cached 5 minutes)

---

## 2. Technology Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| **Framework** | Next.js | 16.2.1 | App Router, Turbopack, TypeScript |
| **Styling** | Tailwind CSS | Latest | With custom CSS variables for theming |
| **Animations** | Framer Motion | Latest | Spring animations, transition effects |
| **Advanced Animations** | GSAP | Installed, optional | For complex scroll triggers |
| **State Management** | React Context | Built-in | VibeContext for global vibe state |
| **Data Fetching** | ESPN Public API | Free/Public | No auth required (see API section) |
| **Image Hosting** | Cloudinary | Cloud | Hero video + optional image transforms |
| **Fonts** | Google Fonts | Web | Anton (display), Inter (body) |
| **Canvas/SVG** | Native APIs | Browser | Cursor-reactive lighting, custom SVGs |

### Key Dependencies

```json
{
  "next": "^16.2.1",
  "react": "^19.0.0",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^11.0.0",
  "gsap": "^3.12.0"
}
```

---

## 3. Architecture & File Structure

```
gametime-site/
├── app/
│   ├── layout.tsx           # Root layout (VibeProvider wrapper)
│   ├── globals.css          # Global styles, CSS variables, animations
│   ├── page.tsx             # Homepage (main landing)
│   ├── api/
│   │   └── schedule/
│   │       └── route.ts     # ESPN API endpoint (caches 5 min)
│   └── our-girls/
│       └── page.tsx         # Bartender profiles page (TBD)
├── components/
│   ├── Loader.tsx           # Custom SVG stopwatch loader
│   ├── Hero.tsx             # Hero section with video + canvas lighting
│   ├── VibeToggle.tsx       # Animated gameday/after-hours toggle
│   ├── Nav.tsx              # Sticky navigation (glass-blur on scroll)
│   ├── Ticker.tsx           # Auto-scrolling ticker tape
│   ├── QuarterSection.tsx   # Reusable narrative section ("Quarters")
│   ├── TapsBoard.tsx        # Live sports schedule + draft taps
│   ├── MenuSection.tsx      # Menu categories + hover video cards
│   ├── BarMap.tsx           # Isometric floor plan with zone hovers
│   ├── ReserveSection.tsx   # Reservation form
│   ├── ScrollStopwatch.tsx  # Fixed scroll progress indicator
│   └── Footer.tsx           # Footer with hours/links
├── context/
│   └── VibeContext.tsx      # Global vibe state (gameday/afterhours)
├── public/
│   └── [assets]             # SVGs, static files
├── HANDOFF.md               # This file
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 4. Component Reference

### Core Components

#### `Loader.tsx`
- **Purpose:** Custom SVG stopwatch loader during page load
- **Features:**
  - 96×112px stopwatch SVG with crimson fill animation
  - Progress bar (200px width) at bottom
  - Rotating second hand
  - 2.2s total load duration
  - Wipe-out transition when complete
- **Props:** `onComplete: () => void`
- **Key CSS:** `#loader` (position: fixed, z-index: 9999)

#### `Hero.tsx`
- **Purpose:** Full-screen hero section with video background
- **Features:**
  - Cloudinary video: `https://res.cloudinary.com/dqj3xyvey/video/upload/v1774358874/grok_video_804d19b7_4170_4cf2_9d54_b4c72019705e_1_V1_ybvrtu.mp4`
  - Canvas-based cursor-reactive spotlight (radial gradients follow mouse)
  - Dynamic headline (vibe-aware: "YOUR GAME. OUR PASSION." vs. "AFTER HOURS. OUR VIBE.")
  - CTA buttons: View Menu, Book a Booth
  - Vibe toggle positioned absolutely
  - Scroll hint animation (arrow bouncing down)
- **No Props:** Self-contained, reads from VibeContext

#### `VibeToggle.tsx`
- **Purpose:** Animated toggle switch between Gameday and After Hours
- **Features:**
  - Two variants: `full` (labels visible) and `compact` (mobile)
  - Framer Motion spring (stiffness: 600, damping: 32)
  - Track and thumb animations
  - Updates global VibeContext on toggle
  - Changes `body.after-hours` class dynamically
- **Props:** `variant: 'full' | 'compact'`

#### `Nav.tsx`
- **Purpose:** Sticky navigation bar
- **Features:**
  - Fixed position, z-index: 500
  - Transitions from transparent to glass-blur (#121212 + 12px blur) on scroll
  - Logo with stopwatch SVG + "GAME TIME" branding
  - Desktop nav links: Menu, Taps, Games, Reserve
  - Compact vibe toggle (mobile-ready)
  - Reserve button (desktop only)
  - Crimson hover states on links

#### `TapsBoard.tsx` ⭐ (Recently Updated)
- **Purpose:** Live sports schedule + draft taps board
- **Features:**
  - **Sports Schedule:**
    - Fetches from `/api/schedule` (5-min cache)
    - Day tabs (Today, Tomorrow, Mon–Fri)
    - Sport filter buttons (All, NFL, NBA, MLB, NHL, EPL, MLS, CFB, NCAAM)
    - Game rows: Sport badge, teams/score, status, channel, live indicator
    - Live indicator: green pulsing dot + status detail (e.g., "Q3 4:22")
    - Final/Scheduled status display
    - Manual refresh button (↻)
    - Auto-refresh every 5 minutes
    - Last updated timestamp
    - Loading & error states with retry
  - **Taps Section:**
    - 8 fixed draft beers (hardcoded, update as needed)
    - Hover tooltips: brewery, style, ABV
- **Props:** None (self-contained)
- **Key CSS:** `flip-char` (split-flap effect), live pulsing animation

#### `QuarterSection.tsx`
- **Purpose:** Reusable narrative section ("1st Quarter," "2nd Quarter," etc.)
- **Features:**
  - Intersection observer for fade-in animation
  - Grid layout (responsive: 1 col mobile, 2 col desktop)
  - Quarter label with crimson leading line
  - Stat card (value + label in bordered box)
  - Image placeholder with grid overlay
  - Optional `reverse` prop to flip layout
  - Optional `children` for CTA buttons
- **Props:**
  ```typescript
  quarter: string            // e.g., "1st Quarter"
  title: string              // Main heading
  subtitle: string           // Sub heading
  body: string               // Description
  imgSrc: string             // Image URL (or "placeholder")
  stat: { value: string; label: string }
  reverse?: boolean          // Flip layout
  children?: ReactNode       // CTA buttons, etc.
  ```

#### `MenuSection.tsx`
- **Purpose:** Interactive menu with category tabs and hover effects
- **Features:**
  - Tab buttons: Starters, Burgers, Cocktails, Shareables
  - Menu cards with item name, description, price
  - Optional tags: Fan Favorite, Signature, New
  - Hover effect: dark overlay + video placeholder fade-in
  - Price in crimson
  - Bottom CTA: "Book a Table"
- **No Props:** Self-contained

#### `BarMap.tsx`
- **Purpose:** Isometric SVG floor plan with zone hover interactions
- **Features:**
  - 5 zones: Main Bar, Booth A, Booth B, Patio, VIP Loft
  - Polygon shapes with varying crimson opacities
  - Hover effect: brightness(1.4) + glow drop-shadow
  - Info panel (right side) shows:
    - Zone name (large, uppercase)
    - Crowd status: Full House / Busy / Open Seating (colored pills)
    - Sports packages currently available
    - Seating count
    - Feature badges (Dog-Friendly, Sound-On, etc.)
    - Reserve button
  - Subtle grid background
- **No Props:** Self-contained

#### `ReserveSection.tsx`
- **Purpose:** Reservation form
- **Features:**
  - Form fields: First Name, Last Name, Email, Phone, Date, Party Size, Special Requests
  - Styled inputs with crimson focus state
  - Submit button (btn-crimson class)
  - Success state: "YOU'RE IN THE GAME" message
  - Radial glow background decoration
- **No Props:** Self-contained

#### `ScrollStopwatch.tsx`
- **Purpose:** Fixed scroll progress indicator
- **Features:**
  - 52×58px SVG stopwatch
  - Circumference-based stroke-dasharray animation
  - Hand rotation follows scroll progress (0–100% = 0–360° × 3)
  - Crimson accent colors
  - Position: fixed, bottom-right (32px from edges)
  - Pointer-events: none
  - Drop-shadow with crimson glow

#### `Ticker.tsx`
- **Purpose:** Auto-scrolling ticker tape
- **Features:**
  - Crimson borders top/bottom
  - Infinite linear animation (28s)
  - Content varies by vibe (gameday vs. after-hours items)
  - Background color per vibe
  - Duplicated content for seamless loop

---

## 5. Global State (VibeContext)

Located in `context/VibeContext.tsx`:

```typescript
interface VibeContextType {
  vibe: 'gameday' | 'afterhours';
  toggleVibe: () => void;
}
```

**Behavior:**
- Toggles `body.after-hours` class on `<html>` element
- Affects global styles (background color, ticker content, hero headline, etc.)
- All components that change appearance per vibe read from this context
- **CSS Variables remain fixed** (e.g., --crimson always #C8102E); vibe changes are handled via `.after-hours` selectors in CSS

**Usage:**
```typescript
const { vibe, toggleVibe } = useContext(VibeContext);
```

---

## 6. API Integration

### ESPN Schedule Endpoint

**Route:** `GET /api/schedule`

**Response:**
```json
{
  "games": [
    {
      "id": "unique-event-id",
      "sport": "NFL",
      "league": "NFL",
      "teams": "KC @ SF",
      "homeTeam": "SF",
      "awayTeam": "KC",
      "homeScore": "21",
      "awayScore": "19",
      "time": "Live • Q4 2:45",
      "status": "live",
      "statusDetail": "Q4 2:45",
      "channel": "CBS",
      "date": "2026-03-29T23:30:00Z"
    }
  ],
  "lastUpdated": "2026-03-29T18:45:32.123Z",
  "count": 14
}
```

**Caching:**
- Set to 5 minutes (`revalidate: 300`)
- TapsBoard auto-refreshes every 5 minutes
- Manual refresh button available for real-time updates

**Data Source:**
- ESPN Public Scoreboard API: `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/scoreboard`
- **Supported Leagues:**
  - `football/nfl` (NFL)
  - `basketball/nba` (NBA)
  - `baseball/mlb` (MLB)
  - `hockey/nhl` (NHL)
  - `soccer/eng.1` (Premier League)
  - `soccer/usa.1` (MLS)
  - `football/college-football` (College Football)
  - `basketball/mens-college-basketball` (College Basketball)

**Known Limitations:**
- ESPN's public API is **not officially supported** and may be subject to rate limiting or blocking
- Vercel deployments may experience CORS issues or rate limiting
- **Production Fallback Option:** Consider migrating to:
  - **ESPN+ API** (requires subscription/partnership)
  - **Paid sports data providers:** TheScore, Sportradar, ESPN API official endpoint
  - **Alternative free APIs:** SportsData.io, MySportsFeeds (freemium)

**Fallback Strategy (if ESPN blocks):**
1. Update `/api/schedule/route.ts` to fall back to cached data on fetch failure
2. Implement circuit breaker pattern (fail gracefully after 3 consecutive failed requests)
3. Display "Unable to fetch live games" message to users
4. Keep TapsBoard functional with manually curated fixtures

---

## 7. Cloudinary Setup

**Organization:**
- **Cloud Name:** `dqj3xyvey`
- **Folder:** `gametime`

**Current Assets:**
- **Hero Video:** `grok_video_804d19b7_4170_4cf2_9d54_b4c72019705e_1_V1` (MP4)
  - Full URL: `https://res.cloudinary.com/dqj3xyvey/video/upload/v1774358874/grok_video_804d19b7_4170_4cf2_9d54_b4c72019705e_1_V1_ybvrtu.mp4`
  - Used in `Hero.tsx`

**Future Uploads:**
- Bartender headshots (for `/our-girls` page)
- Menu item photography (burgers, cocktails, appetizers)
- Bar atmosphere/interior shots (for QuarterSection placeholders)
- High-quality action shots (bartending, pouring, etc.)

**Cloudinary Optimization Tips:**
- Use `f_auto` for format negotiation (WebP for modern browsers)
- Use `q_auto` for quality optimization
- Use `w_` and `h_` parameters for responsive images
- Example: `https://res.cloudinary.com/dqj3xyvey/image/upload/f_auto,q_auto,w_800/gametime/image-name.jpg`

---

## 8. Styling & Color Palette

**CSS Variables** (in `app/globals.css`):

```css
:root {
  --crimson: #C8102E;           /* Primary brand color */
  --crimson-dark: #9A0C22;      /* Darker shade for hover states */
  --crimson-glow: rgba(200, 16, 46, 0.35); /* Glow/shadow effects */
  --charcoal: #121212;          /* Main background */
  --charcoal-mid: #1c1c1c;      /* Mid-tone background */
  --charcoal-light: #2a2a2a;    /* Light background accent */
  --white: #FFFFFF;             /* Text/foreground */
  --off-white: #F5F5F5;         /* Light text */
  --grey: #888888;              /* Secondary text */
  --grey-light: #cccccc;        /* Subtle text */
}
```

**Typography:**
- **Display Font:** Anton (Google Fonts)
  - Used for: Headers, buttons, section labels, stopwatch
  - `text-transform: uppercase`, `letter-spacing: 0.1em`
- **Body Font:** Inter (Google Fonts)
  - Used for: Body text, descriptions, timestamps
  - Weights: 300, 400, 500, 600, 700

**Utility Classes:**
- `.btn-crimson` — Primary CTA button (crimson background, clip-path skew)
- `.btn-outline` — Secondary button (transparent, white border)
- `.abv-pill` — Badge for alcohol content
- `.crowd-full` — Red crowd status pill
- `.crowd-open` — Green crowd status pill
- `.flip-char` — Split-flap board character (for future enhancements)
- `.accent-line` — Crimson line decoration

---

## 9. Deployment Instructions

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm or yarn
- Cloudinary account (for image/video serving)

### Local Development

```bash
# Navigate to project directory
cd /Users/ryanstevens/Desktop/gametime/gametime-site

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# → http://localhost:3000
```

### Build for Production

```bash
# Build Next.js project (Turbopack for fast builds)
npm run build

# Verify build succeeds (TypeScript, ESLint)
npm run type-check

# Start production server locally
npm start
```

### Environment Variables

Create a `.env.local` file (if needed in future):

```
# Currently no required env vars
# ESPN API is public, Cloudinary is public CDN
# Add as needed for future analytics, auth, etc.
```

### Vercel Deployment (Recommended)

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial GameTime site"
   git remote add origin https://github.com/yourusername/gametime-site
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select GitHub repository
   - Leave defaults (Next.js auto-detected)
   - Click "Deploy"

3. **Post-Deployment:**
   - Domain setup: Configure custom domain in Vercel project settings
   - Analytics: Enable Vercel Analytics (optional)
   - Revalidation: 5-minute cache on `/api/schedule` is automatic

### Alternative Hosting (Netlify, AWS, Docker)

This is a standard Next.js 16 App Router project. It can be deployed to:
- **Netlify:** Export as static site (if no server functions needed) or use serverless functions
- **AWS Amplify:** Supports Next.js natively
- **Docker:** Build image with `npm run build`, serve with `node .next/server.js`
- **Self-hosted:** Build and run on any Node.js-capable server

---

## 10. Performance Considerations

### Optimizations in Place

1. **Image Optimization:**
   - Cloudinary CDN for video (Hero)
   - Placeholder grid system for images (scales responsively)
   - Use `next/image` for any future image components

2. **API Caching:**
   - ESPN schedule cached for 5 minutes
   - Manual refresh available for real-time updates

3. **CSS & Layout:**
   - Tailwind CSS for minimal CSS output
   - CSS Grid & Flexbox for layout (no extra margins/padding bloat)
   - Hardware-accelerated animations (transform, opacity)

4. **Animations:**
   - Framer Motion: transforms and opacity only (GPU-accelerated)
   - Canvas spotlight: optimized with `requestAnimationFrame`
   - Intersection Observer for scroll reveals (no scroll listeners on every component)

### Potential Bottlenecks

1. **ESPN API Rate Limiting:**
   - Consider fallback to paid sports API on production
   - Implement circuit breaker if public API becomes unreliable

2. **Large Cloudinary Video:**
   - Hero video should be optimized (target <5MB for web playback)
   - Consider adaptive bitrate (multiple quality versions)

3. **Custom Canvas Spotlight:**
   - Can be taxing on low-end devices
   - Consider disabling on mobile or adding `prefers-reduced-motion` check

### Monitoring

- **Vercel Analytics:** Enable to track Core Web Vitals
- **Error Tracking:** Consider Sentry for error reporting
- **Uptime Monitoring:** Monitor ESPN API availability separately

---

## 11. Known Issues & Future Enhancements

### Known Limitations

1. **ESPN API Reliability:**
   - Public API not officially supported; subject to blocking
   - Rate limiting may occur with high traffic
   - **Solution:** Migrate to paid sports data API on production

2. **Placeholder Images:**
   - Currently showing grid overlay + quarter label
   - Should be replaced with professional stock photos (bartender, bar, food)
   - Recommended sources: Unsplash, Pexels, Shutterstock

3. **Mobile Canvas Spotlight:**
   - Cursor-reactive canvas in Hero may drain battery on mobile
   - Consider disabling on touch devices or reducing update frequency

### Future Enhancements (Post-MVP)

1. ✅ **Bartender Profiles Page** (`/our-girls`)
   - Create dedicated route with bartender cards
   - Photo + bio + specialty drink
   - Feature 2–3 bartenders on homepage

2. **Menu Database:**
   - Current menu is hardcoded in `MenuSection.tsx`
   - Migrate to headless CMS (Contentful, Sanity, Strapi) for easy updates

3. **Reservation System:**
   - Current form has no backend integration
   - Add Supabase, Firebase, or SendGrid for form handling

4. **Analytics:**
   - Track page views, button clicks, form submissions
   - Integrate Vercel Analytics or Google Analytics

5. **Admin Dashboard:**
   - Manage menu items, bartender profiles, special announcements
   - Control which sports are featured on the schedule

6. **Real-time Updates:**
   - WebSocket integration for live score updates (vs. 5-min poll)
   - Push notifications for game start times

7. **Dark Mode Toggle:**
   - Current Gameday/After Hours is vibe-based
   - Could expand to user preference toggle

---

## 12. Troubleshooting

### Build Fails with TypeScript Errors

**Solution:**
```bash
npm run type-check
# Review errors and fix type annotations
npm run build
```

### ESPN API Returns Empty Games

**Check:**
1. Verify ESPN API is accessible: `curl https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`
2. Check browser console for CORS errors
3. Verify no games scheduled for the requested day/week
4. Check if ESPN API has been deprecated (monitor `/api/schedule` logs)

**Fallback:**
- Edit `/api/schedule/route.ts` to return cached/mock data on API failure

### Video Not Playing in Hero

**Check:**
1. Verify Cloudinary URL is correct (check CORS headers)
2. Ensure video format is compatible (MP4 recommended)
3. Test in multiple browsers (Firefox, Safari, Chrome)
4. Check network tab for failed requests

**Solution:**
- Re-upload video to Cloudinary with different format or resolution

### Layout Breaks on Mobile

**Check:**
1. Test in Chrome DevTools (mobile viewport)
2. Verify Tailwind responsive classes are applied (`md:`, `lg:`)
3. Check for fixed widths or overflow issues

**Solution:**
- Review component CSS for hardcoded pixel widths
- Use `clamp()` for fluid typography
- Test on actual mobile devices (not just DevTools)

---

## 13. Contact & Support

**Original Designer:** [Client Name]
**Developer:** Ryan Stevens
**Last Updated:** March 29, 2026

**For Questions:**
- Review component props in `components/` directory
- Check TypeScript interfaces in component files
- Refer to Tailwind CSS documentation: [tailwindcss.com](https://tailwindcss.com)
- Framer Motion docs: [framer.com/motion](https://www.framer.com/motion)
- Next.js docs: [nextjs.org](https://nextjs.org)

---

**End of Handoff Document**
