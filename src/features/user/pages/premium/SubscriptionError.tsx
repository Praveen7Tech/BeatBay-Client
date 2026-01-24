import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Payment Failed
        </h1>
        <p className="text-muted-foreground mb-6">
          We couldn't process your payment. Please check your payment details and try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/premium")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionError;
