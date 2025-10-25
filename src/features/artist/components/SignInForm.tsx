import { useForm } from "react-hook-form";
import { InputField } from "./ui/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useApi } from "../../../core/hooks/useApi";
import { authApiArtist } from "../services/artist-authApi";
import { RootState } from "../../../core/store/store";
import { loginSuccess } from "../../auth/slices/authSlice";
import { Lock, Mail, User } from "lucide-react";
import { Button } from "./ui/Button";
import z from "zod";

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
    const {loading} = useSelector((state: RootState)=> state.auth);
    const {execute: login} = useApi(authApiArtist.login)

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


            <Button type="submit">Sign In</Button>
        </form>
    )
}