import { Play, Shuffle } from "lucide-react";
import { Button } from "./Button"; 
import artistProfile from "/src/assets/bg.png";

export const ArtistHeader = () => {
  return (
    <div className="relative mb-8">
      <div className="flex items-end gap-6 p-8 bg-linear-to-b from-surface to-background rounded-lg">
        <img
          src={artistProfile}
          alt="Artist Profile"
          className="w-40 h-40 rounded-lg shadow-2xl object-cover"
        />
        
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">Artist</p>
          <h1 className="text-5xl font-bold mb-4 text-foreground">Your Songs</h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="font-medium">24 songs</span>
            <span>•</span>
            <span>1.2M monthly listeners</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 px-8">
        <Button 
          size="lg" 
          className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 hover:scale-105 transition-all"
        >
          <Play className="h-5 w-5 mr-2 fill-current" />
          Play
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="rounded-full h-14 px-8 border-border hover:border-primary transition-all"
        >
          <Shuffle className="h-5 w-5 mr-2" />
          Shuffle
        </Button>
      </div>
    </div>
  );
};
