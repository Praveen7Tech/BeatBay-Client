import { formatTime } from "@/core/utils/formatTime";
import { SongDetails } from "@/features/user/services/response.type";
import { Play, Heart, Clock, AudioLines } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SongActionsMenu } from "../action-menu/SongActionMenu";

export interface SongTableProps {
  songs: SongDetails[]; 
  title: string
  activeSongId?: string | undefined
  onLike?: (id: string) => void;
  showAction?:boolean;
  showRemoveFromPlaylist?: boolean;
  onRemoveFromPlaylist?: (songId: string) => void;
  onAddToPlaylist?: (songId: string, playlistId: string) => void;
}

export const SongTable = ({ songs, title, activeSongId,onLike,showAction,showRemoveFromPlaylist,onRemoveFromPlaylist,onAddToPlaylist }: SongTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold my-8 text-white">{title}</h2>
       {songs.length > 0 ? (
      <div className="bg-spotify-dark rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#282828]">
              <th className="text-left px-4 py-3 text-spotify-secondary text-sm font-medium w-12">#</th>
              <th className="px-4 py-3 text-left text-spotify-secondary text-sm">Title</th>
             <th className="px-4 py-3 text-left text-spotify-secondary text-sm hidden lg:table-cell">
                {/* Date Added */}
              </th>
              <th className="px-4 py-3 w-8"></th>
               <th className="px-4 py-3 text-right text-spotify-secondary text-sm">
                <Clock className="h-4 w-4 inline" />
              </th>
              
              <th className="px-4 py-3 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {songs?.map((song, index) => (
              <tr
                key={song.id}
                className={`border-b border-[#282828] hover:bg-[#282828] transition-colors group
                  ${activeSongId === song.id ? "text-green-500" : ""}`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
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
                <td className="px-4 py-3">
                  <Link to={`/song/${song.id}`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={song?.coverImageUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                     <div>
                    <p
                      className={`font-medium hover:text-green-500 ${
                        activeSongId === song.id ? "text-green-500" : "text-white"
                      }`}
                    >
                      {song.title}
                    </p>
                    <p className="text-spotify-secondary text-sm">{song?.artist?.name || song?.artistName || ""}</p>
                  </div>
                  </div>
                  </Link>
                </td>
                
                 <td className="px-4 py-3 text-left hidden lg:table-cell">
                   <span className="text-spotify-secondary text-sm"></span>
                </td>
                 
                <td className="px-4 py-3">
                  <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike?.(song.id); 
                  }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-end"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        song.isLiked
                          ? "fill-red-500 text-red-500"
                          : "text-spotify-secondary hover:text-white"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-spotify-secondary text-sm">{formatTime(song.duration)}</span>
                </td>
                {showAction && (
                <td className="px-4 py-3">
                  <SongActionsMenu
                    songId={song.id}
                    artist={song.artist?.id }
                    showRemoveFromPlaylist={showRemoveFromPlaylist}
                    onRemoveFromPlaylist={onRemoveFromPlaylist}
                    onAddToPlaylist={onAddToPlaylist}
                  />
                </td>
              )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       ):
      <p className="p-4 text-gray-500">Oops no Songs found.</p>
    }
    </div>
  );
};

