import { ProfilePageLayout } from "../../components/common/ProfileLayout"; 
import { ProfileHeader } from "../../components/common/ProfileHeader"; 
import { PlaylistsSection } from "../../components/common/PlayListSection"; 
import { FollowingSection } from "../../components/common/FollowingSection"; 
import { useParams } from "react-router-dom";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useUserProfileDetails } from "@/core/hooks/api/useFetchHooks";

export default function UserProfile() {
    const {userId} = useParams()
    const { data,isLoading, isError, error,} = useUserProfileDetails(userId!)
    
      if (isLoading) {
        return (
            <SpinnerCustom />
        );
      }
    
      if (isError || !data) {
        return (
          <div className="min-h-screen flex items-center justify-center text-red-500">
            {error instanceof Error ? error.message : "Failed to load artist"}
          </div>
        );
      }
      const user = data.user; 
      const playLists = data.playlists
      const artist = data.followingArtists
      const users = data.followingUsers
      const following  = [...artist,...users]
      const followers = data.followers
    return (
        <ProfilePageLayout>
        <ProfileHeader
            id={user.id}
            name={user.name}
            profilePicture={user.profilePicture}
            followCount={user.followingCount}
            followersCount={followers.length} playlist={playLists.length}
            role="user"
        />

        <PlaylistsSection playlists={playLists} LinkPath={`/${user.id}/playlists`}/>
        <FollowingSection users={following} title={"Following"} showAllLink={`/${user.id}/following`}/>
        <FollowingSection users={followers} title={"Followers"} showAllLink={`/${user.id}/followers`} />
        </ProfilePageLayout>
    );
}
