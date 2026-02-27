import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RevenueItem {
  id: string
  rank: number;
  name: string;
  image?: string | null;
  revenue: number;
  streams: number;
}

type RevenueTableType = "artist" | "song";

interface AdminTopRevenueTableProps {
  title: string;
  description: string;
  items: RevenueItem[];
  type: RevenueTableType;
}

export const AdminTopRevenueTable = ({title, description,items, type,}: AdminTopRevenueTableProps) => {
  const navigate = useNavigate();
  const Icon = type === "artist" ? User : Music;
  const handleNavigate = (id: string) => {
    if (type === "artist") {
      navigate(`/admin/artists/${id}`);
    } else {
      navigate(`/admin/songs/${id}`);
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Streams</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items?.map((item) => (
            <TableRow key={item.rank}  onClick={() => handleNavigate(item.id)}
              className="cursor-pointer">
              <TableCell className="font-bold">{item.rank}</TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-md object-cover border border-border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-muted border border-border">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}

                  <p className="font-medium text-foreground">{item.name}</p>
                </div>
              </TableCell>

              <TableCell className="hidden sm:table-cell text-muted-foreground">
                {item.streams.toLocaleString()}
              </TableCell>

              <TableCell className="text-right font-semibold">
                ${item.revenue.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};