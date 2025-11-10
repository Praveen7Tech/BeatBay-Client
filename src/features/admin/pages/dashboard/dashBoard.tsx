"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../../auth/slices/authSlice"
import { useApi } from "../../../../core/hooks/useApi"
import { authApiAdmin } from "../../services/admin-AuthApi"
import { LayoutDashboard, Users, Music, LogOut, Menu, X, Folders, UserStar } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/core/store/store"

export default function DashBoard() {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const admin = useSelector((state: RootState)=> state.auth.user)
  const { execute: Logout } = useApi(authApiAdmin.logout)

  const handleLogout = async () => {
    await Logout(null)
    dispatch(logout())
    window.location.href = "/admin"
  }

  const items = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Users", icon: Users },
    { name: "Artists", icon: UserStar },
    { name: "Songs", icon: Music},
    { name: "Albums", icon: Folders}
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white flex justify-center">
      <div className="flex w-full  m-6 bg-black/40 border border-gray-800 rounded-2xl overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            open ? "w-60" : "w-20"
          } bg-black/70 border-r border-gray-800 transition-all duration-300 flex flex-col`}
        >
          <div className="p-8 flex items-center justify-between border-b border-gray-800">
            {open && <p className="font-bold text-lg">BeatBay</p>}
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 px-3 py-8 space-y-2">
            {items.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className="flex items-center gap-4 w-full px-4 py-3 rounded-lg hover:bg-gray-800/50 transition"
              >
                <Icon size={18} />
                {open && <span>{name}</span>}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="m-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition"
          >
            <LogOut size={18} />
            {open && <span>Logout</span>}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <header className="border-b border-gray-800 pb-4 mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">
              Welcome back, {admin?.name}
            </p>
          </header>

          <section className="bg-black/30 border border-gray-800 rounded-xl p-10 text-center">
            <h2 className="text-lg font-semibold mb-2 text-white/90">Overview</h2>
            <p className="text-gray-400"> dashboard content</p>
          </section>
        </main>
      </div>
    </div>
  )
}
