import { useEffect, useState } from "react";
import TopResultCard from "../../components/discover/TopResultCard";
import SongList from "../../components/discover/SongList";
import AlbumCard from "../../components/home/album-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { useApi } from "@/core/hooks/api/useApi";
import { userApi } from "../../services/userApi";
import type {
  SearchResponse,
  TopResult,
  Song as SongType,
  Artist as ArtistType,
  Album as AlbumType,
} from "../../services/userApi";
import { useDebouncing } from "@/core/hooks/admin/useDebouncing";
import { FollowingCard } from "../../components/following/FollowingCard";

const filters = ["All", "Songs", "Playlists", "Albums", "Artists", "Profiles"];

// sample filter options

const Discover = () => {
  
  const searchQueryRedux = useSelector((state: RootState)=> state.search.query)

  const searchQuery = useDebouncing(searchQueryRedux, 500)

  const [activeFilter, setActiveFilter] = useState("All");

  const [topResult, setTopResult] = useState<TopResult | null>(null);
  const [songs, setSongs] = useState<SongType[]>([]);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [artists, setArtists] = useState<ArtistType[]>([]);
  const [users, setUsers] = useState<ArtistType[]>([]);

  const { execute: Search, loading } = useApi<SearchResponse & { message?: string }, string>(
    userApi.search
  );

  useEffect(()=>{
    const HandleSearchResult = async()=>{
      try {
        const data = await Search(searchQuery);
        if (!data) return;
        setTopResult(data.topResult ?? null);
        setSongs(data.songs ?? []);
        setAlbums(data.albums ?? []);
        setArtists(data.artists ?? []);
        setUsers(data.users ?? []);
      } catch (error) {
        console.error(error);
      }
    }

    HandleSearchResult()
  },[searchQuery, Search])

 if(loading){
  return <div>loading.....</div>
 }
  return (
    <div className="min-h-screen bg-background p-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {topResult ? <TopResultCard topResult={topResult} /> : null}
        <SongList songs={songs} />
      </div>
      
      <div className="px-8 py-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {albums && songs.length > 0 ? (
              albums.map((song) => (
                <Link key={song.id} to={`/album/${song.id}`}>
                  <AlbumCard {...song} type="album"/>
                </Link>
              ))
            ) : (
              <p className="p-4 text-gray-500">Oops no Album found.</p>
            )}
          </div>
        </div>
        <div>
        <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <FollowingCard key={artist.id} {...artist} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Users</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {users.map((artist) => (
            <FollowingCard key={artist.id} {...artist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
