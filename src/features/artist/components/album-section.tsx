"use client"

interface Album {
  id: string
  title: string
  image: string
}

interface AlbumsSectionProps {
  albums: Album[]
}

export function AlbumsSection({ albums }: AlbumsSectionProps) {
  return (
    <section className="py-12 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">Albums</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="group cursor-pointer transition-transform hover:scale-105">
              <div className="bg-gray-800 rounded-lg overflow-hidden mb-3 aspect-square">
                <img src={album.image || "/placeholder.svg"} alt={album.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-white text-sm font-medium text-center truncate">{album.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
