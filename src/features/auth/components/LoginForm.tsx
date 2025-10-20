import z from "zod";
import { Input } from "../../../core/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../core/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store"; 
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../../core/hooks/useApi";
import { authApi } from "../services/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/authSlice";
import { Devider } from "../../../core/components/Devider.ui";

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
                dispatch(loginSuccess({user: res?.user, accessToken: res.accessToken}))
                navigate("/home")
            }
           
        } catch (error) {
            console.error("error in login",error)
        }
    }
    return (
         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <div className="w-full max-w-xs space-y-4">
        <div>
          <Input {...register("email")} type="email" placeholder="Enter Username Or Email" />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Input {...register("password")} type="password" placeholder="Password" />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="text-right">
          <Link to={"/forgot-password"} className="text-green-400 hover:text-green-300 text-sm font-semibold">
            Forgot Password?
          </Link>
        </div>
        {error && <p className="text-red-400">{error}</p>}

        <Button type="submit" disabled={false}>
           {loading ? "Signing ip.." : "Log in"}
        </Button>
      </div>
      <Devider/>

      <div className="w-full max-w-xs flex items-center justify-center">
        <img
          src="/logos/g.png"
          alt="Google"
          className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>

      <p className="text-center text-white/70 text-sm mt-6">
        Not A Member?{" "}
        <Link to={"/"} className="text-green-400 hover:text-green-300 font-semibold">
          Register Now
        </Link>
      </p>
    </form>
    )
}