import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentHistory } from "../../services/response.type";
import { CreditCard, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Props {
  paymentHistory: PaymentHistory[];
  hasPaymentHistory: boolean
}

const PaymentHistoryCard = ({ paymentHistory,hasPaymentHistory }: Props) => ( 
  <Card className="bg-card border-border">
    <CardHeader>
      <CardTitle className="text-lg text-foreground">Payment History</CardTitle>
    </CardHeader>
    <CardContent>
      {hasPaymentHistory ? (
        <>
          <div className="space-y-3">
            {paymentHistory?.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-black"
              >
                <div>
                  <p className="text-foreground font-medium">
                    {payment.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {payment?.date
                      ? format(new Date(payment.date), "MMM dd, yyyy")
                      : "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                    {payment.status}
                  </span>
                  {payment.receiptUrl && (
                    <Link
                      to={payment.receiptUrl}
                      target="_blank"
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition"
                      title="View receipt"
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button variant="ghost" className="w-full mt-4 text-muted-foreground">
            View All Transactions
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="p-3 rounded-full bg-muted/50 mb-3">
            <CreditCard className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-foreground font-medium mb-1">
            No Transactions Yet
          </p>
          <p className="text-sm text-muted-foreground">
            Your payment history will appear here.
          </p>
        </div>
      )}
    </CardContent>
  </Card>
);

export default PaymentHistoryCard;
