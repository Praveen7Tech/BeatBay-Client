import { SongTable } from "@/core/components/song/SongTable";

export function SongsSection({ songs }: { songs: any[] }) {
  return (
    <div className="px-8 py-8">
      <SongTable title="Popular Songs" songs={songs} />
    </div>
  );
}
