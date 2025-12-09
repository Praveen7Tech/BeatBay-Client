import { useParams } from "react-router-dom";
import { AlbumDetailHeader } from "../../components/albums/albumDetailsHeader"; 
import { useQuery } from "@tanstack/react-query";
import { SongResponse, userApi } from "../../services/userApi";
import { SongTable } from "@/core/components/song/SongTable";
import { useAudioContext } from "@/core/context/useAudioContext";

// Helper function to check if the two playlists are the same (same order and content)
const arePlaylistsEqual = (list1: SongResponse[], list2: SongResponse[]): boolean => {
    if (list1.length !== list2.length) return false;
    for (let i = 0; i < list1.length; i++) {
        if (list1[i]._id !== list2[i]._id) {
            return false;
        }
    }
    return true;
};

export default function AlbumDetail() {

  const {albumId} = useParams()

  const { setPlaylistAndPlay,currentSong,playList, isPlaying , playPause } = useAudioContext();

  const {data: albums, isLoading, isError, error} = useQuery({
    queryKey:["AlbumId", albumId],
    queryFn: ()=> userApi.AlbumDetails(albumId!),
    enabled: !!albumId
  })

  
  if(isLoading){
    return <div className="min-h-screen bg-black text-white p-8">Loading songs...</div>;
  }

  if(isError){
    return <div className="min-h-screen bg-black text-red-600 p-8">{error.message}</div>;
  }
   if (!albums) {
    return <div className="min-h-screen bg-black text-white p-8">album details not available.</div>;
  }

  // manage the playlist setup and play based on the album status (need to change in future)
  const isCurrentAlbumLoadedInPlayer = arePlaylistsEqual(playList, albums.songs);
  const isCurrentAlbumPlaying = isPlaying && isCurrentAlbumLoadedInPlayer;

   const handlePlayPause = () => {
    console.log("click")
    if(isCurrentAlbumPlaying){
        playPause()
    }else{
        const playlist = albums.songs
        setPlaylistAndPlay(playlist, 0)
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <AlbumDetailHeader
          title={albums?.title}
          artist={albums.artistId.name}
          coverImageUrl={albums.coverImageUrl}
          releaseYear={albums.createdAt}
          totalTracks={albums.songs.length}
          isPlaying={isCurrentAlbumPlaying}
          onPlayAlbum={handlePlayPause}
        />

        <SongTable 
        songs={albums.songs}
        title={"Featured Songs"}
        activeSongId= {currentSong?._id}
        />
      </div>
    </div>
  );
}
