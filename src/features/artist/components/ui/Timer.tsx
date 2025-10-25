import { useEffect, useState } from "react";

interface TimerProps {
  duration?: number;
  onExpire?: () => void;
}

export function Timer({ duration = 90, onExpire }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <p className="text-white/80 text-sm text-center">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </p>
  );
}
