import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  subtitle?: string;
  link?: string
}

export const AdminStatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  subtitle ,
  link
}: AdminStatsCardProps) => {
  const changeColors = {
    positive: "text-primary",
    negative: "text-destructive",
    neutral: "text-muted-foreground"
  };

  return (
    <div className="bg-surface p-6 rounded-lg border border-border hover:bg-surface-hover transition-colors">
      <Link to={`/admin/${link}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${changeColors[changeType]}`}>
            {changeType === "positive" && "↑ "}
            {changeType === "negative" && "↓ "}
            {change}
          </span>
        )}
      </div>
      <h3 className="text-muted-foreground text-md font-bold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </Link>
    </div>
  );
};
