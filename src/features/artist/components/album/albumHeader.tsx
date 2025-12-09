import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface AlbumHeaderProps{
  totalAlbums: number
  totalSongs: number
}

export const AlbumHeader = ({totalAlbums,totalSongs}: AlbumHeaderProps) => {
  return (
    <div className="relative mb-8">
      <div
        className=" flex items-end gap-6 p-8 rounded-lg bg-linear-to-b from-[#282828] to-transparent " >
        <div className="flex-1">
          <p className="text-sm font-medium text-spotify-secondary mb-2">Albums</p>

          <h1 className="text-5xl font-bold mb-4 text-white">Your Albums</h1>

          <div className="flex items-center gap-6 text-sm text-spotify-secondary">
            <span className="font-medium">{totalAlbums} albums</span>
            <span>•</span>
            <span>{totalSongs} songs</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 px-8">
        {/* Play All Button */}
        {/* <button
          className=" rounded-full h-14 px-8 bg-[#1DB954] text-black font-semibold  flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-spotify-green "    >
          <Play size={20} fill="currentColor" />
          Play All
        </button> */}

        {/* New Album Button */}
        <Link to="/artist-createAlbum">
          <button
            className=" rounded-full h-14 px-8 bg-transparent border border-spotify-secondary text-white font-semibold flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:border-[#1DB954] "  >
            <Plus size={20} />
            New Album
          </button>
        </Link>
      </div>
    </div>
  );
};
