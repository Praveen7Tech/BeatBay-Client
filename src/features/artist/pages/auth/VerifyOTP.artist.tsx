import { FormWrapper } from "../../components/ui/AuthFormWrapper";
import AuthLayout from "../../components/ui/AuthLayout";
import VerifyOTPFormArtist from "../../components/auth/VerifyOTPForm"; 

export default function VerifyOTPartist(){
    return(
        <AuthLayout>
            <FormWrapper title="Verify OTP">
                <VerifyOTPFormArtist/>
            </FormWrapper>
        </AuthLayout>
    )
}