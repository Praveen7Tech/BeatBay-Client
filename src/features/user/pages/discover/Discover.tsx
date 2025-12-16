import TopResultCard from "../../components/discover/TopResultCard";
import SongList from "../../components/discover/SongList";
import AlbumCard from "../../components/home/album-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { FollowingCard } from "../../components/following/FollowingCard";
import { SpinnerCustom } from "@/components/ui/spinner"; 
import { useSearch } from "@/core/hooks/Search/useDiscoverSearch";

const filters = ["All", "Songs", "Playlists", "Albums", "Artists", "Profiles"];

const Discover = () => {
  
  const searchQueryRedux = useSelector((state: RootState)=> state.search.query)
  const {topResult, songs, albums, artists, users, loading, setActiveFilter, activeFilter} = useSearch(searchQueryRedux)

  return (
    <div className="min-h-screen bg-background p-6">
      {loading && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
          <SpinnerCustom/>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter
                ? "bg-white text-black"
                : "bg-[#232323] text-white hover:bg-[#2a2a2a]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results Grid */}
     {(topResult || songs.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {topResult && <TopResultCard topResult={topResult} />}
          {songs.length > 0 && <SongList songs={songs} />}
        </div>
      )}

        {albums.length > 0 && (
          <div className="px-8 py-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Albums</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {albums.map((album) => (
                <Link key={album.id} to={`/album/${album.id}`}>
                  <AlbumCard {...album} type="album" />
                </Link>
              ))}
            </div>
          </div>
        )}
        
       {artists.length > 0 && (
          <div className="px-8 py-8">
            <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {artists.map((artist) => (
                <FollowingCard key={artist.id} {...artist} type="artist"/>
              ))}
            </div>
          </div>
        )}

      {users.length > 0 && (
        <div className="px-8 py-8">
          <h2 className="text-2xl font-bold text-white mb-4">Users</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {users.map((user) => (
              <FollowingCard key={user.id} {...user} type="profile"/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
