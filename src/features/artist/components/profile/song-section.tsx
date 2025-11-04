"use client"

interface Song {
  id: string
  title: string
  image: string
}

interface SongsSectionProps {
  songs: Song[]
}

export function SongsSection({ songs }: SongsSectionProps) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">Songs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {songs.map((song) => (
            <div key={song.id} className="group cursor-pointer transition-transform hover:scale-105">
              <div className="bg-gray-800 rounded-lg overflow-hidden mb-3 aspect-square">
                <img src={song.image || "/placeholder.svg"} alt={song.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-white text-sm font-medium text-center truncate">{song.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
