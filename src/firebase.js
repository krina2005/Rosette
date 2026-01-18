// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAMKAZMUjpP_-jq10bZwfu19698OCEybPw",
  authDomain: "rosette-cycle-tracker.firebaseapp.com",
  projectId: "rosette-cycle-tracker",
  storageBucket: "rosette-cycle-tracker.firebasestorage.app",
  messagingSenderId: "798910936508",
  appId: "1:798910936508:web:e562895b67f805d12c67b9",
  measurementId: "G-05LWNE71XM"
};

const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);