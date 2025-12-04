
import { authApi } from "../services/authApi"
import { useOtpVerification } from "@/core/hooks/otp/useOtpVerification"
import { Timer } from "@/core/components/Timer"
import { OtpInputs } from "@/core/components/input/OtpInputField"
import { Button } from "@/core/components/button/Button"


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
      <Button type="button" theme="user" disabled={verifyLoading} onClick={HandleSubmit}>
        Verify
      </Button>

      {/* timer */}
     {canResend ? (
        <Button type="button" theme="user" loading={resendLoading} onClick={HandleResend} >
          Resend OTP
        </Button>
      ) : (
        <Timer duration={120} onExpire={() => setCanResend(true)} />
      )}
    </div>
  )
}
