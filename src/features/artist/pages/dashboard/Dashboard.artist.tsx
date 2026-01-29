import { ArtistDashboardStats } from "../../components/dashboard/artistDashboardStats";
import { ArtistRevenueChart } from "../../components/dashboard/artistRevenueChart";
import { ArtistGrowthChart } from "../../components/dashboard/artistGrowthChart";
import { ArtistTopContent } from "../../components/dashboard/artistTopContents";

export default function ArtistDashboard() {
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-white text-3xl font-bold">Artist Dashboard</h1>
            <p className="text-[#a7a7a7]">Track your performance and growth</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8">
        <ArtistDashboardStats />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ArtistRevenueChart />
        <ArtistGrowthChart />
      </div>

      {/* Top Content */}
      <ArtistTopContent />
    </div>
  );
}
