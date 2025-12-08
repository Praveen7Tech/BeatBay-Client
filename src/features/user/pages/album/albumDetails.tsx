import { useParams } from "react-router-dom";
import { AlbumDetailHeader } from "../../components/albums/albumDetailsHeader"; 
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/userApi";
import { SongTable } from "@/core/components/song/SongTable";


export default function AlbumDetail() {

  const {albumId} = useParams()
  const {data: albums, isLoading, isError, error} = useQuery({
    queryKey:["AlbumId", albumId],
    queryFn: ()=> userApi.AlbumDetails(albumId!),
    enabled: !!albumId
  })
  if(isLoading){
    return <div className="min-h-screen bg-black text-white p-8">Loading songs...</div>;
  }

  if(isError){
    return <div className="min-h-screen bg-black text-red-600 p-8">{error.message}</div>;
  }
   if (!albums) {
    return <div className="min-h-screen bg-black text-white p-8">album details not available.</div>;
  }
  console.log("kk", albums)

  return (
    <div className="min-h-screen bg-linear-to-b from-spotify-dark to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <AlbumDetailHeader
          title={albums?.title}
          artist={albums.artistId.name}
          coverImageUrl={albums.coverImageUrl}
          releaseYear={albums.createdAt}
          totalTracks={albums.songs.length}
        />

        <SongTable 
        songs={albums.songs}
        config={{
          title: "Featured Songs"
        }}
        />
      </div>
    </div>
  );
}
