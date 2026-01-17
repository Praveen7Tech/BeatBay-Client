import { Pause, Play, Plus } from "lucide-react";
import { useState } from "react";
import { PlaylistEditDialog } from "../../pages/playlist/editPlayList";
import { PlaylistDetailsResponse } from "../../services/response.type";
import { formatTime } from "@/core/utils/formatTime";
import { PlaylistActionsMenu } from "@/core/components/action-menu/PlayListActionMenu";
import { useDeletePlayList } from "@/core/hooks/playList/useDeletePlaylist";
import { RoomGuard } from "@/core/components/tooltTip/roomguard";

interface PlaylistHeaderProps {
  playListData: PlaylistDetailsResponse
  onAddSongClick: () => void;
  handlePlayPause: ()=> void
  isPlaying: boolean;
  totalTracks: number;
  totalDuration:number
}

export const PlaylistHeader = ({ playListData, onAddSongClick, isPlaying, handlePlayPause, totalTracks, totalDuration}: PlaylistHeaderProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const deleteMutation = useDeletePlayList()

  const handleDeletePlaylist = ()=>{
    deleteMutation.mutate(playListData.id)
  }
  
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-56 h-56 rounded-lg shadow-2xl overflow-hidden bg-[#1f1f1f] flex items-center justify-center">
        {playListData.coverImageUrl ? (
          <img
            src={playListData.coverImageUrl}
            alt={playListData.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <Play className="h-12 w-12 opacity-70 mb-2" />
            <span className="text-sm">No Cover</span>
          </div>
        )}
      </div>
        <div className="flex flex-col justify-end gap-6 cursor-pointer">
          <div>
            <p className="text-sm font-medium text-white uppercase tracking-wider mb-2">
              Playlist
            </p>
            <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
              {playListData.name}
            </h1>
            <p className="text-spotify-secondary mb-4">{playListData.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white font-medium">{"owner"}</span>
              <span className="text-spotify-secondary">•</span>
              <span className="text-spotify-secondary">{totalTracks} songs</span>
              <span className="text-spotify-secondary">•</span>
              <span className="text-spotify-secondary">{formatTime(totalDuration)} minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <RoomGuard>
        <button onClick={handlePlayPause}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all flex items-center justify-center shadow-lg"
        >
          {isPlaying ? (
              <Pause className="h-6 w-6 fill-black text-black" />
            ):(
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            )} 
        </button>
        </RoomGuard>

        <button
          onClick={onAddSongClick}
          className="h-10 px-6 rounded-full border border-border bg-surface hover:bg-surface-hover transition-colors flex items-center gap-2 text-foreground font-medium"
        >
          <Plus className="h-5 w-5" />
          Add Song
        </button>
        <PlaylistActionsMenu
          playlistId={playListData.id}
          playlistName={playListData.name}
          onDelete={handleDeletePlaylist}
          onEdit={()=>setIsEdit(!isEdit)}
        />
            
      </div>
       <PlaylistEditDialog
          isOpen={isEdit}
          onClose={() => setIsEdit(false)}
          playlistId={playListData.id}
          initialData={playListData}
      />
    </>
    
  );
};
