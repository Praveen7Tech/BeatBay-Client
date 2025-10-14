import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../core/store/store';
//import LoginPage from '../features/auth/pages/Login';
import SignupPage from '../features/auth/pages/Signup';
import VerifyOTPPage from '../features/auth/pages/VerifyOTP';
//import HomePage from '../pages/Home';
//import DashboardPage from '../pages/Dashboard';

const PrivateRoute: React.FC<{ children: React.ReactNode; requiredRole?: string }> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
      return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/" element={<SignupPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        {/* <Route path="/" element={<HomePage />} /> */}

        {/* Protected Routes */}
        {/* <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} /> */}
        <Route path="/admin/*" element={<PrivateRoute requiredRole="admin"><div>Admin Dashboard</div></PrivateRoute>} />
        <Route path="/artist/*" element={<PrivateRoute requiredRole="artist"><div>Artist Dashboard</div></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
