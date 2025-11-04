import SignInForm from "../../components/auth/SignInForm"; 
import { FormWrapper } from "../../components/ui/AuthFormWrapper";
import AuthLayout from "../../components/ui/AuthLayout";

export default function SignInPageArtist(){
    return(
        <AuthLayout>
            <FormWrapper title="Sign In">
                <SignInForm/>
            </FormWrapper>
        </AuthLayout>
    )
}