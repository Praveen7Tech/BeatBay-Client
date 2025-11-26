export const SongSourceBreakdown = () => {
  const sources = [
    { name: 'Playlists', streams: '450K', percentage: 45, color: '#1DB954' },
    { name: 'Search', streams: '280K', percentage: 28, color: '#1ed760' },
    { name: 'Artist Page', streams: '150K', percentage: 15, color: '#22c55e' },
    { name: 'Radio', streams: '80K', percentage: 8, color: '#4ade80' },
    { name: 'Other', streams: '40K', percentage: 4, color: '#86efac' },
  ];

  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Stream Sources</h2>
      
      <div className="mb-6">
        <div className="flex h-4 rounded-full overflow-hidden">
          {sources.map((source) => (
            <div
              key={source.name}
              className="transition-all"
              style={{ 
                width: `${source.percentage}%`, 
                backgroundColor: source.color 
              }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: source.color }}
              />
              <span className="text-foreground">{source.name}</span>
            </div>
            <div className="text-right">
              <div className="text-foreground font-medium">{source.streams}</div>
              <div className="text-muted-foreground text-sm">{source.percentage}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
