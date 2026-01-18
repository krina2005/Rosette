import { addDays, differenceInCalendarDays } from "date-fns";
import { showCycleNotification } from "./notifications";

type PeriodCycle = {
  startDate: string;
};

export function checkForReminders() {
  // 📦 Read saved cycles
  const cycles: PeriodCycle[] = JSON.parse(
    localStorage.getItem("cycles") || "[]"
  );

  // 🔔 Read reminder settings (from Settings page)
  const settings = {
    enabled: localStorage.getItem("remindersEnabled") === "true",
    daysBefore: Number(localStorage.getItem("reminderDays")) || 3,
  };

  // 🚫 Stop if reminders off or no data
  if (!settings.enabled || cycles.length === 0) return;

  /* ======================
     CALCULATE AVERAGE CYCLE
     ====================== */
  let averageCycle = 28;

  if (cycles.length >= 2) {
    const diffs: number[] = [];

    for (let i = 1; i < cycles.length; i++) {
      const diff = differenceInCalendarDays(
        new Date(cycles[i].startDate),
        new Date(cycles[i - 1].startDate)
      );
      diffs.push(diff);
    }

    averageCycle =
      Math.round(
        diffs.slice(-6).reduce((a, b) => a + b, 0) /
          diffs.slice(-6).length
      ) || 28;
  }

  /* ======================
     PREDICT NEXT CYCLE
     ====================== */
  const lastCycle = cycles[cycles.length - 1];

  const predictedStart = addDays(
    new Date(lastCycle.startDate),
    averageCycle
  );

  const reminderDate = addDays(
    predictedStart,
    -settings.daysBefore
  );

  const today = new Date();

  /* ======================
     TRIGGER NOTIFICATION
     ====================== */
  if (
    differenceInCalendarDays(reminderDate, today) === 0 ||
    differenceInCalendarDays(predictedStart, today) === 0
  ) {
    showCycleNotification();
  }
}
