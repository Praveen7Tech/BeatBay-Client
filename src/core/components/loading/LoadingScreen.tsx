"use client"

export function MusicLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-8">
        {/* Sound wave bars */}
        <div className="flex items-end gap-1.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 rounded-full bg-emerald-500"
              style={{
                height: "40px",
                animation: `soundWave 1s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-medium tracking-wider text-emerald-500">Loading</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                style={{
                  animation: `dotPulse 1.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes soundWave {
          0%,
          100% {
            height: 12px;
            opacity: 0.5;
          }
          50% {
            height: 40px;
            opacity: 1;
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
