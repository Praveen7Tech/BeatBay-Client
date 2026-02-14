"use client"
import { SearchBar } from "@/core/components/search/SearchBar"
import { RootState } from "@/core/store/store"
import { ChevronDown, Crown} from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { NotificationDropdown } from "./NotificationComponent"

export default function Navbar() {
  const user = useSelector((state: RootState)=> state.auth.user)
  const isPremium = user?.isPremium
  return (
    <nav className="fixed top-0 left-0 right-0 h-24 bg-background shadow-lg m-2 border border-b border-gray-800 z-50">
      <div className="flex items-center justify-between h-full px-6 gap-4">
        {/* Left Section - Logo and Back Button */}
        <div className="flex items-center gap-4 min-w-fit">
          <div className="flex items-center gap-2">
            <div className="ml-6">
              <img src='\logos\logo.name-w.png' width={125} alt="" />
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={()=> window.history.back()}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Center Section - Search Bar */}
       <div className="flex-1 max-w-lg">
        <SearchBar/>
      </div>
        {/* Right Section - Notification and Profile */}
        <div className="flex items-center gap-4 min-w-fit">
          {/* Notification Bell */}
          <NotificationDropdown/>

          {/* Profile Section */}
          <Link to='/profile'>
          <button
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900 rounded-lg transition-colors cursor-pointer group"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt={`${user.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    {/* {userInitials} */}
                  </div>
                )}
              </div>

            {/* Profile Info */}
            
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-white font-semibold text-lg">{user?.name}</span>
                {isPremium && (
                  <div className="flex items-center gap-1 text-yellow-400 text-xs">
                    <Crown className="w-4 h-4" />
                    <span>Premium</span>
                  </div>
                )}
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
