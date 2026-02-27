"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { useUserManagement } from "@/core/hooks/admin/useUserManagement"
import ProfileHeaderCard from "../../components/common/ProfileHeaderCard"
import AccountInfoCard from "../../components/common/AccountInformationCard"
import StatisticsCard from "../../components/common/StatisticsCard"
import BlockStatusCard from "../../components/common/BlockUnblockCard"

const UserDetails =()=> {
  const {userId} = useParams()

  const {user, isLoading, HanleTooglrBlock, fetchLoading, isError, error} = useUserManagement(userId!)

  if(fetchLoading) return <div>Loading..</div>
  if(isError) return <div>{error?.message}</div>

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
              profileImage={user?.profilePicture}
              status={user?.status}
              isArtist={false}
          />
          {/* Account Information card*/}
          <AccountInfoCard
            email={user?.email}
            joinDate={user?.createdAt}
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
        </div>
      </div>
    </div>
  )
}

export default UserDetails