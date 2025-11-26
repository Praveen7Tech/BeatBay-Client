"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, MessageCircle, Award } from "lucide-react"



const engagementColors = [
  { bg: "bg-cyan-500/10", text: "text-cyan-500" },
  { bg: "bg-orange-500/10", text: "text-orange-500" },
  { bg: "bg-yellow-500/10", text: "text-yellow-500" },
]

const sourceColors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-gray-500"]

export function AlbumEngagement() {
  // Mock data - replace with actual API call
  const engagementData = [
    {
      label: "Total Shares",
      value: "52,450",
      icon: Share2,
      colorIndex: 0,
    },
    {
      label: "Comments",
      value: "28,934",
      icon: MessageCircle,
      colorIndex: 1,
    },
    {
      label: "Playlist Adds",
      value: "8,847",
      icon: Award,
      colorIndex: 2,
    },
  ]

  const sourceBreakdown = [
    { source: "Direct", percentage: 35, colorIndex: 0 },
    { source: "Playlist", percentage: 42, colorIndex: 1 },
    { source: "Search", percentage: 18, colorIndex: 2 },
    { source: "Discovery", percentage: 5, colorIndex: 3 },
  ]

  return (
    <div className="space-y-4">
      {engagementData.map((item, idx) => {
        const IconComponent = item.icon
        const colors = engagementColors[item.colorIndex]
        return (
          <Card key={idx} className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{item.value}</p>
                </div>
                <div className={`${colors.bg} p-3 rounded-lg`}>
                  <IconComponent className={`w-6 h-6 ${colors.text}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Stream Sources</CardTitle>
          <CardDescription>Where listeners discover album</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sourceBreakdown.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{item.source}</span>
                <span className="text-sm text-muted-foreground">{item.percentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className={`h-full rounded-full transition-all ${sourceColors[item.colorIndex]}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
