import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    positive: boolean
  }
  className?: string
}

export function StatCard({ title, value, description, icon: Icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("bg-card border-border", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-semibold text-card-foreground">{value}</p>
              {trend && (
                <span className={cn("text-sm font-medium", trend.positive ? "text-success" : "text-destructive")}>
                  {trend.positive ? "+" : ""}
                  {trend.value}%
                </span>
              )}
            </div>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          <div className="rounded-lg bg-secondary p-3">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
