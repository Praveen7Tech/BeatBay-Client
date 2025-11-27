"use client"

import { Outlet } from "react-router-dom"
import Sidebar from "../../components/layout/SideBar" 

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white flex justify-center">
      <div className="flex w-full m-6 bg-black/40 border border-gray-800 rounded-2xl overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
