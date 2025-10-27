"use client"

export default function ProfileSection() {
  return (
    <div  className="flex items-center justify-between px-6 py-6 border-b border-[#2a2a2a]">
      {/* Notification Bell */}
      <button className="p-2 hover:bg-[#2a2a2a] rounded-full transition-colors">    
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      {/* User Profile */}
      <div className="flex items-center gap-3 flex-1 ml-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d084] to-[#00a86b] flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-black">PM</span>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">PRAVEEN MELETHIL</p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            Premium <span className="text-[#00d084]">●</span>
          </p>
        </div>

        {/* Dropdown */}
        <button className="p-1 hover:bg-[#2a2a2a] rounded transition-colors flex-shrink-0">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  )
}
