import { useNavigate, useSearchParams } from "react-router-dom"
import ResetPasswordFormArtist from "../../components/auth/ReserPasswordForm"
import { FormWrapper } from "../../components/ui/AuthFormWrapper"
import AuthLayout from "../../components/ui/AuthLayout"
import { useEffect } from "react"


const ResetPasswordArtist = () => {
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
    <AuthLayout>
        <FormWrapper title="Rest Password">
            <ResetPasswordFormArtist/>
        </FormWrapper>
    </AuthLayout>
  )
}

export default ResetPasswordArtist
