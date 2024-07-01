import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_APP_CONFIG)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);