import { useParams } from "react-router-dom";
import { AlbumDetailHeader } from "../../components/albums/albumDetailsHeader";
import { SongTable } from "@/core/components/song/SongTable";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useAudioContext } from "@/core/context/useAudioContext";
import { useSongActions } from "@/core/hooks/song/useSongActions";
import { useAlbumDetails } from "@/core/hooks/api/useFetchHooks";

export default function AlbumDetail() {

  const { albumId } = useParams<{ albumId: string }>();

  const { data: album, isLoading, isError, error } = useAlbumDetails(albumId!)

  const { handleLike, handleAddToPlaylist } = useSongActions("album", {albumId});

  const { setPlaylistAndPlay, currentSong, isPlaying, playPause, playList } = useAudioContext();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <SpinnerCustom />
      </div>
    );
  }

  if (isError || !album) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  const isCurrentAlbumPlaying =  isPlaying &&  playList.length === album.songs.length &&
    playList.every((s, i) => s.id === album.songs[i].id);

  const handlePlayPause = () => {
    if (isCurrentAlbumPlaying) {
      playPause();
    } else {
      setPlaylistAndPlay(album.songs, 0);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-black text-white">
      <div className="max-w-7xl mx-auto p-8">
        <AlbumDetailHeader
          title={album.title}
          artist={album.artistName}
          coverImageUrl={album.coverImageUrl}
          totalTracks={album.songs.length}
          isPlaying={isCurrentAlbumPlaying}
          onPlayAlbum={handlePlayPause}
          releaseYear={album.releaseYear}
        />

        <SongTable
          title="Featured Songs"
          songs={album.songs}
          activeSongId={currentSong?.id}
          showAction={true}
          onLike={handleLike}
          onAddToPlaylist={handleAddToPlaylist}
        />
      </div>
    </div>
  );
}
