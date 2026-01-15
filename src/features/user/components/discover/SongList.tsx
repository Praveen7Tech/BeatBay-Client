import { formatTime } from "@/core/utils/formatTime";
import { SongDetails } from "../../services/response.type";
import { Link } from "react-router-dom";

interface SongListProps {
  songs: SongDetails[];
}

const SongList = ({ songs }: SongListProps) => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>

      <div className="flex-1 space-y-2 overflow-hidden">
        {songs.map((song) => (
          <Link to={`/song/${song.id}`}>
          <div
            key={song.id}
            className="flex items-center gap-3 p-2  rounded-md hover:bg-[#282828] cursor-pointer group"
          >   
            <img
              src={song.coverImageUrl}
              alt={song.title}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{song.title}</p>
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
    