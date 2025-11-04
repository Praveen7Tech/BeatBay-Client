import { useApi } from "@/core/hooks/useApi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authApiArtist } from "../../services/artist-authApi";
import { Timer } from "../ui/Timer";
import { Button } from "../ui/Button";

export default function VerifyOTPFormArtist() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [canResend, setCanResend] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { execute: verifyOtp } = useApi(authApiArtist.verifyOtp);
  const {execute: resendOTP} = useApi(authApiArtist.resendOtp)
  const email = location.state?.email;

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    try {
      await verifyOtp({ email, otp: code });
      navigate("/artist-dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const HandleResend = async ()=>{
    try {
      await resendOTP({email})
      setCanResend(false)
      setTimerKey((prev) => prev + 1)
    } catch (error) {
      console.error("error in resend otp",error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-center">
      {/* OTP Inputs */}
      <div className="flex justify-center space-x-3">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-12 text-center text-xl font-semibold rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-orange-400/50 focus:bg-white/15 transition-all"
          />
        ))}
      </div>

      {/* Timer */}
      <Timer key={timerKey} duration={120} onExpire={() => setCanResend(true)} />

      {/* Verify button */}
      <Button type="submit" variant="primary">
        Verify
      </Button>

      {/* Resend OTP button */}
      <Button
        type="button"
        onClick={HandleResend}
        variant="secondary"
        disabled={!canResend}
      >
        RESEND OTP
      </Button>
    </form>
  );
}
