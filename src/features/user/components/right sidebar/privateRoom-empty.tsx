import { Users, Sparkles } from "lucide-react";

const PrivateRoomsEmpty = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center text-center">
      <div className="relative mb-4">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#1DB954]/20 to-[#1DB954]/5 flex items-center justify-center animate-pulse">
          <Users size={20} className="text-[#1DB954]" />
        </div>
        <Sparkles size={16} className="absolute -top-1 -right-1 text-[#1DB954]" />
      </div>

      <h3 className="text-white font-semibold text-sm mb-1">
        Start a Private Room
      </h3>
      <p className="text-zinc-400 text-xs mb-4 max-w-[180px]">
        send invites to your fiends to start a room
      </p>
      <p className="text-zinc-400 text-xs">
        Listen together with friends in real-time
      </p>
    </div>
  );
};

export default PrivateRoomsEmpty;
