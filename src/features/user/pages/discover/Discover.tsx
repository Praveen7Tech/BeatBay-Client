import { useState } from "react";
import TopResultCard from "../../components/discover/TopResultCard";
import SongList from "../../components/discover/SongList";
import AlbumCard from "../../components/home/album-card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { FollowingCard } from "../../components/following/FollowingCard";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useSearch } from "@/core/hooks/Search/useDiscoverSearch";
import SearchEmptyState from "./EmptyResult";
import { usePlayer } from "@/core/context/AudioProvider";

const filters = ["All", "Songs", "Albums", "Artists", "Profiles"];

const Discover = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const searchQueryRedux = useSelector(
    (state: RootState) => state.search.query
  );

  const { topResult, songs, albums, artists, users, loading } =
    useSearch(searchQueryRedux);

  const { startPlayback, playPause, isPlaying, currentSong } = usePlayer();

  const handleTopResultPlayPause = (id: string) => {
    const isThisSongLoaded = currentSong?.id === id;

    if (isThisSongLoaded) {
      playPause();
    } else {
      const startIndex = songs.findIndex((s) => s.id === id);
      startPlayback(songs, id, startIndex >= 0 ? startIndex : 0);
    }
  };

  if (loading) return <SpinnerCustom />;

  const hasResults =
    !!topResult ||
    songs.length > 0 ||
    albums.length > 0 ||
    artists.length > 0 ||
    users.length > 0;

  const shouldShowGlobalEmpty =
    !hasResults && searchQueryRedux.trim().length > 0;

  return (
    <div className="min-h-screen p-6">
      {shouldShowGlobalEmpty && <SearchEmptyState />}

      {!shouldShowGlobalEmpty && (
        <>
          {/* Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
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

          {/* ALL */}
          {activeFilter === "All" && (
            <>
              {(topResult || songs.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
                  {topResult && (
                    <TopResultCard
                      topResult={topResult}
                      isPlaying={isPlaying}
                      isActive={currentSong?.id === topResult.id}
                      onPlayPause={handleTopResultPlayPause}
                    />
                  )}

                  {songs.length > 0 && (
                    <SongList
                      songs={songs}
                      activeSongId={currentSong?.id}
                    />
                  )}
                </div>
              )}

              {albums.length > 0 && (
                <div className="px-8 py-8">
                  <h2 className="text-2xl font-bold mb-6 text-foreground">
                    Albums
                  </h2>
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
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Artists
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {artists.map((artist) => (
                      <FollowingCard key={artist.id} {...artist} role="artist" />
                    ))}
                  </div>
                </div>
              )}

              {users.length > 0 && (
                <div className="px-8 py-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Users
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {users.map((user) => (
                      <FollowingCard key={user.id} {...user} role="user" />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* SONGS FILTER (Top Result + Songs) */}
          {activeFilter === "Songs" && (
            <>
              {!topResult && songs.length === 0 ? (
                <SearchEmptyState />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {topResult && (
                    <TopResultCard
                      topResult={topResult}
                      isPlaying={isPlaying}
                      isActive={currentSong?.id === topResult.id}
                      onPlayPause={handleTopResultPlayPause}
                    />
                  )}

                  {songs.length > 0 && (
                    <SongList
                      songs={songs}
                      activeSongId={currentSong?.id}
                    />
                  )}
                </div>
              )}
            </>
          )}

          {/* ALBUMS */}
          {activeFilter === "Albums" && (
            <>
              {albums.length === 0 ? (
                <SearchEmptyState />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-8">
                  {albums.map((album) => (
                    <Link key={album.id} to={`/album/${album.id}`}>
                      <AlbumCard {...album} type="album" />
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ARTISTS */}
          {activeFilter === "Artists" && (
            <>
              {artists.length === 0 ? (
                <SearchEmptyState />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-7">
                  {artists.map((artist) => (
                    <FollowingCard key={artist.id} {...artist} role="artist" />
                  ))}
                </div>
              )}
            </>
          )}

          {/* PROFILES */}
          {activeFilter === "Profiles" && (
            <>
              {users.length === 0 ? (
                <SearchEmptyState />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-7">
                  {users.map((user) => (
                    <FollowingCard key={user.id} {...user} role="user" />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Discover;