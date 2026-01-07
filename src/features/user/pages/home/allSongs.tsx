"use client"

import { useSearchParams, Link } from "react-router-dom"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { Search } from "lucide-react"
import { Input } from "@/core/components/input/Input"
import AlbumCard from "../../components/home/album-card"
import { Pagination } from "../../components/pagination/pagination"
import { SpinnerCustom } from "@/components/ui/spinner"
import { userApi } from "../../services/userApi"

//const LANGUAGES = ["All", "Malayalam", "English", "Hindi", "Tamil"]

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Extract filters from URL with defaults
  const type = searchParams.get("type") || "songs"
  const page = parseInt(searchParams.get("page") || "1")
  const query = searchParams.get("q") || ""
  const lang = searchParams.get("lang") || "All"

  const isSongs = type === "songs"

  // Fetch data using React Query
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: [type, page, query, lang],
    queryFn: () => userApi.fetchPaginatedData({
      type,
      page,
      limit: 2,
      q: query,
      genre: lang === "All" ? undefined : lang
    }),
    placeholderData: keepPreviousData, // Smooth transition between pages
  })

  // Helper to update specific search params without losing others
  const updateParams = (newParams: Record<string, string | number | undefined>) => {
    setSearchParams((prev) => {
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          prev.delete(key)
        } else {
          prev.set(key, value.toString())
        }
      })
      return prev
    })
  }

  if (isLoading && !isPlaceholderData) return <SpinnerCustom />

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{isSongs ? "All Songs" : "All Albums"}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={`Search ${isSongs ? "songs" : "albums"}...`}
                value={query}
                onChange={(e) => updateParams({ q: e.target.value, page: 1 })}
              />
            </div>

            {/* Language Filter */}
            {/* {isSongs && (
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                {LANGUAGES.map((l) => (
                  <Button
                    key={l}
                    variant={lang === l ? "default" : "secondary"}
                    size="sm"
                    onClick={() => updateParams({ lang: l, page: 1 })}
                    className={lang === l ? "bg-[#00d084] text-black" : "bg-[#1a1a1a] hover:bg-[#2a2a2a]"}
                  >
                    {l}
                  </Button>
                ))}
              </div>
            )} */}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data?.docs && data.docs.length > 0 ? (
            data.docs.map((item: any) => (
              <Link key={item.id} to={`/${isSongs ? "song" : "album"}/${item.id}`}>
                <AlbumCard
                  title={item.title}
                  album={isSongs ? item.albumName : item.artistName}
                  coverImageUrl={item.coverImageUrl}
                  type={isSongs ? "song" : "album"}
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              No results found matching your filters.
            </div>
          )}
        </div>

        {/* Server-Side Pagination */}
        <div className="mt-auto py-8">
            <Pagination 
            currentPage={page} 
            totalPages={data?.totalPages || 1} 
            onPageChange={(newPage) => updateParams({ page: newPage })} 
            />
        </div>
      </div>
    </div>
  )
}
