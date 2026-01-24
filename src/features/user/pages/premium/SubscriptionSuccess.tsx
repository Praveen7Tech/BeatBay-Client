import { CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, price } = location.state || { plan: "Premium", price: 9.99 };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Premium!
        </h1>
        <p className="text-muted-foreground mb-6">
          Your {plan} subscription (${price}) is now active. Enjoy unlimited music without interruptions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Listening
          </button>
          <button
            onClick={() => navigate("/playlists")}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
          >
            My Playlists
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
