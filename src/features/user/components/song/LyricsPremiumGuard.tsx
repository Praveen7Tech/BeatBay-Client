import { Crown } from "lucide-react";
import { Link } from "react-router-dom";

interface PremiumGuardProps {
  isPremium: boolean;
  children: React.ReactNode;
}

export const PremiumGuardLyrics = ({ isPremium, children }: PremiumGuardProps) => {
  if (isPremium) return <>{children}</>;

  return (
    <div className="p-6 rounded-lg text-center">
      <h3 className="text-lg font-semibold mb-2">Lyrics</h3>
      <p className="text-zinc-400 mb-4">
        This feature is available only for premium users.
      </p>

      <div className="flex justify-center">
        <Link
          to="/subscription"
          className="flex items-center gap-2 px-4 py-2 rounded-lg  hover:text-spotify-green transition-colors font-semibold"
        >
          <Crown className="w-4 h-4 text-yellow-400" />
          Upgrade
        </Link>
      </div>
    </div>
  );
};