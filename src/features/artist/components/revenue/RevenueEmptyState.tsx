import { DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RevenueEmptyStateProps {
  onActivate: () => void;
}

export const RevenueEmptyState = ({ onActivate }: RevenueEmptyStateProps) => {
  const benefits = [
    "Earn from every stream of your music",
    "Monthly payouts directly to your bank",
    "Detailed analytics on your earnings",
    "Revenue from all platforms combined",
    "No hidden fees or commissions",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Icon with glow effect */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#1DB954] blur-3xl opacity-20 rounded-full scale-150" />
        <div className="relative bg-[#1DB954]/10 p-6 rounded-full border border-[#1DB954]/20">
          <DollarSign size={48} className="text-[#1DB954]" />
        </div>
      </div>

      <h2 className="text-white text-3xl font-bold mb-3">
        Start Earning From Your Music
      </h2>
      <p className="text-[#a7a7a7] text-lg mb-8 max-w-md">
        Activate monetization to track your revenue, receive payouts, and grow your music career.
      </p>

      {/* Benefits list */}
      <div className="bg-[#181818] rounded-xl p-6 mb-8 w-full max-w-md">
        <h3 className="text-white font-semibold mb-4 text-left">What you'll get:</h3>
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-3 text-left">
              <CheckCircle size={18} className="text-[#1DB954] shrink-0" />
              <span className="text-[#a7a7a7]">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={onActivate}
        className="bg-[#1DB954] hover:bg-spotify-green text-black font-semibold px-8 py-6 text-lg"
      >
        Activate Monetization
        <ArrowRight size={20} className="ml-2" />
      </Button>

      <p className="text-[#a7a7a7] text-sm mt-4">
        Setup takes less than 5 minutes
      </p>
    </div>
  );
};
