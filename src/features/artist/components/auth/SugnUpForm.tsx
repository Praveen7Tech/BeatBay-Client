"use client";

import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { InputField } from "../ui/InputField"; 
import { Button } from "../ui/Button"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/core/hooks/useApi"; 
import { authApiArtist } from "../../services/artist-authApi"; 
import { GoogleAuthButton } from "@/core/components/GoogleAuthButton";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignupInput = z.infer<typeof signUpSchema>;

export default function SignupForm() {
  const {register,  handleSubmit, formState: { errors }, } = useForm<SignupInput>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();
  const { execute: Signup } = useApi(authApiArtist.signUp);

  const onSubmit = async (data: SignupInput) => {
    try {
      await Signup(data);
      navigate(`/verify-otp-artist`, { state: { email: data.email } });
    } catch (err) {
      
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <InputField {...register("name")} placeholder="Artist Name" icon={User} />
        {errors.name && (
          <p className="text-white text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <InputField {...register("email")} placeholder="Email" icon={Mail} />
        {errors.email && (
          <p className="text-white text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <InputField
          {...register("password")}
          placeholder="Password"
          icon={Lock}
          type="password"
        />
        {errors.password && (
          <p className="text-white text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <GoogleAuthButton role={"artist"}/>
      <Button type="submit">Register</Button>
    </form>
  );
}
