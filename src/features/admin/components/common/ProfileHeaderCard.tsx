import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface ProfileHeaderProps {
  name?: string;
  bio?: string;
  profileImage?: string | null;
  status?: boolean;
  email?: string
  isArtist?: boolean; 
}

export default function ProfileHeaderCard({ name, bio,email, profileImage, status, isArtist = false }: ProfileHeaderProps) {
  const fallbackInitial = name?.charAt(0)?.toUpperCase();

  return (
    <div className="bg-spotify-dark border border-spotify-tertiary rounded-xl p-6">
      <div className="flex gap-6">
        {profileImage ? (
          <img
            src={profileImage}
            alt={name}
            className="w-32 h-32 rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        ) : (
          <div className="w-28 h-28 rounded-lg bg-gray-700 flex items-center justify-center text-white text-3xl font-bold">
            {fallbackInitial}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-spotify-text">{name}</h2>

            {isArtist && status && (
              <div className="flex items-center gap-1 px-3 py-1 bg-spotify-green/10 rounded-full">
                <CheckCircle className="w-4 h-4 text-spotify-green" />
                <span className="text-xs font-bold text-spotify-green">Verified</span>
              </div>
            )}
          </div>

          {bio && <p className="text-spotify-secondary mb-4">{bio}</p>}
          <p className="text-spotify-secondary mb-4">{email}</p>

          <Badge
            variant={status ? "default" : "destructive"}
            className={status ? "bg-spotify-green text-spotify-black" : ""}
          >
            {status ? "Active" : "Blocked"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
