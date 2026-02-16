import { useState, useEffect } from "react";
import { Music, Cloud, Check } from "lucide-react";

type UploadPhase = "preparing" | "uploading" | "processing" | "complete";

interface UploadAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const phaseConfig: Record<UploadPhase, { label: string; sublabel: string }> = {
  preparing: { label: "Preparing your track", sublabel: "Analyzing audio files..." },
  uploading: { label: "Uploading to cloud", sublabel: "Sending your music to the world..." },
  processing: { label: "Processing audio", sublabel: "Optimizing for streaming platforms..." },
  complete: { label: "Upload Complete!", sublabel: "Your track is ready to shine" },
};

const phases: UploadPhase[] = ["preparing", "uploading", "processing", "complete"];

export default function UploadAnimation({ isVisible, onComplete }: UploadAnimationProps) {
  const [phase, setPhase] = useState<UploadPhase>("preparing");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setPhase("preparing");
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.8;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (progress < 25) setPhase("preparing");
    else if (progress < 65) setPhase("uploading");
    else if (progress < 95) setPhase("processing");
    else setPhase("complete");
  }, [progress]);

  useEffect(() => {
    if (phase === "complete" && progress >= 100) {
      const t = setTimeout(() => onComplete?.(), 1500);
      return () => clearTimeout(t);
    }
  }, [phase, progress, onComplete]);

  if (!isVisible) return null;

  const currentPhaseIndex = phases.indexOf(phase);
  const { label, sublabel } = phaseConfig[phase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center gap-8 p-10">

        {/* Animated rings */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            style={{ animation: "spin 8s linear infinite" }}
          />
          {/* Middle ring */}
          <div
            className="absolute inset-3 rounded-full border-2 border-dashed border-primary/30"
            style={{ animation: "spin 5s linear infinite reverse" }}
          />
          {/* Inner ring */}
          <div
            className="absolute inset-6 rounded-full border-2 border-primary/40"
            style={{ animation: "spin 3s linear infinite" }}
          />

          {/* Glow backdrop */}
          <div
            className="absolute w-20 h-20 rounded-full bg-primary/20 blur-xl"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />

          {/* Center icon */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30">
            {phase === "complete" ? (
              <Check className="w-8 h-8 text-primary animate-scale-in" />
            ) : phase === "uploading" ? (
              <Cloud className="w-8 h-8 text-primary" style={{ animation: "bounce 1.4s ease-in-out infinite" }} />
            ) : (
              <Music className="w-8 h-8 text-primary" style={{ animation: "pulse 1.6s ease-in-out infinite" }} />
            )}
          </div>

          {/* Floating particles */}
          {phase !== "complete" &&
            Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
                style={{
                  animation: `float-particle 3s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                  top: "50%",
                  left: "50%",
                }}
              />
            ))}
        </div>

        {/* Progress bar */}
        <div className="w-72">
          <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-muted-foreground text-xs text-right mt-1.5 tabular-nums">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Labels */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground animate-fade-in" key={label}>
            {label}
          </h2>
          <p className="text-sm text-muted-foreground" key={sublabel}>
            {sublabel}
          </p>
        </div>

        {/* Phase steps */}
        <div className="flex items-center gap-3 mt-2">
          {phases.map((p, i) => (
            <div key={p} className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  i <= currentPhaseIndex
                    ? "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
                    : "bg-muted"
                }`}
              />
              {i < phases.length - 1 && (
                <div
                  className={`w-8 h-px transition-all duration-500 ${
                    i < currentPhaseIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Soundwave bars */}
        {phase !== "complete" && (
          <div className="flex items-end gap-1 h-6 mt-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-primary/50"
                style={{
                  animation: `soundwave 0.8s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.07}s`,
                  height: "4px",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(30px, -40px) scale(1.2); opacity: 1; }
          50% { transform: translate(-20px, -60px) scale(0.8); opacity: 0.4; }
          75% { transform: translate(-35px, -25px) scale(1.1); opacity: 0.8; }
        }
        @keyframes soundwave {
          0% { height: 4px; }
          100% { height: 22px; }
        }
      `}</style>
    </div>
  );
}
