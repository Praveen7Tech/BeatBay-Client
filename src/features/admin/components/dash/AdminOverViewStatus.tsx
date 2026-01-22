import { SpinnerCustom } from '@/components/ui/spinner';
import { useDasboard } from '@/core/hooks/admin/useDashBoard';
import { Users, Mic2, Music, Album, ListMusic } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

export const AdminOverviewStats = () => {
  const { isLoading,totalUser, totalArtist, totalSongs,totalAlbums,totalPlaylists,} = useDasboard();

  if (isLoading) return <SpinnerCustom />;

  const stats: StatCardProps[] = [
    {
      title: 'Total Users',
      value: totalUser,
      icon: Users,
      color: '#1DB954',
    },
    {
      title: 'Total Artists',
      value: totalArtist,
      icon: Mic2,
      color: '#ec4899',
    },
    {
      title: 'Total Songs',
      value: totalSongs,
      icon: Music,
      color: '#8b5cf6',
    },
    {
      title: 'Total Albums',
      value: totalAlbums,
      icon: Album,
      color: '#f59e0b',
    },
    {
      title: 'Total Playlists',
      value: totalPlaylists,
      icon: ListMusic,
      color: '#10b981',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  return (
    <div
      className="bg-surface p-6rounded-lgborder border-border hover:border-primary/50 transition-colors
        min-h-40flexflex-coljustify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {value}
          </p>
        </div>

        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Updated in real time
      </p>
    </div>
  );
};
