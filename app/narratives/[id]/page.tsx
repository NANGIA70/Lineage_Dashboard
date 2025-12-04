"use client"

import { use } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { narratives } from "@/lib/placeholder-data"
import { ArrowLeft, Calendar, FileText, Play, Download, Printer } from "lucide-react"

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Extended placeholder content for the narrative document
const narrativeSections = [
  {
    title: "Executive Summary",
    content: `This document provides a comprehensive overview of the daily risk metrics and trading performance for the reporting period. Key highlights include stable market risk exposure within approved limits, positive trading desk performance driven by favorable market conditions, and continued compliance with regulatory capital requirements.

The overall risk profile remains conservative, with Value at Risk (VaR) metrics showing a slight decrease compared to the previous reporting period. Liquidity coverage ratios exceed regulatory minimums by a comfortable margin.`,
  },
  {
    title: "Market Risk Analysis",
    content: `Market risk exposure remained within approved limits during the reporting period. The primary drivers of risk continue to be equity and interest rate exposures in the trading book.

Key observations:
- Total VaR decreased by 2.4% compared to the prior day
- No limit breaches were recorded
- Stress test results indicate adequate capital buffers
- Sensitivity analysis shows manageable exposure to key risk factors

The risk team continues to monitor emerging market volatility and geopolitical developments that could impact the portfolio.`,
  },
  {
    title: "Trading Performance",
    content: `Trading desk performance was positive during the reporting period, with net P&L of $2.3 million attributable primarily to equity derivatives and fixed income strategies.

Attribution breakdown:
- Equity Derivatives: +$1.2M
- Fixed Income: +$0.8M
- FX Trading: +$0.3M
- Commodities: +$0.0M

Performance metrics remain within expected ranges given current market conditions and approved risk appetite.`,
  },
  {
    title: "Regulatory Compliance",
    content: `All regulatory ratios continue to exceed minimum requirements:

- Liquidity Coverage Ratio (LCR): 142.5% (minimum: 100%)
- Net Stable Funding Ratio (NSFR): 118.3% (minimum: 100%)
- Common Equity Tier 1 (CET1): 13.8% (minimum: 10.5%)

The compliance team confirms no regulatory filings are overdue and all upcoming deadlines are on track for timely submission.`,
  },
]

export default function NarrativeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const narrative = narratives.find((n) => n.id === id)

  if (!narrative) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Narrative not found</p>
          <Link href="/narratives">
            <Button variant="link" className="mt-4">
              Back to Narratives
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <Link
              href="/narratives"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Narratives
            </Link>
            <h2 className="text-2xl font-semibold text-foreground">{narrative.name}</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {narrative.section}
              </span>
              <span className="flex items-center gap-1">
                <Play className="h-4 w-4" />
                <Link href={`/runs/${narrative.runId}`} className="text-primary hover:underline">
                  {narrative.runId}
                </Link>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDateTime(narrative.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Document Content */}
        <Card className="bg-card border-border">
          <CardContent className="p-8 md:p-12">
            {/* Document Header */}
            <div className="border-b border-border pb-6 mb-8">
              <h1 className="text-3xl font-bold text-card-foreground mb-2">{narrative.name}</h1>
              <p className="text-muted-foreground">
                Generated from {narrative.runId} • {formatDateTime(narrative.createdAt)}
              </p>
            </div>

            {/* Document Sections */}
            <div className="space-y-8">
              {narrativeSections.map((section, index) => (
                <section key={index} className="space-y-3">
                  <h2 className="text-xl font-semibold text-card-foreground">
                    {index + 1}. {section.title}
                  </h2>
                  <div className="text-card-foreground/90 whitespace-pre-line leading-relaxed">{section.content}</div>
                </section>
              ))}
            </div>

            {/* Document Footer */}
            <div className="border-t border-border mt-12 pt-6">
              <p className="text-sm text-muted-foreground text-center">
                This document was automatically generated by the Lineage system. For questions or corrections, contact
                the Risk Analytics team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
