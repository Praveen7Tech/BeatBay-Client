import { SongHeader } from "../../components/song/songHeader"; 
import { LyricsSection } from "../../components/song/lyricSection"; 
import { RecommendedSongs } from "../../components/song/recomentedSongs"; 
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/userApi";
import { useAudioContext } from "@/core/context/useAudioContext"; 
  
export default function SongDetail() {

 const { songId } = useParams();
    const { data: pageData, isLoading, isError, error } = useQuery({
    queryKey: ["songDetails", songId],
    queryFn: () => userApi.SongDetail(songId!),
    enabled: !!songId,
  });

  const song = pageData?.songs
  const recomentedSongs = pageData?.recomentations

  const { setPlaylistAndPlay, currentSong, isPlaying , playPause, currentTime} = useAudioContext();

  const isCurrentSongPlaying = isPlaying && currentSong?._id === song?._id;

  if(isLoading){
    return <div className="min-h-screen bg-black text-white p-8">Loading songs...</div>;
  }

  if(isError){
    return <div className="min-h-screen bg-black text-red-600 p-8">{error.message}</div>;
  }
   if (!song || !recomentedSongs) {
    return <div className="min-h-screen bg-black text-white p-8">Song details not available.</div>;
  }

 
  const handlePlayPause = () => {
    if(isCurrentSongPlaying){
        playPause()
    }else{
        const playlist = [song, ...recomentedSongs.filter(s => s._id !== song._id)]
        setPlaylistAndPlay(playlist, 0)
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#121212] to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <SongHeader 
            title={song?.title} 
            coverImageUrl={song?.coverImageUrl}
            artistId={song?.artistId}

            isPlaying={isCurrentSongPlaying} 
            onPlayPause={handlePlayPause}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <LyricsSection 
              lyricsUrl={song?.lyricsUrl} 
              currentTime={currentTime} 
          />
        </div>
        
        <RecommendedSongs songs={recomentedSongs} />
      </div>
    </div>
  );
}