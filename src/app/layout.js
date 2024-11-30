import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { getStorage } from 'firebase/storage';
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const space_grotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space-grotesk', }
);

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import {
  getAuth,
} from 'firebase/auth';
import Head from "next/head";

const firebaseConfig = {
  apiKey: "AIzaSyB4vC_F5_6dtbDqY3rbfk_P_djFdE3i1QY",
  authDomain: "platform-me-58583.firebaseapp.com",
  projectId: "platform-me-58583",
  storageBucket: "platform-me-58583.appspot.com",
  messagingSenderId: "181866199229",
  appId: "1:181866199229:web:54a14873eec17d10b7dfd4",
  measurementId: "G-0TPW3N70MF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

export default async function RootLayout({ children }) {
  if (process.env.NODE_ENV === 'production') {
    // window.console.log = () => { };
  }

  return (
    <html lang="en">
      <Head>
        <title>Platform.Me</title>
        <link rel="icon" href="/icon-white.svg" sizes="any" />
      </Head>
      <body className={space_grotesk.variable}>
        {children}
        <Toaster />
      </body>
      <SpeedInsights />
      {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-0TPW3N70MF" />}
    </html>
  );
}
