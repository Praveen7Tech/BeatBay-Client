import { Link, useParams } from "react-router-dom";
import { SongHeader } from "../../components/song/songHeader";
import { LyricsSection } from "../../components/song/lyricSection";
import { ArtistSection } from "../../components/song/artistSection";
import { SongTable } from "@/core/components/song/SongTable";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useAudioContext } from "@/core/context/useAudioContext";
import { useFetchsongById } from "@/core/hooks/api/useFetchHooks";
import { useSongActions } from "@/core/hooks/song/useSongActions";
import { usePlayer } from "@/core/context/AudioProvider";

export default function SongDetail() {
  const { songId } = useParams<{ songId: string }>();

  const { data, isLoading, isError, error } = useFetchsongById(songId!);
  const { 
    startPlayback, 
    currentSong, 
    isPlaying, 
    playPause, 
    currentTime 
  } = usePlayer();

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
  
  // 3. Logic to determine if "this specific page's song" is what's in the player
  const isThisSongInPlayer = currentSong?.id === song.id;
  const activeCurrentTime = isThisSongInPlayer ? currentTime : 0;

  const handlePlayPause = () => {
    if (isThisSongInPlayer) {
        // If it's already the active song, just toggle hardware state
        playPause();
    } else {
        // 4. THE PRO WAY: Create the queue context
        // Current song first, followed by unique recommendations
        const newQueue = [song, ...recommendedSongs.filter((s) => s.id !== song.id)];
        
        // This triggers the 30-second Revenue Tracker automatically in the Provider
        startPlayback(newQueue, 0); 
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-black text-white">
      <div className="max-w-7xl mx-auto p-8">
        <SongHeader
          title={song.title}
          coverImageUrl={song.coverImageUrl}
          duration={song.duration}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          isLiked={song.isLiked}
          onLike={() => handleLike(song.id)}
          showAction
          songId={song.id}
          addToPlaylist={handleAddToPlaylist}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Link to={`/artist/${song.artist.id}`}>
            <ArtistSection artist={song.artist} />
          </Link>

          <LyricsSection lyricsUrl={song.lyricsUrl} currentTime={activeCurrentTime} />
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
