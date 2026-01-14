import { SongTable } from "@/core/components/song/SongTable";
import { useAddSongToPlaylist } from "@/core/hooks/playList/usePlayList";

export function SongsSection({ songs }: { songs: any[] }) {
  const addSongMutation = useAddSongToPlaylist();
  const handleAddToPlaylist = (songId: string,playlistId: string) => {
    addSongMutation.mutate({ playlistId ,songId });
  };
  return (
    <div className="px-8 py-8">
      <SongTable title="Popular Songs" songs={songs} showAction onAddToPlaylist={handleAddToPlaylist}/>
    </div>
  );
}
