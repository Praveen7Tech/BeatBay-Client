import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useApi } from "../../../core/hooks/useApi";
import { authApi } from "../services/authApi";
import { useSelector } from 'react-redux';
import { RootState } from "../../../core/store/store";
import { Button } from "../../../core/components/Button"; 
import { Input } from "../../../core/components/Input"; 

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
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const { execute: signup } = useApi(authApi.signup);

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      console.log("start")
      await signup(data);
      navigate(`/verify-otp`, { state: { email: data.email } });
    } catch (err) {
      // Error handling is managed by the useApi hook and Redux slice
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 mb-6">
        <Input {...register("name")} type="text" placeholder="Full Name" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <Input {...register("email")} type="email" placeholder="Enter Email" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input {...register("password")} type="password" placeholder="Password" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        {error && <p className="text-red-400">{error}</p>}
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Signing Up.." : "Create Account"}
      </Button>
    </form>
  );
}

