import { X, GripVertical, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueueSong } from "./types"; 
import { Button } from "@/components/ui/button";



const SongQueue = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 flex flex-col">
      <div className="flex justify-between p-4 border-b border-white/5">
        <h3 className="font-semibold text-sm">Up Next</h3>
        <Button variant="ghost" size="sm" className="text-[#1DB954]">
          <Plus size={14} className="mr-1" />
          Add Song
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {/* {queue.map((song, index) => ( */}
          <div  className="flex items-center gap-3 p-3 hover:bg-[#282828]">
            <span className="text-xs w-4">{1}</span>
            <img src={"song.cover"} className="w-10 h-10 rounded" />
            <div className="flex-1">
              <p className="text-sm">{"song.title"}</p>
              <p className="text-xs text-spotify-secondary">{"song.artist"}</p>
            </div>
            <GripVertical size={14} />
            <X size={14} />
          </div>
        {/* ))} */}
      </ScrollArea>
    </div>
  );
};

export default SongQueue;
