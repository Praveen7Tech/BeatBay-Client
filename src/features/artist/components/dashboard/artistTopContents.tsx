import { Play, TrendingUp } from "lucide-react";

interface TopSong {
  id: string;
  title: string;
  streams: number;
  revenue: number;
  trend: number;
}

interface TopAlbum {
  id: string;
  title: string;
  streams: number;
  songs: number;
}

const topSongs: TopSong[] = [
  { id: "1", title: "Midnight Dreams", streams: 45200, revenue: 1250, trend: 15 },
  { id: "2", title: "Ocean Waves", streams: 38400, revenue: 980, trend: 8 },
  { id: "3", title: "City Lights", streams: 32100, revenue: 820, trend: -3 },
  { id: "4", title: "Summer Nights", streams: 28500, revenue: 720, trend: 22 },
  { id: "5", title: "Golden Hour", streams: 24800, revenue: 640, trend: 5 },
];

const topAlbums: TopAlbum[] = [
  { id: "1", title: "Dreamscape", streams: 125000, songs: 12 },
  { id: "2", title: "Horizons", streams: 98000, songs: 10 },
  { id: "3", title: "Echoes", streams: 76000, songs: 8 },
];

export const ArtistTopContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Songs */}
      <div className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Top Songs</h3>
        <div className="space-y-3">
          {topSongs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-3 rounded-md hover:bg-[#282828] transition-colors group"
            >
              <span className="text-[#a7a7a7] text-sm w-4">{index + 1}</span>
              <button className="p-2 bg-[#1DB954] rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={12} className="text-black fill-black" />
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{song.title}</p>
                <p className="text-[#a7a7a7] text-xs">{song.streams.toLocaleString()} streams</p>
              </div>
              <div className="text-right">
                <p className="text-white text-sm">${song.revenue}</p>
                <div className={`flex items-center gap-1 text-xs ${song.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp size={12} />
                  <span>{song.trend >= 0 ? '+' : ''}{song.trend}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Albums */}
      <div className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Top Albums</h3>
        <div className="space-y-3">
          {topAlbums.map((album, index) => (
            <div
              key={album.id}
              className="flex items-center gap-4 p-3 rounded-md hover:bg-[#282828] transition-colors"
            >
              <span className="text-[#a7a7a7] text-sm w-4">{index + 1}</span>
              <div className="w-12 h-12 bg-linear-to-br from-[#535353] to-[#282828] rounded flex items-center justify-center">
                <span className="text-white text-lg font-bold">{album.title.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{album.title}</p>
                <p className="text-[#a7a7a7] text-xs">{album.songs} songs</p>
              </div>
              <div className="text-right">
                <p className="text-white text-sm">{(album.streams / 1000).toFixed(0)}K</p>
                <p className="text-[#a7a7a7] text-xs">streams</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
