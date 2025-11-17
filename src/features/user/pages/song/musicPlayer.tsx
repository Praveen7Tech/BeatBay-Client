
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

export const MusicPlayer = () => {
  
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3 z-50"
      style={{ height: "90px" }}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Song Info */}
        <div className="flex items-center gap-3 min-w-[180px] w-[30%]">
          <img
            src={"image"}
            alt={"alt"}
            className="w-14 h-14 rounded"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm text-white font-medium truncate">
              {"haii"}
            </span>
            <span className="text-xs text-[#b3b3b3] truncate">
              {"haii"}
            </span>
          </div>
        </div>

        {/* Center: Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-[722px]">
          <div className="flex items-center gap-4">
            <button
              className="text-[#b3b3b3] hover:text-white transition-colors"
              onClick={() => console.log("Previous")}
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            
            <button  className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:scale-105 transition-transform" >
              <Play size={18} className="text-black ml-0.5" fill="currentColor" />              
            </button>

            <button className="text-[#b3b3b3] hover:text-white transition-colors"
              onClick={() => console.log("Next")}  >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-[#a7a7a7] min-w-10 text-right">
            </span>
            {/* <Slider defaultValue={[33]} max={100} step={1} /> */}
            <span className="text-xs text-[#a7a7a7] min-w-10">
              {}
            </span>
          </div>
        </div>

        {/* Right: Volume Control */}
        <div className="flex items-center gap-2 justify-end min-w-[180px] w-[30%]">
          <button   className="text-[#b3b3b3] hover:text-white transition-colors"   >
              <Volume2 size={20} />
          </button>
          {/* <Slider defaultValue={[33]} max={100} step={1} /> */}
        </div>
      </div>
    </div>
  );
};
