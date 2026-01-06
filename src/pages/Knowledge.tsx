import { useState } from "react";
import BottomNav from "../components/BottomNav";
import { ChevronDown } from "lucide-react";

export default function Knowledge() {
  // TEMP cycle phase (later calculate from real data)
  const currentPhase: "menstrual" | "follicular" | "ovulation" | "luteal" =
    "luteal";

  const tipsByPhase = {
    menstrual: "Rest more, stay hydrated, and be gentle with your body 💗",
    follicular: "Great time to start new habits and light workouts 🌱",
    ovulation: "You may feel confident and energetic — socialize and shine ✨",
    luteal: "Slow down, prioritize sleep, and reduce stress 🌙",
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-purple-100 pb-24">
      <div className="w-full max-w-md mx-auto px-5 py-6 space-y-6">

        {/* 🌸 HEADER */}
        <h2 className="text-center text-xl font-semibold text-pink-600">
          Learn About Your Cycle
        </h2>

        {/* 🌷 ROTATING TIP */}
        <InfoCard title="Today’s Tip 💡">
          <p>{tipsByPhase[currentPhase]}</p>
        </InfoCard>

        {/* 🌺 CYCLE PHASES VISUAL */}
        <InfoCard title="Menstrual Cycle Phases">
          <div className="grid grid-cols-2 gap-3">
            <PhaseCard emoji="🌸" title="Menstrual" />
            <PhaseCard emoji="🌱" title="Follicular" />
            <PhaseCard emoji="✨" title="Ovulation" />
            <PhaseCard emoji="🌙" title="Luteal" />
          </div>
        </InfoCard>

        {/* 🌼 WHAT IS MENSTRUATION */}
        <InfoCard title="What is menstruation?">
          <p>
            Menstruation is a natural monthly process where the uterus sheds its
            lining. It’s a healthy sign that your reproductive system is working
            properly.
          </p>
        </InfoCard>

        {/* ❓ FAQ SECTION */}
        <InfoCard title="FAQs">
          <FAQ
            question="Is it normal to have irregular periods?"
            answer="Yes. Stress, travel, lifestyle changes, and health can affect your cycle."
          />
          <FAQ
            question="How long should a normal cycle be?"
            answer="Most cycles range between 21–35 days."
          />
          <FAQ
            question="When should I see a doctor?"
            answer="If periods are extremely painful, very irregular, or absent for months."
          />
        </InfoCard>

        {/* 🔒 DISCLAIMER */}
        <div className="bg-white/70 rounded-2xl p-4 text-center">
          <p className="text-[11px] text-gray-600 leading-relaxed">
            This content is for educational purposes only and does not replace
            professional medical advice.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* 🌸 REUSABLE INFO CARD */
function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/85 rounded-3xl p-5 shadow-sm space-y-2">
      <h3 className="text-pink-500 font-semibold text-sm">{title}</h3>
      <div className="text-xs text-gray-600 leading-relaxed space-y-1">
        {children}
      </div>
    </div>
  );
}

/* 🌺 PHASE CARD */
function PhaseCard({
  emoji,
  title,
}: {
  emoji: string;
  title: string;
}) {
  return (
    <div className="bg-pink-50 rounded-2xl p-4 text-center">
      <div className="text-2xl mb-1">{emoji}</div>
      <p className="text-xs font-medium text-gray-700">{title}</p>
    </div>
  );
}

/* ❓ FAQ ITEM */
function FAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-pink-100 py-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-xs font-medium text-gray-700">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <p className="text-xs text-gray-600 mt-2">{answer}</p>
      )}
    </div>
  );
}
