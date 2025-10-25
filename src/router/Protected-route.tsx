import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../core/store/store";
import { Navigate  } from "react-router-dom";
import { ROLES } from "../core/types/roles";

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
        switch (user?.role) {
            case ROLES.USER:
                 return <Navigate to="/home" replace />;
            case ROLES.ADMIN:
                 return <Navigate to="/dashboard" replace />;
            case ROLES.ARTIST:
                 return <Navigate to="/artist-dashboard" replace />;
            default:
                 return <Navigate to="/unauthorized" replace />;
        }
    }

    return <>{children}</>
}

export default ProtectedRoute