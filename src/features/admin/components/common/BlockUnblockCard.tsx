import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface BlockStatusCardProps {
  type: "artist" | "user";
  status?: boolean;
  isLoading: boolean;
  onToggle: () => void;
}

export default function BlockStatusCard({
  type,
  status,
  isLoading,
  onToggle
}: BlockStatusCardProps) {
  const isBlocked = !status;
  const title = type === "artist"
    ? isBlocked ? "Artist Blocked" : "Artist Active"
    : isBlocked ? "User Blocked" : "User Active";

  const blockMessage =
    type === "artist"
      ? "This artist is currently blocked and cannot upload content."
      : "This user is currently blocked from accessing the platform.";

  const buttonText =
    isLoading
      ? "Processing..."
      : isBlocked
      ? `Unblock ${type === "artist" ? "Artist" : "User"}`
      : `Block ${type === "artist" ? "Artist" : "User"}`;

  return (
    <Card className={`border-2 ${isBlocked ? "bg-red-500/10 border-red-500" : "bg-spotify-dark border-spotify-tertiary"}`}>
      <CardHeader>
        <CardTitle className={isBlocked ? "text-red-500" : "text-spotify-text"}>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isBlocked && (
          <div className="flex gap-3 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-500">{blockMessage}</p>
          </div>
        )}

        <Button
          onClick={onToggle}
          disabled={isLoading}
          variant={isBlocked ? "default" : "destructive"}
          className="w-full"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
