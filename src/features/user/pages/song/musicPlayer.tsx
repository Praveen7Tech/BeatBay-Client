import { Music, Pause, Play, Repeat1, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import React from "react";
import { useAudioContext } from "@/core/context/useAudioContext"; 
import { formatTime } from "@/core/utils/formatTime";

type SliderProps = React.ComponentProps<typeof Slider>

export const MusicPlayer = ({ className, ...props }: SliderProps) => {

  const {currentSong, currentTime, isPlaying, playPause, volume, setVolume, seekTime,
    skipForward, skipBackward, isRepeating, RepeatSong
  } = useAudioContext()

  // music progress bar changing
  const HandleProgressChange = (value: number[])=>{
    if(!currentSong) return;
    const newPercentage = value[0]
    const Duration = Number(currentSong?.duration)
    const newTime = (newPercentage / 100) * Duration
    seekTime(newTime)
  }

  // volume updation
  const handleVolumeChange = (value: number[])=>{
    setVolume(value)
  }

  const currentDuration = Number(currentSong?.duration) || 0
  const progressPercentage = (currentTime / currentDuration) * 100 || 0


  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-background border-t border-[#282828] shadow-lg m-2 px-4 py-3 z-50"
      style={{ height: "90px" }}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-3 min-w-[180px] w-[30%]">
         <div className="w-14 h-14 rounded overflow-hidden bg-[#222] flex items-center justify-center">
            {currentSong?.coverImageUrl ? (
              <img
                src={currentSong.coverImageUrl}
                alt="cover"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none"; 
                }}
              />
            ) : (
              <Music className="text-gray-400 w-7 h-7" />
            )}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm text-white font-medium truncate">
              {currentSong?.title }
            </span>
            <span className="text-xs text-spotify-secondary truncate">
              {currentSong?.artistId.name}
            </span>
          </div>
        </div>

        {/* Center: Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[722px]">

          <div className="flex items-center gap-8">
            <button className="text-spotify-secondary hover:text-white transition-colors"
            onClick={skipBackward}>
              <SkipBack  />
            </button>

            <button className="w-12 h-12 rounded-full bg-[#1DB954] hover:bg-spotify-green hover:scale-105 transition-all flex items-center justify-center shadow-lg" 
            onClick={playPause}>
              {isPlaying ? 
              <Pause className="h-5 w-5 fill-black text-black"/> :
              <Play size={18} className="h-5 w-5 fill-black text-black" />
              }
            </button>

            <button className="text-spotify-secondary hover:text-white transition-colors"
            onClick={skipForward}>
              <SkipForward />
            </button>

            <div className="flex items-center">
              <button className={isRepeating ? "text-[#1DB954] hover:text-[#1DB954]" : "text-spotify-secondary hover:text-white transition-colors"}
             onClick={RepeatSong}>
              <Repeat1 />
            </button>
            </div>
            
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-[#a7a7a7] min-w-10 text-right">{formatTime(currentTime)}</span>

            <Slider
              value={[progressPercentage]}
              onValueChange={HandleProgressChange}
              defaultValue={[50]}
              max={100}
              step={0.1}
              className={cn("w-full", className)}
              {...props}
            />

            <span className="text-xs text-[#a7a7a7] min-w-10">
              {formatTime(currentDuration)}
            </span>
          </div>
        </div>

        {/* Right: Volume Control */}
        <div className="flex items-center gap-2 justify-end min-w-[180px] w-[30%]">
          <Volume2 size={20} className="text-spotify-secondary hover:text-white transition-colors" />
           <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className={cn("w-[20%]", className)}
          />
        </div>

      </div>
    </div>
  );
};
