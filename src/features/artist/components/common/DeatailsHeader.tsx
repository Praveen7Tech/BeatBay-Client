import { Button } from "@/components/ui/button";
import { AlertDialogDemo } from "../song/ui/Alert-Dialouge";
import { ArrowLeft } from "lucide-react";
import { useSongDetails } from "@/core/hooks/artist/useSongDetails";
import { useDeleteSong } from "@/core/hooks/artist/useDeleteSong";
import { formatTime } from "@/core/utils/formatTime";
import { format, parseISO } from "date-fns";


export function DetailHeader() {
      // song details and delete function hook
      const { song, isLoading, isError, CoverImageURL, songId } = useSongDetails();
      const { deleteSongMutation } = useDeleteSong();
    
      if (isLoading ) {
        return <div>Loading...</div>;
      }
    
      if (isError || !song) { 
        return <div>Error loading song details.</div>;
      }
    
      const HandleDelete = () => {
        if (songId) {
            deleteSongMutation(songId); 
        }
      };
  return (
    <div >
        <Button onClick={()=> window.history.back()} variant="ghost" className="mb-6 -ml-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Songs
        </Button>

        {/* Song Header */}
        <div className="flex items-start gap-6 mb-8 bg-surface p-6 rounded-lg border border-border">
          <img
            src={CoverImageURL}
            alt={song?.title}
            className="w-32 h-32 rounded-lg shadow-lg object-cover"
          />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">Song Performance</p>
            <h1 className="text-4xl font-bold mb-2">{song?.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Released {format(parseISO(song?.createdAt), "MMM dd, yyyy")}</span>
              <span>•</span>
              <span>Duration {formatTime(song?.duration)}</span>
            </div>
          </div>
          {/* Delete button */}
          <div className="flex gap-2">
            <AlertDialogDemo onConfirm={HandleDelete}/>
          </div>
        </div>
    </div>
  );
}
