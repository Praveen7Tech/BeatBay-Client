"use client"

import { useAudioContext } from "@/core/context/useAudioContext"
import { Music } from "lucide-react"
import { Link } from "react-router-dom"

export default function NowPlayingCard() {

  const { currentSong } = useAudioContext()
  const coverImage = currentSong?.coverImageUrl

  const hasImage = !!currentSong?.coverImageUrl

  return (
    <div className="bg-linear-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg overflow-hidden border border-[#3a3a3a]">
      {currentSong?._id && (
    <Link to={`/song/${currentSong?._id}`}>
      {/* Image with fallback */}
      <div className="aspect-square bg-linear-to-br from-green-400 to-emerald-600 relative overflow-hidden flex items-center justify-center">

        {hasImage ? (
          <img
            src={coverImage}
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

      {/* Song Info */}
      <div className="p-4">
        <h3 className="font-bold text-md mb-1">
          {currentSong?.title ?? "No song playing"}
        </h3>

        <p className="text-xs text-gray-400">
          {currentSong?.artistId?.name ?? "Unknown Artist"}
        </p>

        {/* <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 bg-[#3a3a3a] rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-[#00d084]" />
          </div>
          <span className="text-xs text-gray-400">
            {currentSong?.duration ?? "0:00"}
          </span>
        </div> */}
      </div>
      </Link>
      )}
    </div>
  )
}
