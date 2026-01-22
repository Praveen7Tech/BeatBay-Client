import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { adminApi } from '../../services/adminApi';
import { SpinnerCustom } from '@/components/ui/spinner';
import { ENTITY_COLORS } from '../../types/entity.config';

interface BackendEntityItem {
  label: string;
  count: number;
}

interface EntityBreakdownData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface BreakdownCardProps {
  title: string;
  icon: string;
  data: EntityBreakdownData[];
}

export const mapEntityBreakdown = ( items: BackendEntityItem[] = []): EntityBreakdownData[] => {
  return items.map(item => ({
    name: item.label,
    value: item.count,
    color: ENTITY_COLORS[item.label] ?? "#94a3b8", 
  }));
};

const BreakdownCard = ({ title, icon, data }: BreakdownCardProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-surface p-5 rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
        <span>{icon}</span> {title}
      </h3>
      
      <div className="flex items-center gap-4">
        <div className="w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex-1 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-foreground">
                  {item?.value}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  ({((item?.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdminEntityBreakdown = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-entity-breakdown"],
    queryFn: adminApi.dashBoardEntity,
  });

  if (isLoading) return <SpinnerCustom />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BreakdownCard
        title="Users Breakdown"
        icon="👤"
        data={mapEntityBreakdown(data?.users)}
      />
      <BreakdownCard
        title="Artists Breakdown"
        icon="🎤"
        data={mapEntityBreakdown(data?.artists)}
      />
      <BreakdownCard
        title="Songs Status"
        icon="🎵"
        data={mapEntityBreakdown(data?.songs)}
      />
      <BreakdownCard
        title="Albums Types"
        icon="💿"
        data={mapEntityBreakdown(data?.albums)}
      />
      <BreakdownCard
        title="Playlists Types"
        icon="📋"
        data={mapEntityBreakdown(data?.playlists)}
      />
    </div>
  );
};
