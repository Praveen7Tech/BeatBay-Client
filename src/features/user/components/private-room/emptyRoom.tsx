import { Users } from "lucide-react";

const EmptyRoom = () => {
  return (
    <div className="flex items-center justify-center h-full w-full text-white">
      <div className="text-center max-w-sm bg-[#121212] p-8 rounded-xl border border-[#2a2a2a] animate-fadeIn">
        
        {/* Animated Icon */}
        <div className="relative flex justify-center">
          <Users
            size={52}
            className="text-[#1DB954] animate-float"
          />
        </div>

        <h2 className="text-lg font-semibold mt-4 mb-2">
          No active room
        </h2>

        <p className="text-sm text-zinc-400 mb-6">
          Invite your friends and start listening to music together in real time.
        </p>

        <p className="text-xs text-zinc-500">
          Create a room to sync playback 🎶
        </p>
      </div>
    </div>
  );
};

export default EmptyRoom;