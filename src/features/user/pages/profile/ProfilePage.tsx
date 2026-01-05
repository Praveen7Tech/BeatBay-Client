import { useState } from "react"
import { FollowingSection } from "../../components/profile/FollowingSection"
import { MyPlaylists } from "../../components/profile/MyPlaylist"
import { ProfileHeader } from "../../components/profile/ProfileHeader"
import { EditProfileForm } from "../../components/profile/EditProfileForm"
import { EditPassword } from "../../components/profile/EditPassword"
import { FollowersSection } from "../../components/followers/folowersSection"

type ProfileSection = "default" | "editProfile" | "editPassword"

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<ProfileSection>("default")

  const handleCancel = () => setActiveSection("default")

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f0f0f]">
      <ProfileHeader
        onEditClick={() => setActiveSection("editProfile")}
        onEditPasswordClick={() => setActiveSection("editPassword")}
      />

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
        {activeSection === "editProfile" ? (
          <EditProfileForm onCancel={handleCancel} />
        ) : activeSection === "editPassword" ? (
          <EditPassword onCancel={handleCancel} />
        ) : (
          <>
            <MyPlaylists />
            <FollowingSection />
            <FollowersSection/>
          </>
        )}
      </div>
    </div>
  )
}
