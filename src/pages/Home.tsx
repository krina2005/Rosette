import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Droplet,
  Activity,
  TrendingUp,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

/**
 * Home Dashboard – Rosette
 * Mobile-first, REAL data connected
 */

type Cycle = {
  startDate: string;
  endDate: string;
};

export default function Home() {
  const navigate = useNavigate();

  /* ======================
     READ SAVED DATA
     ====================== */
  const cycles: Cycle[] = JSON.parse(
    localStorage.getItem("cycles") || "[]"
  );

  const averageCycleLength = 28;

  let daysLeft = 0;
  let currentCycleDay = 0;
  let nextPeriodDate = new Date();
  let lastPeriodDuration = 0;

  if (cycles.length > 0) {
    const lastCycle = cycles[cycles.length - 1];
    const start = new Date(lastCycle.startDate);
    const end = new Date(lastCycle.endDate);
    const today = new Date();

    // Last period duration
    lastPeriodDuration =
      Math.floor(
        (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    // Predict next period
    nextPeriodDate = new Date(start);
    nextPeriodDate.setDate(
      nextPeriodDate.getDate() + averageCycleLength
    );

    // Days left
    const diff =
      nextPeriodDate.getTime() - today.getTime();
    daysLeft = Math.max(
      0,
      Math.ceil(diff / (1000 * 60 * 60 * 24))
    );

    // Current cycle day
    currentCycleDay =
      Math.floor(
        (today.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
  }

  const progress =
    currentCycleDay > 0
      ? Math.min(
          100,
          (currentCycleDay / averageCycleLength) * 100
        )
      : 0;

  /* ======================
     PHASE LOGIC
     ====================== */
  function getCurrentPhase(day: number) {
    if (day <= 5)
      return { name: "Menstrual", emoji: "🌸" };
    if (day <= 13)
      return { name: "Follicular", emoji: "🌱" };
    if (day <= 16)
      return { name: "Ovulation", emoji: "✨" };
    return { name: "Luteal", emoji: "🌙" };
  }

  const currentPhase = getCurrentPhase(currentCycleDay);

  return (
    <div
      className="min-h-screen bg-linear-to-b from-pink-50 to-purple-50 pb-24"
      style={{
        background:
          "linear-gradient(to bottom, var(--bg-from), var(--bg-to))",
        color: "var(--text-main)",
      }}
    >
      <div className="w-full max-w-md mx-auto px-5 py-6">

        {/* 🌸 HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Hello 💗
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here’s your cycle overview
          </p>
        </div>

        {/* 🌷 MAIN CARD */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-full -mr-16 -mt-16 opacity-50" />

          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="relative w-40 h-40">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#fce7f3"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#ec4899"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 70}
                    strokeDashoffset={
                      2 *
                      Math.PI *
                      70 *
                      (1 - progress / 100)
                    }
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-pink-500">
                    {cycles.length > 0 ? daysLeft : "--"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    days left
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-1">
                Next expected cycle
              </p>
              <h3 className="text-2xl font-bold text-gray-800">
                {cycles.length > 0
                  ? nextPeriodDate.toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" }
                    )
                  : "Not logged"}
              </h3>
            </div>

            {cycles.length > 0 && (
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
                  <span className="text-lg">
                    {currentPhase.emoji}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    Day {currentCycleDay} • {currentPhase.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🌼 STATS */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard
            icon={<Activity className="w-5 h-5 text-pink-500" />}
            label="Avg Cycle"
            value={`${averageCycleLength}d`}
            bg="bg-pink-100"
          />
          <StatCard
            icon={<Droplet className="w-5 h-5 text-purple-500" />}
            label="Period"
            value={
              lastPeriodDuration
                ? `${lastPeriodDuration}d`
                : "--"
            }
            bg="bg-purple-100"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-pink-500" />}
            label="Tracking"
            value={cycles.length ? "Active" : "Start"}
            bg="bg-pink-100"
          />
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/add")}
            className="w-full py-4 rounded-2xl bg-pink-500 text-white font-semibold shadow-lg flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Log Period
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="w-full py-4 rounded-2xl bg-white text-pink-500 font-semibold shadow-sm border-2 border-pink-200"
          >
            View Calendar
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ======================
   STAT CARD
   ====================== */
function StatCard({
  icon,
  label,
  value,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
      <div
        className={`w-10 h-10 ${bg} rounded-full flex items-center justify-center mx-auto mb-2`}
      >
        {icon}
      </div>
      <p className="text-xs text-gray-500 mb-1">
        {label}
      </p>
      <p className="text-lg font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}
