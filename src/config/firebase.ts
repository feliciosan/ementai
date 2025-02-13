import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  getAnalytics,
  isSupported as isAnaliticsSupported,
} from "firebase/analytics";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAg_BqIY2GlB5wbRHoHxcsJn7Mjn8lUpZI",
  authDomain: "ementai-8b964.firebaseapp.com",
  projectId: "ementai-8b964",
  storageBucket: "ementai-8b964.firebasestorage.app",
  messagingSenderId: "215570951512",
  appId: "1:215570951512:web:3ceebc8dee3d216a27092d",
  measurementId: "G-7H91XMH8FN",
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
