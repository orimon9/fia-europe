# FIA Europe Network — Full-Stack Platform

A modern, eye-catching immigration platform built with **Next.js + Supabase**, designed to run everywhere:

- 🌐 **Web** — works in any browser
- 📱 **Mobile (PWA)** — installable on Android & iOS straight from the browser ("Add to Home Screen")
- 🖥️ **Desktop** — installable as a desktop app (PWA)
- 🤖📱 **Native Android & iOS** — optional, via Capacitor (same codebase)

It features a **Fia Europe Network-style mega-menu** (Services / Solutions / Resources / Company), Supabase **email auth** (sign up / sign in), a **real-time applicant dashboard**, **live visa tracking**, and a **searchable services catalog** loaded from the database.

---

## 1. Prerequisites

- **Node.js 18.17+** — download from https://nodejs.org
- A free **Supabase** account — https://supabase.com

## 2. Install

```bash
cd fia-europe-app
npm install
```

## 3. Set up Supabase

1. Create a new project at https://supabase.com (free tier is fine).
2. In the dashboard, open **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and click **Run**. This creates the tables, security
   rules, and seeds the services catalog.
3. Go to **Settings → API** and copy your **Project URL** and **anon public key**.
4. Copy `.env.example` to `.env.local` and fill them in:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. (Optional) In **Authentication → Providers → Email**, turn off "Confirm email"
   while testing so new sign-ups can log in immediately.

## 4. Run it

```bash
npm run dev
```

Open http://localhost:3000 — you'll see the homepage. Create an account at
`/login`, then submit an application at `/apply` and watch it appear live on
`/dashboard`.

## 5. Build for production (web)

```bash
npm run build
npm start
```

Deploy anywhere that runs Node — **Vercel** is the easiest (it's made by the
Next.js team): push to GitHub, import the repo at https://vercel.com, add the two
`NEXT_PUBLIC_*` environment variables, and deploy.

---

## 📱 Install on phones (PWA — no app store needed)

Once deployed (https), open the site on a phone:

- **Android (Chrome):** menu → "Add to Home screen / Install app"
- **iPhone (Safari):** Share → "Add to Home Screen"

It installs like a native app with the FIA logo, runs full-screen, and works
offline-friendly. This is the easiest way to reach **all operating systems**.

## 🤖 Native apps (optional, via Capacitor)

To ship to the Google Play Store / Apple App Store from the same code:

```bash
# 1. Enable static export: in next.config.mjs uncomment  output: 'export'
# 2. Build + add platforms
npm run cap:sync
npm run cap:add:android   # needs Android Studio
npm run cap:add:ios       # needs Xcode (macOS)
# 3. Open the native project
npx cap open android
npx cap open ios
```

> Note: native builds use the static export (`out/`). Server features (auth,
> database) still work because they call Supabase directly from the client.

---

## Project structure

```
fia-europe-app/
├── app/
│   ├── layout.jsx          Root layout + PWA metadata
│   ├── globals.css         Tailwind + fonts + brand styles
│   ├── page.jsx            Home (hero, services, about, CTA)
│   ├── services/page.jsx   All-services catalog (search + filter, from DB)
│   ├── track/page.jsx      Visa tracking timeline + reference lookup
│   ├── apply/page.jsx      Application form (saves to Supabase)
│   ├── login/page.jsx      Sign in / Sign up (Supabase auth)
│   └── dashboard/page.jsx  Applicant dashboard (real-time)
├── components/
│   ├── Navbar.jsx          Mega-menu navigation (Services/Solutions/Resources/Company)
│   ├── SocialBar.jsx       Social links strip
│   ├── Footer.jsx          Footer
│   └── Shell.jsx           Wraps pages with nav + footer + user session
├── lib/supabase.js         Supabase client
├── supabase/schema.sql     Database schema + seed data (run in Supabase)
├── public/
│   ├── logo.png            FIA Europe logo
│   └── manifest.json       PWA manifest
├── tailwind.config.js      Brand colors & animations
├── capacitor.config.js     Native app config
└── .env.example            Environment template
```

## Brand & contact

- **Colors:** FIA green `#1a6b3a`, gold `#c8942a`, accent red `#e8503a`
- **Socials:** Facebook /fiaglobalnetwork · YouTube @fia_global · TikTok @fiaglobal.fi · Telegram @fia_network
- **WhatsApp:** +358 41 311 4204

To change the logo, replace `public/logo.png` (square image recommended).
