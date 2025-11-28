"use client"

import { Outlet } from "react-router-dom"
import Sidebar from "../../components/layout/SideBar"

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black text-white flex justify-center">
      
      {/* FIX: Use h-[calc(100vh-3rem)] to maintain the same size even with m-6 */}
      <div className="flex w-full h-[calc(100vh-3rem)] m-6 bg-black/40 border border-gray-800 rounded-2xl overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content (independent scroll) */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
