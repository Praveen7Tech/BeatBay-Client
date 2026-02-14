"use client"
import NowPlayingCard from "./now-playing-card"
import PrivateRoomCard from "./PrivateRoomCrad" 
import FriendsActivityCard from "./friends-activity" 
import { Link } from "react-router-dom"

export default function RightPanel() {
  return (
    <div className="w-80 bg-sidebar border-l border-[#2a2a2a] flex-col overflow-hidden hidden xl:flex ">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent scrollbar-hide">
        {/* Now Playing */}
        <div className="p-6 border-b border-[#2a2a2a]">
          <NowPlayingCard />
        </div>

        {/* Private Room */}
        <div className="p-6 border-b border-[#2a2a2a]">
          <h2 className="text-lg font-bold mb-4">PRIVATE ROOM</h2>
          <Link to={'/private-room'}>
          <PrivateRoomCard />
          </Link>
        </div>

        {/* Friends Activity */}
        <div className="p-6 border-[#2a2a2a]">
            <FriendsActivityCard />
        </div>
      </div>
    </div>
  )
}
