import { FollowingSection } from "../../components/profile/FollowingSection";
import { MyPlaylists } from "../../components/profile/MyPlaylist";
import { ProfileHeader } from "../../components/profile/ProfileHeader";



export default function ProfilePage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f0f0f]">
      <ProfileHeader />
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
        <MyPlaylists />
        <FollowingSection />
      </div>
    </div>
  );
}
