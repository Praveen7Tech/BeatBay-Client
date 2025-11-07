import { useState } from "react";
import { FollowingSection } from "../../components/profile/FollowingSection";
import { MyPlaylists } from "../../components/profile/MyPlaylist";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { EditProfileForm } from "../../components/profile/EditProfileForm";



export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f0f0f]">
      <ProfileHeader onEditClick={()=> setIsEditing(!isEditing)}/>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">

        {isEditing ? (
          <EditProfileForm onCancel={()=> setIsEditing(false)}/>
        ):(
          <>
            <MyPlaylists />
            <FollowingSection />
          </>
        )}
        
      </div>
    </div>
  );
}
