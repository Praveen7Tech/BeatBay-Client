
export interface CountryPricing {
  monthly: number;
  sixMonth: number;
  yearly: number;
  currency: string;
}

export const pricingTable: Record<string, CountryPricing> = {
  IN: { monthly: 99, sixMonth: 249, yearly: 499, currency: "INR" },
  US: { monthly: 1.08, sixMonth: 6.48, yearly: 12.96, currency: "USD" },
  GB: { monthly: 1.20, sixMonth: 7.00, yearly: 14.00, currency: "GBP" },
};

export const priceIds = {
  monthly: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID,
  sixMonth: import.meta.env.VITE_STRIPE_SIX_MONTH_PRICE_ID,
  yearly: import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID,
};

export const getUserCountryCode = (): string => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; 
    console.log("tz ", tz)
    if (tz.startsWith("Asia/Calcutta")) return "IN";
    return "IN"; 
  } catch {
    return "US";
  }
};

export const getPlansForUser = () => {
  const countryCode = getUserCountryCode();
  const prices = pricingTable[countryCode] || pricingTable["US"];

  return [
    {
      name: "Monthly Plan",
      priceId: priceIds.monthly,
      price: prices.monthly,
      currency: prices.currency,
      period: "Billed monthly",
      features: [
        "Exclusive Premium Tag",
        "Unlimited skips",
        "High quality audio",
        "Turn Of auto Payment",
        "Cancel anytime",
      ],
    },
    {
      name: "6 Months Plan",
      priceId: priceIds.sixMonth,
      price: prices.sixMonth,
      currency: prices.currency,
      period: "Billed every 6 months",
      savings: "Save 17%",
      popular: true,
      features: [
        "All Monthly features",
        "Priority customer support",
        "Early access to new features",
        "Exclusive playlists",
        "Artist meet & greets",
      ],
    },
    {
      name: "Yearly Plan",
      priceId: priceIds.yearly,
      price: prices.yearly,
      currency: prices.currency,
      period: "Billed annually",
      savings: "Save 25%",
      features: [
        "All 6 Months features",
        "Premium badge on profile",
        "Unlimited room hosting",
        "Lyrics & karaoke mode",
      ],
    },
  ];
};
