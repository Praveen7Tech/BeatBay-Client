
import { AdminRevenueStats } from "../../components/revenue/RevenueStatus";
import { AdminTopRevenueTable } from "../../components/revenue/TopRevenueTable";
import { AdminRevenueChart } from "../../components/revenue/RevenueChart";
import { AdminPayoutHistory } from "../../components/revenue/PayoutHistory";
import { useAdminRevenueStats } from "@/core/hooks/admin/revenue/useRevenueDashboard";
import { SpinnerArtist } from "@/components/ui/spinner";


export default function AdminPlatFormRevenue() {
  const { data, isLoading } = useAdminRevenueStats();

  if (isLoading) return <SpinnerArtist />;

  const revenuestats = data?.stats;

  const topArtists =
    data?.topArtists?.map((artist) => ({
      id: artist.artistId,
      rank: artist.rank,
      name: artist.name,
      image: artist.profilePicture,
      revenue: artist.revenue,
      streams: artist.streams,
    })) ?? [];

  const topSongs =
    data?.topSongs?.map((song) => ({
      id: song.songId,
      rank: song.rank,
      name: song.title,
      image: song.image,
      revenue: song.revenue,
      streams: song.streams,
    })) ?? [];

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-border pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Revenue Dashboard
          </h1>
          <p className="text-muted-foreground">
            Platform revenue overview, top earners, and payout tracking
          </p>
        </div>

        <AdminRevenueStats stats={revenuestats!} />
        <AdminRevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminTopRevenueTable
            title="Top Artists by Revenue"
            description="Highest earning artists"
            items={topArtists} type="artist"
          />

          <AdminTopRevenueTable
            title="Top Songs by Revenue" 
            description="Highest earning tracks"
            items={topSongs} type="song"
          />
        </div>

        <AdminPayoutHistory />
      </div>
    </div>
  );
}
