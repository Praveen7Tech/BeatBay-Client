"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useApi } from "../../../../core/hooks/api/useApi";
import { authApiAdmin } from "../../services/admin-AuthApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../auth/slices/authSlice";
import { Button } from "@/core/components/button/Button";
import { Input } from "@/core/components/input/Input";

// ✅ Validation schema
const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginInput = z.infer<typeof LoginSchema>;

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const { execute: AdminLogin, loading } = useApi(authApiAdmin.login);

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await AdminLogin(data);
      if (res) {
        dispatch(loginSuccess({ user: res.user, accessToken: res.accessToken }));
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Error in admin login:", error);
    }
  };

  return (
    <div
      className="relative flex h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/bg.png')" }}
    >
      {/* Semi-transparent left panel */}
      <div className="relative z-10 w-full sm:w-1/2 h-full bg-black/60 backdrop-blur-md flex items-center justify-center px-8 sm:px-16">
        <div className="max-w-md w-full">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-10 font-[Pacifico]">
            Sign In
          </h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <Input theme="admin" {...register("email")}  type="email" placeholder="Enter your email" 
              error={errors?.email?.message} errorTheme="red"/>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <Input theme="admin" errorTheme="red" {...register("password")} type="password"  placeholder="Enter your password"  
              error={errors?.password?.message} />
            </div>

            {/* Submit Button */}
            <Button theme="admin" type="submit" loading={loading} className="w-full">
              SIGN IN →
            </Button>
          </form>
        </div>
      </div>

      {/* Transparent right panel (optional, just for layout balance) */}
      <div className="hidden sm:block w-1/2 h-full"></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default AdminLogin;
