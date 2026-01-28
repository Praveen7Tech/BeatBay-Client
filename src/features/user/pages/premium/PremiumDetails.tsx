import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useSubscription } from "@/core/hooks/subscription/useAutoSubscriptionToggle";
import { useState } from "react";
import { useCancelSubscription } from "@/core/hooks/subscription/useCancelSubscription";
import { useSubscriptionHistory } from "@/core/hooks/subscription/useSubscriptionHistory";
import { NoPremium } from "../../components/premium/NoPremiumFallback";
import CurrentPlanCard from "../../components/premium/CurrentPlanCard";
import PaymentSettingsCard from "../../components/premium/PaymentSettingsCard";
import PremiumFeaturesCard from "../../components/premium/PremiumFeaturesCard";
import PaymentHistoryCard from "../../components/premium/PaymentHistoryCard";
import CancelSubscriptionDialog from "../../components/premium/CancelSubscriptionDialog";
import PremiumHeader from "../../components/premium/PremiumHeader";

const PremiumDetails = () => {

  const user = useSelector((state:RootState)=> state.auth.user)
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const userId = user?.id
  const hasPremium = !!user?.isPremium

  const { plan, isLoading, toggleAutoRenew, isToggling } = useSubscription(userId!, hasPremium);
  const { cancelSubscription } = useCancelSubscription(userId!)
  const {paymentHistory, isLoadingHistory} = useSubscriptionHistory(userId!)

  if(isLoading || isLoadingHistory) return <SpinnerCustom/>
  
  const handleCancelSubscription = () => {
     cancelSubscription(plan?.subscriptionId!)
     setShowCancelDialog(false);
  };
 
  const hasPaymentHistory = (paymentHistory ?? []).length > 0;

  // Fallback UI for non-premium users
  if (!hasPremium) {
    return <NoPremium paymentHistory={paymentHistory!}/>
  }

  return (
    <div className="min-h-screen p-6 md:p-10 bg-black">
      <div className="max-w-5xl mx-auto">
        <PremiumHeader/>
        <div className="grid md:grid-cols-2 gap-6">
          <CurrentPlanCard plan={plan!}/>
          <PaymentSettingsCard 
             autoRenew={plan?.autoReniewEnable!} 
             billingDate={plan?.nextBillingDate!} 
             isToggling={isToggling} 
             setShowCancelDialog={setShowCancelDialog} 
             toggleAutoRenew={toggleAutoRenew}
          />
          <PremiumFeaturesCard/>
          <PaymentHistoryCard 
             hasPaymentHistory={hasPaymentHistory} 
             paymentHistory={paymentHistory!}
          />
        </div>
      </div>
      <CancelSubscriptionDialog 
         billingDate={plan?.nextBillingDate!} 
         handleCancelSubscription={handleCancelSubscription} 
         setShowCancelDialog={setShowCancelDialog} 
         showCancelDialog={showCancelDialog}
      />
    </div>
  );
};

export default PremiumDetails;
