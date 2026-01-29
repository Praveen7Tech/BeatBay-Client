import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/common/Navbar";

export default function DashboardLayout(){
    return(
        <div className="bg-linear-to-b from-gray-900 to-black min-h-screen">
            <Navbar/>
            <div className="w-[80%] mx-auto px-6 py-12">
                <Outlet />
            </div>
        </div>
    )
}