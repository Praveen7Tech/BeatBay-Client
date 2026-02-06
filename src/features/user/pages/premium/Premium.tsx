import { Crown } from "lucide-react";
import PricingCard from "../../components/premium/PricingCard";
import { PaymentProcessing } from "@/core/components/loading/PaymentProcessing";
import { useState } from "react";
import { getPlansForUser } from "../../helpers/subscription.data";

const Premium = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const plans = getPlansForUser();
  return (
    <div className="min-h-screen p-6 md:p-10 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Crown className="w-5 h-5" />
            <span className="font-medium">Premium</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Upgrade Your Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock ad-free listening, offline downloads, and exclusive content with our premium plans.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} setIsProcessing={setIsProcessing}/>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          All plans include a 7-day free trial. Cancel anytime.
        </p>
      </div>
      {isProcessing && (<PaymentProcessing/>)}
    </div>
  );
};

export default Premium;
