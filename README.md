# Polisense AI

The landing site for [polisenseai.com](https://polisenseai.com/): a territorial climate engine that tells organizations where to invest, protect and intervene first.

## About

Polisense turns satellite, climate, infrastructure and regulatory data into ranked, explainable recommendations for a territory, in hours instead of months. An analyst asks a question in plain language, the engine runs the geospatial analysis, and the result comes back ranked, with the evidence behind each answer and a report ready for a funder, a committee or a field team.

It is built for NGOs, development finance institutions, climate funds and project developers working in emerging markets, and is live in Peru, Jordan and Moldova.

**Results the site cites:**
- A GIS analysis that takes 3.5-4 hours in desktop tools takes about 30 minutes
- Solar site prioritization plus a draft EIA: from 3 months with consultants to 2 days for one planner
- Andean water storage: 196 candidate sites screened, 41 flagged for field validation

## What the Site Covers

- **Home**: the positioning, an Ask / Analyze / Act walkthrough on a real map of Arequipa, the products, and traction
- **Products** (`/products/`): seven capabilities, each with its own page: solar site screening, natural water storage mapping, vegetation change analysis, farmer early warning, air-quality sensor placement, net-zero opportunity scans and green corridors
- **Platform** (`/platform/`): an overview of the in-house analysis engines behind the products
- **Blog** and **Team** pages
- English and Spanish throughout, switchable in the header

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Firebase (Firestore + Cloud Functions v2, Node 22)
- **Maps**: d3-geo, world-atlas and OpenStreetMap data, projected to SVG at build time
- **Language**: TypeScript
- **Hosting**: GitHub Pages (static export via GitHub Actions)

## Getting Started

### Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Git | any recent | |
| Node.js | **20.9 or newer** (required by Next.js 16) | 20 or 22 LTS recommended; CI builds with 20. npm ships with it. |
| Internet access | first run | `npm install` and the Google Fonts used by `next/font` |

You also need access to this GitHub repository. Nothing else has to be set up first: there is no database, and the map data is committed.

### Run it locally

```bash
git clone https://github.com/brunogaldos/polisense.AI.git
cd polisense.AI
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Saved files reload in the browser automatically; stop the server with `Ctrl + C`.

Other commands:

```bash
npm run build   # production static export to ./out (what GitHub Pages serves)
npm run lint    # ESLint
```

### Optional: the "Book a Demo" form

Everything renders without configuration. Only the demo form needs Firebase: create a `.env` with the values in [Environment Variables](#environment-variables), shared privately by a teammate. Never commit it.

### Not in the repo, on purpose

Internal company documents (strategy notes, the app team's tool guide, `Polisense_ground_truth/`) and local AI-assistant folders (`.claude/`, `.agents/`) are kept out of git. The site does not need them.

### Troubleshooting

- **`Unable to acquire lock ... is another instance of next dev running?`**: a dev server is already running in this folder. Stop it and run `npm run dev` again.
- **`npm install` or the dev server fails on startup**: check `node -v`; anything below 20.9 will not work.
- **The first homepage load takes a moment in dev**: the two maps are projected when the page first renders and cached after that. Production builds do this once, at build time.

> `next.config.ts` sets `output: 'export'`, so this is a **static site**. There is no Node server in production and no API routes — `npm start` does not apply. Anything server-side has to live in a Cloud Function.

## Project Structure

| Path | What lives there |
|---|---|
| `app/` | Routes: home, `products/` (index + one generated page per capability), `platform/`, `blog/`, `team/` |
| `components/` | UI; `home/` holds the homepage sections and maps |
| `lib/products.ts` | Every capability's content (EN/ES). Add an entry to add a product page. |
| `lib/toolkits.ts` | The in-house engines on `/platform/`. Overview only, by decision. |
| `lib/i18n/translations.ts` | All other site copy, English and Spanish |
| `lib/geo/` | Build-time map projection (world deployments map, Arequipa screening map) |
| `data/geo/` | OpenStreetMap extract for Arequipa; refresh with `node scripts/fetch-osm-arequipa.mjs` |
| `public/products/` | Product screenshots |
| `functions/` | Cloud Function that emails demo requests |

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
