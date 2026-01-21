"use client"

import { useState } from "react"
import { LayoutDashboard, Users, Music, LogOut, Menu, X, Folders, UserStar } from "lucide-react"
import { useApi } from "@/core/hooks/api/useApi"
import { authApiAdmin } from "../../services/admin-AuthApi" 
import { useDispatch } from "react-redux"
import { logout } from "@/features/auth/slices/authSlice" 
import { Link, useLocation } from "react-router-dom"

export default function Sidebar() {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const location = useLocation()

  const { execute: Logout } = useApi(authApiAdmin.logout)

  const handleLogout = async () => {
    await Logout(null)
    dispatch(logout())
    window.location.href = "/admin"
  }

  const items = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Dash", icon: LayoutDashboard, path: "/admin/dash" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Artists", icon: UserStar, path: "/admin/artists" },
    { name: "Songs", icon: Music, path: "/admin/songs" },
    { name: "Albums", icon: Folders, path: "/admin/albums" }
  ]

  return (
    <aside className={`${open ? "w-60" : "w-20"} bg-black/70 border-r border-gray-800 transition-all duration-300 flex flex-col`}>
      
      {/* Header */}
      <div className="p-8 flex items-center justify-between border-b border-gray-800">
        {open && <p className="font-bold text-lg">BeatBay</p>}
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-8 space-y-2">
        {items.map(({ name, icon: Icon, path }) => {
          const active = location.pathname === path
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg transition
                ${active ? "bg-gray-800/70" : "hover:bg-gray-800/50"}
              `}
            >
              <Icon size={18} />
              {open && <span>{name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition"
      >
        <LogOut size={18} />
        {open && <span>Logout</span>}
      </button>

    </aside>
  )
}
