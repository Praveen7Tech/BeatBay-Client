import { Link, useLocation } from "react-router-dom"

export function Navbar() {
  const { pathname } = useLocation()

  const getActive = (path: string) =>
    pathname.includes(path)
      ? "text-white border-b-2 border-white pb-1"
      : "text-gray-400 hover:text-white"

  return (
    <nav className="bg-linear-to-b from-gray-900 to-black border-b border-gray-800 sticky top-0 z-50">
      <div className="w-[80%] mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Left side — logo + text */}
        <Link to="/artist-dashboard" className="flex items-center gap-3">
          <img src="/logos/logo-w.png" width={60} alt="Logo" />
          <span className="text-white font-extrabold text-2xl italic leading-tight">
            Music<br />Artist
          </span>
        </Link>

        {/* Center navigation */}
        <div className="flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
          <Link to="/artist-dashboard" className={`text-lg font-semibold ${getActive("dashboard")}`}>
            Dashboard
          </Link>
          <Link to="/artist-songs" className={`text-lg font-semibold ${getActive("songs")}`}>
            Songs
          </Link>
          <Link to="/artist-albums" className={`text-lg font-semibold ${getActive("albums")}`}>
            Albums
          </Link>
          <Link to="/artist-profile" className={`text-lg font-semibold ${getActive("profile")}`}>
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}
