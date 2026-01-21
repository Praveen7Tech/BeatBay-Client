import { Users, Mic2, Music, Album, ListMusic, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, change, changeType, icon: Icon, color }: StatCardProps) => {
  return (
    <div className="bg-surface p-5 rounded-lg border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          <div className={`flex items-center gap-1 mt-2 text-sm ${
            changeType === 'positive' ? 'text-primary' : 'text-red-500'
          }`}>
            {changeType === 'positive' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{change} vs last month</span>
          </div>
        </div>
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );
};

export const AdminOverviewStats = () => {
  const stats: StatCardProps[] = [
    {
      title: 'Total Users',
      value: '5,342',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: '#1DB954',
    },
    {
      title: 'Total Artists',
      value: '2,156',
      change: '+9.1%',
      changeType: 'positive',
      icon: Mic2,
      color: '#ec4899',
    },
    {
      title: 'Total Songs',
      value: '11,847',
      change: '+8.3%',
      changeType: 'positive',
      icon: Music,
      color: '#8b5cf6',
    },
    {
      title: 'Total Albums',
      value: '1,523',
      change: '+5.7%',
      changeType: 'positive',
      icon: Album,
      color: '#f59e0b',
    },
    {
      title: 'Total Playlists',
      value: '8,291',
      change: '+15.2%',
      changeType: 'positive',
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
