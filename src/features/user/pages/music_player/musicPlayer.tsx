import { Music, Pause, Play, SkipBack, SkipForward, Repeat1, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatTime } from "@/core/utils/formatTime";
import { usePlayer } from "@/core/context/AudioProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { cn } from "@/lib/utils";
import { useRoomContext } from "@/core/context/RoomContext";

export const MusicPlayer = () => {
  const {
    currentSong,
    currentTime,
    duration,
    isPlaying,
    playPause,
    volume,
    setVolume,
    seekTime,
    skipForward,
    skipBackward,
    isRepeating,
    toggleRepeat,
  } = usePlayer();

  const room = useSelector((state: RootState) => state.privateRoom);
  const roomPlayer = room.isActive ? useRoomContext() : null;

  const hasSong = !!currentSong;
  const isBlocked = room.isActive;
  const shouldDisableControls = isBlocked || !hasSong;

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // handle volume and volume controll based on the room state
  const volumeValue = room.isActive ? roomPlayer?.volume ?? 50 : volume;
  const setVolumeValue = room.isActive ? roomPlayer?.setVolume : setVolume;

  const message = isBlocked
    ? "Player controls are locked while you are in a private room"
    : "No song playing";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black px-6 py-3 z-50 h-25">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4 h-full py-5">

        {/* LEFT */}
        <div className="flex items-center gap-4 w-[30%] min-w-45">
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

        {/* CENTER */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-180">

          {/* Controls */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-6",
                  shouldDisableControls && "opacity-60 cursor-not-allowed"
                )}
                onClick={(e) => {
                  if (shouldDisableControls) e.preventDefault();
                }}
              >
                <button onClick={!shouldDisableControls ? skipBackward : undefined}>
                  <SkipBack className="text-[#a7a7a7] hover:text-white transition cursor-pointer" size={20} />
                </button>

                <button
                  onClick={!shouldDisableControls ? playPause : undefined}
                  className="w-10 h-10 rounded-full bg-spotify-green flex items-center justify-center shadow-lg"
                >
                  {isPlaying ? (
                    <Pause size={20} className="text-black fill-black cursor-pointer" />
                  ) : (
                    <Play size={20} className="text-black fill-black ml-0.5 cursor-pointer" />
                  )}
                </button>

                <button onClick={!shouldDisableControls ? skipForward : undefined}>
                  <SkipForward className="text-[#a7a7a7] hover:text-white transition cursor-pointer" size={20} />
                </button>

                <button onClick={!shouldDisableControls ? toggleRepeat : undefined}>
                  <Repeat1
                    size={20}
                    className={cn(
                      isRepeating ? "text-[#1DB954] cursor-pointer" : "text-[#a7a7a7] hover:text-white cursor-pointer" 
                    )}
                  />
                </button>
              </div>
            </TooltipTrigger>

            {shouldDisableControls && (
              <TooltipContent side="top">
                <p>{message}</p>
              </TooltipContent>
            )}
          </Tooltip>

          {/* Seek Bar */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-2 w-full",
                  shouldDisableControls && "opacity-60 cursor-not-allowed"
                )}
              >
                <span className="text-[11px] text-[#a7a7a7] w-10 text-right">
                  {formatTime(currentTime)}
                </span>

                <Slider
                  value={[progress]}
                  onValueChange={(v) => {
                    if (!shouldDisableControls) {
                      seekTime((v[0] / 100) * duration);
                    }
                  }}
                  max={100}
                  step={0.1}
                  className="w-full"
                />

                <span className="text-[11px] text-[#a7a7a7] w-10">
                  {formatTime(duration)}
                </span>
              </div>
            </TooltipTrigger>

            {shouldDisableControls && (
              <TooltipContent side="top">
                <p>{message}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 w-[30%] min-w-45 justify-end">
          <Volume2 size={20} className="text-[#a7a7a7]" />
          <Slider
            value={[volumeValue]}
            onValueChange={(v) => setVolumeValue?.(v[0])}
            max={100}
            step={1}
            className="w-25 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};