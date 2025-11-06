
import { authApi } from "../services/authApi"
import { Button } from "../ui/Button"
import { useOtpVerification } from "@/core/hooks/useOtpVerification"
import { Timer } from "@/core/components/Timer"
import { OtpInputs } from "@/core/components/OtpInputField"


export function OtpVerification() {

  const {otp, canResend,verifyLoading, resendLoading,
     HandleChange,HandleSubmit, HandleResend, setCanResend, HandleKeyDown} = useOtpVerification({
      verifyApiEndpoint: authApi.verifyOtp,
      resendApiEndpoint: authApi.resendOtp,
      redirectPath: '/login'
     })
  
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xs mx-auto">
      <OtpInputs otp={otp} handleChange={HandleChange} handleKeyDown={HandleKeyDown} variant="user" />

      {/* Verify otp button*/}
      <Button type="button" disabled={verifyLoading} onClick={HandleSubmit} className="mt-4" >
        {verifyLoading ? "Verifying..." : "Verify"}
      </Button>

      {/* timer */}
     {canResend ? (
        <Button type="button" disabled={resendLoading} onClick={HandleResend}>
            {resendLoading ? "Re sending Otp.." : "Resend OTP"}
        </Button>
      ) : (
        <Timer duration={120} onExpire={() => setCanResend(true)} />
      )}
    </div>
  )
}
