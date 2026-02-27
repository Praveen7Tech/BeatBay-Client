import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useAdminRevenueChart } from "@/core/hooks/admin/revenue/useRevenueDashboard";
import { SpinnerArtist } from "@/components/ui/spinner";

type RevenueRange = "weekly" | "monthly" | "yearly";

export const AdminRevenueChart = () => {
  const [range, setRange] = useState<RevenueRange>("monthly");

  const { data, isLoading } = useAdminRevenueChart(range);

  if (isLoading)  return <SpinnerArtist />

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Revenue Trend
          </h2>
          <p className="text-sm text-muted-foreground">
            Platform net revenue
          </p>
        </div>

        <div className="flex gap-1">
          {(["weekly", "monthly", "yearly"] as RevenueRange[]).map((r) => (
            <Button
              key={r}
              size="sm"
              variant={range === r ? "default" : "outline"}
              onClick={() => setRange(r)}
              className="text-xs capitalize"
            >
              {r}
            </Button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data || []}>
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(141 76% 48%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(141 76% 48%)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />

          <XAxis
            dataKey="label"
            stroke="hsl(0 0% 60%)"
            fontSize={12}
          />

          <YAxis
            stroke="hsl(0 0% 60%)"
            fontSize={12}
            tickFormatter={(v) => `$${v}`}
          />

          <Tooltip
            contentStyle={{
              background: "hsl(0 0% 10%)",
              border: "1px solid hsl(0 0% 18%)",
              borderRadius: 8,
            }}
            formatter={(value) => [`$${value?.toLocaleString()}`, "Revenue"]}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(141 76% 48%)"
            fill="url(#revGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};