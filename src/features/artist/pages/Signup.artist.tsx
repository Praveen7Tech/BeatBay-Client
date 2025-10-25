"use client";

import AuthLayout from "../components/ui/AuthLayout";
import SignupForm from "../components/SugnUpForm";
import { FormWrapper } from "../components/ui/AuthFormWrapper"; 

export default function SignupPageArtist() {
  return (
    <AuthLayout>
      <FormWrapper title="Register">
        <SignupForm />
      </FormWrapper>
    </AuthLayout>
  );
}
