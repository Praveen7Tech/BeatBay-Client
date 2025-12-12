import { Play } from "lucide-react";

interface TopResultCardProps {
  title: string;
  type: string;
  artist: string;
  image: string;
}

const TopResultCard = ({ title, type, artist, image }: TopResultCardProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Top result</h2>
      <div className="bg-[#181818] rounded-lg p-5 hover:bg-[#282828] transition-colors group cursor-pointer relative">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 rounded-md mb-4 shadow-lg"
        />
        <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-spotify-secondary">
          <span className="bg-spotify-dark text-white px-2 py-1 rounded-full text-xs mr-2">
            {type}
          </span>
          {artist}
        </p>
        <button className="absolute bottom-5 right-5 w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105 hover:bg-spotify-green">
          <Play className="w-6 h-6 text-black fill-black" />
        </button>
      </div>
    </div>
  );
};

export default TopResultCard;
