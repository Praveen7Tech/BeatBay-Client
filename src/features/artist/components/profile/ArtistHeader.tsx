"use client"

import { Button } from "@/components/ui/button"
import { useApi } from "@/core/hooks/useApi"
import { RootState } from "@/core/store/store"
import {  logout } from "@/features/auth/slices/authSlice"
import { User } from "lucide-react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authApiArtist } from "../../services/artist-authApi"

interface ArtistHeaderProps {
  name: string
  verified?: boolean
  image?: string
  stats: {
    songs: number
    albums: number
    fans: number
  }
}
const URL = import.meta.env.VITE_API_URL

export function ArtistHeader({  verified = true,  stats }: ArtistHeaderProps) {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const {execute: Logout} = useApi(authApiArtist.logout)

  const handleLogout = async () => {
    try {
      await Logout(null)
      dispatch(logout())
      window.location.href='/artist'
    } catch (error) {
      console.error("error in logout", error)
    }
    
  };

  const user = useSelector((state: RootState)=> state.auth.user)

  return (
    <div className="bg-linear-to-b from-gray-900 to-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-8 items-start">
          {/* Artist Image */}
          <div className="shrink-0">
            <div className="w-48 h-48 bg-gray-800 rounded-lg overflow-hidden">
              {user?.profilePicture ? (
              <img
                src={`${URL}/uploads/${user?.profilePicture}`}
                alt={`${user.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl font-bold   text-gray-600">
                  <User className="w-12 h-12 text-gray-500" />
            </div>
            )}
            </div>
          </div>

          {/* Artist Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-400 text-sm">Verified Artist</span>
              {verified && <span className="text-blue-400">✓</span>}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-5xl font-bold text-white">{user?.name}</h1>
              <Button
                variant="outline"
                className="border-gray-700 bg-blue-900 text-white hover:bg-gray-800"
                onClick={() => navigate("/artist-edit-profile")}
              >
                Edit
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-12">
              <div>
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <span>♪</span> Songs
                </div>
                <div className="text-2xl font-bold text-white">{stats.songs.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <span>♪</span> Albums
                </div>
                <div className="text-2xl font-bold text-white">{stats.albums.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm flex items-center gap-2">
                  <span>♪</span> Fans
                </div>
                <div className="text-2xl font-bold text-white">{stats.fans.toLocaleString()}</div>
              </div>
              <div>
                <button onClick={handleLogout}
                    type="button"
                    className="px-6 py-2 border border-zinc-700 rounded-lg text-white hover:bg-zinc-800 transition"
                >
                    Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
