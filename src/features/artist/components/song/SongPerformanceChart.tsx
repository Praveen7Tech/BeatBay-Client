import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useState } from "react";
import { SpinnerArtist } from "@/components/ui/spinner";
import { useSongPerformance } from "@/core/hooks/song/useSongPerformance";
import { useQuery } from "@tanstack/react-query";
import { artistApi } from "../../services/artist.api";

interface Props {
  songId: string;
}

export const SongPerformanceChart = ({ songId }: Props) => {
  const [days, setDays] = useState<number>(7);
  const year = new Date().getFullYear();

  const { data = [], isLoading } = useSongPerformance(songId, days);

  const { data: revenue, isLoading:revenueLoading } = useQuery({
    queryKey: ["songRevenue", songId, year],
    queryFn: () => artistApi.getSongRevenue(songId, year)
  });

  if (isLoading || revenueLoading) return <SpinnerArtist />;

  return (
    <div className="bg-surface p-6 rounded-lg border border-border relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">
          Song Performance
        </h2>

        {/* Filter */}
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
                  : "text-gray-400 border-gray-700 hover:border-[#1DB954]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="label" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="streams"
            stroke="#1DB954"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
