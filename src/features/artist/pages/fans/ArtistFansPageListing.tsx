import { ArtistFanCard } from "../../components/fans/artistsFanCard";
import { Pagination } from "@/features/admin/components/common/Pagination";
import { SpinnerArtist } from "@/components/ui/spinner";
import { Users } from "lucide-react";
import { useFansListing } from "@/core/hooks/artist/fans/useFansListing";


export default function ArtistFans() {

  const {fans, isLoading, totalCount,totalPages,setPage,page} = useFansListing()

  if(isLoading) return <SpinnerArtist/>

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-white text-3xl font-bold">Your Fans</h1>
            <p className="text-[#a7a7a7]">Manage and view your fan community</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-[#181818] px-4 py-2 rounded-full">
          <Users size={18} className="text-[#1DB954]" />
          <span className="text-white font-semibold">{totalCount}</span>
          <span className="text-[#a7a7a7]">Total Fans</span>
        </div>
      </div>

      {/* Filters */}
      {/* <ArtistFansFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filterBy={filterBy}
        onFilterChange={setFilterBy}
      /> */}

      {/* Fans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {fans?.map((fan) => (
          <ArtistFanCard key={fan.id} fan={fan}  />
        ))}
      </div>

      {/* Empty State */}
      {fans?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <Users size={48} className="text-[#a7a7a7] mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">No fans found</h3>
        </div>
      )}
      <Pagination page={page} totalPages={totalPages!} setPage={setPage}/>
    </div>
  );
}
