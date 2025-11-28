"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useArtistManagement } from "@/core/hooks/admin/useArtistManagement"
import { ArtistSongsList } from "../../components/artists/artist-SongGrid"
import { ArtistAlbumsGrid } from "../../components/artists/artist-AlbumGrid"


export function ArtistDetails() {
  const {artistId} = useParams()
  const {artist, isLoading, HanleTooglrBlock, fetchLoading, isError, profilePicture}= 
  useArtistManagement(artistId!)

  if(fetchLoading) return <div>Loading..</div>
  if(isError) return <div>Loading..</div>
  const handleToggleBlock =() => {
    HanleTooglrBlock()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/artists">
          <Button variant="ghost" size="icon" className="text-spotify-secondary hover:text-spotify-text">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-spotify-text">Artist Details</h1>
          <p className="text-spotify-secondary">Manage artist account and content moderation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Artist Profile Card */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardContent className="pt-6">
              <div className="flex gap-6">
                <img
                  src={profilePicture}
                  alt={artist?.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-bold text-spotify-text">{artist?.name}</h2>
                    {artist?.status && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-spotify-green/10 rounded-full">
                        <CheckCircle className="w-4 h-4 text-spotify-green" />
                        <span className="text-xs font-bold text-spotify-green">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-spotify-secondary mb-4">{artist?.bio}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={artist?.status ? "default" : "destructive"}
                      className={artist?.status ? "bg-spotify-green text-spotify-black" : ""}
                    >
                      {artist?.status ? "Active" : "Blocked"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text">Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">Email Address</p>
                  <p className="text-spotify-text font-medium">{artist?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">Join Date</p>
                  <p className="text-spotify-text font-medium">{artist?.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">Last Active</p>
                  <p className="text-spotify-text font-medium">{"artist?.lastActive"}</p>
                </div>
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">Location</p>
                  <p className="text-spotify-text font-medium">{"artist?.location"}</p>
                </div>
               
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text">Social Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* {Object.entries(artist?.socialLinks).map(([platform, handle]) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between p-3 rounded-lg bg-spotify-black border border-spotify-tertiary"
                  >
                    <span className="text-spotify-secondary capitalize">{platform}</span>
                    <span className="text-spotify-text font-medium">{handle}</span>
                  </div>
                ))} */}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text">Artist Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <StatItem label="Followers" value={ 0 } />
                <StatItem label="Monthly Listeners" value={0 } />
                <StatItem label="Total Songs" value={artist?.songs.length || 0} />
                <StatItem label="Albums" value={artist?.albums.length || 0} />
                <StatItem label="Total Plays" value={0 } />
                <StatItem label="This Month Revenue" value={0} />
              </div>
            </CardContent>
          </Card>

          {/* Top Songs */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text">Top Songs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Blinding Lights", "Starboy", "Can't Feel My Face", "The Hills", "Often"].map((song, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-spotify-black border border-spotify-tertiary"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-spotify-tertiary font-bold">{idx + 1}</span>
                      <span className="text-spotify-text">{song}</span>
                    </div>
                    <span className="text-spotify-secondary text-sm">Millions of plays</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
           <ArtistSongsList songs={artist?.songs || []} itemsPerPage={5} />

          <ArtistAlbumsGrid albums={artist?.albums || []} itemsPerPage={5} />
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          {/* Block/Unblock Card */}
          <Card
            className={`border-2 ${!artist?.status ? "bg-red-500/10 border-red-500" : "bg-spotify-dark border-spotify-tertiary"}`}
          >
            <CardHeader>
              <CardTitle className={!artist?.status ? "text-red-500" : "text-spotify-text"}>
                {!artist?.status ? "Artist Blocked" : "Artist Active"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!artist?.status && (
                <div className="flex gap-3 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-500">This artist is currently blocked and cannot upload content.</p>
                </div>
              )}
              <Button
                onClick={handleToggleBlock}
                disabled={isLoading}
                variant={!artist?.status ? "default" : "destructive"}
                className="w-full"
              >
                {isLoading ? "Processing..." : !artist?.status ? "Unblock Artist" : "Block Artist"}
              </Button>
            </CardContent>
          </Card>

          {/* Moderation Actions */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text text-base">Moderation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Review Uploads
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                View Reports
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Send Notice
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500 bg-transparent">
                Suspend Account
              </Button>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text text-base">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoItem label="Account Type" value="Professional" />
              <InfoItem label="Verification" value="Verified" />
              <InfoItem label="Content Policy" value="Compliant" />
              <InfoItem label="Payment Method" value="Active" />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ActivityItem time="2 hours ago" action="Uploaded new song" />
              <ActivityItem time="1 day ago" action="Updated profile" />
              <ActivityItem time="3 days ago" action="Published album" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-4 rounded-lg bg-spotify-black border border-spotify-tertiary">
      <p className="text-sm text-spotify-secondary mb-2">{label}</p>
      <p className="text-2xl font-bold text-spotify-green">{value}</p>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center pb-3 border-b border-spotify-tertiary last:pb-0 last:border-0">
      <p className="text-sm text-spotify-secondary">{label}</p>
      <p className="text-sm font-medium text-spotify-text">{value}</p>
    </div>
  )
}

function ActivityItem({ time, action }: { time: string; action: string }) {
  return (
    <div className="pb-3 border-b border-spotify-tertiary last:pb-0 last:border-0">
      <p className="text-sm text-spotify-text">{action}</p>
      <p className="text-xs text-spotify-tertiary mt-1">{time}</p>
    </div>
  )
}
