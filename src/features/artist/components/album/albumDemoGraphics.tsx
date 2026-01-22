"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"



const CHART_COLORS = {
  colors: [
    "#a78bfa", // purple
    "#34d399", // teal
    "#fbbf24", // amber
    "#60a5fa", // blue
    "#f87171", // red
  ],
  card: "#1f2937",
  border: "#374151",
  foreground: "#f9fafb",
}

export function AlbumDemographics() {
  // Mock data - replace with actual API call
  const ageData = [
    { name: "13-17", value: 8 },
    { name: "18-24", value: 32 },
    { name: "25-34", value: 38 },
    { name: "35-44", value: 15 },
    { name: "45+", value: 7 },
  ]


  return (
    <div className="space-y-4">
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Listener Age Group</CardTitle>
          <CardDescription>Demographics breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS.colors[index % CHART_COLORS.colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: CHART_COLORS.card,
                  border: `1px solid ${CHART_COLORS.border}`,
                  borderRadius: "8px",
                }}
                labelStyle={{ color: CHART_COLORS.foreground }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
