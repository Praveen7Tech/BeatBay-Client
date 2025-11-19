import { useState } from "react";
import { Play } from "lucide-react";

interface AlbumCardProps {
  _id: string;
  title: string;
  coverImageUrl: string;
}

export const AlbumCard = ({ title, coverImageUrl }: AlbumCardProps) => {
  const [hovered, setHovered] = useState(false);
  const URL = import.meta.env.VITE_API_URL
  const baseURL = `${URL}/albums/${coverImageUrl}`
  return (
    <div
      className="bg-surface p-4 rounded-lg transition hover:bg-surface-hover cursor-pointer relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover Image */}
      <div className="relative mb-3">
        <img
          src={baseURL}
          alt={title}
          className="w-full aspect-square rounded object-cover"
        />

        {hovered && (
          <button
            className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary 
                       shadow-lg flex items-center justify-center transition-transform
                       hover:scale-105"
          >
            <Play className="h-5 w-5 text-background ml-1" />
          </button>
        )}
      </div>

      {/* Info */}
      <h3 className="text-white font-semibold truncate">{title}</h3>
      <p className="text-muted-foreground text-sm truncate">Album</p>
    </div>
  );
};
