import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Info,
  Calendar as CalendarIcon,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

/* ======================
   TYPES
   ====================== */
type PeriodCycle = {
  startDate: string;
  endDate: string;
  note?: string;
};

/* ======================
   CALENDAR PAGE – ROSETTE
   ====================== */
export default function CalendarPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  /* ======================
     LOAD DATA (SAFE)
     ====================== */
  const cycles: PeriodCycle[] = JSON.parse(
    localStorage.getItem("cycles") || "[]"
  );

  /* ======================
     AVERAGE CYCLE
     ====================== */
  let averageCycle = 28;

  if (cycles.length >= 2) {
    const diffs: number[] = [];
    for (let i = 1; i < cycles.length; i++) {
      diffs.push(
        Math.abs(
          (new Date(cycles[i].startDate).getTime() -
            new Date(cycles[i - 1].startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );
    }
    averageCycle =
      Math.round(diffs.slice(-6).reduce((a, b) => a + b, 0) / diffs.slice(-6).length) ||
      28;
  }

  /* ======================
     PREDICTION (SAFE)
     ====================== */
  let predictedStart: Date | null = null;
  let predictedEnd: Date | null = null;

  if (cycles.length > 0) {
    const last = cycles[cycles.length - 1];
    predictedStart = new Date(last.startDate);
    predictedStart.setDate(predictedStart.getDate() + averageCycle);

    predictedEnd = new Date(predictedStart);
    predictedEnd.setDate(predictedEnd.getDate() + 4);
  }

  /* ======================
     MONTH HELPERS
     ====================== */
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendarDays: (Date | null)[] = [];

  for (let i = 0; i < startingDayOfWeek; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    calendarDays.push(new Date(year, month, d));

  /* ======================
     DAY CHECKS
     ====================== */
  const isToday = (day: Date) =>
    day.toDateString() === today.toDateString();

  const isPastPeriodDay = (day: Date) =>
    cycles.some((c) => {
      const s = new Date(c.startDate);
      const e = new Date(c.endDate);
      return day >= s && day <= e;
    });

  const isPredictedDay = (day: Date) =>
    predictedStart &&
    predictedEnd &&
    day >= predictedStart &&
    day <= predictedEnd;

  const isFertileWindow = (day: Date) => {
    if (!predictedStart) return false;
    const ovulation = new Date(predictedStart);
    ovulation.setDate(ovulation.getDate() - 14);

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 3);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 3);

    return day >= fertileStart && day <= fertileEnd;
  };

  const getDayInfo = (day: Date) =>
    cycles.find((c) => {
      const s = new Date(c.startDate);
      const e = new Date(c.endDate);
      return day >= s && day <= e;
    });

  /* ======================
     MONTH NAV
     ====================== */
  const changeMonth = (offset: number) => {
    const d = new Date(currentMonth);
    d.setMonth(d.getMonth() + offset);
    setCurrentMonth(d);
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDay(null);
  };

  /* ======================
     RENDER
     ====================== */
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-purple-50 pb-24"
    style={{
      background: "linear-gradient(to bottom, var(--bg-from), var(--bg-to))",
      color: "var(--text-main)",
    }}>
      <div className="w-full max-w-md mx-auto px-4 py-6">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={() => changeMonth(1)}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              Today
            </button>
          </div>
        </div>

        {/* WEEKDAYS */}
        <div className="grid grid-cols-7 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (d, i) => (
              <div
                key={i}
                className="text-center text-xs font-semibold text-gray-500 py-2"
              >
                {d}
              </div>
            )
          )}
        </div>

        {/* CALENDAR GRID */}
        <div className="bg-white rounded-3xl p-4 shadow-lg mb-6">
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, i) => {
              if (!day)
                return <div key={`e-${i}`} className="aspect-square" />;

              const past = isPastPeriodDay(day);
              const predicted = isPredictedDay(day);
              const fertile = isFertileWindow(day);
              const todayFlag = isToday(day);
              const selected =
                selectedDay &&
                day.toDateString() === selectedDay.toDateString();

              let bg = "bg-gray-50";
              let text = "text-gray-700";
              let ring = "";

              if (past) {
                bg = "bg-gradient-to-br from-pink-400 to-pink-500";
                text = "text-white font-semibold";
              } else if (predicted) {
                bg = "bg-gradient-to-br from-purple-300 to-purple-400";
                text = "text-white font-semibold";
              } else if (fertile) {
                bg = "bg-gradient-to-br from-green-100 to-green-200";
                text = "text-green-700";
              }

              if (todayFlag)
                ring = "ring-2 ring-pink-500 ring-offset-2";
              if (selected)
                ring = "ring-2 ring-purple-500 ring-offset-2";

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative
                    ${bg} ${text} ${ring}`}
                >
                  {day.getDate()}
                  {getDayInfo(day)?.note && (
                    <Circle className="w-1.5 h-1.5 fill-white absolute bottom-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SELECTED DAY INFO */}
        {selectedDay && (
          <div className="bg-linear-to-r from-pink-500 to-purple-500 rounded-2xl p-5 text-white shadow-lg mb-6">
            <h3 className="text-lg font-bold">
              {selectedDay.toLocaleDateString()}
            </h3>
            <p className="text-sm mt-1">
              {isPastPeriodDay(selectedDay) && "Period Day"}
              {isPredictedDay(selectedDay) && "Predicted Period"}
              {isFertileWindow(selectedDay) && "Fertile Window"}
              {!isPastPeriodDay(selectedDay) &&
                !isPredictedDay(selectedDay) &&
                !isFertileWindow(selectedDay) &&
                "No events"}
            </p>

            {getDayInfo(selectedDay)?.note && (
              <div className="mt-3 bg-white/20 rounded-xl p-3">
                Note: {getDayInfo(selectedDay)?.note}
              </div>
            )}
          </div>
        )}

        {/* LEGEND */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-pink-500" />
              <span className="font-semibold text-gray-800">
                Calendar Legend
              </span>
            </div>
            <ChevronRight
              className={`w-5 h-5 text-gray-400 transition-transform ${
                showLegend ? "rotate-90" : ""
              }`}
            />
          </button>

          {showLegend && (
            <div className="px-4 pb-4 space-y-3 text-sm text-gray-700">
              <LegendItem color="from-pink-400 to-pink-500" label="Past Period" />
              <LegendItem color="from-purple-300 to-purple-400" label="Predicted Period" />
              <LegendItem color="from-green-100 to-green-200" label="Fertile Window" />
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

/* ======================
   LEGEND ITEM
   ====================== */
function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl bg-linear-to-br ${color}`}
      />
      <span>{label}</span>
    </div>

  );
}
