import { SongCard } from "../../components/song/SongCard"; 
import { ArtistHeader } from "../../components/song/ArtistHeader"; 
import { useArtistSongs } from "@/core/hooks/api/useFetchHooks";
import { Link } from "react-router-dom";
import { FetchSong, } from "../../services/artist.api";
import { Pagination } from "@/features/admin/components/common/Pagination";
import { useState } from "react";
import { SpinnerArtist } from "@/components/ui/spinner";
import { Music } from "lucide-react";

const SongList = () => {
   const [currentPage, setCurrentPage] = useState(1)
    const {data: songs, isLoading, isError, error}= useArtistSongs()

   if (isLoading) return <SpinnerArtist/>

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
    <div className="">
      <div className="p-4 ">
        <ArtistHeader songCount={songs?.length}/>

        <div className="mb-6">
          {/* <SearchBar /> */}
        </div>

        <div className="space-y-1">
        {songs && songs.length > 0 ? (
          <>
            {/* Table Header */}
            <div className="flex items-center gap-4 px-3 py-2 text-sm font-medium text-spotify-secondary border-b border-[#282828]">
              <div className="w-14">#</div>
              <div className="flex-1">Title</div>
              <div className="hidden lg:block w-24 text-right">Streams</div>
              <div className="hidden md:block w-28 text-right">Released</div>
              <div className="hidden lg:block w-20 text-right">Likes</div>
              <div className="w-16 text-right">Duration</div>
              <div className="w-10 text-right">Edit</div>
            </div>

            {/* Songs */}
            {songs.map((song: FetchSong) => (
              <Link key={song.id} to={`/artist/song-details/${song.id}`}>
                <SongCard {...song} />
              </Link>
            ))}
          </>
        ) : (
          /* Properly aligned fallback */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Music size={56} className="text-[#1DB954] mb-4" />
            <h3 className="text-lg font-semibold text-white mb-1">
              No Songs Created Yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Upload your first song to see it listed here.
            </p>
          </div>
        )}
      </div>

      </div>
      <Pagination page={currentPage} totalPages={1} setPage={setCurrentPage}/>
    </div>
  );
};

export default SongList;
