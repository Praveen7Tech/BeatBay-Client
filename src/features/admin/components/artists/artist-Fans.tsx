"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, ChevronLeft, ChevronRight, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "../common/Pagination"

export const fans = [
  {
    _id: "fan001",
    name: "Rahul Mehta",
    image: "rahul.jpg",
  },
  {
    _id: "fan002",
    name: "Aisha Khan",
    image: null,
  },
  {
    _id: "fan003",
    name: "Dinesh Patel",
    image: "dinesh.png",
  },
  {
    _id: "fan004",
    name: "Sophia Thomas",
    image: null,
  },
  {
    _id: "fan005",
    name: "Arjun Reddy",
    image: "arjun.jpeg",
  },
  {
    _id: "fan006",
    name: "Meera Joshi",
    image: "meera.jpg",
  },
  {
    _id: "fan007",
    name: "Rohan Kumar",
    image: null,
  },
  {
    _id: "fan008",
    name: "Harini Iyer",
    image: "harini.png",
  },
  {
    _id: "fan009",
    name: "Vikram Singh",
    image: null,
  },
  {
    _id: "fan010",
    name: "Sara Fernandes",
    image: "sara.jpeg",
  },
]

interface Fan {
  _id: string
  name: string
  image?: string | null
}

interface FansListProps {
  fans?: Fan[] | []
  itemsPerPage: number
  isLoading?: boolean
}

export function FansList({  itemsPerPage, isLoading = false }: FansListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(fans.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedFans = fans.slice(startIndex, startIndex + itemsPerPage)

  const URL_BASE = import.meta.env.VITE_API_URL

  // Loading
  if (isLoading) {
    return (
      <Card className="bg-spotify-dark border-spotify-tertiary">
        <CardContent className="py-10 text-center text-spotify-secondary">
          Loading fans...
        </CardContent>
      </Card>
    )
  }

  // No data
  if (fans.length === 0) {
    return (
      <Card className="bg-spotify-dark border-spotify-tertiary">
        <CardContent className="py-10 text-center">
          <Music className="w-10 h-10 mx-auto mb-3 opacity-50 text-spotify-tertiary" />
          <p className="text-spotify-secondary">No fans found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-spotify-dark border-spotify-tertiary">
      <CardHeader>
        <CardTitle className="text-spotify-text">Fans</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {displayedFans.map((fan) => {
            const imageURL = fan.image
              ? `${URL_BASE}/users/${fan.image}`
              : null

            return (
              <div
                key={fan._id}
                className="flex items-center justify-between p-4 rounded-lg bg-spotify-black border border-spotify-tertiary hover:bg-spotify-black/80 transition"
              >
                <div className="flex items-center gap-4 flex-1">
                  {imageURL ? (
                    <img
                      src={imageURL}
                      alt={fan.name}
                      className="w-14 h-14 rounded-full object-cover border border-spotify-tertiary"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-spotify-tertiary flex items-center justify-center">
                      <User className="text-black/80" />
                    </div>
                  )}

                  <h4 className="text-sm font-medium text-spotify-text">
                    {fan.name}
                  </h4>
                </div>

                <Badge className="bg-spotify-green text-spotify-black">
                  Follower
                </Badge>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        <Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage} 
                  prevIcon={ChevronLeft} nextIcon={ChevronRight}/>
      </CardContent>
    </Card>
  )
}
