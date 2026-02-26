"use client"
import Navbar from "../../components/common/Navbar"
import RightPanel from "../../components/right sidebar/right-sidebar"
import { Outlet } from "react-router-dom"
import { MusicPlayer } from "../music_player/musicPlayer"
import { Sidebar } from "../../components/left sidebar/sidebar"
import { useSocket } from "@/core/hooks/socket/useSocket"
import { RoomPlayerProvider } from "@/core/context/RoomContext"
import { AudioPlayerProviderNew } from "@/core/context/AudioProvider"
import { usePrivateRoomListners } from "@/core/hooks/private-room/listners/usePrivateRoomListner"
import { useFriendsActivityListeners } from "@/core/hooks/private-room/listners/useFriendsActivityListner"

export default function UserLayout() {
  useSocket()
  useFriendsActivityListeners()
  usePrivateRoomListners()

  return (
    <RoomPlayerProvider>
      <AudioPlayerProviderNew>
        <div className="h-screen bg-black text-white overflow-hidden">

          {/* Navbar */}
          <Navbar />

          {/* Main layout area */}
          <div className="pt-24 pb-25 px-3 h-full">
            <div className="flex gap-3 h-full">

              {/* Left Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <main className="flex-1 bg-spotify-dark rounded-xl overflow-y-auto scrollbar-hide">
                <Outlet />
              </main>

              {/* Right Sidebar */}
              <RightPanel />

            </div>
          </div>

          {/* Player */}
          <MusicPlayer />
        </div>
      </AudioPlayerProviderNew>
    </RoomPlayerProvider>
  )
}