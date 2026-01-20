import { X, GripVertical, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SongData } from "../../slice/privateRoomSlice";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SongQueueHeader {
  onAddSong: () => void;
  queue:SongData[];
  onRemoveSong: (songId:string) => void
}

const SongQueue = ({onAddSong,queue, onRemoveSong}:SongQueueHeader) => {
  return (
    <div className="bg-linear-to-br from-[#080101] to-[#c22020] rounded-2xl border flex flex-col">
      <div className="flex justify-between p-4 border-b border-white/5">
        <h3 className="font-semibold text-sm">Up Next</h3>
        <Button onClick={onAddSong} variant="ghost" size="sm" className="text-[#11e55c]">
          <Plus size={14} className="mr-1" />
          Add Song
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {queue.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-white text-sm">
            <GripVertical className="mb-2 opacity-50" />
            <p>No songs in queue</p>
            <p className="text-xs mt-1 opacity-70">
              Add songs to start listening together
            </p>
          </div>
        ) : (
          queue.map(song => (
            <div key={song.id} className="flex items-center gap-3 p-3 hover:bg-[#282828]">
               <span className="text-xs w-4">{1}</span>
            <img src={song.image} className="w-10 h-10 rounded" />
            <div className="flex-1">
              <p className="text-sm">{song.title}</p>
              <p className="text-xs text-spotify-secondary">{song.artist}</p>
            </div>
            <GripVertical size={14} />
            <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onRemoveSong(song.id)}
                    className="p-1 rounded-full hover:bg-red-500/20 transition"
                  >
                    <X size={14} className="text-red-400 hover:text-red-500"/>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6}>
                  Remove song
                </TooltipContent>
              </Tooltip>
            </div>
          ))
        )}
      </ScrollArea>

    </div>
  );
};

export default SongQueue;
