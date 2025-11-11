"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

interface NavbarProps {
  onNavigate: (page: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activeNav, setActiveNav] = useState<string>("home")

  const navItems = ["Home", "Features", "Artists", "Resources"]

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="w-[90%] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
            <img src="/logos/logo-w.png" width={60} alt="" />
          <span className="text-white font-bold text-xl">BeatBay</span>
        </div>

        {/* Nav Items */}
        <div className="flex gap-8">
          {navItems.map((item) => {
            const itemKey = item.toLowerCase()
            const isActive = activeNav === itemKey
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveNav(itemKey)
                  onNavigate(itemKey)
                }}
                className={`text-md font-medium transition-all duration-300 ${
                  isActive ? "text-green-500" : "text-white/70 hover:text-green-500"
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
            <Link to={'/artist'}><button className="px-4 py-2 text-white text-md hover:text-green-500 transition-colors">Log in</button></Link>
          
          <button className="px-6 py-2 bg-green-500 text-black text-md font-semibold rounded-full hover:bg-green-400 transition-colors">
            Get access
          </button>
        </div>
      </div>
    </nav>
  )
}
