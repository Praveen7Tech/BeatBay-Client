import { useUserPlayLists } from "@/core/hooks/api/useFetchHooks";
import { PlaylistCard } from "../../components/playlist/playListCard"; 

const Playlists = () => {
    const { data: playlists, isLoading, isError, error } = useUserPlayLists();
  
    if (isLoading) return <h1>Loading....</h1>;
    if (isError) return <p>{error.message}</p>;


  return (
    <div className="min-h-screen bg-linear-to-b from-[#1a1a1a] to-spotify-dark p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-bold mx-6 my-10">Public Playlists</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
        {playlists && playlists?.length > 0 ? ( 
          playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              coverImageUrl={playlist.coverImageUrl}
            />
          ))
          ):
          <p>no playlists created .</p>
          }   
        </div>
      </div>
    </div>
  );
};

export default Playlists;
