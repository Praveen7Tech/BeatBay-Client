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

const Discover = () => {
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

  const hasResults =
    !!topResult ||
    songs.length > 0 ||
    albums.length > 0 ||
    artists.length > 0 ||
    users.length > 0;

  const shouldShowEmpty =
    !loading &&
    !hasResults &&
    searchQueryRedux.trim().length > 0;

  return (
    <div className="min-h-screen bg-background p-6">
      {loading && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40">
          <SpinnerCustom />
        </div>
      )}

      {shouldShowEmpty && <SearchEmptyState />}

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
              <FollowingCard key={artist.id} {...artist} role="artist" />
            ))}
          </div>
        </div>
      )}

      {users.length > 0 && (
        <div className="px-8 py-8">
          <h2 className="text-2xl font-bold text-white mb-4">Users</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {users.map((user) => (
              <FollowingCard key={user.id} {...user} role="user" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
