import { useForm } from "react-hook-form";
import { InputField } from "../ui/InputField"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "@/core/hooks/useApi"; 
import { authApiArtist } from "../../services/artist-authApi"; 
import { loginSuccess } from "@/features/auth/slices/authSlice"; 
import { Lock, Mail } from "lucide-react";
import z from "zod";
import { GoogleAuthButton } from "@/core/components/GoogleAuthButton";
import { Button } from "@/core/components/button/Button";

const LoginSchema = z.object({
    email:z.string().email("Invalid email"),
    password: z.string().min(6, "password must be atleast 6 charecters")
})
type LoginFormInput = z.infer<typeof LoginSchema>

export default function SignInForm(){
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
                navigate("/home")
            }
           
        } catch (error) {
            console.error("error in login",error)
        }
    }    

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
             <div>
                <InputField {...register("email")} placeholder="Email" icon={Mail} />
                {errors.email && (
                <p className="text-white text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <InputField {...register("password")} placeholder="Password" icon={Lock} />
                {errors.password && (
                <p className="text-white text-sm mt-1">{errors.password.message}</p>
                )}
            </div>
                <Link to="/artist-forgot-password" className="text-white hover:text-orange-300 font-semibold transition-colors">
                     Forgot password?
                </Link>
            <Button type="submit" theme="artist" loading={loading}>Sign In</Button>

            <GoogleAuthButton role={"artist"}/>
        </form>
    )
}