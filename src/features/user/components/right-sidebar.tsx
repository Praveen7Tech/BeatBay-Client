"use client"

import { Volume2, Mic, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Friend {
  id: string
  name: string
  status: string
  avatar: string
}

interface RightSidebarProps {
  nowPlaying?: {
    title: string
    artist: string
    image: string
  }
  friends?: Friend[]
}

export function RightSidebar({
  nowPlaying = {
    title: "Munbe va",
    artist: "Shreya Ghoshal",
    image: "/abstract-album-cover.png",
  },
  friends = [
    { id: "1", name: "Rohith Krishna", status: "listening", avatar: "/user-avatar.jpg" },
    { id: "2", name: "Allwin P G", status: "listening", avatar: "/user-avatar.jpg" },
    { id: "3", name: "Felwin Shaji", status: "listening", avatar: "/user-avatar.jpg" },
    { id: "4", name: "Devan", status: "listening", avatar: "/user-avatar.jpg" },
  ],
}: RightSidebarProps) {
  return (
    <aside className="w-80 flex-shrink-0 flex flex-col gap-6">
      {/* Now Playing Section */}
      <div className="bg-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary" />
            Now Playing
          </h3>
        </div>
        <div className="space-y-4">
          <img
            src={nowPlaying.image || "/placeholder.svg"}
            alt={nowPlaying.title}
            className="w-full aspect-square object-cover rounded-lg"
          />
          <div>
            <h4 className="font-semibold text-foreground truncate">{nowPlaying.title}</h4>
            <p className="text-sm text-muted-foreground truncate">{nowPlaying.artist}</p>
          </div>
        </div>
      </div>

      {/* Private Room Section */}
      <div className="bg-card rounded-xl p-6">
        <h3 className="font-bold text-foreground mb-4">PRIVATE ROOM</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Mic className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">Oops... currently no session</p>
        </div>
      </div>

      {/* Friends Activity Section */}
      <div className="bg-card rounded-xl p-6">
        <h3 className="font-bold text-foreground mb-4">FRIENDS ACTIVITY</h3>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <img
                  src={friend.avatar || "/placeholder.svg"}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">♪ {friend.status}</p>
                </div>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1 ml-2">
                <Plus className="w-3 h-3" />
                JOIN
              </Button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
