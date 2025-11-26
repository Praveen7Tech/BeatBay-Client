"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, TrendingUp } from "lucide-react"


export function TrackListing() {
  // Mock data - replace with actual API call
  const tracks = [
    {
      position: 1,
      title: "Neon Dreams",
      duration: "3:45",
      streams: "1.2M",
      position_chart: 3,
      trend: "up",
    },
    {
      position: 2,
      title: "Electric Pulse",
      duration: "4:12",
      streams: "892K",
      position_chart: 8,
      trend: "up",
    },
    {
      position: 3,
      title: "Digital Love",
      duration: "3:28",
      streams: "756K",
      position_chart: 12,
      trend: "down",
    },
    {
      position: 4,
      title: "Cyber Nights",
      duration: "3:56",
      streams: "645K",
      position_chart: 15,
      trend: "up",
    },
    {
      position: 5,
      title: "Synth Wave",
      duration: "4:03",
      streams: "534K",
      position_chart: 22,
      trend: "up",
    },
    {
      position: 6,
      title: "Tech Horizon",
      duration: "3:32",
      streams: "421K",
      position_chart: 28,
      trend: "down",
    },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Track Performance</CardTitle>
        <CardDescription>Streams and chart positions for each track</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tracks.map((track, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors border border-transparent hover:border-border"
            >
              <div className="flex items-center gap-4 flex-1">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {track.position}. {track.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{track.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-foreground text-sm">{track.streams}</p>
                  <p className="text-xs text-muted-foreground">streams</p>
                </div>

                <div className="flex items-center gap-2">
                  {track.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                  )}
                  <Badge variant="outline" className="text-xs">
                    #{track.position_chart}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
