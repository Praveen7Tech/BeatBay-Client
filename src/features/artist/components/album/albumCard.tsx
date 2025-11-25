import { useState } from "react";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

interface AlbumCardProps {
  id: string;
  name: string;
  coverImageUrl: string;
  totalSongs: number;
  createdAt: Date;
}

export const AlbumCard = ({ id, name, coverImageUrl, totalSongs, createdAt }: AlbumCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const URL = import.meta.env.VITE_API_URL;
  const albumImage = `${URL}/albums/${coverImageUrl}`;
  console.log("imagu", albumImage)

  const year = new Date(createdAt).getFullYear();

  return (
    <div
      className="bg-[#181818] p-4 rounded-lg transition-colors cursor-pointer relative hover:bg-[#282828]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4">
        <img
          src={albumImage}
          alt={name}
          className="w-full aspect-square object-cover rounded"
        />

        {isHovered && (
          <Link to={`/edit-album/${id}`}>
          <button
            className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1DB954] border-none flex items-center justify-center shadow-lg transition-all hover:scale-105 hover:bg-[#1ed760]"
          >
            <Pencil color="#000000" size={20} className="ml-0.5" />
          </button>
          </Link>
        )}
      </div>

      <div>
        <h3 className="text-white text-base font-semibold mb-1 truncate">
          {name}
        </h3>

        <p className="text-[#b3b3b3] text-sm mb-2">
          {year} • {totalSongs} tracks
        </p>
      </div>
    </div>
  );
};
