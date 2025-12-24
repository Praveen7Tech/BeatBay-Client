import RoomHeader from "../../components/private-room/Room-header"; 
import NowPlaying from "../../components/private-room/Now-Playing"; 
import SongQueue from "../../components/private-room/Song-Queue"; 
import RoomMembers from "../../components/private-room/Room-members"; 

const PrivateRoomPage = () => {
  const isHost = true;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1a1a1a] to-spotify-dark text-white">
      <RoomHeader />

      <div className="p-4 max-w-7xl mx-auto space-y-4">
        <div className="grid lg:grid-cols-2 gap-4">
          <NowPlaying />
          <SongQueue />
        </div>

        <RoomMembers />
      </div>
    </div>
  );
};

export default PrivateRoomPage;
