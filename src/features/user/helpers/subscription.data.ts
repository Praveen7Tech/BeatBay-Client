import { PremiumPrice } from "../services/response.type";

type PlanType = "card" | "feature"

export const getPlansForUser = (type:PlanType,priceData?: PremiumPrice[]) => {

  const planConfigs = [
    {
      id: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID,
      name: "Monthly Plan",
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
      id: import.meta.env.VITE_STRIPE_SIX_MONTH_PRICE_ID,
      name: "6 Months Plan",
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
      id: import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID,
      name: "Yearly Plan",
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

  if (type === "feature") {
    return planConfigs;
  }

  if (!priceData || !Array.isArray(priceData)) {
    return [];
  }

  return planConfigs.map((config) => {
    const stripeInfo = priceData.find((p) => p.priceId === config.id);

    return {
      ...config,
      price: stripeInfo?.displayPrice ,
      currency: stripeInfo?.currency ,
      displayPrice: stripeInfo?.displayPrice ,
    };
  });
};
