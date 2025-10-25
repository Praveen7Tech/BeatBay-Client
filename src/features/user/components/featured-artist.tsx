"use client"

import { Play, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeaturedArtistProps {
  name: string
  verified?: boolean
  listeners: number
  image?: string
}

export function FeaturedArtist({
  name = "A R Rahman",
  verified = true,
  listeners = 67856,
  image = "/artist-with-headphones.jpg",
}: FeaturedArtistProps) {
  return (
    <div className="bg-gradient-to-r from-card to-card/50 rounded-2xl overflow-hidden p-8 flex items-center gap-8 mb-8">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">✓ Verified Artist</span>
        </div>
        <h2 className="text-4xl font-bold mb-4">{name}</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">♪</span>
            <span className="text-sm text-muted-foreground">{listeners.toLocaleString()} listeners</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8">
            <Play className="w-4 h-4" />
            PLAY
          </Button>
          <Button
            variant="outline"
            className="border-foreground/20 text-foreground hover:bg-card gap-2 px-8 bg-transparent"
          >
            <Check className="w-4 h-4" />
            FOLLOWING
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-64 object-cover rounded-xl" />
      </div>
    </div>
  )
}
