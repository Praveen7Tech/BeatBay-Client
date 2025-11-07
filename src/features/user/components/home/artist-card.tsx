"use client"

import { Play, CheckCircle } from "lucide-react"

export default function ArtistCard() {
  return (
    <div className="bg-linear-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 flex items-center gap-8 border border-[#2a2a2a]">
      {/* Left Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-[#00d084]" />
          <span className="text-sm text-gray-400">Verified Artist</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">A R Rahman</h1>
        <div className="flex items-center gap-6 mb-8">
          <div>
            <p className="text-gray-400 text-sm">Followers</p>
            <p className="text-2xl font-bold">67856</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Streams</p>
            <p className="text-2xl font-bold">2.5M</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-[#00d084] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00c070] transition-colors flex items-center gap-2">
            <Play className="w-5 h-5 fill-current" />
            PLAY
          </button>
          <button className="border-2 border-white/40 text-white px-8 py-3 rounded-full font-bold hover:border-white transition-colors flex items-center gap-2">
            <Play className="w-5 h-5 fill-current" />
            ✓ FOLLOWING
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden lg:block shrink-0">
        <div className="w-64 h-64 bg-linear-to-br from-[#00d084] to-[#0f0f0f] rounded-2xl overflow-hidden">
          <img src="/headphones-music-artist.jpg" alt="Artist" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
