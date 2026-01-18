

// import { getToken } from "firebase/messaging";
// import { messaging } from "../firebase";

// export async function registerForPush(): Promise<void> {
//   // Explicit TS-safe guards
//   if (typeof window === "undefined") return;
//   if (!("Notification" in window)) return;
//   if (!("serviceWorker" in navigator)) return;

//   const permission: NotificationPermission =
//     await window.Notification.requestPermission();

//   if (permission !== "granted") return;

//   const registration = await navigator.serviceWorker.register(
//     "/firebase-messaging-sw.js"
//   );

//   const token = await getToken(messaging, {
//     vapidKey: "YOUR_REAL_VAPID_KEY",
//     serviceWorkerRegistration: registration,
//   });

//   if (token) {
//     console.log("FCM Token:", token);
//     localStorage.setItem("fcmToken", token);
//   }
// }


// import { getToken } from "firebase/messaging";
// import { messaging } from "../firebase";

// export async function registerForPush() {
//   const permission = await Notification.requestPermission();
//   if (permission !== "granted") return;

//   const token = await getToken(messaging, {
//     vapidKey: "BGVZYQu5fbE87Ya3CsQF5q3BQk9FD4wF6Ds-SsCallvaB0AwkWOGksk6Vdsx-X5xhMgu9VdLWCWT46RJUP-kTOc",
//   });

//   if (token) {
//     console.log("FCM Token:", token);
//     localStorage.setItem("fcmToken", token);
//   }
// }

// import { getToken } from "firebase/messaging";
// import { messaging } from "../firebase";

// export async function registerForPush() {

//   console.log("registerForPush() called"); // 👈 debug
//   // ✅ TS-safe guard
//   if (!("Notification" in window)) {
//     console.warn("Notifications not supported");
//     return;
//   }

//   const permission = await window.Notification.requestPermission();
//   if (permission !== "granted") return;

//   // ✅ Register service worker
//   const registration = await navigator.serviceWorker.register(
//     "/firebase-messaging-sw.js"
//   );

//   const token = await getToken(messaging, {
//     vapidKey: "BGVZYQu5fbE87Ya3CsQF5q3BQk9FD4wF6Ds-SsCallvaB0AwkWOGksk6Vdsx-X5xhMgu9VdLWCWT46RJUP-kTOc",
//     serviceWorkerRegistration: registration,
//   });

//   if (token) {
//     console.log("FCM Token:", token);
//     localStorage.setItem("fcmToken", token);
//   }
// }

import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

export async function registerForPush() {
  if (!("serviceWorker" in navigator)) {
    console.log("Service workers not supported");
    return;
  }

  if (!("Notification" in window)) {
    console.log("Notifications not supported");
    return;
  }

  // 🔑 REQUEST PERMISSION
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Notification permission denied");
    return;
  }

  // 🔑 REGISTER SERVICE WORKER (THIS WAS MISSING)
  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  );

  console.log("Service Worker registered:", registration);

  
  // ✅ WAIT until service worker is ACTIVE & CONTROLLING
  await navigator.serviceWorker.ready;

  console.log("✅ Service Worker ready");

  // 🔑 GET FCM TOKEN
  const token = await getToken(messaging, {
    vapidKey: "BGVZYQu5fbE87Ya3CsQF5q3BQk9FD4wF6Ds-SsCallvaB0AwkWOGksk6Vdsx-X5xhMgu9VdLWCWT46RJUP-kTOc",
    serviceWorkerRegistration: registration,
  });

  if (token) {
    console.log("🔥 FCM Token:", token);
    localStorage.setItem("fcmToken", token);
  } else {
    console.log("No FCM token received");
  }
}
