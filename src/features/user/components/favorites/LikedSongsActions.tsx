
import { Pause, Play, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface LikedSongsActionsProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onPlaySong: ()=> void;
  isPlaying: boolean
}

const LikedSongsActions = ({ searchQuery, setSearchQuery, onPlaySong, isPlaying }: LikedSongsActionsProps) => {
  return (
    <div className="px-6 py-4 flex items-center gap-4">
      <button 
      onClick={onPlaySong}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all flex items-center justify-center shadow-lg"
        >
          {isPlaying ? (
               <Pause className="h-6 w-6 fill-black text-black" /> 
             ):(
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            )}  
        </button>
      <div className="ml-auto relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search in Liked Songs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-none focus-visible:ring-1"
        />
      </div>
    </div>
  );
};

export default LikedSongsActions;
