import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from '../features/auth/pages/Signup';
import VerifyOTPPage from '../features/auth/pages/VerifyOTP';
import LoginPage from '../features/auth/pages/Login';
import HomePage from '../pages/Home';
import ForgotPassword from '../features/auth/pages/Forgot-passowrd';
import ResetPassword from '../features/auth/pages/reset-password';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './Protected-route';
import PublicOnlyRoute from './Public-route';
import { ROLES } from '../core/types/roles';
import NotFound from '../pages/page-notFound';
import Unauthorized from '../pages/unAutharized-page';
import AdminLogin from '../features/admin/pages/Login';
import AdminDashboard from '../features/admin/pages/dashBoard'; 
//import ArtistDashboard from '../features/artist/pages/ArtistDashboard';


const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public-only Routes: Only accessible when NOT logged in */}
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/" element={<PublicOnlyRoute><SignupPage /></PublicOnlyRoute>} />
        <Route path="/verify-otp" element={<PublicOnlyRoute><VerifyOTPPage /></PublicOnlyRoute>} />
        <Route path='/forgot-password' element={<PublicOnlyRoute><ForgotPassword/></PublicOnlyRoute>}/>
        <Route path='/reset-password' element={<PublicOnlyRoute><ResetPassword/></PublicOnlyRoute>}/>
        <Route path='/admin' element={<PublicOnlyRoute><AdminLogin/></PublicOnlyRoute>}/>

        {/* Protected Routes: Accessible only when logged in */}
        <Route path="/home" element={<ProtectedRoute requiredRole={ROLES.USER}><HomePage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>} />
        {/* <Route path="/artist-dashboard" element={<ProtectedRoute requiredRole={ROLES.ARTIST}><ArtistDashboard /></ProtectedRoute>} /> */}

        {/* Unauthorized page for role mismatches */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
};

export default AppRouter;
