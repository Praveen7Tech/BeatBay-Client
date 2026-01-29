import { Plus, Music } from "lucide-react";
import { Link } from "react-router-dom";

interface ArtistHeaderProps {
  songCount?: number;
}

export const ArtistHeader = ({ songCount = 0 }: ArtistHeaderProps) => {
  return (
    <div className="mb-10 p-2">
      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Your Songs
          </h1>
          <p className="text-sm text-[#a7a7a7] mt-1">
            Manage and view your uploaded tracks
          </p>
        </div>

        {/* Right stats */}
        <div className="flex items-center gap-2 text-sm text-[#a7a7a7]">
          <Music size={20} className="text-[#1DB954]"/>
          <span className="font-medium text-white">
            {songCount}
          </span>
          <span>Songs</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-6">
        <Link to="/artist/uploadTrack">
          <button
            className="flex items-center gap-2 h-12 px-6 rounded-full
              border border-[#a7a7a7] text-white font-medium
              hover:border-[#1DB954] hover:text-[#1DB954]
              transition-colors"
          >
            <Plus size={18} />
            New Song
          </button>
        </Link>
      </div>
    </div>
  );
};
