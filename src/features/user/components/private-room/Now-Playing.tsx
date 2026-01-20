import { Slider } from "@/components/ui/slider";
import { useRoomContext } from "@/core/context/RoomContext";
import { RootState } from "@/core/store/store";
import { formatTime } from "@/core/utils/formatTime";
import { Play,Pause,SkipBack,SkipForward } from "lucide-react";
import { useSelector } from "react-redux";

const NowPlaying = () => {

  const user = useSelector((state:RootState)=> state.auth.user)
  const room = useSelector((state:RootState)=> state.privateRoom)
  const songData = room.songData
  const isHost = user?.id == room.hostId

   const {
    isPlaying,
    handlePlayPause,
    skipNext,
    skipPrev,
    currentTime,
    duration,
    seek,
    userSync,
    setUserSync,
    audioRef
  } = useRoomContext();



  return (
    <div className="bg-linear-to-br from-[#282828] to-[#1a1a1a] rounded-2xl p-5 border border-white/5 flex flex-col">
      <div className="flex gap-4">    
        <img src={songData?.image} className="w-32 h-32 rounded-xl object-cover shadow-lg" alt="" />
        <div className="flex flex-col flex-1 justify-between min-w-0">
          <h2 className="text-lg font-bold truncate">{songData?.title}</h2>
          <p className="text-zinc-400 text-sm">{songData?.artist}</p>
          
         <div className="flex items-center gap-3 mt-2 text-xs text-zinc-400">
            {/* current time */}
            <span className="w-10 text-right">
              {formatTime(currentTime)}
            </span>

            <Slider
              value={[currentTime]}
              max={duration || 0}
              step={1}
              onValueChange={([value]) => seek(value)}
              className="flex-1"
            />

            {/* total duration */}
            <span className="w-10 text-left">
              {formatTime(Number(duration))}
            </span>
          </div>


          <div className="flex items-center justify-center gap-6 mt-2">
            {isHost ? (
              <>
                <button onClick={skipPrev} className="text-white/50 hover:text-white"><SkipBack size={18} /></button>
                <button onClick={handlePlayPause}  className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center">
                  {isPlaying ? <Pause className="text-black" /> : <Play className="text-black ml-1" />}
                </button>
                <button onClick={skipNext}  className="text-white/50 hover:text-white"><SkipForward size={18} /></button>
              </>
            ) : (
              <span className="text-xs text-zinc-500 italic">Only the Host can control playback</span>
            )}

            {userSync && !isHost && (
              <button
              className="mb-3 px-4 py-2 text-sm bg-[#1DB954] text-black rounded-full"
              onClick={() => {
                const audio = audioRef.current;

                audio
                  .play()
                  .then(() => {
                    setUserSync(false);
                  })
                  .catch(err => {
                    console.error("Manual play failed", err);
                  });
              }}
            >
              Tap to sync playback
            </button>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
