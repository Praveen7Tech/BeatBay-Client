import { useParams } from "react-router-dom";
import { AlbumDetailHeader } from "../../components/albums/albumDetailsHeader"; 
import { AlbumSongList } from "../../components/albums/albumSongList"; 
import album1 from "/src/assets/bg.png";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../services/userApi";
  const album = {
    title: "Best Of Anirudh",
    artist: "Anirudh Ravichander",
    coverImage: album1,
    releaseYear: "2024",
    totalTracks: 100,
    totalDuration: "5 hr 5 min",
  };

  const songs = [
    {
      id: 1,
      title: "Monica",
      duration: "03:17",
      coverImage: album1,
      isPlaying: true,
    },
    {
      id: 2,
      title: "Arabi Kuthu",
      duration: "05:50",
      coverImage: album1,
    },
    {
      id: 3,
      title: "Hukkum",
      duration: "02:10",
      coverImage: album1,
    },
    {
      id: 4,
      title: "Master Coming",
      duration: "02:10",
      coverImage: album1,
    },
    {
      id: 5,
      title: "Summer Nights",
      duration: "04:22",
      coverImage: album1,
    },
    {
      id: 6,
      title: "Electric Dreams",
      duration: "03:45",
      coverImage: album1,
    },
    {
      id: 7,
      title: "Moonlight Serenade",
      duration: "05:12",
      coverImage: album1,
    },
  ];
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

  return (
    <div className="min-h-screen bg-linear-to-b from-[#121212] to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <AlbumDetailHeader
          title={albums?.title}
          artist={albums.artistId.name}
          coverImageUrl={albums.coverImageUrl}
          releaseYear={albums.createdAt}
          totalTracks={album.totalTracks}
          totalDuration={album.totalDuration}
        />

        <AlbumSongList songs={albums.songs} />
      </div>
    </div>
  );
}
