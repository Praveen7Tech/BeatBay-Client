"use client"
import { Home, Compass, Users, Heart } from "lucide-react"
import { NavLink } from "react-router-dom"

export default function BottomNavigation() {
  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Compass, label: "Discover", path: "/discover" },
    { icon: Users, label: "Artists", path: "/artists" },
    { icon: Heart, label: "Favorites", path: "/favorites" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#2a2a2a] flex justify-around items-center h-16 text-gray-400 lg:hidden z-50">
      {navItems.map(({ icon: Icon, label, path }) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center text-xs transition-colors ${
              isActive ? "text-[#00d084]" : "hover:text-white"
            }`
          }
        >
          <Icon className="w-5 h-5 mb-1" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
