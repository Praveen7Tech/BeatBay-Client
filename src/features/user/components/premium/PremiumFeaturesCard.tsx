import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { premiumFeatures } from "../../utils/premium.features";

interface PremiumFeaturesCardProps {
  features?: string[];
}

const PremiumFeaturesCard = ({ features }: PremiumFeaturesCardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Premium Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {premiumFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-primary/20">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PremiumFeaturesCard;
