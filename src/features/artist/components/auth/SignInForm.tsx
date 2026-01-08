import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "@/core/hooks/api/useApi"; 
import { authApiArtist } from "../../services/artist-authApi"; 
import { loginSuccess } from "@/features/auth/slices/authSlice"; 
import { Lock, Mail } from "lucide-react";
import { Input } from "@/core/components/input/Input";
import { LoginFormInput, LoginSchema } from "@/features/auth/schemas/auth.validator";
import { Button } from "@/core/components/button/Button";
import { useState } from "react";


export default function LoginForm(){
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const toogglePasswordVisible = ()=>{
        setIsPasswordVisible(prev => !prev)
    }
    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInput>({
        resolver: zodResolver(LoginSchema)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {execute: login, loading} = useApi(authApiArtist.login)

    const onSubmit = async (data: LoginFormInput) =>{
        try {
            const res = await login(data)
            if(res){
                dispatch(loginSuccess({user: res?.user, accessToken: res.accessToken}))
                navigate("/artist/dashboard")
            }
           
        } catch (error) {
            console.error("error in login",error)
        }
    }    

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             <div>
                <Input theme="artist" {...register("email")} placeholder="Email" icon={Mail} 
                 error={errors.email?.message} errorTheme="red"/>
            </div>

            <div>
                <Input theme="artist" type="password" {...register("password")} placeholder="Password" icon={Lock} 
                 error={errors.password?.message} errorTheme="red"
                 showPasswordToggle={true}
                 isPasswordVisible={isPasswordVisible}
                 togglePasswordVisibility={toogglePasswordVisible}
                 />
            </div>
                <Link to="/artist/forgot-password" className="text-white hover:text-green-500 font-semibold transition-colors">
                     Forgot password?
                </Link>
            <Button type="submit" theme="user" variant="secondary" loading={loading}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white border-0 rounded-full py-3">Sign In</Button>
        </form>
    )
}