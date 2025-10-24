"use client"

import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import z from "zod"
import { InputField } from "../components/ui/InputField" 
import { Button } from "../components/ui/Button" 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApi } from "../../../core/hooks/useApi"
import { authApiArtist } from "../services/artist-authApi"

const signUpSchema = z.object({
    name: z.string().min(2, "Name must be atleast 2 charecters."),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be atleast 6 charecters.")
})

type signupInput = z.infer<typeof signUpSchema>;


export default function SignupForm() {

  const {register, handleSubmit, formState:{errors}} = useForm<signupInput>({
    resolver: zodResolver(signUpSchema)
  })

  const navigate = useNavigate()
  const {execute: Signup} = useApi(authApiArtist.signUp)

  const onSubmit = async (data: signupInput) => {
    try { 
      await Signup(data);
      navigate(`/verify-otp-artist`, { state: { email: data.email } });
    } catch (err) {
      
    }
  };
  
  return (
    <div className="w-full max-w-md">
      <div className="relative p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/30 to-red-500/30 pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Register</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <InputField {...register('name')} placeholder="Artist Name" icon={User} />
              {errors.name && <p className="text-white text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <InputField {...register('email')} placeholder="Email" icon={Mail} />
              {errors.email && <p className="text-white text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div>
              <InputField {...register('password')} placeholder="Pasword" icon={Lock} />
              {errors.password && <p className="text-white text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <Button type="submit" >
               Register
            </Button>

          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-white/80 text-sm">
              Do You Have An Account?{" "}
              <Link to="/signin" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
