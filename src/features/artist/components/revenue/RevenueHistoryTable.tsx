import { CheckCircle, Clock, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PayOuts } from "../../services/artist.api";
import { format, parseISO } from "date-fns";


interface RevenueHistoryTableProps {
  payouts: PayOuts[];
}

export const RevenueHistoryTable = ({ payouts }: RevenueHistoryTableProps) => {
  const getStatusBadge = (status: PayOuts["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-[#1DB954]/10 text-[#1DB954] hover:bg-[#1DB954]/20 border-0">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-0">
            <Clock size={12} className="mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0">
            <XCircle size={12} className="mr-1" />
            Failed
          </Badge>
        );
    }
  };

  if (payouts?.length === 0) {
    return (
      <div className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-1">Payout History</h3>
        <p className="text-[#a7a7a7] text-sm mb-6">Your payment transactions</p>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-[#282828] p-4 rounded-full mb-4">
            <Clock size={32} className="text-[#a7a7a7]" />
          </div>
          <p className="text-white font-medium mb-1">No payouts yet</p>
          <p className="text-[#a7a7a7] text-sm">
            Your first payout will appear here once processed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-1">Payout History</h3>
      <p className="text-[#a7a7a7] text-sm mb-6">Your payment transactions</p>

      <Table>
        <TableHeader>
          <TableRow className="border-[#282828] hover:bg-transparent">
            <TableHead className="text-[#a7a7a7]">Date</TableHead>
            <TableHead className="text-[#a7a7a7]">Reference</TableHead>
            <TableHead className="text-[#a7a7a7]">Method</TableHead>
            <TableHead className="text-[#a7a7a7]">Status</TableHead>
            <TableHead className="text-[#a7a7a7] text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts?.map((payout) => (
            <TableRow
              key={payout.id}
              className="border-[#282828] hover:bg-[#282828] transition-colors"
            >
              <TableCell className="text-white">{format(parseISO(payout.date),"MMM dd, yyyy")}</TableCell>
              <TableCell className="text-[#a7a7a7] font-mono text-sm">
                {payout.reference}
              </TableCell>
              <TableCell className="text-[#a7a7a7]">{payout.method}</TableCell>
              <TableCell>{getStatusBadge(payout.status)}</TableCell>
              <TableCell className="text-white text-right font-medium">
                ${payout.amount.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
