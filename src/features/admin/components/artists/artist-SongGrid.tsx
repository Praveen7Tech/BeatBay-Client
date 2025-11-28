"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Music, ChevronLeft, ChevronRight } from "lucide-react"
import { ArtistSong } from "../../services/adminApi"

interface ArtistSongsListProps {
  songs: ArtistSong[] | []
  itemsPerPage : number
  isLoading?: boolean
}

export function ArtistSongsList({ songs, itemsPerPage , isLoading = false }: ArtistSongsListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(songs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedSongs = songs.slice(startIndex, startIndex + itemsPerPage)

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  if (isLoading) {
    return (
      <Card className="bg-spotify-dark border-spotify-tertiary">
        <CardContent className="pt-6">
          <div className="text-center py-8 text-spotify-secondary">Loading songs...</div>
        </CardContent>
      </Card>
    )
  }

  if (songs.length === 0) {
    return (
      <Card className="bg-spotify-dark border-spotify-tertiary">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Music className="w-12 h-12 text-spotify-tertiary mx-auto mb-3 opacity-50" />
            <p className="text-spotify-secondary">No songs found</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-spotify-dark border-spotify-tertiary">
      <CardHeader>
        <CardTitle className="text-spotify-text">Artist Songs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayedSongs.map((song) => (
            <div
              key={song._id}
              className="flex items-center justify-between p-4 rounded-lg bg-spotify-black border border-spotify-tertiary hover:bg-spotify-black/80 transition-colors"
            >
              <div className="flex-1">
                <h4 className="text-sm font-medium text-spotify-text mb-1">{song.title}</h4>
                <p className="text-xs text-spotify-secondary">{song.duration}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-spotify-text">{100}</p>
                  <p className="text-xs text-spotify-secondary">Plays</p>
                </div>
                <Badge
                  variant={song.status === "active" ? "default" : "destructive"}
                  className={song.status === "active" ? "bg-spotify-green text-spotify-black" : ""}
                >
                  {song.status === "active" ? "Active" : "Removed"}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-spotify-tertiary">
            <p className="text-xs text-spotify-secondary">
              Showing <span className="font-medium">{displayedSongs.length}</span> of{" "}
              <span className="font-medium">{songs.length}</span> songs
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-spotify-secondary mr-2">
                Page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
      </CardContent>
    </Card>
  )
}
