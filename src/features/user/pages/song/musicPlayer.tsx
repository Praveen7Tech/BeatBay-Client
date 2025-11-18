import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import React from "react";
import { useAudioContext } from "@/core/context/useAudioContext"; 

const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

type SliderProps = React.ComponentProps<typeof Slider>

export const MusicPlayer = ({ className, ...props }: SliderProps) => {

  const {currentSong, currentTime, isPlaying, playPause, volume, setVolume, seekTime,
    skipForward, skipBackward
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

  const URL = import.meta.env.VITE_API_URL
  const coverImage = `${URL}/songs/${currentSong?.coverImageUrl}`

  const currentDuration = Number(currentSong?.duration) || 0
  const progressPercentage = (currentTime / currentDuration) * 100 || 0


  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3 z-50"
      style={{ height: "90px" }}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-3 min-w-[180px] w-[30%]">
          <img
            src={coverImage}
            alt={"coverImage"}
            className="w-14 h-14 rounded"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm text-white font-medium truncate">
              {currentSong?.title }
            </span>
            <span className="text-xs text-[#b3b3b3] truncate">
              {currentSong?.artistId.name}
            </span>
          </div>
        </div>

        {/* Center: Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[722px]">

          <div className="flex items-center gap-4">
            <button className="text-[#b3b3b3] hover:text-white transition-colors"
            onClick={skipBackward}>
              <SkipBack size={20} />
            </button>

            <button className="w-12 h-12 rounded-full bg-[#1DB954] hover:bg-[#1ed760] hover:scale-105 transition-all flex items-center justify-center shadow-lg" 
            onClick={playPause}>
              {isPlaying ? 
              <Pause className="h-5 w-5 fill-black text-black"/> :
              <Play size={18} className="h-5 w-5 fill-black text-black" />
              }
            </button>

            <button className="text-[#b3b3b3] hover:text-white transition-colors"
            onClick={skipForward}>
              <SkipForward size={20} />
            </button>
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
          <Volume2 size={20} className="text-[#b3b3b3] hover:text-white transition-colors" />
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
