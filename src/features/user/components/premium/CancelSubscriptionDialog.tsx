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
import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  showCancelDialog: boolean;
  setShowCancelDialog: Dispatch<SetStateAction<boolean>>;
  billingDate: Date;
  handleCancelSubscription:()=> void
}

const CancelSubscriptionDialog = ({showCancelDialog, setShowCancelDialog,billingDate,handleCancelSubscription}: Props) => (
    
  <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
    <AlertDialogContent className="bg-card border-border max-w-md">
      <AlertDialogHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-full bg-destructive/20">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-foreground">
            Cancel Subscription?
          </AlertDialogTitle>
        </div>
        <AlertDialogDescription className="text-muted-foreground space-y-3">
          <p>Are you sure you want to cancel your Premium subscription?</p>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 space-y-2">
            <p className="font-medium text-destructive">
              You will lose access to:
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Ad-free music listening</li>
              <li>• Offline downloads</li>
              <li>• High quality audio (320kbps)</li>
              <li>• All other premium features</li>
            </ul>
          </div>
          <p className="text-sm">
            Your access will continue until{" "}
            <span className="font-semibold text-foreground">
              {billingDate
                ? format(new Date(billingDate), "MMM dd, yyyy")
                : "N/A"}
            </span>
            .
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="gap-3 sm:gap-3">
        <AlertDialogCancel className="bg-transparent border-border text-foreground hover:bg-secondary font-medium">
          Keep Subscription
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={handleCancelSubscription}
          className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium"
        >
          Yes, Cancel
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default CancelSubscriptionDialog;
