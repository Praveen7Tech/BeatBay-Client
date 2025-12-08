import { Play, Plus, Clock } from "lucide-react";
import { useState } from "react";
import { SongData } from "../../services/userApi";
import { Link } from "react-router-dom";

interface AlbumSongListProps {
  songs: SongData[];
}

export const AlbumSongList = ({ songs} : AlbumSongListProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const isPlaying = true

  return (
    <div className="bg-spotify-dark rounded-lg mt-8">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#282828]">
            <th className="text-left px-6 py-3 text-spotify-secondary text-sm font-medium w-16">#</th>
            <th className="text-left px-4 py-3 text-spotify-secondary text-sm font-medium">TITLE</th>
            <th className="text-right px-6 py-3 text-spotify-secondary text-sm font-medium w-32">
              <Clock className="h-4 w-4 inline" />
            </th>
            <th className="text-right px-6 py-3 w-16"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song._id}
              className="border-b border-[#282828] hover:bg-[#282828] transition-colors group"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td className="px-6 py-4">
                {isPlaying ? (
                  <div className="flex gap-0.5 items-end h-4 w-4">
                    <div className="w-1 bg-[#1DB954] rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ height: "60%", animationDelay: "0s" }}></div>
                    <div className="w-1 bg-[#1DB954] rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: "0.2s" }}></div>
                    <div className="w-1 bg-[#1DB954] rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ height: "80%", animationDelay: "0.4s" }}></div>
                  </div>
                ) : hoveredRow === index ? (
                  <button className="text-white hover:scale-110 transition-transform">
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                ) : (
                  <span className={isPlaying ? "text-[#1DB954] text-sm font-medium" : "text-spotify-secondary text-sm"}>{index + 1}</span>
                )}
              </td>
              <td className="px-4 py-4">
                <Link to={`/song/${song._id}`}>
                <div className="flex items-center gap-4">
                  <img
                    src={song.coverImageUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span className={isPlaying ? "text-[#1DB954] font-medium" : "text-white font-normal"}>{song.title}</span>
                </div>
                </Link>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-spotify-secondary text-sm">{song.duration}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="w-8 h-8 rounded-full bg-transparent hover:bg-[#3e3e3e] flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                  <Plus className="h-5 w-5 text-spotify-secondary hover:text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
