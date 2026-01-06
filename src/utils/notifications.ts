export function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

export function showCycleNotification() {
  if (Notification.permission !== "granted") return;

  new Notification("Cycle reminder", {
    body: "A gentle reminder from BloomCycle",
    icon: "/icon-192.png", // optional (later for PWA)
  });
}
