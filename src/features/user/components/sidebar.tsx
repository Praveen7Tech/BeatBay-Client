"use client"

import { Home, Compass, Users, Heart, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab?: string
}

export function Sidebar({ activeTab = "home" }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "discover", label: "Discover", icon: Compass },
    { id: "artists", label: "Artists", icon: Users },
    { id: "favourites", label: "Favourites", icon: Heart },
  ]

  const playlists = [
    { id: 1, name: "PLAYLIST #1" },
    { id: 2, name: "PLAYLIST #2" },
    { id: 3, name: "PLAYLIST #3" },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">♪</span>
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground">BeatBay</h1>
            <p className="text-xs text-muted-foreground">.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Playlists */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase">Playlist</h3>
          <button className="text-sidebar-primary hover:text-sidebar-primary-foreground">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              className="w-full text-left px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded transition-colors"
            >
              {playlist.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
