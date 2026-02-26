import { Slider } from "@/components/ui/slider";
import { useRoomContext } from "@/core/context/RoomContext";
import { RootState } from "@/core/store/store";
import { formatTime } from "@/core/utils/formatTime";
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react";
import { useSelector } from "react-redux";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const NowPlaying = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const room = useSelector((state: RootState) => state.privateRoom);

  const songData = room.songData;
  const isHost = user?.id === room.hostId;
  const isGuest = !isHost;

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
    <div className="bg-linear-to-br from-[#080101] to-[#c22020] rounded-2xl p-6 shadow-2xl flex flex-col gap-5 w-full mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-5 px-6">
        <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center shadow-lg border border-white/5">
          {songData?.image ? (
            <img src={songData.image} className="w-full h-full object-cover" alt={songData.title} />
          ) : (
            <Music className="w-10 h-10 text-zinc-600" />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h2 className="text-xl font-bold truncate text-white leading-tight">
            {songData?.title || "No song playing"}
          </h2>
          <p className="text-zinc-300 text-sm font-medium mt-1 truncate">
            {songData?.artist || "Unknown Artist"}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-2 mt-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={isGuest ? "cursor-not-allowed" : ""}>
              <Slider
                value={[currentTime]}
                max={duration || 0}
                step={1}
                onValueChange={([value]) => {
                  if (!isGuest) seek(value);
                }}
                className="w-full max-w-md mx-auto"
              />
            </div>
          </TooltipTrigger>

          {isGuest && (
            <TooltipContent side="top">
              Host controls playback
            </TooltipContent>
          )}
        </Tooltip>

        <div className="flex justify-between text-[10px] uppercase tracking-wider font-semibold text-white px-6">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(Number(duration))}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`flex items-center justify-center gap-8 ${
                isGuest ? "cursor-not-allowed opacity-80" : ""
              }`}
            >
              <button
                onClick={isHost ? skipPrev : undefined}
                className="transition-colors text-white/70 hover:text-white"
              >
                <SkipBack size={24} fill="currentColor" />
              </button>

              <button
                onClick={isHost ? handlePlayPause : undefined}
                className="w-14 h-14 rounded-full bg-[#0dee5c] hover:scale-105 transition-transform flex items-center justify-center shadow-lg shadow-[#0dee5c]/20"
              >
                {isPlaying ? (
                  <Pause className="text-black fill-black" size={24} />
                ) : (
                  <Play className="text-black fill-black ml-1" size={24} />
                )}
              </button>

              <button
                onClick={isHost ? skipNext : undefined}
                className="transition-colors text-white/70 hover:text-white"
              >
                <SkipForward size={24} fill="currentColor" />
              </button>
            </div>
          </TooltipTrigger>

          {isGuest && (
            <TooltipContent side="top">
              Host controls playback
            </TooltipContent>
          )}
        </Tooltip>

        {/* Sync Button */}
        {userSync && isGuest && (
          <button
            className="w-full py-2.5 text-sm font-bold bg-[#21be58] hover:bg-[#07d34f] text-white rounded-xl transition-all shadow-lg active:scale-95"
            onClick={() => {
              if (!songData) return;

              const audio = audioRef.current;
              const latency = (Date.now() - songData.updatedAt) / 1000;
              const adjustedTime = songData.timestamp + latency;

              audio.currentTime = adjustedTime;

              audio.play()
                .then(() => setUserSync(false))
                .catch(err => console.error(err));
            }}
          >
            Tap to sync playback
          </button>
        )}
      </div>
    </div>
  );
};

export default NowPlaying;