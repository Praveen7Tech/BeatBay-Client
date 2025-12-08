import { ArtistProfileHeader } from "../../components/artist/artistProfile.header"; 
import { Link, useParams } from "react-router-dom";
import { AlbumCard } from "../../components/artist/albumCard";
import { userApi } from "../../services/userApi";
import { useQuery } from "@tanstack/react-query";
import { SongTable } from "@/core/components/song/SongTable";

export default function ArtistDetail() {
  const { artistId } = useParams();

  const { data: artistData, isLoading, isError, error } = useQuery({
    queryKey: ["artistData", artistId],
    queryFn: () => userApi.artistDetails(artistId!),
    enabled: !!artistId,
  });
  
    if (isLoading) {
        return <div className="min-h-screen bg-black text-white p-8">Loading songs...</div>;
    }
  
    if (isError) {
        return <div>Error: {error?.message }</div>;
    }
     if (!artistData ) {
      return <div className="min-h-screen bg-black text-white p-8">Song details not available.</div>;
    }
  const songs = artistData?.songs
  const albums = artistData?.albums 

  return (
    <div className="min-h-screen bg-linear-to-b from-surface to-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <ArtistProfileHeader {...artistData} />

        {/* Popular Songs Section */}
        <div className="px-8 py-8">
            <SongTable
            songs={songs}
            config={{
              title: "Popular Songs"
            }}
            />
        </div>

        {/* Albums Section */}
        <div className="px-8 py-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {albums && albums.length > 0 ? (
              albums.map((album) => (
                <Link to={`/album/${album._id}`}>
                    <AlbumCard key={album._id} {...album} />
                </Link>
              ))
             ):(
              <p className="p-4 text-gray-500">Oops no songs found.</p>
            )  }
          </div>
        </div>
      </div>
    </div>
  );
}
