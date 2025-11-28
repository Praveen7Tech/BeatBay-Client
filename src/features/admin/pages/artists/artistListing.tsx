"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/core/components/input/Input" 
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Search, Download } from "lucide-react"
import { Link } from "react-router-dom"
import { useDebouncing } from "@/core/hooks/admin/useDebouncing"
import { adminApi } from "../../services/adminApi"
import { useQuery } from "@tanstack/react-query"

export function ArtistListing() {

    const [search, setSearchValue] = useState("")
    const [page, setPage] = useState(1)
    const limit = 2
  
    const searchValue = useDebouncing(search, 500)
  
    const {data: artistData, isLoading, isError, error} = useQuery({
      queryKey:["allArtists", page, searchValue],
      queryFn: ()=> adminApi.fetchArtists(page, limit, searchValue)
    })
  
    if(isLoading){
      return <div>Loading</div>
    }
    if(isError) return <div>{error.message}</div>
  
    const {artist, totalPages} = artistData ?? {}
  
    const URL_BASE = import.meta.env.VITE_API_URL;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-spotify-text mb-1">Artists</h1>
          <p className="text-spotify-secondary">Manage artist accounts and content</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-spotify-dark border-spotify-tertiary">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-spotify-tertiary" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 bg-spotify-black border-spotify-tertiary text-spotify-text placeholder:text-spotify-tertiary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artist?.map((artist) => (
          <Link key={artist.id} to={`/admin/artists/${artist.id}`}>
            <Card className="bg-spotify-dark border-spotify-tertiary h-full hover:bg-spotify-black transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Avatar and Status */}
                  <div className="flex items-start justify-between">
                    {artist.profilePicture ? (
                        <img
                            src={`${URL_BASE}/uploads/${artist.profilePicture}`}
                            alt={artist.name}
                            className="w-28 h-28 rounded-full object-cover"
                            onError={(e) => { e.currentTarget.src = "/placeholder.svg" }}
                        />
                        ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-white">
                            <p className="font-medium">{artist.name?.charAt(0).toUpperCase()}</p>
                        </div>
                        )}
                    <Badge
                      variant={artist.status ? "default" : "destructive"}
                      className={artist.status  ? "bg-spotify-green text-spotify-black" : ""}
                    >
                      {artist.status  ? "Active" : "Blocked"}
                    </Badge>
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-spotify-text">{artist.name}</h3>
                      {artist.status && (
                        <svg className="w-5 h-5 text-spotify-green" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-spotify-secondary mb-3">{artist.email}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <StatCard label="Followers" value={artist.followersCount } />
                    <StatCard label="Songs" value={artist.songsCount} />
                    <StatCard label="Joined" value={artist.joinDate} />
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 group-hover:bg-spotify-green group-hover:text-spotify-black group-hover:border-spotify-green bg-transparent"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-spotify-secondary">
          Showing <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span> pages
        </p>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page === 1} 
            onClick={()=>setPage((prev)=> prev - 1)}>
            Previous
          </Button>
          <Button variant="outline" disabled={page === totalPages}
            onClick={()=> setPage((prev)=> prev + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number | string}) {
  return (
    <div className="p-2 rounded bg-spotify-black border border-spotify-tertiary text-center">
      <p className="text-xs text-spotify-tertiary">{label}</p>
      <p className="text-sm font-bold text-spotify-green">{value}</p>
    </div>
  )
}
