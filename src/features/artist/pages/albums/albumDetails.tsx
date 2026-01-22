import { AlbumDetailsHeader } from "../../components/album/albumDetailsHeader" 
import { AlbumStatsOverview } from "../../components/album/albumStatusOverView"  
import { AlbumStreamingMetrics } from "../../components/album/albumStreamingMetrix"  
import { TrackListing } from "../../components/album/trackListing"  
import { AlbumDemographics } from "../../components/album/albumDemoGraphics"  
import { useAlbumDetails } from "@/core/hooks/artist/useAlbumDetails"
import { Link } from "react-router-dom"
import AlbumCard from "@/features/user/components/home/album-card"

export default function AlbumDetailsPage() {
  const {songs} = useAlbumDetails()
  if(!songs) return
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <AlbumDetailsHeader />
        {/* <SelectedSongs/> */}
        
        <h1>Songs </h1>  
        <div  style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1.5rem",
            padding: "0 2rem",
          }}>
         {songs.length > 0 && (
              songs.map((song) => (
                <Link to={`/artist/song-details/${song.id}`}>
                    <AlbumCard key={song.id} {...song} type="song"/>
                </Link>
            ))
        )}
        </div>
        <AlbumStatsOverview />
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AlbumStreamingMetrics />
            {/* <TrackListing /> */}
          </div>
          {/* <div className="space-y-6">
            <AlbumDemographics  />
          </div> */}
        </div>
      </div>
    </main>
  )
}
