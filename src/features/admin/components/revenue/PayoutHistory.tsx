import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import AdminPagination from "../common/pagination/songPagination";
import { useAdminPayoutHistory } from "@/core/hooks/admin/revenue/useRevenueDashboard";

const statusConfig = {
  completed: { icon: CheckCircle, label: "Completed", variant: "default" as const, className: "bg-primary/15 text-primary border-primary/30" },
  pending: { icon: Clock, label: "Pending", variant: "secondary" as const, className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30" },
  failed: { icon: XCircle, label: "Failed", variant: "destructive" as const, className: "bg-destructive/15 text-destructive border-destructive/30" },
};

export const AdminPayoutHistory = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useAdminPayoutHistory(page);

  if (isLoading) return null;

  const payouts = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalItems = data?.total ?? 0;

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">
          Payout History
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Platform payouts to artists
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="hidden sm:table-cell">Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payouts.map((p) => {
            const sc = statusConfig[p.status];
            const Icon = sc.icon;

            return (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {p.id}
                </TableCell>

                <TableCell className="font-medium text-foreground">
                  {p.artist}
                </TableCell>

                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {p.date}
                </TableCell>

                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {p.method}
                </TableCell>

                <TableCell>
                  <Badge variant={sc.variant} className={sc.className}>
                    <Icon className="w-3 h-3 mr-1" />
                    {sc.label}
                  </Badge>
                </TableCell>

                <TableCell className="text-right font-semibold text-foreground">
                  ${p.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="px-6 pb-4">
        <AdminPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={totalItems}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};
