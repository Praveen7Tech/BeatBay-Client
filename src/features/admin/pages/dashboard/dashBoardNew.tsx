import { BarChart3, PieChart, Activity } from 'lucide-react';
import { AdminOverviewStats } from '../../components/dash/AdminOverViewStatus';
import { AdminDemographicsChart } from '../../components/dash/AdminDemographicsChart';
import { AdminEntityBreakdown } from '../../components/dash/AdminEntityBreakDown';
import { AdminGrowthChart } from '../../components/dash/AdminGrowthChart';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="border-b border-border pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Platform overview, analytics, and demographics
          </p>
        </div>

        {/* Overview Stats */}
        <AdminOverviewStats />

        {/* Demographics Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Demographics</h2>
          </div>
          <AdminDemographicsChart />
        </section>

        {/* Breakdown Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Entity Breakdown</h2>
          </div>
          <AdminEntityBreakdown />
        </section>

        {/* Growth Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Growth</h2>
          </div>
          <AdminGrowthChart />
        </section>

      </div>
    </div>
  );
}
