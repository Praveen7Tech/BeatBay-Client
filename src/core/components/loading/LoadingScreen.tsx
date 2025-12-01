"use client"

export function MusicLoader() {
  return (
   <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Animated music bars - green theme */}
        <div className="flex justify-center gap-2 h-20">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 bg-linear-to-t from-green-500 to-green-400 rounded-full"
              style={{
                animation: `bounce 0.6s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
                height: `${40 + i * 20}px`,
              }}
            />
          ))}
        </div>

        {/* 404 Text */}
        <div>
          <h1 className="text-xl mt-4 bg-linear-to-r from-green-400 via-green-500 to-green-400 bg-clip-text text-transparent animate-pulse">
            Loading ...
          </h1>
          <p className="text-xl text-gray-300 mt-4">Oops! Track not found</p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
