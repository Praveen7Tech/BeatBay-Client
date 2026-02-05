import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArtistGrowthChartData } from "../../services/artist.api";

type Props = {
  data: ArtistGrowthChartData[];
  days: number;
  setDays: (d: number) => void;
};

export const ArtistGrowthChart = ({data,days,setDays}:Props) => {

  return (
    <div className="bg-[#181818] rounded-lg p-6 relative">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold">Growth Analytics</h3>
          <p className="text-[#a7a7a7] text-sm">
            Fans, streams and revenue growth
          </p>
        </div>

        {/* ✅ Selector */}
        <div className="flex gap-2">
          {[
            { label: "Weekly", value: 7 },
            { label: "Monthly", value: 30 },
            { label: "Yearly", value: 365 },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setDays(item.value)}
              className={`px-3 py-1 text-xs rounded-full border transition ${
                days === item.value
                  ? "bg-[#1DB954] text-black border-[#1DB954]"
                  : "text-[#a7a7a7] border-[#333] hover:border-[#1DB954]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
            <XAxis dataKey="label" stroke="#a7a7a7" fontSize={12} />
            <YAxis stroke="#a7a7a7" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#282828",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />

            <Line
              type="monotone"
              dataKey="fans"
              stroke="#1DB954"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="streams"
              stroke="#b3b3b3"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#ffcc00"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="songs"
              stroke="#ffcc00"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="albums"
              stroke="#ffcc00"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
