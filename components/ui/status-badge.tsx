import { cn } from "@/lib/utils"

type StatusType = "running" | "completed" | "failed" | "pending"

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  running: {
    label: "Running",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  completed: {
    label: "Completed",
    className: "bg-success/20 text-success border-success/30",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
  pending: {
    label: "Pending",
    className: "bg-warning/20 text-warning border-warning/30",
  },
}

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status]
  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", config.className)}
    >
      {status === "running" && <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-current" />}
      {config.label}
    </span>
  )
}
