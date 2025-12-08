import { Play, Heart, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface SongTableConfig {
  title: string;
  showDateAdded?: boolean;
  showDuration?: boolean;
  showHeart?: boolean;
}

export interface SongTableProps {
  songs: any[]; 
  config?: SongTableConfig;
}

export const SongTable = ({ songs, config }: SongTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedSongs(prev => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  return (
    <div >
      <h2 className="text-2xl font-bold my-8 text-white">{config?.title}</h2>
      
      <div className="bg-spotify-dark rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#282828]">
              <th className="text-left px-4 py-3 text-spotify-secondary text-sm font-medium w-12">#</th>
              <th className="px-4 py-3 text-left text-spotify-secondary text-sm hidden lg:table-cell">Title</th>
              <th className="px-4 py-3 text-left text-spotify-secondary text-sm hidden lg:table-cell">Album</th>
               <th className="px-4 py-3 text-left text-spotify-secondary text-sm hidden lg:table-cell">
                Date Added
              </th>
               <th className="px-4 py-3 text-left text-spotify-secondary text-sm hidden lg:table-cell">
                <Clock className="h-4 w-4 inline" />
              </th>
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
                <td className="px-4 py-3">
                  {hoveredRow === index ? (
                    <button className="text-white hover:scale-110 transition-transform">
                      <Play className="h-4 w-4 fill-current text-green-500" />
                    </button>
                  ) : (
                    <span className="text-spotify-secondary text-sm">{index + 1}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Link to={`/song/${song._id}`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={song?.coverImageUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                     <div>
                    <p className="text-white font-medium hover:text-green-500">{song.title}</p>
                    <p className="text-spotify-secondary text-sm">{"song.artist"}</p>
                  </div>
                  </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="text-spotify-secondary text-sm">{song.album}</span>
                </td>
                 <td className="px-6 py-4 text-right">
                  <button
                    onClick={(e) => toggleLike(song._id, e)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        likedSongs.has(song._id)
                          ? "fill-red-500 text-red-500"
                          : "text-spotify-secondary hover:text-white"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <span className="text-spotify-secondary text-sm">{song.duration}</span>
                    <button className="w-8 h-8 rounded-full bg-transparent hover:bg-[#3e3e3e] flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                      <Plus className="h-5 w-5 text-spotify-secondary hover:text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
