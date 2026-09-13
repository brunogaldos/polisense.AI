# Polisense AI

AI-Powered Energy Access Intelligence — democratizing energy infrastructure planning for underserved communities worldwide.

## About

Polisense AI is a geospatial intelligence platform that helps government agencies and international organizations plan and deploy energy infrastructure faster. By combining AI-driven analysis with comprehensive geospatial data, we reduce planning cycles from months to minutes.

**Key stats:**
- 760M+ people globally lack electricity access
- 50% of energy projects fail within 5 years
- Polisense AI enables 10x faster infrastructure planning

## Features

- **AI Site Recommendations** — Intelligent site selection for renewable energy and grid infrastructure based on geospatial analysis
- **Geospatial Analysis** — Analyze terrain, population density, and infrastructure constraints with natural language queries
- **Impact Modeling** — Simulate and optimize infrastructure investments to maximize reach and sustainability
- **Automated Compliance Reports** — Generate regulatory-compliant reports instantly, eliminating weeks of manual documentation

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Firebase (Firestore + Cloud Functions v2, Node 22)
- **Language**: TypeScript
- **Hosting**: GitHub Pages (static export via GitHub Actions)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export to ./out)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Copy the Firebase values into `.env` before running — see [Environment Variables](#environment-variables). Without them the site still renders; only the demo form stops working.

> `next.config.ts` sets `output: 'export'`, so this is a **static site**. There is no Node server in production and no API routes — `npm start` does not apply. Anything server-side has to live in a Cloud Function.

## Environment Variables

Create a `.env` in the repo root (gitignored):

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

These are `NEXT_PUBLIC_*`, so they are **inlined into the client bundle** and visible to anyone who views the site. That is normal for Firebase web config — it is an identifier, not a credential. Actual protection comes from `firestore.rules`, so never loosen those rules on the assumption the config is private.

`lib/firebase.ts` sanitises each value (strips a leading BOM and trims whitespace) before handing it to the SDK. See [Gotchas](#gotchas) for why that matters.

## How "Book a Demo" Works

```
BookDemoModal.tsx
                                                  ┌─ firestore.rules validates shape
  └─> addDoc("demo-requests") ────────────────────┤
                                                  └─> onDemoRequestCreated (Cloud Function)
                                                        └─> nodemailer ─> Gmail SMTP
                                                              └─> info@polisenseai.com
```

1. **`components/BookDemoModal.tsx`** writes `{ email, company, timestamp, status }` to the `demo-requests` collection.
2. **`firestore.rules`** allows the create only if the payload matches that exact shape. Reads, updates and deletes are denied to all clients — review submissions in the Firebase console, which bypasses rules.
3. **`functions/index.js`** (`onDemoRequestCreated`, Node 22, `us-central1`) fires on the new document and emails a notification.
4. The mail is sent **from** `SMTP_USER` with the requester in `replyTo`, so you can reply straight to them. It is deliberately not sent *as* the visitor — that would fail SPF/DKIM for their domain and land in spam.

The modal races the write against a **15 s timeout**. Firestore's `addDoc` only settles once the server acknowledges the write, and it never rejects while the client is offline — without the timeout a blocked request leaves the form spinning forever with no error.

Notification addresses live in `functions/.env` (`NOTIFY_EMAIL`, `SMTP_USER`) — not secrets, safe to commit. Changing either needs a function redeploy.

## Deployment

### Frontend — GitHub Pages

`.github/workflows/nextjs.yml` runs on push to `main` (or manual dispatch): `npm ci` → `npm run build` → upload `./out` → deploy to Pages.

The build reads the Firebase values from **repository-level GitHub Secrets** (Settings → Secrets and variables → Actions), named identically to the `.env` keys above. The `build` job intentionally declares **no `environment:`** — adding one switches it to environment-scoped secrets and can gate builds behind environment protection rules.

### Backend — Firebase

Requires the **Blaze** plan (Cloud Functions won't deploy on Spark) and `firebase login`.

```bash
firebase deploy --only firestore:rules   # security rules
firebase deploy --only functions         # the notification function
firebase deploy                          # both
```

The SMTP password lives in **Google Secret Manager**, never in the repo:

```bash
firebase functions:secrets:set SMTP_PASSWORD
```

It is a Google Workspace **app password** (requires 2-Step Verification on the sending account), declared via `defineSecret` in `functions/index.js`. The deploy grants the runtime service account `secretAccessor` automatically.

Check whether it is working:

```bash
firebase functions:log --only onDemoRequestCreated
```

A successful send logs `messageId`, `accepted` and `rejected`. Note that Cloud Logging ingestion can lag several minutes — an empty tail right after a deploy is usually lag, not failure.

## Gotchas

**Never pipe secrets into `gh secret set` from PowerShell.** PowerShell encodes pipeline output as UTF-8 *with BOM*, so the stored value gains a leading `U+FEFF`. The Firebase SDK puts `apiKey` into an HTTP header, and the `Headers` constructor rejects any code point above 255 — one invisible character makes every Firestore call throw `character at index 0 has value 65279`, in every browser, with writes hanging instead of failing. Use `gh secret set NAME --body 'value'` instead. `lib/firebase.ts` now strips a BOM defensively, but fix the secret rather than relying on that.

**Demo requests are write-only from the browser.** If you need to read them programmatically, use the Admin SDK in a function — client reads are denied by design.

**Email sending does not use the Trigger Email extension.** `firebase/firestore-send-email` was tried and abandoned: it never received its `SMTP_PASSWORD` secret and failed every delivery with `Missing credentials for "PLAIN"`, with no way to inspect its resolved config. If the instance is still installed it is inert and can be removed with `firebase ext:uninstall firestore-send-email`.

**A fresh clone cannot deploy the extension config.** `extensions/*.secret.local` is gitignored, so recreate it locally if you ever reinstate an extension.

## Backed By

[Global Covenant of Mayors for Climate & Energy](https://www.globalcovenantofmayors.org/)

## License

© 2026 Polisense AI. All rights reserved.
