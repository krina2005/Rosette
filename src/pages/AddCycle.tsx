import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Droplet,
  AlertCircle,
  Save,
  X,
  Check,
} from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function AddCycle() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inputMethod, setInputMethod] =
    useState<"endDate" | "duration">("duration");
  const [duration, setDuration] = useState<number | "">("");
  const [flowIntensity, setFlowIntensity] =
    useState<"light" | "medium" | "heavy" | "">("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const commonSymptoms = [
    "😓 Cramps",
    "🤕 Headache",
    "😴 Fatigue",
    "🎭 Mood swings",
    "🤢 Nausea",
    "💪 Back pain",
    "🍫 Cravings",
    "😰 Bloating",
  ];

  const durationPresets = [3, 4, 5, 6, 7];

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const calculateEndDate = (start: string, days: number) => {
    const d = new Date(start);
    d.setDate(d.getDate() + days - 1);
    return d.toISOString().split("T")[0];
  };

  const handleSave = () => {
    if (!startDate) {
      alert("Please select a start date");
      return;
    }

    let finalEndDate = endDate;

    if (inputMethod === "duration" && duration) {
      finalEndDate = calculateEndDate(startDate, Number(duration));
    }

    if (!finalEndDate) {
      alert("Please provide end date or duration");
      return;
    }

    const newCycle = {
      id: Date.now().toString(),
      startDate,
      endDate: finalEndDate,
      flowIntensity: flowIntensity || undefined,
      symptoms: symptoms.length ? symptoms : undefined,
      note: note.trim() || undefined,
    };

    const existing = JSON.parse(localStorage.getItem("cycles") || "[]");
    existing.push(newCycle);
    localStorage.setItem("cycles", JSON.stringify(existing));

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/home");
    }, 1800);
  };

  const resetForm = () => {
    setStartDate("");
    setEndDate("");
    setDuration("");
    setFlowIntensity("");
    setSymptoms([]);
    setNote("");
    setInputMethod("duration");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-purple-50 pb-24"
     style={{
        background: "linear-gradient(to bottom, var(--bg-from), var(--bg-to))",
        color: "var(--text-main)",
      }}>
      <div className="w-full max-w-md mx-auto px-5 py-6">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Log Your Period
          </h2>
          <p className="text-sm text-gray-500">
            Track your cycle to get accurate predictions
          </p>
        </div>

        {/* MAIN FORM */}
        <div className="bg-white rounded-3xl p-6 shadow-lg space-y-6 mb-6">

          {/* START DATE */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 text-pink-500" />
              Period Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="w-full rounded-xl border-2 border-pink-200 px-4 py-3 text-sm"
            />
          </div>

          {/* INPUT METHOD */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              How would you like to enter the end date?
            </label>
            <div className="flex gap-2">
              {["duration", "endDate"].map((m) => (
                <button
                  key={m}
                  onClick={() => setInputMethod(m as any)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${
                    inputMethod === m
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {m === "duration" ? "Duration (Days)" : "End Date"}
                </button>
              ))}
            </div>
          </div>

          {/* DURATION */}
          {inputMethod === "duration" && (
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Period Duration
              </label>

              <div className="flex gap-2 mb-3">
                {durationPresets.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-2 rounded-lg ${
                      duration === d
                        ? "bg-pink-500 text-white"
                        : "bg-pink-50 text-pink-600"
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full rounded-xl border-2 border-pink-200 px-4 py-3 text-sm"
              />

              {duration && startDate && (
                <p className="mt-2 text-xs text-gray-500">
                  End date: {calculateEndDate(startDate, Number(duration))}
                </p>
              )}
            </div>
          )}

          {/* END DATE */}
          {inputMethod === "endDate" && (
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Period End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                max={new Date().toISOString().split("T")[0]}
                className="w-full rounded-xl border-2 border-pink-200 px-4 py-3 text-sm"
              />
            </div>
          )}
        </div>

        {/* FLOW INTENSITY */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
            <Droplet className="w-4 h-4 text-pink-500" />
            Flow Intensity
          </label>

          <div className="grid grid-cols-3 gap-3">
            {(["light", "medium", "heavy"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFlowIntensity(f)}
                className={`py-3 rounded-xl text-sm font-medium capitalize ${
                  flowIntensity === f
                    ? "bg-pink-500 text-white"
                    : "bg-pink-50 text-pink-600"
                }`}
              >
                {f === "light" && "💧"}
                {f === "medium" && "💧💧"}
                {f === "heavy" && "💧💧💧"}
                <br />
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* SYMPTOMS */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
            <AlertCircle className="w-4 h-4 text-pink-500" />
            Symptoms
          </label>

          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  symptoms.includes(s)
                    ? "bg-pink-500 text-white"
                    : "bg-pink-50 text-pink-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* NOTES */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Additional Notes (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className="w-full rounded-xl border-2 border-pink-200 px-4 py-3 text-sm resize-none"
          />
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-2xl bg-pink-500 text-white font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Cycle
          </button>

          <button
            onClick={resetForm}
            className="w-full py-4 rounded-2xl bg-white border text-gray-600 flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Clear Form
          </button>
        </div>

        {/* QUICK TIP */}
        <div className="mt-6 bg-pink-50 rounded-2xl p-4 border border-pink-100">
          <p className="text-sm font-medium text-gray-800 mb-1">
            💡 Quick Tip
          </p>
          <p className="text-xs text-gray-600">
            Log at least 3 cycles for the most accurate predictions.
          </p>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl animate-scale-in">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold">Cycle Saved!</h3>
          </div>
        </div>
      )}

      {/* REAL NAVBAR */}
      <BottomNav />

      <style>{`
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
