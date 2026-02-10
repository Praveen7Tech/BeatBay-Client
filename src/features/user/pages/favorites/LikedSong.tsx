import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { useLikesSongs } from "@/core/hooks/api/useFetchHooks";
import { SpinnerCustom } from "@/components/ui/spinner";
import LikedSongsHeader from "../../components/favorites/LikedSongsHeader";
import LikedSongsActions from "../../components/favorites/LikedSongsActions";
import LikedSongsTable from "../../components/favorites/LikedSongsTable";
import { useSongActions } from "@/core/hooks/song/useSongActions";
import { usePlayer } from "@/core/context/AudioProvider";

const LikedSongs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { data, isLoading, isError, error } = useLikesSongs(userId!);

  const { handleLike } = useSongActions("liked");

  const {currentSong,startPlayback, isPlaying,playPause} = usePlayer()

  if (isLoading) return <SpinnerCustom />;

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error instanceof Error ? error.message : "Failed to load liked songs"}
      </div>
    );

  const songs = data?.songs ?? [];
  const isCurrentSongPlaying =  isPlaying && currentSong?.id === songs[0]?.id

  const HandleSongPlaying = ()=>{
    if(isCurrentSongPlaying){
      playPause()
    }else{
      startPlayback(songs)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <LikedSongsHeader 
        totalSongs={songs.length} 
      />
      <LikedSongsActions 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPlaySong={HandleSongPlaying}
        isPlaying={isPlaying}
       />
      <LikedSongsTable
        songs={songs}
        toggleLike={handleLike}
        searchQuery={searchQuery}
        activeSongId={currentSong?.id}
      />
    </div>
  );
};

export default LikedSongs;
