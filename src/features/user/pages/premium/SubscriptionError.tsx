import { XCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated warning indicators */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <AlertTriangle
            key={i}
            className="absolute text-destructive/20 animate-pulse"
            style={{
              left: `${20 + i * 20}%`,
              top: `${25 + (i % 2) * 30}%`,
              animationDelay: `${i * 0.4}s`,
              width: 20 + (i % 2) * 8,
              height: 20 + (i % 2) * 8,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-md animate-fade-in">
        {/* Animated error icon with shake effect */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-destructive/20 animate-pulse" />
          <div 
            className="relative w-full h-full rounded-full bg-destructive/20 flex items-center justify-center animate-scale-in"
            style={{
              animation: 'scale-in 0.3s ease-out, shake 0.5s ease-in-out 0.3s'
            }}
          >
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Payment Failed
        </h1>
        <p className="text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          We couldn't process your payment. Please check your payment details and try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => navigate("/subscription")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(29,185,84,0.4)]"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default SubscriptionError;
