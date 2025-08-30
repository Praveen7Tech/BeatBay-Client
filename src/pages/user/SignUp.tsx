import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z, { email } from "zod"
import { userService } from "../../services/UserService"
import { useNavigate } from "react-router-dom"

const signupSchema = z.object({
        name:z.string().min(2, "Name must be atleast 2 charecters."),
        email:z.string().email("Invalid email"),
        password: z.string().min(6, "Password must be atleast 6 charecters")
    })

type SignupForm = z.infer<typeof signupSchema>


console.log("schema-",signupSchema)

export default function SignUp() {

  const {register, handleSubmit, formState : {errors}} = useForm<SignupForm>({
    resolver : zodResolver(signupSchema)
  })  

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const onSubmit = async(data : SignupForm)=>{
    try {
        console.log("dta",data)
        setLoading(true)
        setErrorMsg("")

        const res = await userService.signUp(data)
        console.log("res",res)

        navigate(`/verify-otp`, {state:{email:data.email}})
    } catch (error:any) {
        console.error("err",error)
        setErrorMsg(error.response.data.message)
    } finally{
        setLoading(false)
    }
  }
    
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-b from-green-600 to-green-800 rounded-2xl p-8 text-white">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
            <span className="text-xl font-semibold">BeatBay</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-8">Register</h2>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 mb-6">
          <input
          {...register("name")}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-full placeholder-gray-300 text-white focus:outline-none focus:border-white/40"
          />
          {errors.name && <p className="text-red-500"> {errors.name?.message}</p>}
          <input
            {...register("email")}
            type="email"
            placeholder="Enter Email"
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-full placeholder-gray-300 text-white focus:outline-none focus:border-white/40"
          />
          {errors.email && <p className="text-red-500"> {errors.email.message}</p>}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-full placeholder-gray-300 text-white focus:outline-none focus:border-white/40"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          {errorMsg && <p className="text-red-400">{errorMsg}</p>}
        </div>

        {/* Create Account Button */}
        <button
        type="submit"
         className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-full mb-6 transition-colors">
          { loading ? "Signing Up.." : "Creat Account"}
        </button>
        </form>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-4 text-sm text-gray-300">Or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Google Button */}
        <button className="w-full bg-white text-gray-700 font-medium py-3 rounded-full mb-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-300">
          Do You Have An Account?{" "}
          <a href="#" className="text-white underline hover:no-underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}
