import { Link } from "react-router-dom";


export default function NotFound() {
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
          <h1 className="text-7xl font-bold bg-linear-to-r from-green-400 via-green-500 to-green-400 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <p className="text-xl text-gray-300 mt-4">Oops! Track not found</p>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          The page you're looking for seems to have skipped to another beat. Let's get you back on track.
        </p>

        {/* CTA Button */}
        <Link
          to={'/'}
          className="inline-block px-8 py-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Back to Home
        </Link>
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
