import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  getAnalytics,
  isSupported as isAnaliticsSupported,
} from "firebase/analytics";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// if (typeof window !== "undefined") {
//   initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider(
//       String(process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA)
//     ),
//     isTokenAutoRefreshEnabled: true,
//   });
// }

const database = getFirestore(app);
const storage = getStorage(app);
const analytics = async () =>
  (await isAnaliticsSupported()) && getAnalytics(app);

if (process.env.NODE_ENV === "production") {
  analytics();
}

export { database, storage, app };
