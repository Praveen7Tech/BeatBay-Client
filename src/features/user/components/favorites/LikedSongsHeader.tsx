import { Heart } from "lucide-react";

interface LikedSongsHeaderProps {
  totalSongs: number;
}

const LikedSongsHeader = ({ totalSongs }: LikedSongsHeaderProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-linear-to-b from-primary/40 via-primary/20 to-background" />
      <div className="relative px-6 pt-16 pb-6">
        <div className="flex items-end gap-6">
          <div className="w-52 h-52 bg-linear-to-br from-primary/60 to-primary rounded-md shadow-2xl flex items-center justify-center shrink-0">
            <Heart className="w-24 h-24 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Playlist</span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
              Liked Songs
            </h1>
            <p className="text-muted-foreground mt-4">{totalSongs} songs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedSongsHeader;
