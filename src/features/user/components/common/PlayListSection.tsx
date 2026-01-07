
import { PlayList } from "../../services/response.type";
import { PlaylistCard } from "../playlist/playListCard"; 

export function PlaylistsSection({ playlists }: { playlists: PlayList[] }) {
  const hasPlaylists = playlists.length > 0;

  return (
    <div className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Playlists</h2>

      {hasPlaylists ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {playlists.map((pl) => (
            <PlaylistCard key={pl.id} {...pl} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center text-spotify-secondary">
          <p className="text-lg font-medium">No playlists found</p>
        </div>
      )}
    </div>
  );
}

