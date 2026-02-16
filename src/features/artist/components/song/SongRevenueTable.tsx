import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlyRevenue {
  label: string;
  revenue: number;
}

interface RevenueResponse {
  lifetimeRevenue: number;
  thisYearRevenue: number;
  monthlyChart: MonthlyRevenue[];
  payouts: any[];
}

const currentYear = new Date().getFullYear();

interface Props {
  revenue: RevenueResponse;
}

export const SongRevenueYearly = ({ revenue}: Props) => {


  // 🔥 Transform backend structure → recharts structure
  const monthlyData = revenue.monthlyChart.map((item) => ({
    month: item.label,
    revenue: item.revenue,
  }));
console.log("hh ", monthlyData)
  const maxEntry =
    monthlyData.length > 0
      ? monthlyData.reduce((best, d) =>
          d.revenue > best.revenue ? d : best
        )
      : { month: "-", revenue: 0 };

  return (
    <div className="bg-surface rounded-lg p-6 col-span-1 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">
            Revenue Breakdown — {currentYear}
          </h3>
          <p className="text-[#a7a7a7] text-sm">
            Monthly earnings this year
          </p>
        </div>

        {/* ✅ Backend total */}
        <div className="bg-[#282828] rounded-lg px-4 py-2">
          <p className="text-[#1DB954] font-bold text-lg">
            ${revenue.thisYearRevenue.toLocaleString()}
          </p>
          <p className="text-[#a7a7a7] text-xs text-right">Total</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="yearlyRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1DB954" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#1DB954" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#282828" vertical={false} />

            <XAxis
              dataKey="month"
              stroke="#a7a7a7"
              fontSize={12}
              tickLine={false}
            />

            <YAxis
              stroke="#a7a7a7"
              fontSize={12}
              tickFormatter={(v) =>
                `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`
              }
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.1)" }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1DB954"
              strokeWidth={2.5}
              fill="url(#yearlyRevenueGradient)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#282828]">
        <div>
          <p className="text-[#a7a7a7] text-xs">Avg / Month</p>
          <p className="text-white font-bold text-lg">
            $
            {Math.round(
              revenue.thisYearRevenue / monthlyData.length
            ).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-[#a7a7a7] text-xs">Best Month</p>
          <p className="text-[#1DB954] font-bold text-lg">
            {maxEntry.month} — ${maxEntry.revenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#282828] rounded-lg px-4 py-3 shadow-xl">
        <p className="text-[#a7a7a7] text-xs mb-1">
          {label} {currentYear}
        </p>
        <p className="text-white font-semibold text-sm">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};