
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../../core/hooks/useApi";
import { authApi } from "../services/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/authSlice";
import { Devider } from "../ui/Devider.ui";
import { GoogleAuthButton } from "@/core/components/button/GoogleAuthButton"; 
import { Button } from "@/core/components/button/Button";
import { Input } from "@/core/components/input/Input";
import { LoginFormInput, LoginSchema } from "../schemas/auth.validator";


export default function LoginForm () {

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInput>({
        resolver: zodResolver(LoginSchema)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {execute: login, loading} = useApi(authApi.login)

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
          <Input theme="user" {...register("email")} type="email" placeholder="Enter Username Or Email" 
          error={errors.email?.message}/>
        </div>

        <div>
          <Input theme="user" {...register("password")} type="password" placeholder="Password" 
          error={errors.password?.message}/>
        </div>

        <div className="text-right">
          <Link to={"/forgot-password"} className="text-green-400 hover:text-green-300 text-sm font-semibold">
            Forgot Password?
          </Link>
        </div>
        <Button theme="user" type="submit" loading={loading}>
              Log in
        </Button>
      </div>
      <Devider/>
      {/* google login button */}
      <GoogleAuthButton role={"user"}/>

      <p className="text-center text-white/70 text-sm mt-6">
        Not A Member?{" "}
        <Link to={"/"} className="text-green-400 hover:text-green-300 font-semibold">
          Register Now
        </Link>
      </p>
    </form>
    )
}