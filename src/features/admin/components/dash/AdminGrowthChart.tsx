import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const growthData = [
  { month: 'Jan', users: 1200, artists: 320, songs: 3400, albums: 180, playlists: 2100 },
  { month: 'Feb', users: 1800, artists: 480, songs: 4200, albums: 245, playlists: 2800 },
  { month: 'Mar', users: 2400, artists: 620, songs: 5800, albums: 340, playlists: 3600 },
  { month: 'Apr', users: 3200, artists: 890, songs: 7200, albums: 480, playlists: 4800 },
  { month: 'May', users: 4100, artists: 1150, songs: 9100, albums: 620, playlists: 6200 },
  { month: 'Jun', users: 5300, artists: 1420, songs: 11500, albums: 780, playlists: 8100 },
  { month: 'Jul', users: 6800, artists: 1780, songs: 14200, albums: 950, playlists: 10400 },
  { month: 'Aug', users: 8500, artists: 2156, songs: 17800, albums: 1180, playlists: 13200 },
];

const chartColors = [
  { dataKey: 'users', color: 'hsl(var(--primary))', name: 'Users' },
  { dataKey: 'artists', color: '#ec4899', name: 'Artists' },
  { dataKey: 'songs', color: '#8b5cf6', name: 'Songs' },
  { dataKey: 'albums', color: '#f59e0b', name: 'Albums' },
  { dataKey: 'playlists', color: '#10b981', name: 'Playlists' },
];

export const AdminGrowthChart = () => {
  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <h2 className="text-xl font-bold text-foreground mb-2">Platform Growth Demographics</h2>
      <p className="text-sm text-muted-foreground mb-6">Monthly growth trends for users, artists, songs, albums, and playlists</p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={growthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--surface))', 
              border: '1px solid hsl(var(--border))', 
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
            formatter={(value: number) => value.toLocaleString()}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
          />
          {chartColors.map((item) => (
            <Line 
              key={item.dataKey}
              type="monotone" 
              dataKey={item.dataKey} 
              stroke={item.color} 
              strokeWidth={2} 
              dot={{ fill: item.color, r: 4 }} 
              name={item.name}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
