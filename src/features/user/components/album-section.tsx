"use client"

import { ChevronRight } from "lucide-react"
import { AlbumCard } from "./album-card"

interface Album {
  id: string
  title: string
  artist: string
  image: string
  plays?: number
}

interface AlbumSectionProps {
  title: string
  albums: Album[]
  showAll?: boolean
}

export function AlbumSection({ title, albums, showAll = true }: AlbumSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showAll && (
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm">Show All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {albums.map((album) => (
          <AlbumCard key={album.id} title={album.title} artist={album.artist} image={album.image} plays={album.plays} />
        ))}
      </div>
    </section>
  )
}
