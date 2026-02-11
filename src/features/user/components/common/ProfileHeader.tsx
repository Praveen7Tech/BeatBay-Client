import { User, UserCheck, UserPlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFollowStatus } from "@/core/hooks/follow/useFollowStatus";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";

interface ProfileHeaderProps {
  id: string;
  name: string;
  profilePicture?: string;
  verified?: boolean;
  followCount?: number; 
  followersCount?:number;playlist?:number;
  songCount?:number;albumCount?:number
  showFollowButton?: boolean;
  fans?: number
  role: "user" | "artist"
}

export function ProfileHeader({
  id,
  name,
  profilePicture,
  verified,playlist,
  followCount,followersCount,songCount,albumCount,fans,
  showFollowButton = true,
  role
}: ProfileHeaderProps) {
  const { isFollowing, toggleFollow } = useFollowStatus(id, role);
  const [imageError, setImageError] = useState(false);
  const currentUserId = useSelector((state:RootState)=> state.auth.user?.id)
  const isCurrentUser = currentUserId === id

  return (
    <div className="relative w-full">
      {/* BG */}
      <div className="w-full h-80 bg-linear-to-b from-primary/40 to-transparent" />

      {/* CONTENT */}
      <div className="absolute top-0 left-0 w-full h-80 flex items-end px-8 pb-8">
        <div className="flex items-end gap-8">
          {/* IMAGE */}
          <div className="w-56 h-56 rounded-full overflow-hidden bg-[#2a2a2a] flex items-center justify-center shadow-2xl">
            {profilePicture && !imageError ? (
              <img
                src={profilePicture}
                alt={name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <User className="w-24 h-24 text-white/60" />
            )}
          </div>

          {/* INFO */}
          <div className="mb-4">
            {verified && (
              <p className="text-sm font-medium mb-2">✔ Verified</p>
            )}
            <h1 className="text-7xl font-black mb-4">{name}</h1>
            <div className="flex gap-6 ">
              <div >
                <span className="text-[#00d084] font-semibold">{songCount ? songCount :followCount}</span>
                <span className="font-medium ml-2">{songCount ? "Songs" : "Following"}</span>
              </div>
              <div>
                <span className="text-[#00d084] font-semibold">{albumCount ? albumCount : followersCount}</span>
                <span className="font-medium ml-2">{albumCount ? "Albums" : "Followers"}</span>
              </div>
              <div>
                <span className="text-[#00d084] font-semibold">{playlist ? playlist : fans}</span>
                <span className="font-medium ml-2">{playlist ? "PlayList" : "Fans"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ACTIONS */}
      {showFollowButton && !isCurrentUser && (
        <div className="mt-6 px-8 flex items-center gap-4">
          <Button
            variant={isFollowing ? "secondary" : "outline"}
            size="lg"
            onClick={toggleFollow}
            className="rounded-full h-14 px-6"
          >
            {isFollowing ? (
              <>
                <UserCheck className="mr-2" /> Following
              </>
            ) : (
              <>
                <UserPlus className="mr-2" /> Follow
              </>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full h-14 w-14">
            <MoreHorizontal />
          </Button>
        </div>
      )}
    </div>
  );
}
