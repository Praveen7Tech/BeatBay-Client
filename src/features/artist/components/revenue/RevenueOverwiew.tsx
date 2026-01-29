import { DollarSign, TrendingUp, Wallet, Calendar } from "lucide-react";
import { RevenueStatsCard } from "./RevenueStatusCard";

interface RevenueStats {
  totalRevenue: number;
  thisMonth: number;
  pendingPayout: number;
  nextPayoutDate: string;
  monthlyChange: number;
}

interface RevenueOverviewProps {
  stats: RevenueStats;
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
        value={`$${stats.thisMonth.toLocaleString()}`}
        change={`${stats.monthlyChange >= 0 ? "+" : ""}${stats.monthlyChange}%`}
        changeType={stats.monthlyChange >= 0 ? "positive" : "negative"}
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
        value={stats.nextPayoutDate}
        icon={Calendar}
        subtitle="Estimated date"
      />
    </div>
  );
};
