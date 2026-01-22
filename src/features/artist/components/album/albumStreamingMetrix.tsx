"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"


const CHART_COLORS = {
  primary: "#a78bfa",
  secondary: "#34d399",
  border: "#374151",
  card: "#1f2937",
  foreground: "#f9fafb",
  muted: "#9ca3af",
}

export function AlbumStreamingMetrics() {
  
  const chartData = [
    { date: "Jun 15", streams: 125000, listeners: 45000 },
    { date: "Jun 22", streams: 185000, listeners: 68000 },
    { date: "Jun 29", streams: 245000, listeners: 89000 },
    { date: "Jul 6", streams: 310000, listeners: 112000 },
    { date: "Jul 13", streams: 385000, listeners: 135000 },
    { date: "Jul 20", streams: 420000, listeners: 148000 },
    { date: "Jul 27", streams: 512000, listeners: 168000 },
    { date: "Aug 3", streams: 485000, listeners: 155000 },
  ]

  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Album Performance</CardTitle>
          <CardDescription>Weekly stream count since release</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAlbumStreams" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.border} />
              <XAxis dataKey="date" stroke={CHART_COLORS.muted} />
              <YAxis stroke={CHART_COLORS.muted} />
              <Tooltip
                contentStyle={{
                  backgroundColor: CHART_COLORS.card,
                  border: `1px solid ${CHART_COLORS.border}`,
                  borderRadius: "8px",
                }}
                labelStyle={{ color: CHART_COLORS.foreground }}
              />
              <Area
                type="monotone"
                dataKey="streams"
                stroke={CHART_COLORS.primary}
                fillOpacity={1}
                fill="url(#colorAlbumStreams)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  )
}
