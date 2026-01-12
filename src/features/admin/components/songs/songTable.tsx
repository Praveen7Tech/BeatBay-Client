import { AdminSong } from "../../services/adminApi";
import  AdminSongRow from "./songRow"; 

interface AdminSongTableProps {
  songs: AdminSong[];
  startIndex: number;
}

const AdminSongTable = ({ songs, startIndex }: AdminSongTableProps) => {
  return (
    <div className="bg-black rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black">
            <tr className="border-b border-border">
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">#</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Song</th>
              {/* <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Album</th> */}
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Genre</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Duration</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Streams</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Status</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Uploaded</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, idx) => (
              <AdminSongRow key={song.id} song={song} index={startIndex + idx + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSongTable;
