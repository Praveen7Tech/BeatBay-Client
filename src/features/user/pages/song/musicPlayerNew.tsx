// import {  Pause, Play, SkipBack, SkipForward, Repeat1, Volume2 } from "lucide-react";
// import { Slider } from "@/components/ui/slider";
// import { formatTime } from "@/core/utils/formatTime";
// import { usePlayer } from "@/core/context/AudioProvider";

// export const MusicPlayer = () => {
//   const {
//     currentSong, currentTime, duration, isPlaying, playPause,
//     volume, setVolume, seekTime, skipForward, skipBackward,
//     isRepeating, toggleRepeat
//   } = usePlayer();

//   if (!currentSong) return <div className="fixed bottom-0 w-full h-[90px] bg-[#121212] opacity-50 pointer-events-none" />;

//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   return (
//     <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#282828] px-4 py-3 z-50 h-[90px]">
//       <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4 h-full">
//         {/* LEFT: INFO */}
//         <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
//           <img src={currentSong.coverImageUrl} className="w-14 h-14 rounded object-cover" alt="" />
//           <div className="overflow-hidden">
//             <p className="text-sm font-bold text-white truncate">{currentSong.title}</p>
//             <p className="text-xs text-[#a7a7a7] truncate">{currentSong.artist?.name}</p>
//           </div>
//         </div>

//         {/* CENTER: CONTROLS */}
//         <div className="flex flex-col items-center gap-2 flex-1 max-w-[720px]">
//           <div className="flex items-center gap-6">
//             <button onClick={skipBackward} className="text-[#a7a7a7] hover:text-white"><SkipBack size={20} /></button>
//             <button onClick={playPause} className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition">
//               {isPlaying ? <Pause size={20} className="text-black fill-black" /> : <Play size={20} className="text-black fill-black ml-0.5" />}
//             </button>
//             <button onClick={skipForward} className="text-[#a7a7a7] hover:text-white"><SkipForward size={20} /></button>
//             <button onClick={toggleRepeat} className={isRepeating ? "text-[#1DB954]" : "text-[#a7a7a7]"}><Repeat1 size={20} /></button>
//           </div>
//           <div className="flex items-center gap-2 w-full">
//             <span className="text-[11px] text-[#a7a7a7] w-10 text-right">{formatTime(currentTime)}</span>
//             <Slider value={[progress]} onValueChange={(v) => seekTime((v[0] / 100) * duration)} max={100} step={0.1} className="w-full" />
//             <span className="text-[11px] text-[#a7a7a7] w-10">{formatTime(duration)}</span>
//           </div>
//         </div>

//         {/* RIGHT: VOLUME */}
//         <div className="flex items-center gap-2 w-[30%] min-w-[180px] justify-end">
//           <Volume2 size={20} className="text-[#a7a7a7]" />
//           <Slider value={[volume]} onValueChange={(v) => setVolume(v[0])} max={100} step={1} className="w-[100px]" />
//         </div>
//       </div>
//     </div>
//   );
// };

