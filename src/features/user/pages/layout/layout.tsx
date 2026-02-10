"use client"
import Navbar from "../../components/common/Navbar" 
import RightPanel from "../../components/right sidebar/right-sidebar" 
import { Outlet } from "react-router-dom"
import { MusicPlayer } from "../song/musicPlayer"
import { Sidebar } from "../../components/left sidebar/sidebar"
import { useSocket } from "@/core/hooks/socket/useSocket"
import { RoomPlayerProvider } from "@/core/context/RoomContext"
import { AudioPlayerProviderNew } from "@/core/context/AudioProvider"

export default function UserLayout() {
  useSocket()
  return (
      <RoomPlayerProvider>
        <AudioPlayerProviderNew>
      <div className="h-screen bg-[#0f0f0f] text-white overflow-hidden flex flex-col">
        <Navbar />
        <div className="flex flex-1 overflow-hidden pt-24 pb-20">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-[#0f0f0f] scrollbar-hide">
            <Outlet />
          </div>
          <RightPanel />
        </div>
          <MusicPlayer />      
      </div>
       </AudioPlayerProviderNew>
      </RoomPlayerProvider>
  )
}
