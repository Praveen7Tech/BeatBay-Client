export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-8">
        {/* Vinyl Record Spinner */}
        <div className="relative w-24 h-24">
          {/* Outer vinyl record */}
          <div
            className="absolute inset-0 rounded-full bg-black border-8 border-gray-800 animate-spin"
            style={{ animationDuration: "3s" }}
          >
            {/* Vinyl grooves */}
            <div className="absolute inset-2 rounded-full border-2 border-gray-700" />
            <div className="absolute inset-4 rounded-full border border-gray-600" />

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-green-500" />
            </div>
          </div>

          {/* Sound wave pulses */}
          <div
            className="absolute inset-0 rounded-full border-2 border-green-500 animate-pulse"
            style={{ animationDuration: "1.5s" }}
          />
        </div>

        {/* Loading text with music note */}
        <div className="flex items-center gap-2">
          <span className="text-green-500 text-lg font-semibold">♪</span>
          <p className="text-gray-300 font-medium">Playing...</p>
          <span className="text-green-500 text-lg font-semibold animate-bounce" style={{ animationDuration: "0.6s" }}>
            ♪
          </span>
        </div>
      </div>
    </div>
  )
}
