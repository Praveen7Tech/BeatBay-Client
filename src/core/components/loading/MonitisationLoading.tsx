import { DollarSign, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface MonetizationLoadingOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const steps = [
  "Setting up your account…",
  "Connecting payment gateway…",
  "Activating monetization…",
];

export const MonetizationLoadingOverlay = ({ isVisible, onComplete }: MonetizationLoadingOverlayProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isVisible) { setStepIndex(0); setDone(false); return; }

    const timers = steps.map((_, i) =>
      setTimeout(() => setStepIndex(i), i * 1200)
    );
    const finish = setTimeout(() => setDone(true), steps.length * 1200);
    const complete = setTimeout(() => onComplete?.(), steps.length * 1200 + 1000);

    return () => { timers.forEach(clearTimeout); clearTimeout(finish); clearTimeout(complete); };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        {/* Animated icon */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" style={{ animation: "spin 6s linear infinite" }} />
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-primary/30" style={{ animation: "spin 4s linear infinite reverse" }} />
          <div className="absolute w-14 h-14 rounded-full bg-primary/15 blur-xl" style={{ animation: "pulse 2s ease-in-out infinite" }} />
          <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30">
            {done ? (
              <Check className="w-7 h-7 text-primary animate-scale-in" />
            ) : (
              <DollarSign className="w-7 h-7 text-primary" style={{ animation: "pulse 1.4s ease-in-out infinite" }} />
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-foreground text-lg font-semibold">
            {done ? "You're all set!" : steps[stepIndex]}
          </h3>
          <div className="flex gap-1.5 mt-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i <= stepIndex ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.6)]" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
