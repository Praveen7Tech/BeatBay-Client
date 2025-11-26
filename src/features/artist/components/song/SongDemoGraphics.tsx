export const SongDemographics = () => {
  const ageGroups = [
    { range: '18-24', percentage: 35 },
    { range: '25-34', percentage: 42 },
    { range: '35-44', percentage: 15 },
    { range: '45+', percentage: 8 },
  ];

  const topCities = [
    { city: 'Mumbai', streams: '125K' },
    { city: 'Bangalore', streams: '98K' },
    { city: 'Delhi', streams: '87K' },
    { city: 'Chennai', streams: '76K' },
    { city: 'Hyderabad', streams: '65K' },
  ];

  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <h2 className="text-xl font-bold text-foreground mb-6">Listener Demographics</h2>
      
      <div className="mb-8">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Age Distribution</h3>
        <div className="space-y-3">
          {ageGroups.map((group) => (
            <div key={group.range} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-16">{group.range}</span>
              <div className="flex-1 bg-background rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all" 
                  style={{ width: `${group.percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">{group.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Top Cities</h3>
        <div className="space-y-2">
          {topCities.map((city, index) => (
            <div key={city.city} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-sm w-4">{index + 1}</span>
                <span className="text-foreground">{city.city}</span>
              </div>
              <span className="text-muted-foreground">{city.streams}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
