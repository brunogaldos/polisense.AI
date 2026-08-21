import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
