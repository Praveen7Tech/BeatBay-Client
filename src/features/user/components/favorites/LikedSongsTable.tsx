import { formatTime } from "@/core/utils/formatTime";
import { format, parseISO } from "date-fns";
import { Play, Clock, Heart, Plus, AudioLines } from "lucide-react";
import { SongDetails } from "../../services/response.type";
import { useState } from "react";
import { Link } from "react-router-dom";

interface LikedSongsTableProps {
  songs: SongDetails[];
  toggleLike: (id: string) => void;
  searchQuery: string;
  activeSongId?: string
}

const LikedSongsTable = ({
  songs,
  toggleLike,activeSongId
}: LikedSongsTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  return (
    <div className="px-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-muted-foreground text-sm">
            <th className="text-left py-3 px-4 font-medium w-12">#</th>
            <th className="text-left py-3 px-4 font-medium">Title</th>
            <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">
              Date Added
            </th>
            <th className="text-right py-3 px-4 font-medium">
              <Clock className="w-4 h-4 inline" />
            </th>
            <th className="px-4 py-3 w-8"></th>
          </tr>
        </thead>
        <tbody>
          {songs?.map((song, index) => (
            <tr
              key={song.id}
              className="group hover:bg-secondary/10 transition-colors cursor-pointer"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <td className="py-2 px-4 w-12">
                {activeSongId === song.id ? (
                    <AudioLines className="h-5 w-5 text-green-500 animate-pulse" />
                  ) : hoveredRow === index ? (
                    <button className="text-white hover:scale-110 transition-transform">
                      <Play className="h-4 w-4 fill-current text-green-500" />
                    </button>
                  ) : (
                    <span className="text-spotify-secondary text-sm">{index + 1}</span>
                  )}
              </td>
              <td className="py-2 px-4">
                <Link to={`/song/${song.id}`}>
                <div className="flex items-center gap-3">
                  <img
                    src={song.coverImageUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p  className={`font-medium hover:text-green-500 ${
                        activeSongId === song.id ? "text-green-500" : "text-white"
                      }`}>
                      {song.title}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {song.artistName}
                    </p>
                  </div>
                </div>
                </Link>
              </td>
              <td className="py-2 px-4 hidden lg:table-cell text-muted-foreground">
                {format(parseISO(song?.likedAt!), "MMM dd, yyyy")}
              </td>
              <td className="py-2 px-4 text-right">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song.id);
                  }}
                  className="flex items-center justify-end gap-3 cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 text-primary fill-primary opacity-0 group-hover:opacity-100 transition-opacity`}
                  />
                  <span className="text-muted-foreground">{formatTime(song.duration)}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <button className="w-8 h-8 rounded-full bg-transparent hover:bg-[#3e3e3e] flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                  <Plus className="h-5 w-5 text-spotify-secondary hover:text-white" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {songs?.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            no songs added to your favorites.
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedSongsTable;
