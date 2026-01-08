import { SongCard } from "../../components/song/SongCard"; 
import { ArtistHeader } from "../../components/song/ArtistHeader"; 
//import { SearchBar } from "../../components/song/SearchBar";
import { useArtistSongs } from "@/core/hooks/api/useFetchHooks";
import { Link } from "react-router-dom";
import { SongData } from "../../services/artist.api";
import { Pagination } from "@/features/admin/components/common/Pagination";
import { useState } from "react";

const SongList = () => {
   const [currentPage, setCurrentPage] = useState(1)
    const {data: songs, isLoading, isError, error}= useArtistSongs()

   if (isLoading) {
        return (
          <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white p-8">
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        );
    }

    if (isError) {
        return (
          <div className="min-h-screen bg-linear-to-b from-gray-900 to-black">
            <div className="flex items-center justify-center h-96">
              <p className="text-red-500 text-lg">{error?.message || "Error loading songs"}</p>
            </div>
          </div>
        );
    }


 return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black ">
      <div className="px-4 py-8">
        <ArtistHeader songCount={songs?.length}/>

        <div className="mb-6">
          {/* <SearchBar /> */}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-4 px-3 py-2 text-sm font-medium text-spotify-secondary border-b border-[#282828]">
            <div className="w-14">#</div>
            <div className="flex-1">Title</div>
            <div className="hidden lg:block w-24 text-right">Streams</div>
            <div className="hidden xl:block w-24 text-right">Listeners</div>
            <div className="hidden md:block w-28 text-right">Released</div>
            <div className="hidden lg:block w-20 text-right">Likes</div>
            <div className="w-16 text-right">Duration</div>
            <div className="w-10 text-right">Edit</div>
          </div>
        {songs && songs.length > 0 ? (
            songs.map((song: SongData) => (
              <Link to={`/artist/song-details/${song._id}`}>
                <SongCard key={song._id} {...song} /> 
              </Link>
            ))
          ) : (
            <p className="p-4 text-gray-500">Start with upload new song.</p>
          )}
        </div>
      </div>
      <Pagination page={currentPage} totalPages={1} setPage={setCurrentPage}/>
    </div>
  );
};

export default SongList;
