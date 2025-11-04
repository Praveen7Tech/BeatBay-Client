"use client"

import NowPlayingCard from "./now-playing-card"
import PrivateRoomCard from "./private-room" 
import FriendsActivityCard from "./friends-activity" 

export default function RightPanel() {
  return (
    <div className="w-80 bg-[#1a1a1a] border-l border-[#2a2a2a] flex-col overflow-hidden hidden xl:flex">
      

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
        {/* Now Playing */}
        <div className="p-6 border-b border-[#2a2a2a]">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            Now Playing
            <svg className="w-4 h-4 text-[#00d084]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </h2>
          <NowPlayingCard />
        </div>

        {/* Private Room */}
        <div className="p-6 border-b border-[#2a2a2a]">
          <h2 className="text-lg font-bold mb-4">PRIVATE ROOM</h2>
          <PrivateRoomCard />
        </div>

        {/* Friends Activity */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            FRIENDS ACTIVITY
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <FriendsActivityCard key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
