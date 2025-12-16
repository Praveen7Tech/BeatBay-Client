import { User, UserCheck, UserPlus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFollowStatus } from "@/core/hooks/follow/useFollowStatus";
import { useState } from "react";

interface ProfileHeaderProps {
  id: string;
  name: string;
  profilePicture?: string;
  verified?: boolean;
  subtitle?: string; // monthly listeners / followers
  showFollowButton?: boolean;
}

export function ProfileHeader({
  id,
  name,
  profilePicture,
  verified,
  subtitle,
  showFollowButton = true,
}: ProfileHeaderProps) {
  const { isFollowing, toggleFollow } = useFollowStatus(id);
  const [imageError, setImageError] = useState(false);

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
            {subtitle && <p className="font-medium">{subtitle}</p>}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      {showFollowButton && (
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
