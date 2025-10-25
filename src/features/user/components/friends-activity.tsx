"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Friend {
  id: string
  name: string
  status: string
  avatar: string
}

interface FriendsActivityProps {
  friends?: Friend[]
}

export function FriendsActivity({
  friends = [
    { id: "1", name: "Rohith Krishna", status: "listening", avatar: "/user-avatar.jpg" },
    { id: "2", name: "Allwin P G", status: "listening", avatar: "/user-avatar.jpg" },
    { id: "3", name: "Felwin Shaji", status: "listening", avatar: "/user-avatar.jpg" },
    { id: "4", name: "Devan", status: "listening", avatar: "/user-avatar.jpg" },
  ],
}: FriendsActivityProps) {
  return (
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
  )
}
