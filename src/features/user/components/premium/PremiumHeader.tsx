import { Crown } from "lucide-react";

const PremiumHeader = () => (
  <div className="flex items-center gap-3 my-10">
    <div className="p-3 rounded-full bg-primary/20">
      <Crown className="w-8 h-8 text-primary" />
    </div>
    <div>
      <h1 className="text-3xl font-bold">Premium Subscription</h1>
      <p className="text-muted-foreground">
        Manage your subscription details
      </p>
    </div>
  </div>
);

export default PremiumHeader;
