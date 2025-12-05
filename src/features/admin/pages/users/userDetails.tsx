"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useUserManagement } from "@/core/hooks/admin/useUserManagement"
import ProfileHeaderCard from "../../components/common/ProfileHeaderCard"
import AccountInfoCard from "../../components/common/AccountInformationCard"
import StatisticsCard from "../../components/common/StatisticsCard"
import BlockStatusCard from "../../components/common/BlockUnblockCard"

export function UserDetails() {
  const {userId} = useParams()

  const {user, isLoading, HanleTooglrBlock, fetchLoading, isError} = useUserManagement(userId!)

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
          <ProfileHeaderCard
              name={user?.name}
              bio={ "currently no bio"}
              profileImage={user?.profilePicture}
              status={user?.status}
              isArtist={false}
          />
          {/* Account Information card*/}
          <AccountInfoCard
            email={user?.email}
            createdAt={user?.createdAt}
            lastActive={"user?.lastActive"}
            location={"user?.location"}
            id={user?._id}
            showId={true}
          />
          {/* Statistics */}
          <StatisticsCard type="user" data={user!} />
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          {/* Block/Unblock Card */}
          <BlockStatusCard
            type="user"
            status={user?.status}
            isLoading={isLoading}
            onToggle={handleToggleBlock}
          />
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
      </div>
    </div>
  )
}