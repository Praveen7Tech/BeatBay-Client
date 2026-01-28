import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isToggling: boolean;
  autoRenew: boolean
  billingDate: Date
  toggleAutoRenew: (value: boolean) => void;
  setShowCancelDialog: Dispatch<SetStateAction<boolean>>;
}

const PaymentSettingsCard = ({isToggling,autoRenew,billingDate, toggleAutoRenew,setShowCancelDialog,}: Props) => (
  <Card className="bg-card border-border">
    <CardHeader>
      <CardTitle className="text-lg text-foreground">
        Payment Settings
      </CardTitle>
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
          checked={!autoRenew}
          onCheckedChange={(checked) => toggleAutoRenew(checked)}
        />
      </div>

      {autoRenew && (
        <p className="text-sm text-yellow-500 bg-yellow-500/10 p-3 rounded-lg">
          Your subscription will expire on{" "}
          {format(new Date(billingDate), "MMM dd, yyyy")}. Enable
          auto-renewal to continue enjoying premium features.
        </p>
      )}

      <div className="space-y-3">
        <Button
          variant="ghost"
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => setShowCancelDialog(true)}
        >
          Cancel Subscription
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default PaymentSettingsCard;
