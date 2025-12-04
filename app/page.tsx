import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { DocumentCard } from "@/components/documents/document-card"
import { dashboardStats, getMyDocuments, currentUser, activities } from "@/lib/placeholder-data"
import { FileText, Play, AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const myDocuments = getMyDocuments(currentUser.id)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Welcome back, {currentUser.name.split(" ")[0]}</h2>
          <p className="text-muted-foreground">Here's an overview of your workspace</p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Documents" value={dashboardStats.totalDocuments} icon={FileText} />
          <StatCard title="Total Runs" value={dashboardStats.totalRuns} icon={Play} />
          <StatCard
            title="Failed Runs"
            value={dashboardStats.failedRuns}
            icon={AlertTriangle}
            description="Requires attention"
          />
          <StatCard title="Pending Reviews" value={dashboardStats.pendingReviews} icon={Clock} />
        </div>

        {/* My Documents Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">My Documents</h3>
            <Button variant="outline" size="sm" asChild>
              <Link href="/documents">View All Documents</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myDocuments.slice(0, 6).map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
          {myDocuments.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No documents yet. Create your first document to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    {activity.type === "run" && <Play className="h-4 w-4 text-muted-foreground" />}
                    {activity.type === "document" && <FileText className="h-4 w-4 text-muted-foreground" />}
                    {activity.type === "approval" && <Clock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.user} · {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
