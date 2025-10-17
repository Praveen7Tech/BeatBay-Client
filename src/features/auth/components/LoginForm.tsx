import z from "zod";
import { Input } from "../../../core/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../core/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store"; 
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../core/hooks/useApi";
import { authApi } from "../services/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/authSlice";

const LoginSchema = z.object({
    email:z.string().email("Invalid email"),
    password: z.string().min(6, "password must be atleast 6 charecters")
})

type LoginFormInput = z.infer<typeof LoginSchema>

export default function LoginForm () {

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInput>({
        resolver: zodResolver(LoginSchema)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading, error} = useSelector((state: RootState)=> state.auth);
    const {execute: login} = useApi(authApi.login)

    const onSubmit = async (data: LoginFormInput) =>{
        try {
            const res = await login(data)
            if(res){
                dispatch(loginSuccess({user: res.user, accessToken: res.accessToken}))
                navigate("/home")
            }
           
        } catch (error) {
            console.error("error in login",error)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 mb-6">
                <Input {...register("email")} type="email" placeholder="enter email"/>
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <Input {...register("password")} type="password" placeholder="enter password"/>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                {error && <p className="text-red-400">{error}</p>}
            </div>
            <Button type="submit" disabled={loading}>
                {loading ? "Loging..." : "Log in"}
            </Button>
        </form>
    )
}