import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { userApi } from "@/features/user/services/userApi";

export const useSubscription = () => {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const isPremium = useSelector( (state: RootState) => state.auth.user?.isPremium);

    const handleSubscribe = async ( priceId: string,setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (isPremium) {
            setShowUpgradeDialog(true);
            return;
        }

        setIsProcessing(true);

        try {
            const res = await userApi.subscriptionCheckout(priceId);
            if (res.url) {
                window.location.href = res.url;
            }
        } catch (error) {
            console.error("Subscription failed");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUpgradeSubscription = async () => {
        try {
            const data = await userApi.upgradeSubscription();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Upgrade failed");
        }
    };

    return {
        handleSubscribe,
        handleUpgradeSubscription,
        showUpgradeDialog,
        setShowUpgradeDialog,
    };
};
