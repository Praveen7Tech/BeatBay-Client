import { LucideIcon } from "lucide-react";

interface SongStatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export const SongStatsCard = ({ title, value, change, isPositive, icon: Icon }: SongStatsCardProps) => {
  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {change}
        </span>
      </div>
      <h3 className="text-muted-foreground text-sm mb-1">{title}</h3>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
};
