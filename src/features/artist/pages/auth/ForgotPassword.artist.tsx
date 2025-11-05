
import AuthLayout from '../../components/ui/AuthLayout'
import { FormWrapper } from '../../components/ui/AuthFormWrapper'
import ForgotPasswordFormArtist from '../../components/auth/ForgotPasswordForm'

const ForgotPasswordArtist = () => {
  return (
    <AuthLayout>
        <FormWrapper title='Forget Password'>
            <ForgotPasswordFormArtist/>
        </FormWrapper>
    </AuthLayout>
  )
}

export default ForgotPasswordArtist
