import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/common/Navbar";

export default function DashboardLayout(){
    return(
        <div className="bg-black min-h-screen">
            <Navbar/>
            <div className="w-[80%] mx-auto px-6 py-12">
                <Outlet />
            </div>
        </div>
    )
}