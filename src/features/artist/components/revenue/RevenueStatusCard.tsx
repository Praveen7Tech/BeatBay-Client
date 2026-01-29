import { LucideIcon } from "lucide-react";

interface RevenueStatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  subtitle?: string;
}

export const RevenueStatsCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  subtitle,
}: RevenueStatsCardProps) => {
  const changeColor = {
    positive: "text-[#1DB954]",
    negative: "text-red-500",
    neutral: "text-[#a7a7a7]",
  };

  return (
    <div className="bg-[#181818] rounded-lg p-6 hover:bg-[#282828] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-[#282828] p-3 rounded-lg">
          <Icon size={24} className="text-[#1DB954]" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeColor[changeType]}`}>
            {change}
          </span>
        )}
      </div>
      <p className="text-[#a7a7a7] text-sm mb-1">{title}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
      {subtitle && (
        <p className="text-[#a7a7a7] text-xs mt-1">{subtitle}</p>
      )}
    </div>
  );
};
