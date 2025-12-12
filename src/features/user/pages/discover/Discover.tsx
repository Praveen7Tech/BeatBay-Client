import { useEffect, useState } from "react";
import TopResultCard from "../../components/discover/TopResultCard"; 
import SongList from "../../components/discover/SongList"; 
import ArtistCard from "../../components/discover/ArtistCard"; 
import album1 from "/src/assets/bg.png";
import album2 from "/src/assets/bg.png"
import album3 from "/src/assets/bg.png"
import AlbumCard from "../../components/home/album-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { useApi } from "@/core/hooks/api/useApi";
import { userApi } from "../../services/userApi";
import { useDebouncing } from "@/core/hooks/admin/useDebouncing";

const filters = ["All", "Songs", "Playlists", "Albums", "Artists", "Profiles"];

const topResult = {
  title: "Midnight Dreams",
  type: "Song",
  artist: "Luna Nova",
  image: album1,
};

const songs = [
  { id: "1", title: "Midnight Dreams", artist: "Luna Nova", duration: "3:06", image: album1 },
  { id: "2", title: "Midnight Hour", artist: "The Echoes, Deep Blue", duration: "3:41", image: album2 },
  { id: "3", title: "Midnight Run", artist: "A.R. Smith, Sid Wave", duration: "4:35", image: album3 },
  { id: "4", title: "Midnight City", artist: "Neon Pulse, Ray Synth", duration: "4:47", image: album1 },
];

const artists = [
  { id: "1", name: "Luna Nova", image: album1 },
  { id: "2", name: "The Echoes", image: album2 },
  { id: "3", name: "Deep Blue", image: album3 },
  { id: "4", name: "Neon Pulse", image: album1 },
  { id: "5", name: "Ray Synth", image: album2 },
  { id: "6", name: "A.R. Smith", image: album3 },
];

const Discover = () => {
  
  const searchQueryRedux = useSelector((state: RootState)=> state.search.query)

  const searchQuery = useDebouncing(searchQueryRedux, 500)

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchResult, setSearchResult] = useState(null)
  
  const {execute: Search, loading} = useApi(userApi.search)

  useEffect(()=>{
    const HandleSearchResult = async()=>{
      try {
        const data =await Search(searchQuery)
        setSearchResult(data)
      } catch (error) {
        console.error(error)
        setSearchResult(null)
      }
    }

    HandleSearchResult()
  },[searchQuery, Search])

  console.log("dis", searchResult)

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
        <TopResultCard {...topResult} />
        <SongList songs={songs} />
      </div>

      {/* Artists Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} {...artist} />
          ))}
        </div>
      </div>
      <div className="px-8 py-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {songs && songs.length > 0 ? (
              songs.map((song) => (
                <Link to={`/album/${song.id}`}>
                    <AlbumCard key={song.id} {...song} />
                </Link>
              ))
             ):(
              <p className="p-4 text-gray-500">Oops no Album found.</p>
            )  }
          </div>
        </div>
    </div>
  );
};

export default Discover;
