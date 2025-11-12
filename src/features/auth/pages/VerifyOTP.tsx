
import { OtpVerification } from "../components/OTPVerificationForm";
import { useLocation, useNavigate } from "react-router-dom"; 
import { useEffect } from 'react'; 
import AuthLayout from "@/features/artist/components/ui/AuthLayout";

export default function VerifyOTPPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; 
  const isAuthenticated = !!email; 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true }); 
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <AuthLayout title="OTP verification">
      <OtpVerification />
    </AuthLayout>
  );
}
