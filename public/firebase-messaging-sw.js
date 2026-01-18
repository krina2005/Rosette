importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAMKAZMUjpP_-jq10bZwfu19698OCEybPw",
  authDomain: "rosette-cycle-tracker.firebaseapp.com",
  projectId: "rosette-cycle-tracker",
  storageBucket: "rosette-cycle-tracker.firebasestorage.app",
  messagingSenderId: "798910936508",
  appId: "1:798910936508:web:e562895b67f805d12c67b9",
  measurementId: "G-05LWNE71XM"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/icon192.png",
    }
  );
});
