import { adminApi } from "@/features/admin/services/adminApi";
import { useQuery } from "@tanstack/react-query";

export const useAdminRevenueStats = () =>
  useQuery({
    queryKey: ["admin-revenue-stats"],
    queryFn: adminApi.getStats,
});

export const useAdminRevenueChart = (range: "weekly" | "monthly" | "yearly") =>
  useQuery({
    queryKey: ["admin-revenue-chart", range],
    queryFn: () => adminApi.getChart(range),
    placeholderData: (previousData)=> previousData,
});

export const useAdminPayoutHistory = (page: number) =>
  useQuery({
    queryKey: ["admin-payout-history", page],
    queryFn: () => adminApi.getPayoutHistory(page, 5),
    placeholderData: (previousData)=> previousData,
});