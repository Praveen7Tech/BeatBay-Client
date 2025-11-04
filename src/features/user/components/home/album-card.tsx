"use client"

interface AlbumCardProps {
  index: number
  trending?: boolean
}

const albums = [
  { title: "New York", artist: "A R Rahman", color: "from-orange-500 to-red-600" },
  { title: "Munbe va", artist: "Shreya Ghoshal", color: "from-green-500 to-emerald-600" },
  { title: "Kaathalae", artist: "Dhanush Kaavalan", color: "from-blue-500 to-cyan-600" },
  { title: "Oru Kathilola", artist: "M G Sreekumar", color: "from-purple-500 to-pink-600" },
  { title: "Pottukuthedi", artist: "Vasantha Das", color: "from-yellow-500 to-orange-600" },
  { title: "Ranam Title - Track", artist: "Ajay Sreevas", color: "from-pink-500 to-rose-600" },
]

const trendingAlbums = [
  { title: "Best Of Anirudh", artist: "Anirudh", color: "from-red-600 to-red-800" },
  { title: "Varanam Ayiram", artist: "A R Rahman", color: "from-amber-700 to-yellow-800" },
  { title: "Vattam - Hits", artist: "M G Sreekumar", color: "from-pink-500 to-purple-600" },
  { title: "Meesha Madhvan", artist: "Sujatha Mohan", color: "from-blue-400 to-cyan-500" },
  { title: "Mohan Lal - Hits", artist: "Kali Coil", color: "from-yellow-400 to-orange-500" },
  { title: "Ranam Title - Track", artist: "Ajay Sreevas", color: "from-purple-600 to-pink-700" },
]

export default function AlbumCard({ index, trending = false }: AlbumCardProps) {
  const album = trending ? trendingAlbums[index - 1] : albums[index - 1]

  return (
    <div className="shrink-0 w-40 group cursor-pointer">
      <div className={`bg-linear-to-br ${album.color} rounded-lg overflow-hidden mb-3 aspect-square relative`}>
        <img
          src={`/abstract-album-cover.png?height=160&width=160&query=album cover ${album.title}`}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </div>
      <h3 className="font-bold text-sm truncate group-hover:text-[#00d084] transition-colors">{album.title}</h3>
      <p className="text-xs text-gray-400 truncate">{album.artist}</p>
    </div>
  )
}
