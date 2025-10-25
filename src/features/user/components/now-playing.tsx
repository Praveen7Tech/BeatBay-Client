"use client"

import { Volume2 } from "lucide-react"

interface NowPlayingProps {
  title?: string
  artist?: string
  image?: string
}

export function NowPlaying({
  title = "Munbe va",
  artist = "Shreya Ghoshal",
  image = "/abstract-album-cover.png",
}: NowPlayingProps) {
  return (
    <div className="bg-card rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-primary" />
          Now Playing
        </h3>
      </div>
      <div className="space-y-4">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full aspect-square object-cover rounded-lg" />
        <div>
          <h4 className="font-semibold text-foreground truncate">{title}</h4>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
        </div>
      </div>
    </div>
  )
}
