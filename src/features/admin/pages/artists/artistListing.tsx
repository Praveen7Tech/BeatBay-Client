"use client"

import { useState } from "react"
import { useDebouncing } from "@/core/hooks/admin/useDebouncing"
import { adminApi } from "../../services/adminApi"
import { useQuery } from "@tanstack/react-query"
import { SearchBar } from "../../components/common/SearchBar"
import { Pagination } from "../../components/common/Pagination"
import { ArtistCardGrid } from "../../components/artists/artistCard"
import { SpinnerCustom } from "@/components/ui/spinner"

export function ArtistListing() {

    const [search, setSearchValue] = useState("")
    const [page, setPage] = useState(1)
    const limit = 5
  
    const searchValue = useDebouncing(search, 500)
  
    const {data: artistData, isLoading, isError, error} = useQuery({
      queryKey:["allArtists", page, searchValue],
      queryFn: ()=> adminApi.fetchArtists(page, limit, searchValue)
    })
  
    if(isError) return <div>{error.message}</div>
  
    const {artist, totalPages} = artistData ?? {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-spotify-text mb-1">Artists</h1>
          <p className="text-spotify-secondary">Manage artist accounts and content</p>
        </div>
      </div>
      {isLoading && (
         <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
            <SpinnerCustom/>
        </div>
      )}

      {/* Search Bar*/}
      <SearchBar value={search} onChange={setSearchValue}/>

      {/* Artists Grid */}
      <ArtistCardGrid artist={artist!}/>

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages!} setPage={setPage}/>
    </div>
  )
}

