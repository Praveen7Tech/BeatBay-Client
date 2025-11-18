"use client"

import { useAudioContext } from "@/core/context/useAudioContext"

export default function NowPlayingCard() {

  const {currentSong} = useAudioContext()
  const URL = import.meta.env.VITE_API_URL
  const coverImage = `${URL}/songs/${currentSong?.coverImageUrl}`
  return (
    <div className="bg-linear-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg overflow-hidden border border-[#3a3a3a]">
      <div className="aspect-square bg-linear-to-br from-green-400 to-emerald-600 relative overflow-hidden">
        <img src={coverImage} alt="Now Playing" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-md mb-1">{currentSong?.title}</h3>
        <p className="text-xs text-gray-400">{currentSong?.artistId.name}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 bg-[#3a3a3a] rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-[#00d084]" />
          </div>
          <span className="text-xs text-gray-400">{currentSong?.duration}</span>
        </div>
      </div>
    </div>
  )
}
