
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format, parseISO } from "date-fns";

interface InfoField {
  label?: string;
  value?: string | number | null;
}

interface AccountInfoProps {
  email?: string;
  createdAt?: string;
  id?: string;
  showId?: boolean;
}

export default function AccountInfoCard({
  email,
  createdAt,
  id,
  showId = false,
}: AccountInfoProps) {
  const fields: InfoField[] = [
    { label: "Email Address", value: email },
    { label: "Join Date", value: format(parseISO(createdAt!), "MMM dd, yyyy") },
  ];

  if (showId && id) {
    fields.push({ label: "User ID", value: id });
  }

  return (
    <Card className="bg-spotify-dark border-spotify-tertiary">
      <CardHeader>
        <CardTitle className="text-spotify-text">Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {fields.map((field, index) => (
            <div key={index}>
              <p className="text-sm text-spotify-secondary mb-1">{field.label}</p>
              <p className="text-spotify-text font-medium text-sm break-all">{field.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
