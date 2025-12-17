import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AlbumDetailHeader } from "../../components/albums/albumDetailsHeader";
import { SongTable } from "@/core/components/song/SongTable";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useAudioContext } from "@/core/context/useAudioContext";
import { userApi } from "../../services/userApi";

export default function AlbumDetail() {
  const { albumId } = useParams();

  const { data,isLoading,isError,error,} = useQuery({
    queryKey: ["albumDetails", albumId],
    queryFn: () => userApi.AlbumDetails(albumId!),
    enabled: !!albumId,
  });

  const { setPlaylistAndPlay,currentSong, isPlaying, playPause,playList } = useAudioContext();

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        Error in album fetching : {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <SpinnerCustom />
      </div>
    );
  }

  const album = data!;

  const isCurrentAlbumPlaying = isPlaying && playList.length === album.songs.length &&  playList.every((s, i) => s._id === album.songs[i]._id);

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
          artist={album.artistId.name}
          coverImageUrl={album.coverImageUrl}
          releaseYear={album.createdAt}
          totalTracks={album.songs.length}
          isPlaying={isCurrentAlbumPlaying}
          onPlayAlbum={handlePlayPause}
        />

        <SongTable
          title="Featured Songs"
          songs={album.songs}
          activeSongId={currentSong?._id}
        />
      </div>
    </div>
  );
}
