import { PlayList } from "../../services/userApi";
import { PlaylistCard } from "../playlist/playListCard"; 

export function PlaylistsSection({ playlists }: { playlists: PlayList[] }) {
  return (
    <div className="px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Playlists</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {playlists.map((pl) => (
          <PlaylistCard key={pl.id} {...pl} />
        ))}
      </div>
    </div>
  );
}
