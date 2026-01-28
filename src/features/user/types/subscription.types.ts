export interface SubscriptionPlan {
  subscriptionId: string;
  planName: string;
  amount: number;
  status: "active" | "cancelled" | "expired";
  nextBillingDate: string;
  cardInfo: string;
  autoReniewEnable: boolean;
}

export interface PaymentHistory {
  id: string;
  amount: number;
  status: "paid" | "failed" | "refunded";
  date: string;
  receiptUrl?: string;
}
