import { Link } from "react-router-dom";
import { ArrowLeft, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import album1 from "/src/assets/bg.png";
import album2 from "/src/assets/bg.png";
import album3 from "/src/assets/bg.png";
import { RevenueChart, RevenueDataPoint } from "../../components/revenue/RevenueChart";
import { RevenueSongTable, SongRevenue } from "../../components/revenue/RevenueSongTable";
import { PayoutHistory, RevenueHistoryTable } from "../../components/revenue/RevenueHistoryTable";
import { RevenueEmptyState } from "../../components/revenue/RevenueEmptyState";
import { RevenueOverview } from "../../components/revenue/RevenueOverwiew";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";
import { useArtistOnBoarding } from "@/core/hooks/artist/revenue/useArtistOnboarding";

// Mock revenue data
const mockRevenueStats = {
  totalRevenue: 45892,
  thisMonth: 8542,
  pendingPayout: 2340,
  nextPayoutDate: "Feb 15, 2026",
  monthlyChange: 12.5,
};

const mockChartData: RevenueDataPoint[] = [
  { month: "Jan", revenue: 4200, streams: 45000 },
  { month: "Feb", revenue: 3800, streams: 42000 },
  { month: "Mar", revenue: 5100, streams: 58000 },
  { month: "Apr", revenue: 4700, streams: 52000 },
  { month: "May", revenue: 6200, streams: 71000 },
  { month: "Jun", revenue: 5800, streams: 65000 },
  { month: "Jul", revenue: 7100, streams: 82000 },
  { month: "Aug", revenue: 8542, streams: 94000 },
  { month: "Sep", revenue: 7800, streams: 88000 },
  { month: "Oct", revenue: 9200, streams: 102000 },
  { month: "Nov", revenue: 8900, streams: 98000 },
  { month: "Dec", revenue: 10500, streams: 115000 },
];

const mockSongRevenue: SongRevenue[] = [
  { id: "1", title: "Midnight Dreams", albumCover: album1, streams: 245000, revenue: 12250, change: 15 },
  { id: "2", title: "Electric Hearts", albumCover: album2, streams: 189000, revenue: 9450, change: 8 },
  { id: "3", title: "Summer Nights", albumCover: album3, streams: 156000, revenue: 7800, change: -3 },
  { id: "4", title: "City Lights", albumCover: album1, streams: 134000, revenue: 6700, change: 22 },
  { id: "5", title: "Ocean Waves", albumCover: album2, streams: 98000, revenue: 4900, change: -5 },
];

const mockPayoutHistory: PayoutHistory[] = [
  { id: "1", date: "Jan 15, 2026", amount: 8542, status: "completed", method: "Bank Transfer", reference: "PAY-2026-0115" },
  { id: "2", date: "Dec 15, 2025", amount: 7100, status: "completed", method: "Bank Transfer", reference: "PAY-2025-1215" },
  { id: "3", date: "Nov 15, 2025", amount: 5800, status: "completed", method: "Bank Transfer", reference: "PAY-2025-1115" },
  { id: "4", date: "Feb 15, 2026", amount: 2340, status: "pending", method: "Bank Transfer", reference: "PAY-2026-0215" },
];

export default function ArtistRevenue() {

  const artist = useSelector((state:RootState)=> state.auth.user)
  const isPayoutEnabled = artist?.payOutEnabled;

  const {onBoarding} = useArtistOnBoarding()

  const handleActivateMonetization = () => {  
    onBoarding()
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/artist/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#a7a7a7] hover:text-white hover:bg-[#282828]"
            >
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-white text-3xl font-bold">Revenue</h1>
            <p className="text-[#a7a7a7]">Track your earnings and payouts</p>
          </div>
        </div>

        {isPayoutEnabled && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-[#282828] bg-transparent text-white hover:bg-[#282828]"
            >
              <Download size={18} className="mr-2" />
              Export Report
            </Button>
            <Button
              variant="outline"
              className="border-[#282828] bg-transparent text-white hover:bg-[#282828]"
            >
              <Settings size={18} className="mr-2" />
              Payout Settings
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      {!isPayoutEnabled ? (
        <RevenueEmptyState onActivate={handleActivateMonetization} />
      ) : (
        <div className="space-y-6">
          {/* Stats Overview */}
          <RevenueOverview stats={mockRevenueStats} />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart data={mockChartData} />
            <RevenueSongTable songs={mockSongRevenue.slice(0, 5)} />
          </div>

          {/* Payout History */}
          <RevenueHistoryTable payouts={mockPayoutHistory} />
        </div>
      )}
    </div>
  );
}
