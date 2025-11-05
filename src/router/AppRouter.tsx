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
import AdminLogin from '../features/admin/pages/auth/Login';
import AdminDashboard from '../features/admin/pages/dashboard/dashBoard'; 
import SignupPageArtist from '../features/artist/pages/auth/Signup.artist';
import VerifyOTPartist from '../features/artist/pages/auth/VerifyOTP.artist';
import ArtistDashboard from '../features/artist/pages/dashboard/Dashboard.artist'; 
import SignInPageArtist from '../features/artist/pages/auth/SignIn.artist';
import ProfilePage from '@/features/user/pages/profile/ProfilePage'; 
import UserLayout from '@/features/user/pages/layout/layout';
import HomeContent from '@/features/user/pages/home/Home'; 
import EditProfile from '@/features/user/pages/profile/EditProfile'; 
import DashboardLayout from '@/features/artist/pages/layout/DashboardLayout';
import ProfilePageArtist from '@/features/artist/pages/profile/Profile.artist';
import { EditArtistProfile } from '@/features/artist/pages/profile/Edit.profile'; 
import ForgotPasswordArtist from '@/features/artist/pages/auth/ForgotPassword.artist';
import ResetPasswordArtist from '@/features/artist/pages/auth/Reset-password';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route element={<PublicOnlyRoute />}>
          {/* User */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<SignupPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          {/* Admin */}
          <Route path='/admin' element={<AdminLogin/>} />
          {/* Artist */}
          <Route path='/artist' element={<SignupPageArtist/>} />
          <Route path='/verify-otp-artist' element={<VerifyOTPartist/>} />
          <Route path='/artist-signin' element={<SignInPageArtist/>} />
          <Route path='/artist-forgot-password' element={<ForgotPasswordArtist/>}/>
          <Route path='/artist-reset-password' element={<ResetPasswordArtist/>}/>
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
        <Route element={<ProtectedRoute requiredRole={ROLES.ARTIST}><DashboardLayout/></ProtectedRoute>}>
          <Route path='/artist-dashboard' element={<ArtistDashboard/>}/>
          <Route path='/artist-profile' element={<ProfilePageArtist/>}/>
          <Route path='/artist-edit-profile' element={<EditArtistProfile/>}/>
        </Route>
   
        {/* un authorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
};


export default AppRouter;
