
import AlbumCard from "../../components/home/album-card" 
import ArtistCard from "../../components/home/artist-card" 
export default function HomeContent() {
 
  return (
    <div className="flex-1 flex flex-col bg-[#0f0f0f] overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {/* Artist Profile */}
        <div className="px-6 py-8">
          <ArtistCard />
        </div>

        {/* Popular Releases */}
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Popular Releases</h2>
            <a href="#" className="text-[#00d084] text-sm hover:underline">
              Show All →
            </a>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <AlbumCard key={i} index={i} />
            ))}
          </div>
        </div>

        {/* Trending Albums */}
        <div className="px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Trending Albums</h2>
            <a href="#" className="text-[#00d084] text-sm hover:underline">
              Show All →
            </a>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <AlbumCard key={i} index={i} trending />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
