import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import LockScreen from "./pages/LockScreen";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import AddCycle from "./pages/AddCycle";
import Knowledge from "./pages/Knowledge";
import Settings from "./pages/Settings";

import { registerForPush } from "./utils/push";
import { requestNotificationPermission } from "./utils/notifications";
import { checkForReminders } from "./utils/reminderChecker";

export default function App() {

  const appLockEnabled = localStorage.getItem("appLock") === "true";
  const hasPin = !!localStorage.getItem("appPin");

  const [unlocked, setUnlocked] = useState(!appLockEnabled);

  useEffect(() => {
    registerForPush();
  }, []);

  useEffect(() => {
    requestNotificationPermission();
    checkForReminders();
  }, []);

  if (appLockEnabled && hasPin && !unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/add" element={<AddCycle />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
