import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { useApi } from '../../../../core/hooks/useApi';
import { authApiAdmin } from '../../services/admin-AuthApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../auth/slices/authSlice';
import { Button } from '@/core/components/button/Button';

const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Pass word must be atleast 6 charecters")
})

type LoginInput = z.infer<typeof LoginSchema>

const AdminLogin: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors}} = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema)
  })

  const {execute: AdminLogin, loading} = useApi(authApiAdmin.login)

  const onSubmit = async(data: LoginInput) => {
    try {
      const res = await AdminLogin(data)
      if(res){
        dispatch(loginSuccess({user: res.user, accessToken: res.accessToken}))
        navigate("/dashboard", {replace: true})
      }
      
    } catch (error) {
      console.error("error in admin login", error)
    }
  }
  

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col justify-center px-20 bg-linear-to-br from-[#0a0a0a] to-[#1a1a1a] relative">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-md mx-auto">
          <h1 className="text-5xl font-light mb-10 flex items-center space-x-2">
            <span className="font-[Pacifico] text-5xl">Sign in</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter email"
                className="w-full bg-[#1b1b1b] border border-gray-700 rounded-md px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter password"
                className="w-full bg-[#1b1b1b] border border-gray-700 rounded-md px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <Button theme='admin' type="submit" loading={loading}>
              <span>SIGN IN</span>
              <span>→</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Right Panel with Abstract Background */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/src/assets/bg.png')",
        }}
      ></div>
    </div>
  );
};

export default AdminLogin;
