import { Crown, Check, CreditCard, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { SpinnerCustom } from "@/components/ui/spinner";
import { format } from "date-fns";
import { useSubscription } from "@/core/hooks/subscription/useAutoSubscriptionToggle";

const premiumFeatures = [
  "Ad-free music listening",
  "Unlimited skips",
  "Offline downloads",
  "High quality audio (320kbps)",
  "Priority customer support",
  "Early access to new features",
  "Exclusive playlists",
  "Artist meet & greets access",
  "Premium badge on profile",
  "Unlimited room hosting",
  "Lyrics & karaoke mode",
];

const paymentHistory = [
  { date: "Jan 15, 2026", amount: "$49.99", status: "Paid" },
  { date: "Jul 15, 2025", amount: "$49.99", status: "Paid" },
  { date: "Jan 15, 2025", amount: "$9.99", status: "Paid" },
];

const PremiumDetails = () => {
  const userId = useSelector((state:RootState)=> state.auth.user?.id)

  const { plan, isLoading, toggleAutoRenew, isToggling } = useSubscription(userId);

  if(isLoading) return <SpinnerCustom/>
  
  console.log("subscription ", plan)
 

  return (
    <div className="min-h-screen p-6 md:p-10 bg-black">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-primary/20">
            <Crown className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Premium Subscription</h1>
            <p className="text-muted-foreground">Manage your subscription details</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Plan Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div>
                  <p className="font-semibold text-foreground">{plan?.planName}</p>
                  <p className="text-2xl font-bold text-primary">${plan?.amount}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                  {plan?.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Next billing: {plan?.nextBillingDate ? format(new Date(plan.nextBillingDate), "MMM dd, yyyy") : "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  <span>{plan?.cardInfo}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Change Plan
              </Button>
            </CardContent>
          </Card>

          {/* Auto Payment Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-black">
                <div className="space-y-1">
                  <Label htmlFor="auto-payment" className="text-foreground font-medium">
                    Auto-renewal
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically renew your subscription
                  </p>
                </div>
                <Switch
                  id="auto-payment"
                  disabled={isToggling}
                  checked={!plan?.autoReniewEnable}
                  onCheckedChange={(checked)=> toggleAutoRenew(checked)}
                />
              </div>

              {plan?.autoReniewEnable && (
                <p className="text-sm text-yellow-500 bg-yellow-500/10 p-3 rounded-lg">
                  Your subscription will expire on Jul 15, 2026. Enable auto-renewal to continue enjoying premium features.
                </p>
              )}

              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
                <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Premium Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-primary/20">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Payment History Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-black"
                  >
                    <div>
                      <p className="text-foreground font-medium">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-muted-foreground">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PremiumDetails;
