"use client"
import Navbar from "../../components/common/Navbar" 
import Sidebar from "../../components/left sidebar/sidebar" 
import RightPanel from "../../components/right sidebar/right-sidebar" 
import { Outlet } from "react-router-dom"

export default function UserLayout() {
  return (
    <div className="h-screen bg-[#0f0f0f] text-white overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-24">
        <Sidebar />

        <div className="flex-1 overflow-y-auto bg-[#0f0f0f] scrollbar-thin scrollbar-thumb-[#2a2a2a] scrollbar-track-transparent">
          <Outlet />
        </div>

        <RightPanel />
      </div>
    </div>
  )
}
