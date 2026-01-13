import { SongActionsMenu } from "@/core/components/action-menu/SongActionMenu";
import { formatTime } from "@/core/utils/formatTime";
import { Play, Heart, Pause } from "lucide-react";

interface SongHeaderProps {
  title: string;
  coverImageUrl: string;
  duration: number
  isPlaying: boolean;
  onPlayPause: () => void;
  isLiked: boolean
  onLike: ()=> void;
  showAction?:boolean
  addToPlaylist: (songId: string, playlistId: string) => void;
  songId:string
}

export const SongHeader = ({ title,  coverImageUrl, duration, isPlaying, onPlayPause , onLike, isLiked,showAction, songId,addToPlaylist}: SongHeaderProps) => {
 const isAdded = false

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Song Cover */}
      <div className="shrink-0">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-64 h-64 rounded-lg shadow-2xl object-cover"
        />
        
        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button onClick={onPlayPause}
            className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-spotify-green hover:scale-105 transition-all flex items-center justify-center shadow-lg"
            style={{ border: "none", cursor: "pointer" }}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 fill-black text-black" />
            ):(
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            )}           
          </button>
          
          <button onClick={onLike}
            className="w-14 h-14 rounded-full border-2 border-[#535353] hover:border-white transition-all flex items-center justify-center"
            style={{ background: "transparent", cursor: "pointer" }}
          >
             <Heart 
              className={`h-6 w-6 transition-colors ${
                isLiked ? "fill-[#fa0909] text-[#fa0707]" : "text-spotify-secondary hover:text-white"
              }`} 
            />
          </button>
          
          <div
          className={`w-14 h-14 rounded-full transition-all flex items-center justify-center
            ${isAdded ? "border-none" : "border-2 border-[#535353] hover:border-white"}`}
        >
          {showAction && (
            <SongActionsMenu
              songId={songId}
              onAddToPlaylist={addToPlaylist}
              isHeader={true} 
            />
          )}
        </div>
        </div>
      </div>

      {/* Song Info */}
      <div className="flex-1 pt-20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 rounded-sm bg-[#282828] flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
              <circle cx="8" cy="8" r="6"/>
            </svg>
          </div>
          <span className="text-sm text-white uppercase tracking-wider font-medium">Song</span>
        </div>
        
        <h1 className="text-7xl font-bold mb-6 text-white leading-tight">{title}</h1>
        
        <div className="flex items-center gap-2 text-sm mb-6">
          <span className="text-white">{ "100 strams"}</span>
          <span className="text-spotify-secondary">•</span>
          <span className="text-spotify-secondary">{formatTime(duration)}</span>
        </div>

      </div>
    </div>
  );
};
