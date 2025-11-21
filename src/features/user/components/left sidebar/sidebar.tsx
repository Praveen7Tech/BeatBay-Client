"use client"

import { useMutation } from "@tanstack/react-query";
import { Home, Compass, Users, Heart, Plus, Music, LucideIcon, PlusSquare } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../../services/userApi";
import { showError, showSuccess } from "@/core/utils/toast.config";
import { queryClient } from "@/core/hooks/artist/queryClientSetup";

export default function Sidebar() {
  const navigate = useNavigate()
  const HandleCreatePlayListMutation = useMutation({
    mutationFn: userApi.createPlaylist,
    onSuccess: (NewPlayListRespon)=>{
      showSuccess(`${NewPlayListRespon.name}`)
      queryClient.invalidateQueries({queryKey:["userPlayLists"]})
      navigate(`/playList/${NewPlayListRespon.id}`)
    },
    onError: (error)=>{
      console.error(error)
      showError("Playlist creation failed!")
    }
  })

  const HandleCreatePlayList = ()=>{
    HandleCreatePlayListMutation.mutate()
  }

  return (
    <div className="w-72 bg-[#131212] border-r border-[#322e2e] flex flex-col overflow-y-auto lg:flex">

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link to={'/home'}><NavItem icon={Home} label="Home" active /></Link>
        <NavItem icon={Compass} label="Discover" />
        <NavItem icon={Users} label="Artists" />
        <NavItem icon={Heart} label="Liked Songs" />
        <NavItem icon={PlusSquare} label="Create PlayList" />
      </nav>

      {/* Playlist Section */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Playlist</h3>
          <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" 
          onClick={HandleCreatePlayList}/>
        </div>
        <div className="space-y-2">
          <PlaylistItem label="PLAYLIST #1" />
          <PlaylistItem label="PLAYLIST #2" />
          <PlaylistItem label="PLAYLIST #3" />
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon: Icon, label, active = false }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
        active ? "bg-[#0dc682] text-black" : "text-gray-300 hover:bg-[#2a2a2a]"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

function PlaylistItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-[#2a2a2a] cursor-pointer transition-colors text-sm">
      <Music className="w-4 h-4" />
      <span>{label}</span>
    </div>
  )
}
