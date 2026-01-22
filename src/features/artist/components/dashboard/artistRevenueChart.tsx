import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200, streams: 45000 },
  { month: "Feb", revenue: 3800, streams: 42000 },
  { month: "Mar", revenue: 5100, streams: 58000 },
  { month: "Apr", revenue: 4700, streams: 52000 },
  { month: "May", revenue: 6200, streams: 71000 },
  { month: "Jun", revenue: 5800, streams: 65000 },
  { month: "Jul", revenue: 7100, streams: 82000 },
  { month: "Aug", revenue: 8542, streams: 94000 },
];

export const ArtistRevenueChart = () => {
  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-1">Revenue Overview</h3>
      <p className="text-[#a7a7a7] text-sm mb-6">Monthly earnings from streams and royalties</p>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1DB954" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1DB954" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
            <XAxis dataKey="month" stroke="#a7a7a7" fontSize={12} />
            <YAxis stroke="#a7a7a7" fontSize={12} tickFormatter={(value) => `$${value}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#282828",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1DB954"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
