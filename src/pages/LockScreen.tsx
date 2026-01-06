import { useState } from "react";
import { Lock } from "lucide-react";

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const savedPin = localStorage.getItem("appPin");

  const handleUnlock = () => {
    if (pin === savedPin) {
      onUnlock();
    } else {
      alert("Incorrect PIN");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg w-80 text-center">
        <Lock className="w-10 h-10 text-pink-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          App Locked
        </h2>

        <input
          type="password"
          maxLength={4}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full text-center text-lg tracking-widest border rounded-xl py-3 mb-4 dark:bg-gray-800 dark:text-white"
          placeholder="••••"
        />

        <button
          onClick={handleUnlock}
          className="w-full py-3 bg-pink-500 text-white rounded-xl font-semibold"
        >
          Unlock
        </button>
      </div>
    </div>
  );
}
