"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Disc, ChevronLeft, ChevronRight } from "lucide-react"
import { ArtistAlbum } from "../../services/adminApi"
import { Pagination } from "../common/Pagination"
import { format, parseISO } from "date-fns"
import { Link } from "react-router-dom"


interface ArtistAlbumsGridProps {
  albums: ArtistAlbum[] | []
  itemsPerPage : number
  isLoading?: boolean
}

export function ArtistAlbumsGrid({ albums, itemsPerPage , isLoading = false }: ArtistAlbumsGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(albums.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedAlbums = albums.slice(startIndex, startIndex + itemsPerPage)

  if (isLoading) {
    return (
      <Card className="bg-spotify-dark border-spotify-tertiary">
        <CardContent className="pt-6">
          <div className="text-center py-8 text-spotify-secondary">Loading albums...</div>
        </CardContent>
      </Card>
    )
  }

  if (albums.length === 0) {
    return (
      <Card className="bg-spotify-dark border-spotify-tertiary">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <Disc className="w-16 h-16 text-spotify-tertiary mx-auto mb-3 opacity-50" />
            <p className="text-spotify-secondary">No albums found</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-spotify-dark border-spotify-tertiary">
      <CardHeader>
        <CardTitle className="text-spotify-text">Albums</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedAlbums.map((album) => (
            <Link to={`/admin/album/${album._id}`}>
            <div
              key={album._id}
              className="group p-4 rounded-lg bg-spotify-black border border-spotify-tertiary hover:bg-spotify-black/80 transition-colors cursor-pointer"
            >
              {/* Album Cover */}
              <div className="relative mb-4 overflow-hidden rounded-lg bg-spotify-tertiary/20">
                <img
                  src={album.coverImageUrl}
                  alt={album.title}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    className="bg-spotify-green text-spotify-black hover:bg-spotify-green/90 rounded-full"
                  >
                    <Disc className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Album Info */}
              <div>
                <h4 className="text-sm font-medium text-spotify-text mb-2 line-clamp-2">{album.title}</h4>
                <p className="text-xs text-spotify-secondary mb-3">{format(parseISO(album.createdAt!), "MMM dd, yyyy")}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 rounded bg-spotify-tertiary/10">
                    <p className="text-xs text-spotify-tertiary">Songs</p>
                    <p className="text-sm font-bold text-spotify-green">{album.songs.length}</p>
                  </div>
                  {/* <div className="p-2 rounded bg-spotify-tertiary/10">
                    <p className="text-xs text-spotify-tertiary">Plays</p>
                    <p className="text-sm font-bold text-spotify-green">{0}M</p>
                  </div> */}
                </div>
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
