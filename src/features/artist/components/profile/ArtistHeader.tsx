"use client"

import { useApi } from "@/core/hooks/api/useApi"
import { RootState } from "@/core/store/store"
import { logout } from "@/features/auth/slices/authSlice"
import { User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authApiArtist } from "../../services/artist-authApi"
import { Button } from "@/core/components/button/Button"


const stats= { songs: 567, albums: 45, fans: 3456789 }
const verified= true

export function ArtistHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { execute: Logout } = useApi(authApiArtist.logout)
  const user = useSelector((state: RootState) => state.auth.user)

  const handleLogout = async () => {
    try {
      await Logout(null)
      dispatch(logout())
      window.location.href = "/artist"
    } catch (error) {
      console.error("error in logout", error)
    }
  }

  return (
    <div className="bg-linear-to-b from-gray-900 to-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8 items-start justify-between">
          {/* Left Side: Profile Image + Info */}
          <div className="flex gap-8 items-start">
            {/* Artist Image */}
            <div className="shrink-0">
              <div className="w-48 h-48 bg-gray-800 rounded-lg overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${user.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl font-bold text-gray-600">
                    <User className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Artist Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-400 text-sm">Verified Artist</span>
                {verified && <span className="text-blue-400">✓</span>}
              </div>

              <h1 className="text-5xl font-bold text-white">{user?.name}</h1>

              {/* Bio fixed below name */}
              {user?.bio && (
                <p className="text-gray-400 text-md mt-2 max-w-lg">{user.bio}</p>
              )}

              {/* Stats Section */}
              <div className="flex gap-12 mt-6">
                <div>
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    <span>♪</span> Songs
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stats.songs.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    <span>♪</span> Albums
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stats.albums.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm flex items-center gap-2">
                    <span>♪</span> Fans
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stats.fans.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex flex-col items-end gap-3">
            <Button theme="artist" variant="primary" onClick={handleLogout} type="button"  >
              Logout
            </Button>
            <Button theme="artist"  variant="primary"  onClick={() => navigate("/artist-edit-profile")}  >
              Edit Profile
            </Button>
            <Button theme="artist"  variant="primary"  onClick={() => navigate("/artist-change-password")}  >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
