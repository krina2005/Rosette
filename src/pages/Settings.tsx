import { useState, useEffect } from "react";
import {
  Bell,
  Shield,
  Download,
  Lock,
  Calendar,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Settings() {


  
  /* ======================
     STATE (persisted)
     ====================== */
  const [remindersEnabled, setRemindersEnabled] = useState(
    localStorage.getItem("remindersEnabled") === "true"
  );
  const [reminderDays, setReminderDays] = useState(
    Number(localStorage.getItem("reminderDays")) || 3
  );
  const [cycleLength, setCycleLength] = useState(
    Number(localStorage.getItem("cycleLength")) || 28
  );
  const [appLockEnabled, setAppLockEnabled] = useState(
    localStorage.getItem("appLock") === "true"
  );

  /* ======================
     EFFECTS
     ====================== */
  useEffect(() => {
    localStorage.setItem("remindersEnabled", String(remindersEnabled));
    localStorage.setItem("reminderDays", String(reminderDays));
    localStorage.setItem("cycleLength", String(cycleLength));
    localStorage.setItem("appLock", String(appLockEnabled));
  }, [
    remindersEnabled,
    reminderDays,
    cycleLength,
    appLockEnabled,
  ]);


  /* ======================
     EXPORT DATA
     ====================== */
  const exportData = () => {
    const cycles = JSON.parse(localStorage.getItem("cycles") || "[]");
    const blob = new Blob([JSON.stringify(cycles, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "rosette-cycle-data.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-purple-50 pb-24"
    style={{
      background: "linear-gradient(to bottom, var(--bg-from), var(--bg-to))",
      color: "var(--text-main)",
    }}>
      <div className="w-full max-w-md mx-auto px-5 py-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-pink-500 text-center mb-8">
          Settings
        </h1>

        {/* 🔔 REMINDERS */}
        <Card>
          <CardTitle icon={<Bell className="w-5 h-5 text-pink-500" />}>
            Enable Reminders
          </CardTitle>

          <Toggle
            enabled={remindersEnabled}
            onChange={setRemindersEnabled}
          />

          {remindersEnabled && (
            <div className="mt-4">
              <label className="text-sm text-gray-600 mb-2 block">
                Notify me before cycle (days)
              </label>
              <select
                value={reminderDays}
                onChange={(e) => setReminderDays(Number(e.target.value))}
                className="w-full rounded-xl border border-pink-200 px-4 py-2 text-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <option key={d} value={d}>
                    {d} days before
                  </option>
                ))}
              </select>
            </div>
          )}
        </Card>

        {/* 📅 CYCLE LENGTH */}
        <Card>
          <CardTitle icon={<Calendar className="w-5 h-5 text-pink-500" />}>
            Average Cycle Length
          </CardTitle>

          <input
            type="number"
            min={20}
            max={40}
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="w-full rounded-xl border border-pink-200 px-4 py-2 text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">
            Used to predict your next cycle
          </p>
        </Card>

        {/* 🔐 APP LOCK */}
        <Card>
          <CardTitle icon={<Lock className="w-5 h-5 text-pink-500" />}>
            App Lock (Privacy)
          </CardTitle>

          <Toggle
            enabled={appLockEnabled}
            onChange={(enabled) => {
              if (enabled) {
                // 🔐 App lock turned ON
                if (!localStorage.getItem("appPin")) {
                  const pin = prompt("Set a 4-digit PIN");

                  if (pin && pin.length === 4) {
                    localStorage.setItem("appPin", pin);
                    setAppLockEnabled(true);
                  } else {
                    alert("PIN must be exactly 4 digits");
                    setAppLockEnabled(false);
                  }
                } else {
                  setAppLockEnabled(true);
                }
              } else {
                // 🔓 App lock turned OFF
                setAppLockEnabled(false);
              }
            }}
          />
          <p className="text-xs text-gray-500 mt-2">
            Adds an extra layer of privacy on this device
          </p>
        </Card>

        {/* 📦 EXPORT */}
        <Card>
          <CardTitle icon={<Download className="w-5 h-5 text-pink-500" />}>
            Export Data
          </CardTitle>

          <button
            onClick={exportData}
            className="w-full py-2 rounded-xl bg-pink-500 text-white font-medium text-sm"
          >
            Download My Data
          </button>
        </Card>

        {/* 🔒 PRIVACY INFO */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-pink-500 mt-0.5" />
            <p className="text-xs text-gray-600">
              Rosette stores all data locally on your device. No accounts
              required and no personal health data is uploaded.
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ======================
   SMALL COMPONENTS
   ====================== */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm mb-5">
      {children}
    </div>
  );
}

function CardTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h2 className="text-sm font-semibold text-gray-700">
        {children}
      </h2>
    </div>
  );
}

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-12 h-6 rounded-full relative transition ${
        enabled ? "bg-pink-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
          enabled ? "right-0.5" : "left-0.5"
        }`}
      />
    </button>
  );
}
