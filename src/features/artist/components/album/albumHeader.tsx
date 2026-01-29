import { Plus, Disc3, Music } from "lucide-react";
import { Link } from "react-router-dom";

interface AlbumHeaderProps {
  totalAlbums: number;
  totalSongs: number;
}

export const AlbumHeader = ({
  totalAlbums,
  totalSongs,
}: AlbumHeaderProps) => {
  return (
    <div className="mb-10 p-6">
      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Your Albums
          </h1>
          <p className="text-sm text-[#a7a7a7] mt-1">
            Manage and view your album dashboard
          </p>
        </div>

        {/* Right stats */}
        <div className="flex items-center gap-6 text-sm text-[#a7a7a7]">
          <div className="flex items-center gap-2">
            <Disc3 size={20} className="text-[#1DB954]"/>
            <span className="font-medium text-white">
              {totalAlbums}
            </span>
            <span>Albums</span>
          </div>

          <div className="flex items-center gap-2">
            <Music size={20} className="text-[#1DB954]"/>
            <span className="font-medium text-white">
              {totalSongs}
            </span>
            <span>Songs</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-6">
        <Link to="/artist/createAlbum">
          <button  className="flex items-center gap-2 h-12 px-6 rounded-full
              border border-[#a7a7a7] text-white font-medium
              hover:border-[#1DB954] hover:text-[#1DB954]
              transition-colors"
          >
            <Plus size={18} />
            New Album
          </button>
        </Link>
      </div>
    </div>
  );
};
