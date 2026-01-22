import { TrendingUp, TrendingDown } from "lucide-react";
import { SpinnerArtist } from "@/components/ui/spinner";
import { useArtistDashboard } from "@/core/hooks/artist/dashboard/useDashboard";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

export const ArtistDashboardStats = () => {

  const {stats, isLoading} = useArtistDashboard()

  if(isLoading) return <SpinnerArtist/>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

const StatCard = ({ title, value, icon }: StatCardProps) => {
  const isPositive = true
  
  return (
    <div className="bg-[#181818] rounded-lg p-6 hover:bg-[#282828] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-[#282828] rounded-full">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        </div>
      </div>
      <h3 className="text-[#a7a7a7] text-sm mb-1">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );
};
