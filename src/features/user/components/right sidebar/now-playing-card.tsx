"use client"

import { usePlayer } from "@/core/context/AudioProvider"
//import { useAudioContext } from "@/core/context/useAudioContext"
import { RootState } from "@/core/store/store"
import { ChartNoAxesColumn, Music } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function NowPlayingCard() {
  const { currentSong } = usePlayer()
  const room = useSelector((state: RootState) => state.privateRoom)

  // const isUsingRoom = room.isActive && room.songData;
  // const activeSong = isUsingRoom ? room.songData : currentSong;

  if (!currentSong) return null;
  const displayData = {
    id: currentSong.id, 
    title: currentSong.title,
    artistName: currentSong?.artist?.name || currentSong?.artistName,
    coverImage: currentSong.coverImageUrl,
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        Now Playing
        <ChartNoAxesColumn className="h-5 w-5 text-green-500 animate-pulse"/>
      </h2>
      <div className="bg-linear-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg overflow-hidden border border-[#3a3a3a]">
        {/* FIX: Check displayData.id instead of currentSong?._id */}
        {displayData.id && (
          <Link to={`/song/${displayData.id}`}>
            <div className="aspect-square bg-linear-to-br from-green-400 to-emerald-600 relative overflow-hidden flex items-center justify-center">
              {displayData.coverImage ? (
                <img
                  src={displayData.coverImage}
                  alt="Now Playing"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              ) : (
                <Music className="text-white/60 w-16 h-16" />
              )}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-md mb-1 truncate">
                {displayData.title ?? "No song playing"}
              </h3>
              <p className="text-xs text-gray-400 truncate">
                {displayData.artistName ?? "Unknown Artist"}
              </p>
            </div>
          </Link>
        )}
      </div>
    </>
  )
}
