import { Music, Disc, Users, UserCheck, Heart, ListMusic, Mic2, Crown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const links = [
  { title: "Songs", icon: Music, color: "#ea0707", path: "/showall?type=songs" },
  { title: "Albums", icon: Disc, color: "#8b5cf6", path: "/showall?type=albums" },
  { title: "Followers", icon: Users, color: "#ec4899", path: "/connections/followers" },
  { title: "Following", icon: UserCheck, color: "#f59e0b", path: "/connections/following" },
  { title: "Favourites", icon: Heart, color: "#ef4444", path: "/liked-songs" },
  { title: "Playlists", icon: ListMusic, color: "#1DB954", path: "/playlists" },
  { title: "Premium", icon: Crown, color: "#3b82f6", path: "/premium/details" },
  { title: "Private Room", icon: Mic2, color: "#14b8a6", path: "/private-room" },
];

const QuickLinks = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const navigate = useNavigate();

  const bgGradient = hovered !== null
    ? `linear-gradient(180deg, ${links[hovered].color}40 0%, #0D0D0D 100%)`
    : "linear-gradient(180deg, #7f1d1d80 0%, #0D0D0D 100%)";

  return (
    <div
      className="rounded-xl pt-10 p-6 transition-all duration-500 ease-in-out"
      style={{ background: bgGradient }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {links.map((link, i) => (
          <button
            key={link.title}
            onClick={() => navigate(link.path)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-md px-4 py-3 transition-colors text-left h-14"
          >
            <link.icon size={20} className="text-white shrink-0" />
            <span className="text-white text-sm font-medium truncate">{link.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
