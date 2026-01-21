import { useState } from "react";
import {LineChart, Line,AreaChart,Area, BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Legend,
} from "recharts";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { SpinnerCustom } from "@/components/ui/spinner";
import { ChartType, entityConfig, EntityType, TimeRange } from "../../types/entity.config";
import { useDemographics } from "@/core/hooks/admin/dashboard/useDemoGraphics";


export const AdminDemographicsChart = () => {
  const [entity, setEntity] = useState<EntityType>("users");
  const [range, setRange] = useState<TimeRange>("30d");
  const [chartType, setChartType] = useState<ChartType>("area");

  const config = entityConfig[entity];

  const { chartData, isLoading , total} = useDemographics(entity,range)

  if (isLoading) return <SpinnerCustom />;

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    if (chartType === "bar") {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="period" stroke="#ffffff" fontSize={12} />
          <YAxis stroke="#ffffff" fontSize={12} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total"
            fill={config.color}
            name={`Total ${config.label}`}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      );
    }

    if (chartType === "line") {
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="period" stroke="#ffffff" fontSize={12} />
          <YAxis stroke="#ffffff" fontSize={12} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke={config.color}
            strokeWidth={3}
            dot={{ r: 4 }}
            name={`Total ${config.label}`}
          />
        </LineChart>
      );
    }

    return (
      <AreaChart {...commonProps}>
        <defs>
          <linearGradient id={`gradient-${entity}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={config.color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={config.color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="period" stroke="#ffffff" fontSize={12} />
        <YAxis stroke="#ffffff" fontSize={12} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="total"
          stroke={config.color}
          fill={`url(#gradient-${entity})`}
          strokeWidth={3}
          name={`Total ${config.label}`}
        />
      </AreaChart>
    );
  };

  return (
    <div className="bg-surface p-6 rounded-lg border border-border">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <span>{config.icon}</span>
            {config.label} Growth
          </h2>
          <p className="text-sm text-muted-foreground">
            Total {config.label.toLowerCase()} over time
          </p>
        </div>

        <div className="flex gap-3">
          <Select value={entity} onValueChange={v => setEntity(v as EntityType)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(entityConfig).map(([key, val]) => (
                <SelectItem key={key} value={key}>
                  {val.icon} {val.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={range} onValueChange={v => setRange(v as TimeRange)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={v => setChartType(v as ChartType)}>
            <SelectTrigger className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="area">Area</SelectItem>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-6 w-2xs ml-12">
          <div className="bg-background p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">Total {config.label}</p>
            <p className="text-3xl font-bold text-primary">
              {total}
            </p>
            <p className="text-xs text-primary mt-1">+{0}% growth</p>
      </div>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={350}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};
