import { useState } from "react";
import { Play } from "lucide-react";

interface AlbumCardProps {
  title: string;
  coverImageUrl: string;
  songs:string[]
  updatedAt: string;
  totalStreams?: string;
}

export const AlbumCard = ({  title,coverImageUrl,songs,updatedAt,totalStreams }: AlbumCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const URL = import.meta.env.VITE_API_URL
  const CoverImageURL = `${URL}/albums/${coverImageUrl}`
  const dateObject = new Date(updatedAt)
  const year = dateObject.getFullYear()

  return (
     <div
      className="bg-[#181818] p-4 rounded-lg transition-colors cursor-pointer relative hover:bg-[#282828]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img
          src={CoverImageURL}
          alt={title}
          className="w-full aspect-square object-cover rounded"
        />

        {isHovered && (
          <button
            className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1DB954] border-none flex items-center justify-center shadow-lg transition-all hover:scale-105 hover:bg-[#1ed760]"
          >
            <Play fill="#000000" color="#000000" size={20} className="ml-0.5" />
          </button>
        )}
      </div>

      <div>
        <h3 className="text-white text-base font-semibold mb-1 truncate">
          {title}
        </h3>

        <p className="text-[#b3b3b3] text-sm mb-2">
          {year} • {songs.length} tracks
        </p>

        {totalStreams && (
          <p className="text-[#b3b3b3] text-xs">{totalStreams} streams</p>
        )}
      </div>
    </div>
  );
};
