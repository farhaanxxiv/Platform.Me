import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { getStorage } from 'firebase/storage';

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import {
  getAuth,
} from 'firebase/auth';

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

  return (
    <html lang="en">
      <body className={inter.className}>

        {children}
        <Toaster />

      </body>
    </html>
  );
}
