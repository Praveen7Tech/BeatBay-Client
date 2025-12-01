import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { AdminFetchArtistResponse } from "../../services/adminApi"
import { Badge } from "@/components/ui/badge"

interface ArtistCardProps{
    artist: AdminFetchArtistResponse[]
}

export function ArtistCardGrid({artist}:ArtistCardProps){
    const URL_BASE = import.meta.env.VITE_API_URL;
    return(
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {artist.map((artist) => (
          <Link key={artist.id} to={`/admin/artists/${artist.id}`}>
            <Card className="bg-background border-spotify-tertiary h-full hover:bg-spotify-black transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Avatar and Status */}
                  <div className="flex items-start justify-between">
                    {artist.profilePicture ? (
                        <img
                            src={`${URL_BASE}/uploads/${artist.profilePicture}`}
                            alt={artist.name}
                            className="w-28 h-28 rounded-full object-cover"
                            onError={(e) => { e.currentTarget.src = "/placeholder.svg" }}
                        />
                        ) : (
                        <div className="w-28 h-28 rounded-full bg-gray-700 flex items-center justify-center text-white">
                            <p className="font-medium">{artist.name?.charAt(0).toUpperCase()}</p>
                        </div>
                        )}
                    <Badge
                      variant={artist.status ? "default" : "destructive"}
                      className={artist.status  ? "bg-spotify-green text-spotify-black" : ""}
                    >
                      {artist.status  ? "Active" : "Blocked"}
                    </Badge>
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-spotify-text">{artist.name}</h3>
                      {artist.status && (
                        <svg className="w-5 h-5 text-spotify-green" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm text-spotify-secondary mb-3">{artist.email}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <StatCard label="Followers" value={artist.followersCount } />
                    <StatCard label="Songs" value={artist.songsCount} />
                    <StatCard label="Joined" value={artist.joinDate} />
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 group-hover:bg-spotify-green group-hover:text-spotify-black group-hover:border-spotify-green bg-transparent"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
}

function StatCard({ label, value }: { label: string; value: number | string}) {
  return (
    <div className="p-2 rounded bg-spotify-black border border-spotify-tertiary text-center">
      <p className="text-xs text-spotify-tertiary">{label}</p>
      <p className="text-sm font-bold text-spotify-green">{value}</p>
    </div>
  )
}