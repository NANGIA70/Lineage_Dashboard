import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { activities } from "@/lib/placeholder-data"
import { Play, BarChart3, Database, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const typeIcons = {
  run: Play,
  metric: BarChart3,
  dataset: Database,
  narrative: FileText,
}

const actionColors = {
  completed: "text-success",
  failed: "text-destructive",
  updated: "text-primary",
  created: "text-primary",
  started: "text-warning",
}

function formatTime(timestamp: string) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return "Just now"
}

export function ActivityFeed() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-card-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-4 pb-6">
            {activities.map((activity) => {
              const Icon = typeIcons[activity.type]
              return (
                <div key={activity.id} className="flex gap-4">
                  <div className="mt-1">
                    <div className="rounded-lg bg-secondary p-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-card-foreground">
                      <span
                        className={cn(
                          "font-medium capitalize",
                          actionColors[activity.action as keyof typeof actionColors],
                        )}
                      >
                        {activity.action}
                      </span>
                      {" — "}
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.user} • {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
