
import React from 'react';

interface OtpInputsProps {
  otp: string[];
  handleChange: (index: number, value: string, id: string) => void;
  handleKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>, id: string) => void;
  variant: 'user' | 'artist';
}

export const OtpInputs: React.FC<OtpInputsProps> = ({ otp, handleChange, handleKeyDown, variant }) => {
  const baseClasses = "w-12 h-12 text-center text-xl font-semibold rounded-lg focus:outline-none transition-all";
  
  const userClasses = "h-14 w-14 text-center text-2xl border-2 border-green-600/60 bg-black/30 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30";
  
  const artistClasses = "bg-white/10 border border-white/20 text-white placeholder-white/60 focus:border-orange-400/50 focus:bg-white/15";

  const inputStyle = variant === 'user' ? userClasses : artistClasses;

  return (
    <div className={`flex justify-center ${variant === 'user' ? 'gap-4 max-w-xs mx-auto' : 'space-x-3'}`}>
      {otp.map((digit, index) => {
        const inputId = `otp-input-${index}`; // Consistent ID structure

        return (
          <input
            key={index}
            id={inputId}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value, inputId)}
            onKeyDown={(e) => handleKeyDown(index, e, inputId)}
            className={`${baseClasses} ${inputStyle}`}
            placeholder="•"
            aria-label={`OTP digit ${index + 1}`}
          />
        );
      })}
    </div>
  );
};
