"use client"

import { useApi } from "@/core/hooks/useApi";
import { RootState } from "@/core/store/store";
import { authApi } from "@/features/auth/services/authApi";
import { logout } from "@/features/auth/slices/authSlice";
import { Pen, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

interface ProfilePageProps {
  onBackClick?: () => void
}

const URL = import.meta.env.VITE_API_URL

export default function ProfilePage({ onBackClick }: ProfilePageProps) {
 const dispatch = useDispatch()

  const user = useSelector((state: RootState)=> state.auth.user)
  const {execute: Logout} = useApi(authApi.logout)

  const handleLogout = async () => {
    try {
      await Logout(null)
      dispatch(logout())
      window.location.href='/login'
    } catch (error) {
      console.error("error in logout", error)
    }
  };  
  
  if (!user) {
    return <div>Loading user data...</div>;
  }
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#0f0f0f]">
      {/* Profile Header */}
      <div className="relative h-52 bg-linear-to-b from-[#1a4d2e] to-[#0f0f0f] mt-0">
        <div className="absolute bottom-0 left-0 right-0 flex items-end gap-6 px-8 pb-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full border-4 border-[#0f0f0f] flex items-center justify-center shrink-0 overflow-hidden">
            {/* Conditional rendering for image or initials */}
            {user.profilePicture ? (
              <img
                src={`${URL}/uploads/${user?.profilePicture}`}
                alt={`${user.name}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-4xl font-bold   text-gray-600">
                  <User className="w-12 h-12 text-gray-500" />
            </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 pb-2">
            <Link to={'/edit-profile'}>
            <div className="flex gap-6 ">
                <h1 className="text-4xl font-bold mb-2">{user.name} </h1>
                <Pen className="mt-2 text-gray-400 hover:text-white transition-colors" />
            </div>
            </Link>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-[#00d084] font-semibold">25</span>
                <span className="text-gray-400 ml-2">Following</span>
              </div>
              <div>
                <span className="text-[#00d084] font-semibold">467</span>
                <span className="text-gray-400 ml-2">Followers</span>
              </div>
              
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pb-2">
            <button onClick={handleLogout} className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors font-semibold text-sm">
              Log Out →
            </button>
            {/* <button className="px-6 py-2 border border-[#00d084] rounded-full hover:bg-[#00d084] hover:text-black transition-colors font-semibold text-sm flex items-center gap-2">
              <span>👑</span>
              EXPLORE PREMIUM
            </button> */}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
        {/* My Playlists */}
        <div className="px-8 py-8">
          <h2 className="text-xl font-bold mb-6">MY PLAY LISTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "90's A.R Rahman", image: "🎵" },
              { title: "Driving List", image: "🚗" },
              { title: "Chill Songs", image: "😎" },
            ].map((playlist, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1a] rounded-lg p-4 hover:bg-[#2a2a2a] transition-colors cursor-pointer group"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                  {playlist.image}
                </div>
                <p className="font-semibold text-sm">{playlist.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Following Section */}
        <div className="px-8 py-8 border-t border-[#2a2a2a]">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[#00d084]">✓</span>
            <h2 className="text-xl font-bold">FOLLOWING</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[
              { name: "A.R Rahman", role: "Artist" },
              { name: "K.S Chitra", role: "Artist" },
              { name: "M.G Sreekumar", role: "Artist" },
              { name: "Sreya Goshal", role: "Artist" },
              { name: "Anirudh", role: "Artist" },
              { name: "Madhu Balakrishnan", role: "Artist" },
            ].map((artist, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-2xl font-bold text-gray-600 hover:scale-110 transition-transform cursor-pointer">
                  {artist.name.charAt(0)}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">{artist.name}</p>
                  <p className="text-xs text-gray-400">{artist.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
