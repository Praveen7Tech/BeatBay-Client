export const plans = [
  {
    name: "Monthly",
    priceId: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID,
    price: 99,
    period: "Billed monthly",
    features: [
      "Ad-free music listening",
      "Unlimited skips",
      "Offline downloads",
      "High quality audio",
      "Cancel anytime",
    ],
  },
  {
    name: "6 Months",
    priceId: import.meta.env.VITE_STRIPE_SIX_MONTH_PRICE_ID,
    price: 199,
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
    name: "Yearly",
    priceId: import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID,
    price: 399,
    period: "Billed annually",
    savings: "Save 25%",
    features: [
      "All 6 Months features",
      "2 months free",
      "Premium badge on profile",
      "Unlimited room hosting",
      "Lyrics & karaoke mode",
    ],
  },
];