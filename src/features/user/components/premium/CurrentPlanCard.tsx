import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { SubscriptionResponse } from "../../services/response.type";

interface Props {
  plan: SubscriptionResponse;
}


const CurrentPlanCard = ({ plan }: Props) => {

   const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: plan.currency.toUpperCase(),
  }).format(plan.amount);

 return(
  <Card className="bg-card border-border">
    <CardHeader>
      <CardTitle className="text-lg text-foreground">Current Plan</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
        <div>
          <p className="font-semibold text-foreground">{plan?.planName}</p>
          <p className="text-2xl font-bold text-primary">{formattedPrice}</p>
        </div>
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
          {plan?.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            Next billing:{" "}
            {plan?.nextBillingDate
              ? format(new Date(plan.nextBillingDate), "MMM dd, yyyy")
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <CreditCard className="w-4 h-4" />
          <span>{plan?.cardInfo}</span>
        </div>
      </div>
    </CardContent>
  </Card>
 )
};

export default CurrentPlanCard;
