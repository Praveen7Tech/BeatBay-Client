import { Pause, Play } from "lucide-react";
import { SongDetails } from "../../services/response.type";
import { usePlayer } from "@/core/context/AudioProvider"; 
import React from "react";

interface TopResultCardProps {
  id: string;
  title: string;
  artist: string;
  coverImageUrl: string;
}

interface TotResult {
  topResult: TopResultCardProps;
  songs: SongDetails[];
}

const TopResultCard = ({ topResult, songs }: TotResult) => {

  const { startPlayback, isPlaying, playPause, currentSong } = usePlayer();

  // Check if this specific song is what's currently loaded in the engine
  const isThisSongLoaded = currentSong?.id === topResult.id;

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isThisSongLoaded) {
      playPause();
    } else {
      const playlist = Array.isArray(songs) ? songs : [];
      
      if (playlist.length > 0) {
        const startIndex = playlist.findIndex(s => s.id === topResult.id);
        startPlayback(playlist, startIndex >= 0 ? startIndex : 0);
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>

      <div className="flex-1 bg-[#181818] rounded-lg p-5 hover:bg-[#282828] transition-colors group cursor-pointer relative flex flex-col justify-between">
        <div>
          <img
            src={topResult.coverImageUrl}
            alt={topResult.title}
            className="w-40 h-38 rounded-md mb-4 shadow-lg object-cover"
          />

          <h3 className="text-3xl font-bold text-white mb-2 truncate">
            {topResult.title}
          </h3>

          <div className="flex items-center gap-2">
            <span className="bg-spotify-dark text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
              Song
            </span>
            <p className="text-sm text-[#a7a7a7] hover:underline">
              {topResult.artist}
            </p>
          </div>
        </div>

        <button 
          onClick={handlePlayPause} 
          className="absolute bottom-5 right-5 w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-105 active:scale-95"
        >
           {isPlaying && isThisSongLoaded ? (
              <Pause className="h-6 w-6 fill-black text-black" />
            ):(
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            )} 
        </button>
      </div>
    </div>
  );
};

export default TopResultCard;
