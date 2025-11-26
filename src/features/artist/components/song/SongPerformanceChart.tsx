import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { date: 'Mon', streams: 4200 },
  { date: 'Tue', streams: 5100 },
  { date: 'Wed', streams: 4800 },
  { date: 'Thu', streams: 6300 },
  { date: 'Fri', streams: 7500 },
  { date: 'Sat', streams: 8900 },
  { date: 'Sun', streams: 8200 },
];

export const SongPerformanceChart = () => {
  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Streams This Week</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dummyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
          />
          <Line type="monotone" dataKey="streams" stroke="#1DB954" strokeWidth={3} dot={{ fill: '#1DB954', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
