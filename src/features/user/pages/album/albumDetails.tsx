import { AlbumDetailHeader } from "../../components/albums/albumDetailsHeader"; 
import { AlbumSongList } from "../../components/albums/albumSongList"; 
import album1 from "/src/assets/bg.png";

export default function AlbumDetail() {
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

  return (
    <div className="min-h-screen bg-linear-to-b from-[#121212] to-[#000000] text-white">
      <div className="max-w-7xl mx-auto p-8">
        <AlbumDetailHeader
          title={album.title}
          artist={album.artist}
          coverImage={album.coverImage}
          releaseYear={album.releaseYear}
          totalTracks={album.totalTracks}
          totalDuration={album.totalDuration}
        />

        <AlbumSongList songs={songs} />
      </div>
    </div>
  );
}
