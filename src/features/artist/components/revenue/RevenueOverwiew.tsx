import { DollarSign, TrendingUp, Wallet, Calendar } from "lucide-react";
import { RevenueStatsCard } from "./RevenueStatusCard";
import { format } from "date-fns";
import { Summary } from "../../services/artist.api";

interface RevenueOverviewProps {
  stats: Summary;
}

export const RevenueOverview = ({ stats }: RevenueOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <RevenueStatsCard
        title="Total Revenue"
        value={`$${stats.totalRevenue.toLocaleString()}`}
        change="All time"
        changeType="neutral"
        icon={DollarSign}
        subtitle="Lifetime earnings"
      />
      <RevenueStatsCard
        title="This Month"
        value={`$${stats.revenueThisMonth.toLocaleString()}`}
        icon={TrendingUp}
        subtitle="vs last month"
      />
      <RevenueStatsCard
        title="Pending Payout"
        value={`$${stats.pendingPayout.toLocaleString()}`}
        change="Processing"
        changeType="neutral"
        icon={Wallet}
        subtitle="Available for withdrawal"
      />
      <RevenueStatsCard
        title="Next Payout"
        value={format(stats.nextPayoutDate, "MMM dd, yyyy")}
        icon={Calendar}
        subtitle="Estimated date"
      />
    </div>
  );
};
