import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from '../features/auth/pages/Signup';
import VerifyOTPPage from '../features/auth/pages/VerifyOTP';
import LoginPage from '../features/auth/pages/Login';
//import HomePage from '../pages/Home';
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
import SignupPageArtist from '../features/artist/pages/Signup.artist';
import VerifyOTPartist from '../features/artist/pages/VerifyOTP.artist';
import ArtistDashboard from '../features/artist/pages/Dashboard.artist'; 
import SignInPageArtist from '../features/artist/pages/SignIn.artist';
import ProfilePage from '@/features/user/pages/ProfilePage';
import UserLayout from '@/features/user/pages/layout/layout';
import HomeContent from '@/features/user/pages/Home';
import EditProfile from '@/features/user/pages/EditProfile';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<SignupPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/artist' element={<SignupPageArtist/>} />
          <Route path='/verify-otp-artist' element={<VerifyOTPartist/>} />
          <Route path='/artist-signin' element={<SignInPageArtist/>} />
        </Route>

        {/* USER ROUTES WITH PERSISTENT LAYOUT */}
        <Route element={<ProtectedRoute requiredRole={ROLES.USER}><UserLayout /></ProtectedRoute>}>
          <Route path="/home" element={<HomeContent/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/edit-profile' element={<EditProfile/>}/>
        </Route>

        {/* admin routes */}
        <Route path="/dashboard" element={<ProtectedRoute requiredRole={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>} />

        {/* artist routes */}
        <Route path="/artist-dashboard" element={<ProtectedRoute requiredRole={ROLES.ARTIST}><ArtistDashboard /></ProtectedRoute>} />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
};


export default AppRouter;
