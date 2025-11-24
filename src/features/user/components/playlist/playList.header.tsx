import { Play, Plus } from "lucide-react";
import { useState } from "react";
import { PlaylistEditDialog } from "../../pages/playlist/editPlayList";
import { PlaylistDetailsResponse } from "../../services/userApi";

interface PlaylistHeaderProps {
  playListData: PlaylistDetailsResponse
  onAddSongClick: () => void;
}
const URL = import.meta.env.VITE_API_URL

export const PlaylistHeader = ({ playListData, onAddSongClick}: PlaylistHeaderProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  
  const coverImage = `${URL}/playList/${playListData.coverImageUrl}`
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={`${coverImage}`}
          alt={"title"}
          className="w-56 h-56 rounded-lg shadow-2xl object-cover"
        />
        <div className="flex flex-col justify-end gap-6 cursor-pointer">
          <div onClick={()=> setIsEdit(!isEdit)}>
            <p className="text-sm font-medium text-white uppercase tracking-wider mb-2">
              Playlist
            </p>
            <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
              {playListData.name}
            </h1>
            <p className="text-[#b3b3b3] mb-4">{playListData.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white font-medium">{"owner"}</span>
              <span className="text-[#b3b3b3]">•</span>
              <span className="text-[#b3b3b3]">{"totalTracks"} songs</span>
              <span className="text-[#b3b3b3]">•</span>
              <span className="text-[#b3b3b3]">{"totalDuration"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all flex items-center justify-center shadow-lg"
        >
          <Play className="h-6 w-6 fill-black text-black ml-1" />
        </button>

        <button
          onClick={onAddSongClick}
          className="h-10 px-6 rounded-full border border-border bg-surface hover:bg-surface-hover transition-colors flex items-center gap-2 text-foreground font-medium"
        >
          <Plus className="h-5 w-5" />
          Add Song
        </button>
      </div>
       <PlaylistEditDialog
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
        playlistId={playListData._id}
        initialData={{
          name: playListData.name,
          description: "",
          image: ""
        }}
      />
    </>
    
  );
};
