import { Play,Pause,SkipBack,SkipForward,Music2,Sparkles,} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useAudioContext } from "@/core/context/useAudioContext";

const NowPlaying = () => {
  
  const room = useSelector((state:RootState)=> state.privateRoom)
  const queue = room.queue

  const {currentSong, isPlaying,seekTime,currentTime,playPause,startRoomPlayback, skipForward,skipBackward,isHost} = useAudioContext()

  const handlePlayAction = () => {
     if(!currentSong && queue.length > 0){
      console.log("queu length ")
       startRoomPlayback(queue,0)
       return;
     }

     playPause()
     console.log("haii")
  };

  const handleProgressChange = (value: number[])=>{
    if(!currentSong) return

    const newPercentage = value[0]
    const Duration = Number(currentSong.duration)
    const newTime = (newPercentage / 100)* Duration
    seekTime(newTime)
  }

  const currentDuration =  Number(currentSong?.duration) || 0
  const progressPercentage = (currentTime / currentDuration) * 100 || 0

  return (
    <div className="bg-linear-to-br from-[#282828] to-[#1a1a1a] rounded-2xl p-5 border border-white/5 flex flex-col">
      <div className="flex items-center gap-2 text-[#1DB954] text-xs mb-4">
        <Music2 size={14} />
        NOW PLAYING
      </div>

      <div className="flex gap-4">    
        <div className="relative">
          {currentSong?.coverImageUrl ? (
            <>
              <img
                src={currentSong?.coverImageUrl}
                className="w-32 h-32 rounded-xl object-cover shadow-lg"
                alt={currentSong?.title}
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
                <Sparkles size={14} className="text-black" />
              </div>
            </>
          ) : (
            <div className="w-32 h-32 rounded-xl bg-[#2a2a2a] flex items-center justify-center">
              <Music2 size={32} className="text-white/30" />
            </div>
          )}
        </div>

        {/* Info + Controls */}
        <div className="flex flex-col flex-1 justify-between min-w-0">
          
          {/* Song title */}
           <h2 className="text-lg font-bold truncate">
            {currentSong?.title ? currentSong?.title : "No song playing"}
          </h2>

          {/* Progress bar (SAME as MusicPlayer) */}
          <Slider
            value={[progressPercentage]}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            disabled
            className={cn(
              "w-full pointer-events-none",
              !isPlaying && "opacity-40"
            )}
          />

          {/* Controls */}
        
          <div  className="flex items-center justify-center gap-6 mt-2">
            {isHost && (
              <>
            <button onClick={skipBackward}>
            <SkipBack size={18} className={`${ isPlaying ? "text-white" : "text-white/30"}`} />
            </button>
           
            <button disabled={!currentSong && queue.length === 0} 
              onClick={handlePlayAction}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all bg-[#1DB954] hover:bg-spotify-green`}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-black text-black" />
              ) : (
                <Play className="h-5 w-5 fill-black text-black opacity-50" />
              )}
            </button>
           

            <button onClick={skipForward}> 
            <SkipForward size={18}className={`${isPlaying ? "text-white" : "text-white/30"}`} />
            </button>
            </>
          )}  
          </div>
           
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
