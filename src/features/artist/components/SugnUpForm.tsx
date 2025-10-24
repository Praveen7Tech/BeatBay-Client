"use client";

import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "../../../core/hooks/useApi";
import { authApiArtist } from "../services/artist-authApi";
import { InputField } from "./ui/InputField";
import { Button } from "./ui/Button";
import AuthFormWrapper from "./AuthFormWrapper";
import { AuthFooter } from "./AuthFooter";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignupInput = z.infer<typeof signUpSchema>;

export default function SignupForm() {
  const navigate = useNavigate();
  const { execute: signup } = useApi(authApiArtist.signUp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      await signup(data);
      navigate(`/verify-otp-artist`, { state: { email: data.email } });
    } catch (err) {
      // handle error toast here if needed
    }
  };

  return (
    <>
      <AuthFormWrapper title="Register">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <InputField
              {...register("name")}
              placeholder="Artist Name"
              icon={User}
            />
            {errors.name && (
              <p className="text-white text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <InputField
              {...register("email")}
              placeholder="Email"
              icon={Mail}
            />
            {errors.email && (
              <p className="text-white text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <InputField
              {...register("password")}
              placeholder="Password"
              icon={Lock}
            />
            {errors.password && (
              <p className="text-white text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit">Register</Button>
        </form>
      </AuthFormWrapper>

      <AuthFooter />
    </>
  );
}
