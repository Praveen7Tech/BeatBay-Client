import { CheckCircle, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, price } = location.state || { plan: "Premium", price: 9.99 };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-primary/30 animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              width: 24 + (i % 3) * 8,
              height: 24 + (i % 3) * 8,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-md animate-fade-in">
        {/* Animated success icon */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-primary/20 flex items-center justify-center animate-scale-in">
            <CheckCircle className="w-12 h-12 text-primary animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Welcome to Premium!
        </h1>
        <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Your {plan} subscription (${price}) is now active. Enjoy unlimited music without interruptions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(29,185,84,0.4)]"
          >
            Start Listening
          </button>
          <button
            onClick={() => navigate("/playlists")}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
          >
            My Playlists
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
