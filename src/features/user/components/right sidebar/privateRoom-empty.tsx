import { Users, Sparkles, UserPlus } from "lucide-react";

const PrivateRoomsEmpty = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center text-center">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#1DB954]/20 to-[#1DB954]/5 flex items-center justify-center animate-pulse">
          <Users size={28} className="text-[#1DB954]" />
        </div>
        <Sparkles size={16} className="absolute -top-1 -right-1 text-[#1DB954]" />
      </div>

      <h3 className="text-white font-semibold text-sm mb-1">
        Start a Private Room
      </h3>

      <p className="text-zinc-400 text-xs mb-4 max-w-[180px]">
        Listen together with friends in real-time
      </p>

      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DB954] text-black text-sm font-medium hover:scale-105 transition">
        <UserPlus size={16} />
        Create Room
      </button>
    </div>
  );
};

export default PrivateRoomsEmpty;
