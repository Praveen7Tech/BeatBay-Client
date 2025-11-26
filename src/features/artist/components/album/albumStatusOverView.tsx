"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Disc3, Heart } from "lucide-react"


const chartColors = [
  { bg: "bg-blue-500/10", text: "text-blue-500" },
  { bg: "bg-green-500/10", text: "text-green-500" },
  { bg: "bg-purple-500/10", text: "text-purple-500" },
  { bg: "bg-pink-500/10", text: "text-pink-500" },
  { bg: "bg-orange-500/10", text: "text-orange-500" },
]

export function AlbumStatsOverview() {
  // Mock data - replace with actual API call
  const stats = [
    {
      label: "Total Streams",
      value: "5,245,890",
      change: "+18.5%",
      isPositive: true,
      icon: TrendingUp,
      colorIndex: 0,
    },
    {
      label: "Unique Listeners",
      value: "834,567",
      change: "+14.2%",
      isPositive: true,
      icon: Users,
      colorIndex: 1,
    },
    {
      label: "Avg. Per Track",
      value: "437,157",
      change: "+6.3%",
      isPositive: true,
      icon: Disc3,
      colorIndex: 2,
    },
    {
      label: "Total Saves",
      value: "289,456",
      change: "+9.8%",
      isPositive: true,
      icon: Heart,
      colorIndex: 3,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon
        const colors = chartColors[stat.colorIndex]
        return (
          <Card key={idx} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className={`${colors.bg} p-2 rounded-lg`}>
                <IconComponent className={`w-5 h-5 ${colors.text}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.isPositive ? "text-green-600" : "text-red-600"}`}>
                {stat.isPositive ? "↑" : "↓"} {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
