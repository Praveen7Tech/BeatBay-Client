import ResetPasswordFormArtist from "../../components/auth/ReserPasswordForm"
import { FormWrapper } from "../../components/ui/AuthFormWrapper"
import AuthLayout from "../../components/ui/AuthLayout"


const ResetPasswordArtist = () => {
  return (
    <AuthLayout>
        <FormWrapper title="Rest Password">
            <ResetPasswordFormArtist/>
        </FormWrapper>
    </AuthLayout>
  )
}

export default ResetPasswordArtist
