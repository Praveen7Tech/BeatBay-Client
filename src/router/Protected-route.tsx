import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../core/store/store";
import { Navigate  } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, requiredRole})=> {
    const {user} = useSelector((state: RootState)=> state.auth)
    const isAuthenticated = !!user
    console.log("pro route ", requiredRole , isAuthenticated) 
    if(!isAuthenticated){
        return <Navigate to="/" replace />
    }

    if(requiredRole !== user?.role){
        return <Navigate to="/unauthorized" replace/>
    }

    return <>{children}</>
}

export default ProtectedRoute