import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const growthData = [
  { month: 'Jan', users: 1200, songs: 3400, streams: 45000 },
  { month: 'Feb', users: 1800, songs: 4200, streams: 58000 },
  { month: 'Mar', users: 2400, songs: 5800, streams: 72000 },
  { month: 'Apr', users: 3200, songs: 7200, streams: 89000 },
  { month: 'May', users: 4100, songs: 9100, streams: 105000 },
  { month: 'Jun', users: 5300, songs: 11500, streams: 128000 },
];

export const AdminGrowthChart = () => {
  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Platform Growth</h2>
      <ResponsiveContainer width="100%" height={350}>
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
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--surface))', 
              border: '1px solid hsl(var(--border))', 
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2} 
            dot={{ fill: 'hsl(var(--primary))', r: 4 }} 
            name="Users"
          />
          <Line 
            type="monotone" 
            dataKey="songs" 
            stroke="#8b5cf6" 
            strokeWidth={2} 
            dot={{ fill: '#8b5cf6', r: 4 }} 
            name="Songs"
          />
          <Line 
            type="monotone" 
            dataKey="streams" 
            stroke="#f59e0b" 
            strokeWidth={2} 
            dot={{ fill: '#f59e0b', r: 4 }} 
            name="Streams (K)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
