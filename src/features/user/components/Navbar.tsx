"use client"

import { RootState } from "@/core/store/store"
import { Search, Bell, ChevronDown } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

interface NavbarProps {
  onProfileClick?: () => void
  onBackClick?: () => void
}

export default function Navbar({ onProfileClick, onBackClick }: NavbarProps) {
  const user = useSelector((state: RootState)=> state.auth.user)
  console.log("img", user?.profilePicture)
  return (
    <nav className="fixed top-0 left-0 right-0 h-24 bg-black border-b border-gray-800 z-50">
      <div className="flex items-center justify-between h-full px-6 gap-4">
        {/* Left Section - Logo and Back Button */}
        <div className="flex items-center gap-4 min-w-fit">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-green-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">BeatBay</span>
              <span className="text-gray-400 text-xs">.com</span>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={onBackClick}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="find your favourite song...."
              className="w-full bg-gray-900 text-white placeholder-gray-500 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
          </div>
        </div>

        {/* Right Section - Notification and Profile */}
        <div className="flex items-center gap-4 min-w-fit">
          {/* Notification Bell */}
          <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors" aria-label="Notifications">
            <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </button>

          {/* Profile Section */}
          <Link to='/profile'>
          <button
            onClick={onProfileClick}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900 rounded-lg transition-colors cursor-pointer group"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={`${user.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    {/* {userInitials} */}
                  </div>
                )}
              </div>

            {/* Profile Info */}
            
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-white font-semibold text-lg">{user?.name}</span>
              <span className="text-gray-400 text-xs">Premium</span>
            </div>
            

            {/* Dropdown Arrow */}
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
