import { formatTime } from "@/core/utils/formatTime";
import {  MoreHorizontal, Play } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FetchSong } from "../../services/artist.api";
import { format, parseISO } from "date-fns";


export const SongCard = ({ 
  id,
  title, 
  coverImageUrl,
  duration,
  createdAt 
}: FetchSong) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="group flex items-center gap-4 p-3 rounded-md transition-all duration-200 cursor-pointer hover:bg-[#1a1a1a]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: isHovered ? '#1a1a1a' : 'transparent' }}
    >
      <div className="relative shrink-0">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-20 h-20 rounded object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 rounded flex items-center justify-center">
            <button
              className="w-10 h-10 rounded-full bg-[#1DB954] hover:bg-spotify-green hover:scale-110 transition-all duration-200 flex items-center justify-center"
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
      </div>

      {createdAt && (
        <div className="hidden md:block text-sm text-spotify-secondary w-28 text-right">
          {format(parseISO(createdAt), "MMM dd, yyyy")}
        </div>
      )}

        <div className="hidden lg:block text-sm text-spotify-secondary w-20 text-right items-center justify-end gap-1">
          {0}
        </div>

      <div className="text-sm text-spotify-secondary w-16 text-right">
        {formatTime(Number(duration))}
      </div>

      <button
        className="w-10 h-10 rounded-full hover:bg-[#2a2a2a] transition-all duration-200 flex items-center justify-center"
        style={{ opacity: isHovered ? 1 : 0 }}
      ><Link to={`/artist/edit-song/${id}`}>
        <MoreHorizontal className="h-5 w-5 text-spotify-secondary" />
        </Link>
      </button>
    </div>
  );
};