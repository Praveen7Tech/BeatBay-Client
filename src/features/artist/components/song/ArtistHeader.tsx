import { Play, Plus, Shuffle } from "lucide-react";
import { Button } from "./Button"; 
import artistProfile from "/src/assets/bg.png";
import { Link } from "react-router-dom";

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
        
        <Link to={'/artist-uploadTrack'}>
        <button
          style={{
            borderRadius: "9999px",
            height: "56px",
            padding: "0 2rem",
            backgroundColor: "transparent",
            border: "1px solid #b3b3b3",
            color: "#ffffff",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#1DB954";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#b3b3b3";
          }}
        >
          <Plus size={20} />
          New Song
        </button>
        </Link>
      </div>
    </div>
  );
};
