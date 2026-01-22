import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const growthData = [
  { month: "Jan", fans: 8200, streams: 125000 },
  { month: "Feb", fans: 8800, streams: 142000 },
  { month: "Mar", fans: 9400, streams: 158000 },
  { month: "Apr", fans: 10100, streams: 175000 },
  { month: "May", fans: 10800, streams: 198000 },
  { month: "Jun", fans: 11200, streams: 215000 },
  { month: "Jul", fans: 11900, streams: 248000 },
  { month: "Aug", fans: 12400, streams: 285000 },
];

export const ArtistGrowthChart = () => {
  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-1">Growth Analytics</h3>
      <p className="text-[#a7a7a7] text-sm mb-6">Fans and streams growth over time</p>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
            <XAxis dataKey="month" stroke="#a7a7a7" fontSize={12} />
            <YAxis yAxisId="left" stroke="#a7a7a7" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <YAxis yAxisId="right" orientation="right" stroke="#a7a7a7" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#282828",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number, name: string) => [value.toLocaleString(), name === "fans" ? "Fans" : "Streams"]}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => <span className="text-[#a7a7a7]">{value === "fans" ? "Fans" : "Streams"}</span>}
            />
            <Line yAxisId="left" type="monotone" dataKey="fans" stroke="#1DB954" strokeWidth={2} dot={{ fill: "#1DB954", r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="streams" stroke="#b3b3b3" strokeWidth={2} dot={{ fill: "#b3b3b3", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
