import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useApi } from "../../../core/hooks/api/useApi";
import { authApi } from "../services/authApi";
import { Button } from "@/core/components/button/Button";
import { Input } from "@/core/components/input/Input";
import { SignupFormInputs, signupSchema } from "../schemas/auth.validator";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {

  // validating form
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema)
  });

  const navigate = useNavigate();
  const { execute: signup, loading } = useApi(authApi.signup);

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      
      await signup(data);
      navigate(`/verify-otp`, { state: { email: data.email } });
    } catch (err) {
      console.error(err)
      // Error handling is managed by the useApi hook 
    }
  };

 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
      
    </form>
  )
}

