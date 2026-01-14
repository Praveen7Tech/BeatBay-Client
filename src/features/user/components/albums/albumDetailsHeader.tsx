import { format, parseISO } from "date-fns";
import { Pause, Play } from "lucide-react";

interface AlbumDetailHeaderProps {
  title: string;
  artist: string;
  coverImageUrl: string;
  releaseYear: string;
  totalTracks: number;
  isPlaying: boolean
  onPlayAlbum: ()=> void
}

export const AlbumDetailHeader = ({
  title,
  artist,
  coverImageUrl,
  totalTracks=100, onPlayAlbum, isPlaying,releaseYear
}: AlbumDetailHeaderProps) => {

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8 items-end">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-48 h-48 rounded-lg shadow-2xl object-cover"
        />
        
        <div className="flex-1 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-sm bg-[#282828] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="white">
                <path d="M2 2h12v12H2z"/>
              </svg>
            </div>
            <span className="text-sm text-white uppercase tracking-wider font-medium">Album</span>
          </div>
          <h1 className="text-7xl font-bold mb-6 text-white leading-tight">{title}</h1>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-white">{artist}</span>
            <span className="text-spotify-secondary">•</span>
            <span className="text-spotify-secondary">{totalTracks} songs</span>
             <span className="text-spotify-secondary">•</span>
            <span className="text-spotify-secondary">{format(parseISO(releaseYear), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8 mt-8">
        <button className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-spotify-green hover:scale-105 transition-all flex items-center justify-center shadow-lg"
          style={{ border: "none", cursor: "pointer" }}
         onClick={onPlayAlbum}>
           {isPlaying ? (
              <Pause className="h-6 w-6 fill-black text-black" />
            ):(
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            )}  
        </button>
      </div>
    </div>
  );
};
