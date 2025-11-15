import { AlbumHeader } from "../../components/album/albumHeader"; 
import { AlbumCard } from "../../components/album/albumCard"; 
import { SearchBar } from "../../components/song/SearchBar"; 
import { useQuery } from "@tanstack/react-query";
import { artistApi } from "../../services/artist.api";

export default function Albums() {
 
  const {data: albums, isLoading, isError, error} = useQuery({
    queryKey:["artistAlbums"],
    queryFn: ()=> artistApi.fetchAlbums()
  })


  if(isLoading){
    return <div className="min-h-screen bg-black text-white p-8">Loading songs...</div>;
  }

  if(isError){
     return <div className="min-h-screen bg-black text-red-500 p-8">Error: {error.message}</div>;
  }

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
        <AlbumHeader />

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
        {albums && albums.length > 0 ? (
          albums.map((album:any) => (
            <AlbumCard  key={album._id} {...album}/>
          ))
        ) : (
          <p className="p-4 text-gray-500">Start with create new album collection.</p>
        )}  
          
        </div>
      </div>
    </div>
  );
}
