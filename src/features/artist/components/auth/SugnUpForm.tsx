"use client";

import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/core/hooks/useApi"; 
import { authApiArtist } from "../../services/artist-authApi"; 
import { GoogleAuthButton } from "@/core/components/button/GoogleAuthButton"; 
import { Button } from "@/core/components/button/Button";
import { Input } from "@/core/components/input/Input";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignupInput = z.infer<typeof signUpSchema>;

export default function SignupForm() {
  const {register, handleSubmit, formState: { errors },} = useForm<SignupInput>({
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();
  const { execute: Signup, loading } = useApi(authApiArtist.signUp);

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
        <Input theme="artist" {...register("name")} placeholder="Artist Name" icon={User} error={errors.name?.message} />
      </div>

      <div>
        <Input theme="artist" {...register("email")} placeholder="Email" icon={Mail} error={errors.email?.message}/>
      </div>

      <div>
        <Input theme="artist" {...register("password")} placeholder="Password" icon={Lock} type="password"
          error={errors.password?.message}
        />
      </div>

      <GoogleAuthButton role={"artist"}/>
      <Button theme="artist" variant="primary" type="submit" loading={loading}>Register</Button>
    </form>
  );
}
