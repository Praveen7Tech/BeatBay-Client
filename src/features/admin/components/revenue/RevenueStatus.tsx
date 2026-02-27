import { DollarSign, TrendingUp, Wallet, Calendar } from "lucide-react";
import { AdminStatsCard } from "../common/status/AdminStatusCard";
import { format } from "date-fns";
import { AdminRevenueDashboard } from "../../utils/api.types";

interface Props {
  stats: AdminRevenueDashboard["stats"];
}

export const AdminRevenueStats = ({ stats }: Props) => {
  if (!stats) return null;

  const items = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      subtitle: "All time earnings",
    },
    {
      title: "This Month",
      value: `$${stats.thisMonthRevenue.toLocaleString()}`,
      icon: TrendingUp,
      subtitle: "Current month revenue",
    },
    {
      title: "This Year",
      value: `$${stats.thisYearRevenue.toLocaleString()}`,
      icon: Wallet,
      subtitle: "Current year revenue",
    },
    {
      title: "Next Payout",
      value: format(stats.nextPayoutDate, "MMM dd, yyyy"),
      icon: Calendar,
      subtitle: "Based on payout schedule",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((s) => (
        <AdminStatsCard key={s.title} {...s} />
      ))}
    </div>
  );
};