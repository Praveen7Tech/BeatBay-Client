import { Link, useParams } from "react-router-dom";
import { SongHeader } from "../../components/song/songHeader";
import { LyricsSection } from "../../components/song/lyricSection";
import { ArtistSection } from "../../components/song/artistSection";
import { SongTable } from "@/core/components/song/SongTable";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useAudioContext } from "@/core/context/useAudioContext";
import { useFetchsongById } from "@/core/hooks/api/useFetchHooks";
import { useToggleLikesMutation } from "@/core/hooks/likes/useToggleLikesMutation";
import { useAddSongToPlaylist } from "@/core/hooks/playList/usePlayList";

export default function SongDetail() {
  const { songId } = useParams();

  const { data, isLoading, isError, error,} = useFetchsongById(songId!);
  
  const {mutate: toggleLike} = useToggleLikesMutation()
  const addSongMutation = useAddSongToPlaylist();

const handleAddToPlaylist = (songId: string,playlistId: string) => {
  addSongMutation.mutate({ playlistId ,songId });
};

  const { setPlaylistAndPlay, currentSong, isPlaying,playPause, currentTime } = useAudioContext();

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  if (isLoading) {
    return (
        <SpinnerCustom />
    );
  }

  const song = data!.song;
  const isLiked = song.isLiked
  const recomentedSongs = data!.recommendations;

  const isCurrentSongPlaying = currentSong?.id === song.id;

  const handlePlayPause = () => {
    if (isCurrentSongPlaying) {
      playPause();
    } else {
      const playlist = [
        song,
        ...recomentedSongs.filter((s) => s.id !== song.id),
      ];
      setPlaylistAndPlay(playlist, 0);
    }
  };
const handleLike = (songId: string) => {
  toggleLike(songId); 
};

  const activeSong = currentSong?.id === song.id ? currentSong : song;

  const activeCurrentTime = currentSong?.id === song.id ? currentTime : 0;

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-black text-white">
      <div className="max-w-7xl mx-auto p-8">
        <SongHeader
          title={song.title}
          coverImageUrl={song.coverImageUrl}
          duration={song.duration}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          isLiked={isLiked}
          onLike={() => handleLike(songId!)}
          showAction={true}
          songId={song.id}
          addToPlaylist={handleAddToPlaylist}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Link to={`/artist/${song.artist.id}`}>
            <ArtistSection artist={song.artist} />
          </Link>

          <LyricsSection
            lyricsUrl={activeSong.lyricsUrl}
            currentTime={activeCurrentTime}
          />
        </div>

        <SongTable
          title="Recommended Songs"
          songs={recomentedSongs}
          onLike={handleLike}
          activeSongId={currentSong?.id}
          showAction={true}
          onAddToPlaylist={handleAddToPlaylist}
        />
      </div>
    </div>
  );
}
