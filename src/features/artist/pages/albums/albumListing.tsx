import { AlbumHeader } from "../../components/album/albumHeader"; 
import { AlbumCard } from "../../components/album/albumCard"; 
import { SearchBar } from "../../components/song/SearchBar"; 
import { useArtistAlbums } from "@/core/hooks/useFetchHooks";
import { Link } from "react-router-dom";

export default function Albums() {
 
  const { data: albumsData, isLoading, isError, error } = useArtistAlbums();

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white p-8">Loading albums...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-black text-red-500 p-8">Error: {error.message}</div>;
  }

  const albums = albumsData?.albums || [];
  const totalAlbum = albumsData?.totalAlbums || 0
  const totalSongs = albumsData?.totalSongs || 0

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #121212 0%, #000000 100%)",
        color: "#ffffff",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <AlbumHeader totalAlbums={totalAlbum} totalSongs={totalSongs}/>

        <div style={{ marginBottom: "2rem", padding: "0 2rem" }}>
          <SearchBar />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1.5rem",
            padding: "0 2rem",
          }}
        >
          {albums.length > 0 ? (
            albums.map((album) => (
              <Link to={`/artist/album-details/${album.id}`}>
                  <AlbumCard key={album.id} {...album} />
              </Link>
            ))
          ) : (
            <p className="p-4 text-gray-500">Start with creating a new album collection.</p>
          )}
        </div>
      </div>
    </div>
  );
}
