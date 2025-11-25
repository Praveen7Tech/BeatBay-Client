import { Play, Plus } from "lucide-react";
import { useState } from "react";
import {  SongResponse } from "../../services/userApi";
import { Link } from "react-router-dom";



interface RecommendedSongsProps {
  songs: SongResponse[]
}

export const RecommendedSongs = ({ songs }: RecommendedSongsProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const URL = import.meta.env.VITE_API_URL
  const baseURL = `${URL}/songs/`

  return (
    <div >
      <h2 className="text-2xl font-bold mb-6 text-white">Recommended Songs</h2>
      
      <div className="bg-[#121212] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#282828]">
              <th className="text-left px-4 py-3 text-[#b3b3b3] text-sm font-medium w-12">#</th>
              <th className="text-left px-4 py-3 text-[#b3b3b3] text-sm font-medium">TITLE</th>
              <th className="text-left px-4 py-3 text-[#b3b3b3] text-sm font-medium">ALBUM</th>
              <th className="text-right px-4 py-3 text-[#b3b3b3] text-sm font-medium w-20">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="inline">
                  <path d="M8 1.5l2.5 5 5.5.5-4 4 1 5.5-5-3-5 3 1-5.5-4-4 5.5-.5z"/>
                </svg>
              </th>
              <th className="text-right px-4 py-3 text-[#b3b3b3] text-sm font-medium w-24"></th>
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
                    <span className="text-[#b3b3b3] text-sm">{index + 1}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Link to={`/song/${song._id}`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={`${baseURL}${song?.coverImageUrl}`}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="text-white font-medium hover:text-green-500">{song.title}</span>
                  </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[#b3b3b3] text-sm">{song.album}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="w-8 h-8 rounded-full bg-transparent hover:bg-[#3e3e3e] flex items-center justify-center transition-colors mx-auto">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#b3b3b3] hover:text-white">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <span className="text-[#b3b3b3] text-sm">{song.duration}</span>
                    <button className="w-8 h-8 rounded-full bg-transparent hover:bg-[#3e3e3e] flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                      <Plus className="h-5 w-5 text-[#b3b3b3] hover:text-white" />
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
