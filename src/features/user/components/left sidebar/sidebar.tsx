"use client"

import { Home, Compass, Users, Heart, Plus, Music } from "lucide-react"
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-72 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col overflow-y-auto lg:flex">

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <Link to={'/home'}><NavItem icon={Home} label="Home" active /></Link>
        <NavItem icon={Compass} label="Discover" />
        <NavItem icon={Users} label="Artists" />
        <NavItem icon={Heart} label="Favourites" />
      </nav>

      {/* Playlist Section */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Playlist</h3>
          <Plus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
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

function NavItem({ icon: Icon, label, active = false }: { icon: any; label: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
        active ? "bg-[#00d084] text-black" : "text-gray-300 hover:bg-[#2a2a2a]"
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
