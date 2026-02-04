import { Music, Pause, Play, SkipBack, SkipForward, Repeat1, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/core/utils/formatTime";
import { usePlayer } from "@/core/context/AudioProvider";
import { cn } from "@/lib/utils";

export const MusicPlayer = () => {
  const {
    currentSong, currentTime, duration, isPlaying, playPause,
    volume, setVolume, seekTime, skipForward, skipBackward,
    isRepeating, toggleRepeat
  } = usePlayer();

  const isDisabled = !currentSong;
  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-dark border-t border-[#282828] px-4 py-3 z-50 h-[90px]">
      <div className={cn(
        "max-w-screen-2xl mx-auto flex items-center justify-between gap-4 h-full transition-opacity duration-500",
        isDisabled ? "opacity-50" : "opacity-100"
      )}>
        
        {/* LEFT: INFO (With Fallback) */}
        <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
          <div className="w-14 h-14 rounded bg-[#282828] flex items-center justify-center overflow-hidden shrink-0">
            {currentSong?.coverImageUrl ? (
              <img src={currentSong.coverImageUrl} className="w-full h-full object-cover" alt="" />
            ) : (
              <Music className="w-6 h-6 text-[#535353]" />
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">
              {currentSong?.title || "No song playing"}
            </p>
            <p className="text-xs text-[#a7a7a7] truncate">
              {currentSong?.artist?.name || "Choose a track to start"}
            </p>
          </div>
        </div>

        {/* CENTER: CONTROLS (Disabled if no song) */}
        <div className={cn(
          "flex flex-col items-center gap-2 flex-1 max-w-[720px]",
          isDisabled && "pointer-events-none"
        )}>
          <div className="flex items-center gap-6">
            <button onClick={skipBackward} className="text-[#a7a7a7] hover:text-white transition">
              <SkipBack size={20} />
            </button>
            
            <button 
              onClick={playPause} 
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg"
            >
              {isPlaying ? (
                <Pause size={20} className="text-black fill-black" />
              ) : (
                <Play size={20} className="text-black fill-black ml-0.5" />
              )}
            </button>

            <button onClick={skipForward} className="text-[#a7a7a7] hover:text-white transition">
              <SkipForward size={20} />
            </button>
            
            <button 
              onClick={toggleRepeat} 
              className={cn("transition-colors", isRepeating ? "text-[#1DB954]" : "text-[#a7a7a7] hover:text-white")}
            >
              <Repeat1 size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full">
            <span className="text-[11px] text-[#a7a7a7] w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider 
              value={[progress]} 
              onValueChange={(v) => seekTime((v[0] / 100) * duration)} 
              max={100} 
              step={0.1} 
              className="w-full cursor-pointer" 
              disabled={isDisabled}
            />
            <span className="text-[11px] text-[#a7a7a7] w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* RIGHT: VOLUME (Always interactive) */}
        <div className="flex items-center gap-2 w-[30%] min-w-[180px] justify-end">
          <Volume2 size={20} className="text-[#a7a7a7]" />
          <Slider 
            value={[volume]} 
            onValueChange={(v) => setVolume(v[0])} 
            max={100} 
            step={1} 
            className="w-[100px] cursor-pointer" 
          />
        </div>
      </div>
    </div>
  );
};
