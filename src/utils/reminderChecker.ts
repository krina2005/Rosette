import { addDays, differenceInCalendarDays } from "date-fns";
import { showCycleNotification } from "./notifications";

type PeriodCycle = {
  startDate: string;
};

type ReminderSettings = {
  enabled: boolean;
  daysBefore: number;
};

export function checkForReminders() {
  const cycles: PeriodCycle[] =
    JSON.parse(localStorage.getItem("cycles") || "[]");

  const settings: ReminderSettings =
    JSON.parse(
      localStorage.getItem("reminderSettings") ||
        '{"enabled":false,"daysBefore":3}'
    );

  if (!settings.enabled || cycles.length === 0) return;

  // --- Calculate average cycle length ---
  let averageCycle = 28;

  if (cycles.length >= 2) {
    const diffs: number[] = [];
    for (let i = 1; i < cycles.length; i++) {
      const diff =
        differenceInCalendarDays(
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

  if (
    differenceInCalendarDays(reminderDate, today) === 0 ||
    differenceInCalendarDays(predictedStart, today) === 0
  ) {
    showCycleNotification();
  }
}
