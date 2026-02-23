import { lazy } from "react";
import { Route } from "react-router-dom";
import PublicOnlyRoute from "./Public-route";

const SignupPage = lazy(() => import("../features/auth/pages/Signup"));
const VerifyOTPPage = lazy(() => import("../features/auth/pages/VerifyOTP"));
const LoginPage = lazy(() => import("../features/auth/pages/Login"));
const ForgotPassword = lazy(() => import("../features/auth/pages/Forgot-passowrd"));
const ResetPassword = lazy(() => import("../features/auth/pages/reset-password"));

const AdminLogin = lazy(() => import("../features/admin/pages/auth/Login"));

const SignupPageArtist = lazy(() => import("../features/artist/pages/auth/Signup.artist"));
const VerifyOTPartist = lazy(() => import("../features/artist/pages/auth/VerifyOTP.artist"));
const SignInPageArtist = lazy(() => import("../features/artist/pages/auth/SignIn.artist"));
const ForgotPasswordArtist = lazy(() => import("../features/artist/pages/auth/ForgotPassword.artist"));
const ResetPasswordArtist = lazy(() => import("../features/artist/pages/auth/Reset-password"));
const LandingPage = lazy(() => import("../features/artist/pages/landing page/LandingPage"));

export const authRoutes = (
  <Route element={<PublicOnlyRoute />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<SignupPage />} />
    <Route path="/verify-otp" element={<VerifyOTPPage />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />

    <Route path="/admin" element={<AdminLogin />} />

    <Route path="/artist/signup" element={<SignupPageArtist />} />
    <Route path="/artist/verify-otp" element={<VerifyOTPartist />} />
    <Route path="/artist/login" element={<SignInPageArtist />} />
    <Route path="/artist/forgot-password" element={<ForgotPasswordArtist />} />
    <Route path="/artist/reset-password" element={<ResetPasswordArtist />} />
    <Route path="/artist" element={<LandingPage />} />
  </Route>
);