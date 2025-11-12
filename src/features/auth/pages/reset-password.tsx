import { useNavigate, useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../components/reset-passwordForm";
import { useEffect } from "react";
import AuthLayout from "@/features/artist/components/ui/AuthLayout";

export default function ResetPassword() {
  const [queryParams] = useSearchParams()
  const navigate = useNavigate()
  const token = queryParams.get('token')
  const tokenValid = !!token

  useEffect(()=>{
    if(!tokenValid){
      navigate('/', {replace: true})
    }
  },[tokenValid,navigate])

  if(!tokenValid){
    return null
  }
    return(
     <AuthLayout title="Change Password" subtitle="Enter a different password with the previous">
      <ResetPasswordForm />
    </AuthLayout>
    )
}