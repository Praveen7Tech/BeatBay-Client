import { Users } from "lucide-react";

const EmptyRoom = ()=>{
    return(
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="text-center max-w-sm">
            <Users size={48} className="mx-auto mb-4 text-[#1DB954]" />
            <h2 className="text-lg font-semibold mb-2">
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
}

export default EmptyRoom