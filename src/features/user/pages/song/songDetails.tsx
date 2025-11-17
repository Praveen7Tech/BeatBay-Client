import { SongHeader } from "../../components/song/songHeader"; 
import { LyricsSection } from "../../components/song/lyricSection"; 
import { RecommendedSongs } from "../../components/song/recomentedSongs"; 
import album2 from "/src/assets/bg.png";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/userApi";
import { useAudioPlayer } from "@/core/hooks/user/useAudioPlayer";
  const recommendedSongs = [
    {
      id: 1,
      title: "Ranam Title - Track",
      album: "Ranam - Movie",
      coverImage: album2,
      duration: "03:17",
    },
    {
      id: 2,
      title: "Kathale Kathale",
      album: "96 - Movie",
      coverImage: album2,
      duration: "06:50",
    },
    {
      id: 3,
      title: "Mumbe Va Anbe Va",
      album: "Sellinoru Kathal - Movie",
      coverImage: album2,
      duration: "02:10",
    },
  ];
export default function SongDetail() {

  const { songId } = useParams();
    const { data: song, isLoading, isError, error } = useQuery({
    queryKey: ["songDetails", songId], 
    queryFn: () => userApi.SongDetail(songId!), 
    enabled: !!songId, 
  });

  const URL = import.meta.env.VITE_API_URL;
  const fullAudioUrl = `${URL}/songs/${song?.audioUrl}`; 
  
  const { isPlaying, currentTime, playPause } = useAudioPlayer(fullAudioUrl);

  if(isLoading){
    return <div className="min-h-screen bg-black text-white p-8">Loading songs...</div>;
  }

  if(isError){
    return <div className="min-h-screen bg-black text-red-600 p-8">{error.message}</div>;
  }
   if (!song) {
    return <div className="min-h-screen bg-black text-white p-8">Song details not available.</div>;
  }



  return (
    <div className="min-h-screen bg-linear-to-b from-[#121212] to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <SongHeader 
            title={song?.title} 
            coverImageUrl={song?.coverImageUrl}
            artistId={song?.artistId}

            isPlaying={isPlaying} 
            onPlayPause={playPause}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <LyricsSection 
              lyricsUrl={song?.lyricsUrl} 
              currentTime={currentTime} 
          />
        </div>
        
        <RecommendedSongs songs={recommendedSongs} />
      </div>
    </div>
  );
}