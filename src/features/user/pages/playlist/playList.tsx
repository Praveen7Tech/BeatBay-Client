
import { PlaylistHeader } from "../../components/playlist/playList.header"; 
import { useParams } from "react-router-dom";
import { PlaylistSearchSection } from "../../components/playlist/searchSection";
import { PlaylistSongTable } from "../../components/playlist/songList";
import { usePlayList } from "@/core/hooks/usePlayList";

export default function PlaylistDetail() {
    const { playListId } = useParams<{ playListId: string }>();
    
    // use hook for manage the add to playlist
    const {
        songIsLoading, 
        playlistLoading, 
        playlisterror, 
        songIsError, 
        error, 
        playList,
        songs,  
        onAddSongClick,  
        setOnAddSongClick,  
        AddSongs  
    } = usePlayList(playListId);  

    if (songIsLoading || playlistLoading) {
        return <div className="min-h-screen bg-black text-white p-8">Loading songs...</div>;
    }

    if (songIsError || playlisterror) { 
        return <div>Error: {error?.message}</div>;
    }
     
    const currentPlaylistSongs = playList?.songs || []; 

  return (
    <div className="min-h-screen bg-linear-to-b from-[#121212] to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <PlaylistHeader 
          playListName={playList?.name}
          onAddSongClick={() => setOnAddSongClick(!onAddSongClick)} 
        />

        <PlaylistSearchSection 
          songs={songs || []}  
          isOpen={onAddSongClick}
          onClose={() => setOnAddSongClick(false)}
          addSong={AddSongs}  
        />

        <PlaylistSongTable songs={currentPlaylistSongs} />
      </div>
    </div>
  );
}
