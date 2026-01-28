import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PaymentHistory } from "../../services/response.type";
import { format } from "date-fns";

interface Props{
    paymentHistory: PaymentHistory[]
}

export function NoPremium({paymentHistory}: Props){
    const navigate = useNavigate()
    const hasPaymentHistory = (paymentHistory ?? []).length > 0;

    return (
      <div className="min-h-screen p-6 md:p-10">
        <div className="max-w-4xl mx-auto">

          {/* No Premium Fallback */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative p-6 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border border-primary/30">
                <Crown className="w-16 h-16 text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-3">
              You're Not Premium Yet
            </h1>
            <p className="text-muted-foreground max-w-md mb-8">
              Unlock the full potential of your music experience with Premium. 
              Enjoy ad-free listening, offline downloads, and exclusive features.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {["Ad-free", "Offline", "HD Audio", "Exclusive"].map((feature) => (
                <div key={feature} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Check className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => navigate("/subscription")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full"
            >
              <Crown className="w-5 h-5 mr-2" />
              Get Premium Now
            </Button>
          </div>

          {/* Payment History Section (shown even without premium) */}
          <Card className="bg-card border-border mt-8">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {hasPaymentHistory ? (
                <div className="space-y-3">
                  {paymentHistory?.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-black"
                    >
                      <div>
                          <p className="text-foreground font-medium">{payment.amount}</p>
                          <p className="text-sm text-muted-foreground">{payment?.date ? format(new Date(payment.date), "MMM dd, yyyy") : "N/A"}</p>
                        </div>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <CreditCard className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-foreground font-medium mb-1">No Payment History</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Your payment history will appear here once you subscribe to Premium.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
}