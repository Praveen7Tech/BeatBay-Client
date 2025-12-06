import { Play, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SongCardProps {
  _id: string;
  title: string;
  // album: string;
  coverImageUrl: string;
  duration: string
}


export const PopularSongs = ({ _id, title, duration, coverImageUrl }: SongCardProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleLike = (songId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedSongs(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(songId)) {
        newLiked.delete(songId);
      } else {
        newLiked.add(songId);
      }
      return newLiked;
    });
  };

  const handleRowClick = (songId: string) => {
    navigate(`/song/${songId}`);
  };

  return (
   <div className="space-y-2">
        <div
          className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center px-4 py-2 rounded-md hover:bg-surface-hover transition-colors cursor-pointer group"
          onMouseEnter={() => setHoveredRow(1)}
          onMouseLeave={() => setHoveredRow(null)}
          onClick={() => handleRowClick(_id)}
        >
          {/* Rank / Play Button */}
          <div className="w-8 text-center">
            {hoveredRow === 1 ? (
              <Play className="h-4 w-4 fill-foreground text-foreground mx-auto" />
            ) : (
              <span className="text-muted-foreground font-medium">{1}</span>
            )}
          </div>

          {/* Song Info */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={coverImageUrl}
              alt={title}
              className="w-10 h-10 rounded object-cover"
            />
            <div className="min-w-0">
              <p className="text-foreground font-medium truncate">{title}</p>
            </div>
          </div>

          {/* Play Count */}
          <div className="text-muted-foreground text-sm">
            {1000}
          </div>

          {/* Duration & Like */}
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => toggleLike("song.id", e)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  likedSongs.has("song.id")
                    ? "fill-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              />
            </button>
            <span className="text-muted-foreground text-sm w-12 text-right">
              {duration}
            </span>
          </div>
        </div>
    
    </div>
  );
};
