"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useUserManagement } from "@/core/hooks/admin/useUserManagement"

export function UserDetails() {
  const {userId} = useParams()

  const {user, isLoading, HanleTooglrBlock, fetchLoading, isError, profilePicture} = useUserManagement(userId!)

  if(fetchLoading) return <div>Loading..</div>
  if(isError) return <div>Loading..</div>

  const handleToggleBlock = ()=>{
    HanleTooglrBlock()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/users">
          <Button variant="ghost" size="icon" className="text-spotify-secondary hover:text-spotify-text">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-spotify-text">User Details</h1>
          <p className="text-spotify-secondary">Manage user account and permissions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardContent className="pt-6">
              <div className="flex gap-6">
                {user?.profilePicture ? (
                        <img
                            src={profilePicture}
                            alt={user?.name}
                            className="w-24 h-24 rounded-full object-cover"
                            onError={(e) => { e.currentTarget.src = "/placeholder.svg" }}
                        />
                        ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-spotify-text mb-1">{user?.name}</h2>
                  <p className="text-spotify-secondary mb-3">{"user?.bio"}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={user?.status === true ? "default" : "destructive"}
                      className={user?.status === true ? "bg-spotify-green text-spotify-black" : ""}
                    >
                      {user?.status === true ? "Active" : "Blocked"}
                    </Badge>
                    <Badge variant="outline" className="border-spotify-tertiary text-spotify-secondary">
                      {/* {user?.premiumStatus === true ? "Premium" : "Free"} */}
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
                  <p className="text-spotify-text font-medium">{user?.email}</p>
                </div>
                {/* <div>
                  <p className="text-sm text-spotify-secondary mb-1">Phone Number</p>
                  <p className="text-spotify-text font-medium">{user?.phone}</p>
                </div> */}
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">Join Date</p>
                  <p className="text-spotify-text font-medium">{user?.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">Last Active</p>
                  <p className="text-spotify-text font-medium">{"user?.lastActive"}</p>
                </div>
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">Location</p>
                  <p className="text-spotify-text font-medium">{"user?.location"}</p>
                </div>
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">User ID</p>
                  <p className="text-spotify-text font-medium text-xs">{user?._id}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text">User Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <StatItem label="Followers" value={user?.followingCount || 0} />
                <StatItem label="Following" value={user?.followingCount || 0}/>
                <StatItem label="Playlists" value={user?.playLists.length || 0} />
                <StatItem label="Total Plays" value={0} />
              </div>
            </CardContent>
          </Card>

          {/* Premium Information */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text">Premium Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-spotify-black rounded-lg border border-spotify-tertiary">
                <div>
                  <p className="text-sm text-spotify-secondary mb-1">Status</p>
                  <p className="text-spotify-text font-bold">
                    {/* {user?.premiumStatus === "active" ? "Premium Active" : "Free Plan"} */}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-spotify-secondary mb-1">Expires On</p>
                  <p className="text-spotify-text font-bold">{"user?.subscriptionEnd"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          {/* Block/Unblock Card */}
          <Card
            className={`border-2 ${user?.status ? "bg-spotify-dark border-spotify-tertiary" : "bg-red-500/10 border-red-500"}`}
          >
            <CardHeader>
              <CardTitle className={user?.status ? "text-spotify-text" : "text-red-500"}>
                {user?.status ? "User Active" : "User Blocked"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!user?.status && (
                <div className="flex gap-3 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-500">This user is currently blocked from accessing the platform.</p>
                </div>
              )}
              <Button
                onClick={handleToggleBlock}
                disabled={isLoading}
                variant={user?.status ? "destructive" : "default"}
                className="w-full"
              >
                {isLoading ? "Processing..." : user?.status ?  "Block User" : "Unblock User"}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Send Message
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Reset Password
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                View Activity
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-500 bg-transparent">
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ActivityItem time="2 hours ago" action="Played song" />
              <ActivityItem time="1 day ago" action="Created playlist" />
              <ActivityItem time="3 days ago" action="Followed artist" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-3 rounded-lg bg-spotify-black border border-spotify-tertiary text-center">
      <p className="text-sm text-spotify-secondary mb-1">{label}</p>
      <p className="text-2xl font-bold text-spotify-green">{value}</p>
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
