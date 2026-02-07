import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Crown, Sparkles } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  showUpgradeDialog: boolean;
  setShowUpgradeDialog: Dispatch<SetStateAction<boolean>>;
 handleUpgrade: ()=> void
}

const UpgradeSubscriptionDialog = ({
  showUpgradeDialog,
  setShowUpgradeDialog,
  handleUpgrade,
}: Props) => {
  

  return (
    <AlertDialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
      <AlertDialogContent className="bg-card border-border max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-primary/20">
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-foreground">
              Upgrade Your Plan
            </AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-muted-foreground space-y-4">
            <p>
              You’re currently subscribed to a Premium plan. Want even more
              power and features?
            </p>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 space-y-2">
              <p className="font-medium text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                With the upgraded plan you get:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Higher audio quality & exclusive tracks</li>
                <li>• Early access to new releases</li>
                <li>• Priority streaming & zero buffering</li>
                <li>• Exclusive premium-only features</li>
              </ul>
            </div>

            <p className="text-sm">
              Upgrade now and enjoy the enhanced experience instantly.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-3 sm:gap-3">
          <AlertDialogCancel className="bg-transparent border-border text-foreground hover:bg-secondary font-medium">
            Not Now
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleUpgrade}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            Upgrade Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpgradeSubscriptionDialog;
