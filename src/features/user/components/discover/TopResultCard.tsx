import { useAudioContext } from "@/core/context/useAudioContext";
import { Pause, Play } from "lucide-react";
import { SongDetails } from "../../services/response.type";

interface TopResultCardProps {
  id:string
  title: string;
  artist: string;
  coverImageUrl: string;
}

interface TotResult{
  topResult: TopResultCardProps
  songs: SongDetails[]
}

const TopResultCard = ({ topResult, songs }: TotResult) => {

   const { setPlaylistAndPlay, isPlaying, playPause, currentSong } = useAudioContext();

  const isThisSongLoaded = currentSong?.id === topResult.id;

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event if you add one later

    if (isThisSongLoaded) {
      playPause();
    } else {
      const playlist = Array.isArray(songs) ? songs : [songs];
      console.log("working..", playlist)
      setPlaylistAndPlay(playlist, 0);
    }
  };
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>

      <div className="flex-1 bg-[#181818] rounded-lg p-5 hover:bg-[#282828] transition-colors group cursor-pointer relative flex flex-col justify-between">
        <div>
          <img
            src={topResult.coverImageUrl}
            alt={topResult.title}
            className="w-40 h-38 rounded-md mb-4 shadow-lg"
          />

          <h3 className="text-3xl font-bold text-white mb-2">
            {topResult.title}
          </h3>

          <p className="text-sm text-spotify-secondary">
            <span className="bg-spotify-dark text-white px-2 py-1 rounded-full text-xs mr-2">
              Artist
            </span>
            {topResult.artist}
          </p>
        </div>

        <button onClick={handlePlayPause} className="absolute bottom-5 right-5 w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105">
           {isPlaying && isThisSongLoaded ? (
              <Pause className="h-6 w-6 fill-black text-black" />
            ):(
              <Play className="h-6 w-6 fill-black text-black ml-1" />
            )} 
        </button>
      </div>
    </div>
  );
};

export default TopResultCard;
