import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../core/store/store";
import { ROLES } from "../core/types/roles";

const PublicOnlyRoute: React.FC = () => {
  const { user} = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user

  if(isAuthenticated){
    switch (user.role){
      case ROLES.USER:
        return <Navigate to={'/home'} replace/>;
      case ROLES.ADMIN:
        return <Navigate to={'/admin/dashboard'} replace />; 
      case ROLES.ARTIST:
        return <Navigate to={'/artist-dashboard'} replace/>;
      default :
        return <Navigate to="/home" replace />;    
    }
  }

  return <Outlet/>
};

export default PublicOnlyRoute;
