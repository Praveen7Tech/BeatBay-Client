import { AlbumDetailsHeader } from "../../components/album/albumDetailsHeader"  
import { useAlbumDetails } from "@/core/hooks/artist/useAlbumDetails"
import { Link } from "react-router-dom"
import AlbumCard from "@/features/user/components/home/album-card"
import { SpinnerArtist } from "@/components/ui/spinner"
import { SongStatsCard } from "../../components/song/SongStatusCard"
import { Play } from "lucide-react"

export default function AlbumDetailsPage() {
 const { album, songs, isLoading, isError, CoverImageURL, albumId } = useAlbumDetails();

  if (isLoading) return <SpinnerArtist />;
  if (isError || !album) return <div>Error loading album</div>;

  return (
    <main className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 space-y-8">
         <AlbumDetailsHeader
          album={album}
          coverImageUrl={CoverImageURL}
          albumId={albumId!}
        />
        {/* <SelectedSongs/> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SongStatsCard
            title="Total Streams"
            value={album.totalPlays! || "0"}
            change="12.5%"
            isPositive={true}
            icon={Play}
          />
        </div>  
        
        <h1>Songs </h1>  
        <div  style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1.5rem",
            padding: "0 2rem",
          }}>
         {songs?.map((song) => (
            <Link key={song.id} to={`/artist/song-details/${song.id}`}>
              <AlbumCard {...song} type="song" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
