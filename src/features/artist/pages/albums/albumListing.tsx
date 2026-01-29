import { AlbumHeader } from "../../components/album/albumHeader";
import { AlbumCard } from "../../components/album/albumCard";
import { SearchBar } from "../../components/song/SearchBar";
import { useArtistAlbums } from "@/core/hooks/api/useFetchHooks";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "@/features/admin/components/common/Pagination";
import { SpinnerArtist } from "@/components/ui/spinner";
import { Disc3 } from "lucide-react";

export default function Albums() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: albumsData, isLoading, isError, error } = useArtistAlbums();

  if (isLoading) return <SpinnerArtist />;

  if (isError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500 text-lg">
          {error?.message || "Failed to load albums"}
        </p>
      </div>
    );
  }

  const albums = albumsData?.albums ?? [];
  const totalAlbum = albumsData?.totalAlbums ?? 0;
  const totalSongs = albumsData?.totalSongs ?? 0;
  const hasAlbums = albums.length > 0;

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto">
        <AlbumHeader totalAlbums={totalAlbum} totalSongs={totalSongs} />

        <div className="mb-8 px-8">
          <SearchBar />
        </div>

        {hasAlbums ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 px-8">
            {albums.map((album) => (
              <Link
                key={album.id}
                to={`/artist/album-details/${album.id}`}
              >
                <AlbumCard {...album} />
              </Link>
            ))}
          </div>
        ) : (
          /* Proper fallback */
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <Disc3 size={56} className="text-[#1DB954] mb-4" />
            <h3 className="text-lg font-semibold mb-1">
              No Albums Yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Start by creating your first album to organize and publish your songs.
            </p>
          </div>
        )}
      </div>
        <Pagination
          page={currentPage}
          totalPages={1}
          setPage={setCurrentPage}
        />
    </div>
  );
}
