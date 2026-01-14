
import { SkeletonCard } from "@/core/components/skelotons/AlbumSkeloton";
import { Link } from "react-router-dom";
import { AlbumResponseRaw } from "../../services/response.type";
import AlbumCard from "../home/album-card";

export function AlbumsSection({
  albums,
  isFetching,
}: {
  albums: AlbumResponseRaw[];
  isFetching: boolean;
}) {
  return (
    <div className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Albums</h2>

      {isFetching ? (
        <SkeletonCard />
      ) : albums.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <Link key={album.id} to={`/album/${album.id}`}>
              <AlbumCard {...album}/>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No albums available</p>
      )}
    </div>
  );
}
