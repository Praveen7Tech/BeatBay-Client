"use client";

import AuthLayout from "../../components/ui/AuthLayout";
import { FormWrapper } from "../../components/ui/AuthFormWrapper"; 
import SignupForm from "../../components/auth/SugnUpForm";

export default function SignupPageArtist() {
  return (
    <AuthLayout>
      <FormWrapper title="Register">
        <SignupForm />
      </FormWrapper>
    </AuthLayout>
  );
}
