import { ArrowLeft, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoomHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 bg-[#1a1a1a]/80 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center">
          <h1 className="font-semibold text-sm">Chill Vibes</h1>
          <div className="flex items-center justify-center gap-1 text-[#1DB954] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
            Live
          </div>
        </div>

        <button className="p-2 rounded-full hover:bg-white/10 transition">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default RoomHeader;
