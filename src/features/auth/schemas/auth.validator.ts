import { emailValidator, nameValidator, passwordValidator } from "@/core/validators/validationShemas";
import z from "zod";

// Sign up
export const signupSchema = z.object({
  name: nameValidator,
  email:emailValidator,
  password:passwordValidator
});

export type SignupFormInputs = z.infer<typeof signupSchema>;

// Login
export const LoginSchema = z.object({
    email:nameValidator,
    password: passwordValidator
})

export type LoginFormInput = z.infer<typeof LoginSchema>

// Forget Password
export const EmailSchema = z.object({
  email: emailValidator
})

export type VerifyEmailInput = z.infer<typeof EmailSchema>