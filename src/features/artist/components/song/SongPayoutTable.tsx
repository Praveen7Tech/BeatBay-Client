import { DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SongPayout {
  payoutId: string;
  period: string;
  revenue: number;
}

interface Props {
  payouts: SongPayout[];
}

export const SongPayoutTable = ({ payouts }: Props) => {
  const totalRevenue = payouts.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <div className="bg-[#181818] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-1">
            Payout History
          </h3>
          <p className="text-[#a7a7a7] text-sm">
            Monthly revenue breakdown for this track
          </p>
        </div>

        <div className="bg-[#1DB954]/10 text-[#1DB954] px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
          <DollarSign size={14} />
          ${totalRevenue.toLocaleString()}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-[#282828] hover:bg-transparent">
            <TableHead className="text-[#a7a7a7] w-16">#</TableHead>
            <TableHead className="text-[#a7a7a7]">
              Payout Period
            </TableHead>
            <TableHead className="text-[#a7a7a7] text-right">
              Revenue
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payouts.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-[#a7a7a7] py-6"
              >
                No payouts yet
              </TableCell>
            </TableRow>
          ) : (
            payouts.map((payout, index) => (
              <TableRow
                key={payout.payoutId}
                className="border-[#282828] hover:bg-[#282828] transition-colors"
              >
                <TableCell className="text-[#a7a7a7] font-medium">
                  {index + 1}
                </TableCell>

                <TableCell className="text-white">
                  {payout.period}
                </TableCell>

                <TableCell className="text-white text-right font-medium">
                  ${payout.revenue.toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
