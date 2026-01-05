import { Play, Pause, SkipBack, SkipForward, Music2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";

const NowPlaying = () => {
  const currentSong = useSelector((state:RootState)=> state.privateRoom.songData)

  return (
    <div className="bg-linear-to-br from-[#282828] to-[#1a1a1a] rounded-2xl p-5 border border-white/5 flex flex-col">
      <div className="flex items-center gap-2 text-[#1DB954] text-xs mb-4">
        <Music2 size={14} />
        NOW PLAYING
      </div>

      <div className="flex gap-4">
        <div className="relative">
          <img
            src={currentSong?.image}
            className="w-32 h-32 rounded-xl object-cover shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
            <Sparkles size={14} className="text-black" />
          </div>
        </div>

        <div className="flex flex-col flex-1 justify-between">
          <h2 className="text-lg font-bold truncate">{currentSong?.title}</h2>

          <div className="h-1 bg-[#404040] rounded-full overflow-hidden">
            <div className="h-full bg-[#1DB954] w-[40%]" />
          </div>

          <div className="flex items-center gap-3">
            <SkipBack size={18} />
            <button className="w-12 h-12 rounded-full bg-[#1DB954] hover:bg-spotify-green hover:scale-105 transition-all flex items-center justify-center shadow-lg" >
                          <Pause className="h-5 w-5 fill-black text-black"/> 
                          {/* <Play size={18} className="h-5 w-5 fill-black text-black" /> */}
                        </button>
            <SkipForward size={18} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
