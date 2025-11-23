import { Clock } from "lucide-react";
import { SongData } from "../../services/userApi";

interface PlaylistSongTableProps {
  songs: SongData[];
}

export const PlaylistSongTable = ({ songs }: PlaylistSongTableProps) => {
 const URL = import.meta.env.VITE_API_URL
  return (
    <div className="bg-[#121212] rounded-lg mt-8">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#282828]">
            <th className="text-left px-6 py-3 text-[#b3b3b3] text-sm font-medium w-16">#</th>
            <th className="text-left px-4 py-3 text-[#b3b3b3] text-sm font-medium">Title</th>
            <th className="text-left px-4 py-3 text-[#b3b3b3] text-sm font-medium hidden md:table-cell">Album</th>
            <th className="text-left px-4 py-3 text-[#b3b3b3] text-sm font-medium hidden lg:table-cell">Date added</th>
            <th className="text-right px-6 py-3 text-[#b3b3b3] text-sm font-medium w-32">
              <Clock className="h-4 w-4 inline" />
            </th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song._id}
              className="border-b border-[#282828] hover:bg-[#282828] transition-colors group"
            >
              <td className="px-6 py-4">
                <span className="text-[#b3b3b3] text-sm">{index + 1}</span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`${URL}/songs/${song?.coverImageUrl}`}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <p className="text-white font-normal">{song.title}</p>
                    <p className="text-[#b3b3b3] text-sm">{"song.artist"}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 hidden md:table-cell">
                <span className="text-[#b3b3b3] text-sm">{song.album}</span>
              </td>
              <td className="px-4 py-4 hidden lg:table-cell">
                <span className="text-[#b3b3b3] text-sm">{"song.dateAdded"}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-[#b3b3b3] text-sm">{song.duration}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
