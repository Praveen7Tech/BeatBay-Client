import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Animated Lock Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-20 animate-pulse" />
            <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center border-2 border-green-500">
              <svg className="w-12 h-12 text-green-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1C6.48 1 2 5.48 2 11v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-5.52-4.48-10-10-10zm0 2c4.41 0 8 3.59 8 8v2H4v-2c0-4.41 3.59-8 8-8zm-1 10h2v4h-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          401
        </h1>
        <h2 className="text-2xl font-semibold text-white mb-3">Access Denied</h2>
        <p className="text-gray-400 mb-8">
          You don't have permission to access this resource. Please log in to continue.
        </p>

        {/* Animated Button */}
        <Link to={'/login'}>
          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50">
            Go to Login
          </button>
        </Link>

        {/* Back Link */}
        <Link to={'/'}>
          <p className="text-green-500 hover:text-green-400 mt-6 transition-colors cursor-pointer">← Back to Home</p>
        </Link>
      </div>
    </div>
  )
}
