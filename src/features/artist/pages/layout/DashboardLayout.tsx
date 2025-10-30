import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

export default function DashboardLayout(){
    return(
        <div className="bg-black min-h-screen">
            <Navbar/>
            {/* This Outlet will change based on route */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Outlet />
            </div>
        </div>
    )
}