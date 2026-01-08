import { authApiArtist } from "../../services/artist-authApi";
import { Timer } from "../../../../core/components/Timer";
import { useOtpVerification } from "@/core/hooks/otp/useOtpVerification";
import { OtpInputs } from "@/core/components/input/OtpInputField";
import { Button } from "@/core/components/button/Button";

export default function VerifyOTPFormArtist() {

  const {otp, canResend, verifyLoading, resendLoading, HandleChange, HandleSubmit, HandleResend, setCanResend, HandleKeyDown} = useOtpVerification({
    verifyApiEndpoint: authApiArtist.verifyOtp,
    resendApiEndpoint: authApiArtist.resendOtp, 
    redirectPath: '/artist/login'
  })
  

  return (
    <form onSubmit={HandleSubmit} className="space-y-6 text-center">
      {/* OTP Inputs */}
      <OtpInputs otp={otp} handleChange={HandleChange} handleKeyDown={HandleKeyDown} variant="user" />

      {/* Timer */}
     {canResend ? (
        <Button type="button" theme="user" onClick={HandleResend} variant="secondary" disabled={resendLoading} >RESEND OTP
        </Button>
      ) : (
         <Timer duration={120} onExpire={() => setCanResend(true)} />
      )}

      {/* Verify button */}
      <Button type="submit" theme="user" variant="secondary" disabled={verifyLoading}>
        Verify
      </Button>
    </form>
  );
}
