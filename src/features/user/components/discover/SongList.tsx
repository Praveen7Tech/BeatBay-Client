import { formatTime } from "@/core/utils/formatTime";
import { SongDetails } from "../../services/response.type";
import { Link } from "react-router-dom";
import { AudioLines } from "lucide-react";

interface SongListProps {
  songs: SongDetails[];
  activeSongId?: string;
}

const SongList = ({ songs, activeSongId }: SongListProps) => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>

      <div className="flex-1 space-y-2 overflow-hidden">
        {songs.map((song) => (
          <Link to={`/song/${song.id}`} key={song.id}>
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-[#282828] cursor-pointer group">
              
              <div className="w-12 h-12 flex items-center justify-center rounded bg-[#1a1a1a]">
                {activeSongId === song.id ? (
                  <AudioLines className="h-6 w-6 text-green-500 animate-pulse" />
                ) : (
                  <img
                    src={song.coverImageUrl}
                    alt={song.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium truncate ${
                    activeSongId === song.id ? "text-green-500" : "text-white"
                  }`}
                >
                  {song.title}
                </p>
                <p className="text-sm text-spotify-secondary truncate">
                  {song.artistName}
                </p>
              </div>

              <span className="text-sm text-spotify-secondary">
                {formatTime(Number(song.duration))}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SongList;
