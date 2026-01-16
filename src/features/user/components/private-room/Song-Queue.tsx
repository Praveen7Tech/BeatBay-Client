import { X, GripVertical, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SongData } from "../../slice/privateRoomSlice";

interface SongQueueHeader {
  onAddSong: () => void;
  queue:SongData[];
  onRemoveSong: (songId:string) => void
}

const SongQueue = ({onAddSong,queue, onRemoveSong}:SongQueueHeader) => {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 flex flex-col">
      <div className="flex justify-between p-4 border-b border-white/5">
        <h3 className="font-semibold text-sm">Up Next</h3>
        <Button onClick={onAddSong} variant="ghost" size="sm" className="text-[#1DB954]">
          <Plus size={14} className="mr-1" />
          Add Song
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {queue.map((song) => (
          <div  className="flex items-center gap-3 p-3 hover:bg-[#282828]">
            <span className="text-xs w-4">{1}</span>
            <img src={song.image} className="w-10 h-10 rounded" />
            <div className="flex-1">
              <p className="text-sm">{song.title}</p>
              <p className="text-xs text-spotify-secondary">{song.artist}</p>
            </div>
            <GripVertical size={14} />
            <div onClick={()=> onRemoveSong(song.id)}>
              <X size={14} />
            </div>
          </div>
         ))} 
      </ScrollArea>
    </div>
  );
};

export default SongQueue;
