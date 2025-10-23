import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../core/store/store";
import { ROLES } from "../core/types/roles";

const PublicOnlyRoute: React.FC<{ children: React.ReactNode}> = ({ children}) => {
  const { user} = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user

  if (isAuthenticated && user?.role === ROLES.USER) {
    return <Navigate to="/home" replace />;
  }

  if (isAuthenticated && user?.role === ROLES.ADMIN) {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (isAuthenticated ) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
