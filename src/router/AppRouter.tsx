import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../core/store/store';

import SignupPage from '../features/auth/pages/Signup';
import VerifyOTPPage from '../features/auth/pages/VerifyOTP';
import LoginPage from '../features/auth/pages/Login';
import HomePage from '../pages/Home';
// import DashboardPage from '../pages/Dashboard';
// import AdminDashboard from '../features/admin/pages/AdminDashboard'; // Example
// import ArtistDashboard from '../features/artist/pages/ArtistDashboard'; // Example

// A component that only allows public access.
// Redirects authenticated users to the home page.
const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

// A component that protects routes, requiring authentication and specific roles.
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    // If wrong role, redirect to unauthorized page or home
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

// Route for unauthorized access (e.g., wrong role)
const UnauthorizedPage: React.FC = () => {
  return <div>You do not have permission to view this page.</div>;
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public-only Routes: Only accessible when NOT logged in */}
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
        <Route path="/verify-otp" element={<PublicOnlyRoute><VerifyOTPPage /></PublicOnlyRoute>} />
        
        {/* Public Routes (accessible to all) - if any */}

        {/* Protected Routes: Accessible only when logged in */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        {/* Example Protected Route for a specific role */}
        {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /> */}

        {/* Protected Routes for Specific Roles (Admin and Artist) */}
        {/* Replace these with your actual dashboard pages once implemented */}
        <Route path="/admin/*" element={<ProtectedRoute requiredRole="admin"><div>Admin Dashboard</div></ProtectedRoute>} />
        <Route path="/artist/*" element={<ProtectedRoute requiredRole="artist"><div>Artist Dashboard</div></ProtectedRoute>} />

        {/* Unauthorized page for role mismatches */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
