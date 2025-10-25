"use client"

import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from "lucide-react"
import { useState } from "react"

interface MusicPlayerProps {
  title?: string
  artist?: string
  image?: string
}

export function MusicPlayer({
  title = "Munbe va",
  artist = "Shreya Ghoshal",
  image = "/abstract-album-cover.png",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(45)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-8 py-4">
      <div className="flex items-center gap-6">
        {/* Album Info */}
        <div className="flex items-center gap-4 w-64">
          <img src={image || "/placeholder.svg"} alt={title} className="w-14 h-14 rounded object-cover" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{title}</p>
            <p className="text-xs text-muted-foreground truncate">{artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-background rounded transition-colors">
              <SkipBack className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
              ) : (
                <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
              )}
            </button>
            <button className="p-2 hover:bg-background rounded transition-colors">
              <SkipForward className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <div className="w-full max-w-xs flex items-center gap-2">
            <span className="text-xs text-muted-foreground">0:15</span>
            <div className="flex-1 h-1 bg-background rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">3:45</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-4 w-48">
          <button className="p-2 hover:bg-background rounded transition-colors">
            <Music className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1 h-1 bg-background rounded-full overflow-hidden">
            <div className="h-full bg-primary w-2/3" />
          </div>
          <button className="p-2 hover:bg-background rounded transition-colors">
            <Volume2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
