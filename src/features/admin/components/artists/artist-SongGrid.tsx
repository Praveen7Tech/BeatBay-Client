"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, ChevronLeft, ChevronRight } from "lucide-react"
import {  Song } from "../../services/adminApi"
import { Pagination } from "../common/Pagination"
import { formatTime } from "@/core/utils/formatTime"
import { Link } from "react-router-dom"

interface ArtistSongsListProps {
  songs: Song[] 
  itemsPerPage : number
  isLoading?: boolean
}

export function ArtistSongsList({ songs, itemsPerPage , isLoading = false }: ArtistSongsListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(songs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedSongs = songs.slice(startIndex, startIndex + itemsPerPage)

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
            <Link to={`/admin/songs/${song.id}`}>
            <div
              key={song.id}
              className="flex items-center justify-between p-4 rounded-lg bg-spotify-black border border-spotify-tertiary hover:bg-spotify-black/80 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={song.coverImageUrl}
                  alt={song.title}
                  className="w-16 h-16 rounded-full object-cover border border-spotify-tertiary"
                />

                <div>
                  <h4 className="text-sm font-medium text-spotify-text mb-1">{song.title}</h4>
                  <p className="text-xs text-spotify-secondary">{formatTime(song.duration)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-spotify-text">{0}</p>
                  <p className="text-xs text-spotify-secondary">Plays</p>
                </div>

                <Badge className="bg-spotify-green text-spotify-black">
                  {song.status}
                </Badge>
              </div>
            </div>
            </Link>
          ))}

        </div>

        {/* Pagination */}
        <Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage} 
                  prevIcon={ChevronLeft} nextIcon={ChevronRight}/>
      </CardContent>
    </Card>
  )
}
