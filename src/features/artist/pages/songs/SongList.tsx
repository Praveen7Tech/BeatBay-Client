import { SongCard } from "../../components/song/SongCard"; 
import { ArtistHeader } from "../../components/song/ArtistHeader"; 
import { SearchBar } from "../../components/song/SearchBar";
import {useQuery} from "@tanstack/react-query"
import { artistApi } from "../../services/artist.api";

const SongList = () => {

    const {data: songs, isLoading, isError, error}= useQuery({
        queryKey: ["artistSongs"],
        queryFn: ()=> artistApi.fetchSongs()
    })

    if (isLoading) {
        return <div className="min-h-screen bg-black text-white p-8">Loading songs...</div>;
    }

    if (isError) {
        return <div className="min-h-screen bg-black text-red-500 p-8">Error: {error.message}</div>;
    }

 return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black ">
      <div className="px-4 py-8">
        <ArtistHeader />

        <div className="mb-6">
          <SearchBar />
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-4 px-3 py-2 text-sm font-medium text-[#b3b3b3] border-b border-[#282828]">
            <div className="w-14">#</div>
            <div className="flex-1">Title</div>
            <div className="hidden lg:block w-24 text-right">Streams</div>
            <div className="hidden xl:block w-24 text-right">Listeners</div>
            <div className="hidden md:block w-28 text-right">Released</div>
            <div className="hidden lg:block w-20 text-right">Likes</div>
            <div className="w-16 text-right">Duration</div>
            <div className="w-10"></div>
          </div>
        {songs && songs.length > 0 ? (
            songs.map((song: any) => (
              <SongCard key={song.id} {...song} /> 
            ))
          ) : (
            <p className="p-4 text-gray-500">Start with upload new song.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongList;
