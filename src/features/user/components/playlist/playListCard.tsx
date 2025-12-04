import { PlayButton } from "@/core/components/button/PlayButton";
import { Music } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaylistCardProps {
  id: string;
  name: string;
  coverImageUrl?: string | null;
}

export const PlaylistCard = ({ id, name, coverImageUrl }: PlaylistCardProps) => {
  const URL = import.meta.env.VITE_API_URL;
  const coverImage = `${URL}/playList/${coverImageUrl}`
  return (
    <Link
      to={`/playlist/${id}`}
      className="group p-4 rounded-md bg-[#181818] hover:bg-[#282828] transition-all duration-300 cursor-pointer"
    >
      <div className="relative mb-4">
        <div className="aspect-square rounded-md overflow-hidden bg-[#282828] flex items-center justify-center">
          {coverImageUrl ? (
            <img
              src={coverImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Music className="w-16 h-16 text-spotify-tertiary" />
          )}
        </div>
        <PlayButton/>
      </div>
      <h3 className="text-white font-bold text-base truncate mb-1">{name}</h3>
      <p className="text-[#a7a7a7] text-sm truncate">By {"owner"}</p>
    </Link>
  );
};
