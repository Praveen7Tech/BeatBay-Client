// Navbar.tsx
import { Link, useLocation } from "react-router-dom"

export function Navbar() {
  const { pathname } = useLocation()

  const getActive = (path: string) =>
    pathname.includes(path) ? "text-white border-b-2 border-white pb-1" : "text-gray-400 hover:text-white"

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/artist-dashboard" className="text-white font-bold text-xl italic">
          Music<br />Artist
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/artist-dashboard" className={`text-sm font-medium ${getActive("dashboard")}`}>
            Dashboard
          </Link>
          <Link to="/artist-songs" className={`text-sm font-medium ${getActive("songs")}`}>
            Songs
          </Link>
          <Link to="/artist-albums" className={`text-sm font-medium ${getActive("albums")}`}>
            Albums
          </Link>
          <Link to="/artist-profile" className={`text-sm font-medium ${getActive("profile")}`}>
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}
