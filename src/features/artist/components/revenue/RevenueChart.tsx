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
import { useState } from "react";
import { chartData } from "../../services/artist.api";

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  streams: number;
}

interface RevenueChartProps {
  data: chartData[];
  currency: string
}

type TimeRange = "6m" | "1y" | "all";


export const RevenueChart = ({ data,currency }: RevenueChartProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("6m");

  const getFilteredData = () => {
    switch (timeRange) {
      case "6m":
        return data.slice(-6);
      case "1y":
        return data.slice(-12);
      case "all":
      default:
        return data;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">
            Revenue Trend
          </h3>
          <p className="text-[#a7a7a7] text-sm">
            Monthly earnings overview
          </p>
        </div>
        <div className="flex gap-1 bg-[#282828] rounded-lg p-1">
          {(["6m", "1y", "all"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant="ghost"
              size="sm"
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs ${
                timeRange === range
                  ? "bg-[#1DB954] text-black hover:bg-spotify-green"
                  : "text-[#a7a7a7] hover:text-white hover:bg-[#3e3e3e]"
              }`}
            >
              {range === "6m" ? "6 Months" : range === "1y" ? "1 Year" : "All Time"}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getFilteredData()}>
            <defs>
              <linearGradient id="revenueGradientNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1DB954" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
            <XAxis dataKey="month" stroke="#a7a7a7" fontSize={12} />
            <YAxis
              stroke="#a7a7a7"
              fontSize={12}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#282828",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number, name: string) => [
                name === "revenue"
                  ? `$${value.toLocaleString()}`
                  : value.toLocaleString(),
                name === "revenue" ? "Revenue" : "Streams",
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1DB954"
              strokeWidth={2}
              fill="url(#revenueGradientNew)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
