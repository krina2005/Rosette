import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center bg-linear-to-b from-pink-50 to-lilac-100"
      style={{
        background: "linear-gradient(to bottom, var(--bg-from), var(--bg-to))",
        color: "var(--text-main)",
      }}>
      {/* Mobile container */}
      <div className="w-full max-w-md px-5 py-10">

        {/* 🌸 HERO */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-pink-600 mb-3">
            Rosette
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed">
            Track your cycle. Understand your body.  
            <br /> Stay private and in control.
          </p>
        </div>

        {/* 🌷 FEATURE CARDS */}
        <div className="space-y-4 mb-10">
          <FeatureCard
            title="Track Your Period"
            description="Log start and end dates easily with a simple, clean interface."
          />

          <FeatureCard
            title="Cycle Prediction"
            description="Predict your next cycle using your past data."
          />

          <FeatureCard
            title="Discreet Reminders"
            description="Get gentle notifications with privacy-friendly messages."
          />

          <FeatureCard
            title="Privacy First"
            description="Your data stays on your device. No accounts. No cloud."
          />
        </div>

        {/* 🔐 PRIVACY NOTE */}
        <div className="bg-white/70 rounded-2xl p-4 text-center mb-8">
          <p className="text-xs text-gray-600">
            Rosette does not collect, store, or share any personal health data.
            Everything stays safely on your device.
          </p>
        </div>

        {/* 🌺 CTA BUTTON */}
        <button
          onClick={() => navigate("/home")}
          className="w-full py-3 rounded-full bg-pink-500 text-white font-semibold text-lg shadow-md active:scale-95 transition"
        >
          Start Tracking
        </button>
      </div>
    </div>
  );
}

/* 🌸 Reusable Feature Card */
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/80 rounded-2xl p-4 shadow-sm">
      <h3 className="text-pink-600 font-semibold mb-1 text-sm">
        {title}
      </h3>
      <p className="text-xs text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
