import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useApi } from "../../../core/hooks/useApi";
import { authApi } from "../services/authApi";
import { useSelector } from 'react-redux';
import { RootState } from "../../../core/store/store";
import { Devider } from "../ui/Devider.ui";
import { GoogleAuthButton } from "@/core/components/button/GoogleAuthButton";
import { Button } from "@/core/components/button/Button";
import { Input } from "@/core/components/input/Input";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters.")
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupForm() {

  // validating form
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema)
  });

  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  const { execute: signup } = useApi(authApi.signup);

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      
      await signup(data);
      navigate(`/verify-otp`, { state: { email: data.email } });
    } catch (err) {
      // Error handling is managed by the useApi hook 
    }
  };

 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <div className="w-full max-w-xs space-y-4">
        <div>
          <Input theme="user" {...register("name")} type="text" placeholder="Full Name" error={errors.name?.message}/>
        </div>

        <div>
          <Input theme="user" {...register("email")} type="email" placeholder="Enter Email" error={errors.email?.message}/>
        </div>

        <div>
          <Input theme="user" {...register("password")} type="password" placeholder="Password" error={errors.password?.message} />
        </div>

        <Button theme="user" type="submit" loading={loading}>
           Create Account
        </Button>
      </div>

      <Devider/>
      {/* google login button */}
      <GoogleAuthButton role={"user"}/>
       
      <p className="text-center text-white/70 text-sm mt-6">
        Do You Have An Account?{" "}
        <Link to={'/login'} className="text-green-400 hover:text-green-300 font-semibold">
          Sign In
        </Link>
      </p>
    </form>
  )
}

