import { Play, MoreHorizontal, Heart } from "lucide-react";
import { useState } from "react";

interface SongCardProps {
  id: string;
  title: string;
  album: string;
  coverImageUrl: string;
  streams?: string;
  listeners?: string;
  releasedDate?: string;
  likes?: string;
  duration: string;
}

export const SongCard = ({ 
  title, 
  album, 
  coverImageUrl, 
  streams, 
  listeners, 
  releasedDate, 
  likes, 
  duration 
}: SongCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const URL = import.meta.env.VITE_API_URL
  const CoverImageURL = `${URL}/songs/${coverImageUrl}`
  
  return (
    <div className="group flex items-center gap-4 p-3 rounded-md transition-all duration-200 cursor-pointer hover:bg-[#1a1a1a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: isHovered ? '#1a1a1a' : 'transparent' }}
    >
      <div className="relative shrink-0">
        <img
          src={CoverImageURL}
          alt={album}
          className="w-14 h-14 rounded object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/60 rounded flex items-center justify-center">
            <button
              className="w-10 h-10 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-110 transition-all duration-200 flex items-center justify-center"
            >
              <Play className="h-5 w-5 fill-white text-white" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate transition-colors duration-200 group-hover:text-[#1DB954]">
          {title}
        </h3>
        <p className="text-sm text-[#b3b3b3] truncate">{album}</p>
      </div>

      {streams && (
        <div className="hidden lg:block text-sm text-[#b3b3b3] w-24 text-right">
          {streams}
        </div>
      )}

      {listeners && (
        <div className="hidden xl:block text-sm text-[#b3b3b3] w-24 text-right">
          {listeners}
        </div>
      )}

      {releasedDate && (
        <div className="hidden md:block text-sm text-[#b3b3b3] w-28 text-right">
          {releasedDate}
        </div>
      )}

      {likes && (
        <div className="hidden lg:block text-sm text-[#b3b3b3] w-20 text-right items-center justify-end gap-1">
          <Heart className="h-4 w-4" />
          {likes}
        </div>
      )}

      <div className="text-sm text-[#b3b3b3] w-16 text-right">
        {duration}
      </div>

      <button
        className="w-10 h-10 rounded-full hover:bg-[#2a2a2a] transition-all duration-200 flex items-center justify-center"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <MoreHorizontal className="h-5 w-5 text-[#b3b3b3]" />
      </button>
    </div>
  );
};