"use client"

import { Crown, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "@/features/auth/slices/authSlice"
import { useApi } from "@/core/hooks/api/useApi"
import { authApi } from "@/features/auth/services/authApi"
import type { RootState } from "@/core/store/store"
import { Button } from "@/core/components/button/Button"
import { clearPlayBackState } from "@/core/service/playerStorageService"
import { Link } from "react-router-dom"
import { SpinnerCustom } from "@/components/ui/spinner"
interface profileHeaderProps {
  onEditClick: () => void
  onEditPasswordClick?: () => void
}

export function ProfileHeader({ onEditClick, onEditPasswordClick }: profileHeaderProps) {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const { execute: Logout } = useApi(authApi.logout)

  const handleLogout = async () => {
    try {
      await Logout(null)
      dispatch(logout())
      clearPlayBackState()
      window.location.href = "/login"
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (!user) return <SpinnerCustom/>;

  return (
    <div className="relative min-h-80 bg-linear-to-b from-[#1a4d2e] to-[#0f0f0f] mt-0">
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-6">
        {/* Profile Header Content */}
        <div className="flex items-end gap-6 mb-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full border-4 border-[#0f0f0f] flex items-center justify-center shrink-0 overflow-hidden">
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center text-4xl font-bold text-gray-600">
                <User className="w-12 h-12 text-gray-500" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 pb-2">
            {/* <Link to="/edit-profile"> */}
            <div className="flex gap-6">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            </div>
            {/* </Link> */}
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-[#00d084] font-semibold">{user.followingCount}</span>
                <span className="text-gray-400 ml-2">Following</span>
              </div>
              <div>
                <span className="text-[#00d084] font-semibold">{user.followingCount}</span>
                <span className="text-gray-400 ml-2">Followers</span>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex gap-3 pb-2">
            <Link to={'/subscription'}>
            <Button theme="user" variant="dashboard" >
              <Crown className="w-4 h-4 text-yellow-400" /> Premium Plans
            </Button>
            </Link>
          </div>
          <div className="flex gap-3 pb-2">
            <Button theme="user" variant="dashboard" onClick={handleLogout}>
              Log Out →
            </Button>
          </div>
        </div>

        <div className="flex gap-3 justify-start">
          <Button theme="artist" variant="dashboard" onClick={onEditClick}>
            Edit personal info
          </Button>

          <Button theme="artist" variant="dashboard" onClick={onEditPasswordClick}>
            Edit password
          </Button>
          
          <Button theme="artist" variant="dashboard">
            <Link to={'/premium/details'}>
            Premium Info
            </Link>
          </Button>
          
        </div>
      </div>
    </div>
  )
}
