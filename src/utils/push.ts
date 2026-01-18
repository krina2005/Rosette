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

import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

export async function registerForPush() {
  // ✅ TS-safe guard
  if (!("Notification" in window)) {
    console.warn("Notifications not supported");
    return;
  }

  const permission = await window.Notification.requestPermission();
  if (permission !== "granted") return;

  // ✅ Register service worker
  const registration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js"
  );

  const token = await getToken(messaging, {
    vapidKey: "BGVZYQu5fbE87Ya3CsQF5q3BQk9FD4wF6Ds-SsCallvaB0AwkWOGksk6Vdsx-X5xhMgu9VdLWCWT46RJUP-kTOc",
    serviceWorkerRegistration: registration,
  });

  if (token) {
    console.log("FCM Token:", token);
    localStorage.setItem("fcmToken", token);
  }
}
