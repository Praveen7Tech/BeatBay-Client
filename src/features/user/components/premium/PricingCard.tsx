import { Check } from "lucide-react";
import { userApi } from "../../services/userApi";

interface PricingCardProps {
  name: string;
  priceId: string
  price: number;
  period: string;
  savings?: string;
  features: string[];
  popular?: boolean;
}

const PricingCard = ({ name, price, priceId, period, savings, features, popular }: PricingCardProps) => {

  const handleSubscribe = async (priceId:string) => {
    try {
        const res =await userApi.subscriptionCheckout(priceId)
        console.log("sub ", res)
       if(res.url){
         window.location.href = res.url
       }
    } catch (error) {
        console.error("error in payment subscription")
    }
  };

  return (
    <div className={`relative flex flex-col p-6 rounded-2xl border ${
      popular 
        ? "border-primary bg-primary/5 scale-105" 
        : "border-border bg-card"
    }`}>
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
          Most Popular
        </span>
      )}
      
      <h3 className="text-xl font-bold text-foreground">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{period}</p>
      
      <div className="mt-4">
        <span className="text-4xl font-bold text-foreground">${price}</span>
        {savings && (
          <span className="ml-2 text-sm text-primary font-medium">{savings}</span>
        )}
      </div>

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 text-primary shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={()=>handleSubscribe(priceId)}
        className={`mt-6 w-full py-3 rounded-lg font-semibold transition-colors ${
          popular
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
