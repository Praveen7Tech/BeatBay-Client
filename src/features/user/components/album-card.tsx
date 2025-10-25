"use client"

import { Play } from "lucide-react"

interface AlbumCardProps {
  title: string
  artist: string
  image: string
  plays?: number
}

export function AlbumCard({ title, artist, image, plays }: AlbumCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative mb-4 rounded-lg overflow-hidden bg-card">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
          </div>
        </button>
      </div>
      <h3 className="font-semibold text-foreground truncate">{title}</h3>
      <p className="text-sm text-muted-foreground truncate">{artist}</p>
      {plays && <p className="text-xs text-muted-foreground mt-1">{plays.toLocaleString()} plays</p>}
    </div>
  )
}
