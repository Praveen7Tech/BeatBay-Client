import { TrendingUp, Music, Disc } from "lucide-react";
import { Link } from "react-router-dom";
import { TopPlayedAlbums, TopPlayedSong } from "../../utils/api.type";

interface TopContentProps {
  songs: TopPlayedSong[];
  albums: TopPlayedAlbums[];
}

export const ArtistTopContent = ({ songs, albums }: TopContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Songs */}
      <div className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Top Songs</h3>

        {songs?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Music size={40} className="text-[#535353] mb-3" />
            <p className="text-white/70 text-sm">No songs yet</p>
            <p className="text-[#a7a7a7] text-xs">
              Upload songs to see analytics here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {songs?.map((song, index) => (
              <Link key={song.songId} to={`/artist/song-details/${song.songId}`}>
                <div className="flex items-center gap-4 p-3 rounded-md hover:bg-[#282828] transition-colors group">
                  <span className="text-[#a7a7a7] text-sm w-4">{index + 1}</span>

                  <img
                    src={song.coverImageUrl}
                    alt={song.title}
                    className="w-14 h-14 rounded object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {song.title}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-green-500">
                      <TrendingUp size={12} />
                      <span>{song.playCount} streams</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Top Albums */}
      <div className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Top Albums</h3>

        {albums?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Disc size={40} className="text-[#535353] mb-3" />
            <p className="text-white/70 text-sm">No albums yet</p>
            <p className="text-[#a7a7a7] text-xs">
              Create albums to track performance
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {albums.map((album, index) => (
              <div
                key={album.albumId}
                className="flex items-center gap-4 p-3 rounded-md hover:bg-[#282828] transition-colors"
              >
                <span className="text-[#a7a7a7] text-sm w-4">{index + 1}</span>

                <img
                  src={album.coverImageUrl}
                  alt={album.title}
                  className="w-12 h-12 rounded object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {album.title}
                  </p>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-light truncate">
                    {album.songs} songs
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <TrendingUp size={12} />
                    <span>{album.playCount ?? 0} streams</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};