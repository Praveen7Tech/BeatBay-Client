
export function OtpVerification() {
  return (
    <div className="flex items-center gap-4">
      {/* Accessible label for screen readers */}
      <label className="sr-only" htmlFor="otp-1">
        Enter 4-digit verification code
      </label>

      {/* OTP inputs left-to-right */}
      <div className="flex items-center gap-2" aria-label="Enter 4-digit code">
        <input
          id="otp-1"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="h-12 w-12 text-center rounded-md border border-input bg-background text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="•"
          aria-label="Digit 1"
        />
        <input
          id="otp-2"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="h-12 w-12 text-center rounded-md border border-input bg-background text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="•"
          aria-label="Digit 2"
        />
        <input
          id="otp-3"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="h-12 w-12 text-center rounded-md border border-input bg-background text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="•"
          aria-label="Digit 3"
        />
        <input
          id="otp-4"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className="h-12 w-12 text-center rounded-md border border-input bg-background text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="•"
          aria-label="Digit 4"
        />
      </div>

      {/* Verify button (no logic wired) */}
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
      >
        Verify
      </button>
    </div>
  )
}
