import { Link, useParams } from "react-router-dom";
import { SongHeader } from "../../components/song/songHeader";
import { LyricsSection } from "../../components/song/lyricSection";
import { ArtistSection } from "../../components/song/artistSection";
import { SongTable } from "@/core/components/song/SongTable";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useFetchsongById } from "@/core/hooks/api/useFetchHooks";
import { useSongActions } from "@/core/hooks/song/useSongActions";
import { usePlayer } from "@/core/context/AudioProvider";
import { PremiumGuardLyrics } from "../../components/song/LyricsPremiumGuard";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";

export default function SongDetail() {
  const user = useSelector((state:RootState)=> state.auth.user)
  const isPremium = !!user?.isPremium
  const { songId } = useParams<{ songId: string }>();

  const { data, isLoading, isError, error } = useFetchsongById(songId!);
  const { startPlayback, currentSong, isPlaying, playPause, currentTime,currentContextId } = usePlayer();
  // song actions 
  const { handleLike, handleAddToPlaylist } = useSongActions("song");


  if (isLoading) return <SpinnerCustom />;

  if (isError)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );

  const song = data!.song;
  const recommendedSongs = data!.recommendations;
  const isCurrentSongPlaying = isPlaying && currentSong?.id === song.id
  
  //  determine if "this specific page song" is what's in the player
  const isThisSongInPlayer = currentContextId === songId!;
  const activeCurrentTime = isThisSongInPlayer ? currentTime : 0;

  const handlePlayPause = () => {
    if (isThisSongInPlayer) {
        playPause();
    } else {
        const newQueue = [song, ...recommendedSongs.filter((s) => s.id !== song.id)];
        startPlayback(newQueue,songId!, 0); 
    }
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <SongHeader
          title={song.title}
          coverImageUrl={song.coverImageUrl}
          duration={song.duration}
          isPlaying={isCurrentSongPlaying}
          onPlayPause={handlePlayPause}
          isLiked={song.isLiked}
          onLike={() => handleLike(song.id)}
          showAction
          songId={song.id} streams={song.streams}
          addToPlaylist={handleAddToPlaylist}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Link to={`/artist/${song.artist.id}`}>
            <ArtistSection artist={song.artist} />
          </Link>

          <PremiumGuardLyrics isPremium={isPremium}>
            <LyricsSection
              lyricsUrl={song.lyricsUrl}
              currentTime={activeCurrentTime}
            />
          </PremiumGuardLyrics>
        </div>

        <SongTable
          title="Recommended Songs"
          songs={recommendedSongs}
          onLike={handleLike}
          activeSongId={currentSong?.id}
          showAction
          onAddToPlaylist={handleAddToPlaylist}
          showArtist
        />
      </div>
    </div>
  );
}
