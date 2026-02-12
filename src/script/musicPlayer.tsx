// import {
//   Music,
//   Pause,
//   Play,
//   SkipBack,
//   SkipForward,
//   Repeat1,
//   Volume2,
// } from "lucide-react";
// import { Slider } from "@/components/ui/slider";
// import { cn } from "@/lib/utils";
// import React from "react";
// import { useAudioContext } from "@/core/context/useAudioContext";
// import { formatTime } from "@/core/utils/formatTime";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// type SliderProps = React.ComponentProps<typeof Slider>;

// export const MusicPlayer = ({ className }: SliderProps) => {

//   const {
//     currentSong,
//     currentTime,
//     isPlaying,
//     playPause,
//     volume,
//     setVolume,
//     seekTime,
//     skipForward,
//     skipBackward,
//     isRepeating,
//     RepeatSong,isRoomActive
//   } = useAudioContext();

//   const duration = Number(currentSong?.duration) || 0;
//   const progress = duration ? (currentTime / duration) * 100 : 0;

//   const handleSeek = (value: number[]) => {
//     if (!currentSong || isRoomActive) return;
//     seekTime((value[0] / 100) * duration);
//   };

//   const isDisabled = isRoomActive;

//   return (
//     <TooltipProvider delayDuration={200}>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div
//             className={cn(
//               "fixed bottom-0 left-0 right-0 bg-background border-t border-[#282828] px-4 py-3 z-50 h-[90px]",
//               isDisabled && "opacity-40 cursor-not-allowed"
//             )}
//           >
//             {/* 🔒 Interaction Blocker */}
//             {isDisabled && (
//               <div className="absolute inset-0 z-50 pointer-events-auto" />
//             )}

//             <div
//               className={cn(
//                 "max-w-screen-2xl mx-auto flex items-center justify-between gap-4",
//                 isDisabled && "pointer-events-none"
//               )}
//             >
//               {/* LEFT — SONG INFO */}
//               <div className="flex items-center gap-3 min-w-[180px] w-[30%]">
//                 <div className="w-14 h-14 rounded bg-[#222] flex items-center justify-center overflow-hidden">
//                   {currentSong?.coverImageUrl ? (
//                     <img
//                       src={currentSong.coverImageUrl}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <Music className="w-6 h-6 text-gray-400" />
//                   )}
//                 </div>

//                 <div className="overflow-hidden">
//                   <p className="text-sm font-medium truncate">
//                     {currentSong?.title || "No song playing"}
//                   </p>
//                   <p className="text-xs text-spotify-secondary truncate">
//                     {currentSong?.artist?.name || ""}
//                   </p>
//                 </div>
//               </div>

//               {/* CENTER — CONTROLS */}
//               <div className="flex flex-col items-center gap-2 flex-1 max-w-[720px]">
//                 <div className="flex items-center gap-8">
//                   <button onClick={skipBackward}>
//                     <SkipBack />
//                   </button>

//                   <button
//                     onClick={playPause}
//                     className="w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center hover:scale-105 transition"
//                   >
//                     {isPlaying ? (
//                       <Pause className="text-black fill-black" />
//                     ) : (
//                       <Play className="text-black fill-black" />
//                     )}
//                   </button>

//                   <button onClick={skipForward}>
//                     <SkipForward />
//                   </button>

//                   <button
//                     onClick={RepeatSong}
//                     className={isRepeating ? "text-[#1DB954]" : "text-gray-400"}
//                   >
//                     <Repeat1 />
//                   </button>
//                 </div>

//                 {/* PROGRESS BAR */}
//                 <div className="flex items-center gap-2 w-full">
//                   <span className="text-xs w-10 text-right">
//                     {formatTime(currentTime)}
//                   </span>

//                   <Slider
//                     value={[progress]}
//                     onValueChange={handleSeek}
//                     max={100}
//                     step={0.1}
//                     className={cn("w-full", className)}
//                   />

//                   <span className="text-xs w-10">
//                     {formatTime(duration)}
//                   </span>
//                 </div>
//               </div>

//               {/* RIGHT — VOLUME */}
//               <div className="flex items-center gap-2 min-w-[180px] w-[30%] justify-end">
//                 <Volume2 />
//                 <Slider
//                   value={[volume]}
//                   onValueChange={(v) => setVolume(v)}
//                   max={100}
//                   step={1}
//                   className="w-[100px]"
//                 />
//               </div>
//             </div>
//           </div>
//         </TooltipTrigger>

//         {isDisabled && (
//           <TooltipContent side="top">
//             <p>You are currently in a private room</p>
//           </TooltipContent>
//         )}
//       </Tooltip>
//     </TooltipProvider>
//   );
// };
