
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import ResetPasswordFormArtist from "../../components/auth/ReserPasswordForm"
import AuthLayout from "../../../../core/components/Layout/AuthLayout"

export default function ResetPasswordArtist() {
const [queryParams] = useSearchParams()
  const navigate = useNavigate()
  const token = queryParams.get('token')
  const tokenValid = !!token

  useEffect(()=>{
    if(!tokenValid){
      navigate('/artist', {replace: true})
    }
  },[tokenValid,navigate])

  if(!tokenValid){
    return null
  }
  return (
    <AuthLayout title="Reset Password" subtitle="Create a new password">
        <ResetPasswordFormArtist/>
    </AuthLayout>
  )
}