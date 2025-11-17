import { Play, Heart, Plus, Pause } from "lucide-react";
import { ArtistInfo } from "../../services/userApi";

interface SongHeaderProps {
  title: string;
  artistId: ArtistInfo;
  coverImageUrl: string;

  isPlaying: boolean;
  onPlayPause: () => void;
}

export const SongHeader = ({
  title,
  artistId,
  coverImageUrl,
  isPlaying,
  onPlayPause
}: SongHeaderProps) => {

  const URL = import.meta.env.VITE_API_URL
  const baseURL = `${URL}/songs/${coverImageUrl}`

  const artistProfilepicture = `${URL}/uploads/${artistId.profilePicture}`
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Song Cover */}
      <div className="shrink-0">
        <img
          src={baseURL}
          alt={title}
          className="w-64 h-64 rounded-lg shadow-2xl object-cover"
        />
        
        {/* Action Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button onClick={onPlayPause}
            className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 transition-all flex items-center justify-center shadow-lg"
            style={{ border: "none", cursor: "pointer" }}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 fill-black text-black" />
            ):(
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            )}           
          </button>
          
          <button
            className="w-14 h-14 rounded-full border-2 border-[#535353] hover:border-white transition-all flex items-center justify-center"
            style={{ background: "transparent", cursor: "pointer" }}
          >
            <Heart className="h-6 w-6 text-[#b3b3b3] hover:text-white" />
          </button>
          
          <button
            className="w-14 h-14 rounded-full border-2 border-[#535353] hover:border-white transition-all flex items-center justify-center"
            style={{ background: "transparent", cursor: "pointer" }}
          >
            <Plus className="h-6 w-6 text-[#b3b3b3] hover:text-white" />
          </button>
        </div>
      </div>

      {/* Song Info */}
      <div className="flex-1">
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
          <span className="text-[#b3b3b3]">•</span>
          <span className="text-[#b3b3b3]">{  "3.04"}</span>
        </div>

        {/* Artist Section */}
        <div className="items-center gap-4 mt-6 p-3 bg-transparent rounded-lg hover:bg-[#282828] transition-colors cursor-pointer inline-flex">
          <img
            src={artistProfilepicture}
            alt={"artist profile"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-xs text-[#b3b3b3] mb-1">Artist</p>
            <p className="text-sm font-medium text-white">{artistId?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
