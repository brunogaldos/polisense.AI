import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";

// These values are inlined at build time from CI secrets, and a secret can pick
// up invisible junk on the way in — a UTF-8 BOM (U+FEFF) from a PowerShell
// pipeline, or a trailing newline from a copy-paste. The SDK puts apiKey
// straight into a request header, and the Headers constructor rejects any code
// point above 255, so a single leading BOM makes every Firestore call throw
// "Cannot convert value ... character at index 0 has value 65279" — in every
// browser, with the write hanging rather than failing. Strip it here so a
// malformed secret degrades to nothing instead of breaking the whole SDK.
function clean(value: string | undefined): string | undefined {
  return value?.replace(/^\uFEFF/, "").trim() || undefined;
}

const firebaseConfig = {
  apiKey: clean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: clean(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: clean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: clean(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: clean(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: clean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  measurementId: clean(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
};

export const app: FirebaseApp = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);

// Analytics is browser-only; keep it optional to avoid SSR/static-build issues.
// It also throws if the Firebase config is incomplete (e.g. no NEXT_PUBLIC_FIREBASE_*
// env vars in local dev, where only Firestore is needed) — guard so that case
// degrades to "no analytics" instead of crashing every page at module load.
function initAnalytics(): Analytics | null {
  if (typeof window === "undefined" || !firebaseConfig.projectId) return null;
  try {
    return getAnalytics(app);
  } catch (error) {
    console.warn("Firebase Analytics disabled:", error);
    return null;
  }
}

export const analytics: Analytics | null = initAnalytics();
