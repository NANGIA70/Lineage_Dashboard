import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { dashboardStats } from "@/lib/placeholder-data"
import { Play, AlertTriangle, FileText, BarChart3 } from "lucide-react"

export default function OverviewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
          <p className="text-muted-foreground">Monitor your data lineage and workflow status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Runs This Week"
            value={dashboardStats.runsThisWeek}
            icon={Play}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Failed Runs"
            value={dashboardStats.failedRuns}
            icon={AlertTriangle}
            description="Requires attention"
          />
          <StatCard title="Narratives Pending" value={dashboardStats.narrativesPending} icon={FileText} />
          <StatCard
            title="Metrics Updated"
            value={dashboardStats.metricsUpdated}
            icon={BarChart3}
            description="In the last 24 hours"
          />
        </div>

        {/* Activity Feed */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ActivityFeed />
          {/* Placeholder for additional widgets */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Data Pipeline</span>
                <span className="text-sm font-medium text-success">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Risk Engine</span>
                <span className="text-sm font-medium text-success">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Report Generator</span>
                <span className="text-sm font-medium text-warning">Degraded</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Database</span>
                <span className="text-sm font-medium text-success">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
