import {  UserCheck, UserPlus, MoreHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFollowStatus } from "@/core/hooks/follow/useFollowStatus";
import { useState } from "react";

interface ArtistProfileHeaderProps {
  _id: string;
  name: string;
  profilePicture: string;
}

export const ArtistProfileHeader = ({
  _id,
  name,
  profilePicture,
}: ArtistProfileHeaderProps) => {

  let verified = true;

  const { isFollowing, toggleFollow } = useFollowStatus(_id);

  const hasImage = !!profilePicture;

  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="w-full h-80 bg-linear-to-b from-primary/40 to-transparent" />

      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-80 flex items-end px-8 pb-8">
        <div className="flex items-end gap-8">

          {/* Artist Image / Fallback */}
          <div className="w-56 h-56 rounded-full shadow-2xl overflow-hidden bg-[#2a2a2a] flex items-center justify-center">
            {hasImage && !imageError ? (
              <img
                src={profilePicture}
                alt={name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <User className="text-white/60 w-24 h-24" />
            )}
          </div>

          {/* Artist Info */}
          <div className="flex flex-col mb-4">

            {verified && (
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="text-primary-foreground"
                  >
                    <path d="M10.814 4.814a1 1 0 0 1 1.414 0l1.686 1.686a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 0 1-1.414 0L2.086 12.5a1 1 0 0 1 0-1.414l7.5-7.5z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-foreground">
                  Verified Artist
                </span>
              </div>
            )}

            <h1 className="text-7xl font-black leading-none mb-4">
              {name}
            </h1>

            <p className="text-base font-medium">
              {"50000"} monthly listeners
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 px-8 flex items-center gap-4">
        {/* <Button
          size="lg"
          className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 hover:scale-105 transition-all"
        >
          <Play className="h-5 w-5 mr-2 fill-current" />
          Play
        </Button> */}

        <Button
          variant={isFollowing ? "secondary" : "outline"}
          size="lg"
          onClick={toggleFollow}
          className="rounded-full h-14 px-6"
        >
          {isFollowing ? (
            <>
              <UserCheck className="h-5 w-5 mr-2" />
              Following
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5 mr-2" />
              Follow
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-14 w-14"
        >
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
