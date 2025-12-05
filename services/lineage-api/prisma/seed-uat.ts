import { PrismaClient } from "@prisma/client"

/**
 * UAT seed summary:
 * - Documents: AQRR – Acme Q4 2024 (completed runs v3, v2), Credit Memo – Sterling 2024 (completed v1), Risk Report – Quantum Q3 2024.
 * - Runs: AQRR v3 is primary for values/lineage; AQRR v2 and Credit Memo v1 present for navigation realism.
 * - Key Value IDs (all seeded with data): VAL-REV-Q4/Q3/Q4-PRIOR/GROWTH/QOQ, VAL-GM-Q4/Q3/Yoy/QoQ, VAL-EBITDA-Q4/Q3/MARGIN, VAL-DEBT-Q4/Q3, VAL-LEVERAGE, VAL-NI-Q4/Q3, VAL-DSCR, VAL-CR, VAL-RATING, etc.
 * - Lineage edges: revenue growth, gross margin, EBITDA margin, leverage chains connect inputs to outputs.
 * - Narrative chunks link to these values for table/narrative click-through.
 */

const prisma = new PrismaClient()

async function main() {
  await prisma.narrativeChunkValue.deleteMany()
  await prisma.narrativeChunk.deleteMany()
  await prisma.narrativeSection.deleteMany()
  await prisma.lineageEdge.deleteMany()
  await prisma.value.deleteMany()
  await prisma.table.deleteMany()
  await prisma.run.deleteMany()
  await prisma.document.deleteMany()

  const documents = await prisma.$transaction([
    prisma.document.create({
      data: { type: "AQRR", entity: "Acme Corp", period: "Q4 2024", status: "in_review" },
    }),
    prisma.document.create({
      data: { type: "Credit Memo", entity: "Sterling Partners", period: "2024", status: "approved" },
    }),
    prisma.document.create({
      data: { type: "Risk Report", entity: "Quantum Holdings", period: "Q3 2024", status: "published" },
    }),
  ])

  const [doc1, doc2] = documents

  const runs = await prisma.$transaction([
    prisma.run.create({
      data: {
        documentId: doc1.id,
        version: 3,
        workflowName: "AQRR Generation Pipeline",
        status: "completed",
        startTime: new Date("2024-12-04T08:00:00Z"),
        endTime: new Date("2024-12-04T08:45:00Z"),
        triggeredBy: "john.doe@company.com",
      },
    }),
    prisma.run.create({
      data: {
        documentId: doc1.id,
        version: 2,
        workflowName: "AQRR Generation Pipeline",
        status: "completed",
        startTime: new Date("2024-12-03T08:00:00Z"),
        endTime: new Date("2024-12-03T08:30:00Z"),
        triggeredBy: "john.doe@company.com",
      },
    }),
    prisma.run.create({
      data: {
        documentId: doc2.id,
        version: 1,
        workflowName: "Credit Memo Pipeline",
        status: "completed",
        startTime: new Date("2024-11-30T15:00:00Z"),
        endTime: new Date("2024-11-30T16:00:00Z"),
        triggeredBy: "analyst@example.com",
      },
    }),
  ])

  const primaryRun = runs[0]

  const table = await prisma.table.create({
    data: {
      runId: primaryRun.id,
      name: "Financial Statement Analysis",
      type: "fsa",
      rowCount: 5,
      columnCount: 6,
    },
  })

  const val = (id: string, label: string, value: string, extras?: { table?: boolean; row?: number; col?: number }) =>
    prisma.value.create({
      data: {
        id,
        label,
        value,
        runId: primaryRun.id,
        tableId: extras?.table ? table.id : undefined,
        rowIndex: extras?.row,
        columnIndex: extras?.col,
      },
    })

  const createdValues = await prisma.$transaction([
    val("VAL-REV-Q4", "Revenue Q4", "$892M", { table: true, row: 0, col: 1 }),
    val("VAL-REV-Q3", "Revenue Q3", "$845M", { table: true, row: 0, col: 2 }),
    val("VAL-REV-Q4-PRIOR", "Revenue Q4 Prior", "$793M"),
    val("VAL-REV-GROWTH", "Revenue Growth", "12.5%"),
    val("VAL-REV-QOQ", "Revenue QoQ", "5.6%"),
    val("VAL-GP-Q4", "Gross Profit Q4", "$375M"),
    val("VAL-GP-Q3", "Gross Profit Q3", "$352M"),
    val("VAL-GP-Q4-PRIOR", "Gross Profit Q4 Prior", "$322M"),
    val("VAL-GP-YOY", "Gross Profit YoY", "16.5%"),
    val("VAL-GP-QOQ", "Gross Profit QoQ", "6.5%"),
    val("VAL-GM-Q4", "Gross Margin Q4", "42.1%", { table: true, row: 1, col: 1 }),
    val("VAL-GM-Q3", "Gross Margin Q3", "41.7%"),
    val("VAL-GM-Q4-PRIOR", "Gross Margin Q4 Prior", "40.6%"),
    val("VAL-GM-YOY", "Gross Margin YoY", "+150bps"),
    val("VAL-GM-QOQ", "Gross Margin QoQ", "+40bps"),
    val("VAL-EBITDA-Q4", "EBITDA Q4", "$217M"),
    val("VAL-EBITDA-Q3", "EBITDA Q3", "$198M"),
    val("VAL-EBITDA-Q4-PRIOR", "EBITDA Q4 Prior", "$178M"),
    val("VAL-EBITDA-YOY", "EBITDA YoY", "21.9%"),
    val("VAL-EBITDA-QOQ", "EBITDA QoQ", "9.6%"),
    val("VAL-EBITDA-MARGIN", "EBITDA Margin", "24.3%"),
    val("VAL-EBITDA-MARGIN-Q3", "EBITDA Margin Q3", "23.4%"),
    val("VAL-EBITDA-MARGIN-PRIOR", "EBITDA Margin Prior", "22.4%"),
    val("VAL-EBITDA-MARGIN-YOY", "EBITDA Margin YoY", "+190bps"),
    val("VAL-EBITDA-MARGIN-QOQ", "EBITDA Margin QoQ", "+90bps"),
    val("VAL-NI-Q4", "Net Income Q4", "$98M"),
    val("VAL-NI-Q3", "Net Income Q3", "$89M"),
    val("VAL-NI-Q4-PRIOR", "Net Income Q4 Prior", "$76M"),
    val("VAL-NI-YOY", "Net Income YoY", "28.9%"),
    val("VAL-NI-QOQ", "Net Income QoQ", "10.1%"),
    val("VAL-DEBT-Q4", "Total Debt Q4", "$450M"),
    val("VAL-DEBT-Q3", "Total Debt Q3", "$475M"),
    val("VAL-DEBT-Q4-PRIOR", "Total Debt Q4 Prior", "$520M"),
    val("VAL-DEBT-YOY", "Total Debt YoY", "-13.5%"),
    val("VAL-DEBT-QOQ", "Total Debt QoQ", "-5.3%"),
    val("VAL-LEVERAGE", "Leverage", "2.8x"),
    val("VAL-LEVERAGE-Q3", "Leverage Q3", "3.0x"),
    val("VAL-LEVERAGE-Q4-PRIOR", "Leverage Prior", "3.5x"),
    val("VAL-LEVERAGE-YOY", "Leverage YoY", "-0.7x"),
    val("VAL-LEVERAGE-QOQ", "Leverage QoQ", "-0.2x"),
    val("VAL-INT-COV", "Interest Coverage", "5.2x"),
    val("VAL-FCC", "Fixed Charge Coverage", "3.1x"),
    val("VAL-CASH", "Cash", "$125M"),
    val("VAL-RCF", "Revolver Availability", "$200M"),
    val("VAL-ND-EBITDA", "Net Debt/EBITDA", "2.3x"),
    val("VAL-ND-EBITDA-PRIOR", "Net Debt/EBITDA Prior", "2.7x"),
    val("VAL-COMMODITY-IMPACT", "Commodity Impact", "8%"),
    val("VAL-CUST-CONC", "Customer Concentration", "45%"),
    val("VAL-FX-IMPACT", "FX Impact", "$12M"),
    val("VAL-RATING", "Recommended Rating", "BBB+"),
    val("VAL-DSCR", "DSCR", "2.4x"),
    val("VAL-CR", "Current Ratio", "1.8x"),
    val("VAL-FACILITY", "Facility Size", "$75M"),
  ])

  const rev = createdValues.find((v) => v.id === "VAL-REV-Q4")!
  const revPrior = createdValues.find((v) => v.id === "VAL-REV-Q4-PRIOR")!
  const revGrowth = createdValues.find((v) => v.id === "VAL-REV-GROWTH")!
  const gp = createdValues.find((v) => v.id === "VAL-GP-Q4")!
  const gm = createdValues.find((v) => v.id === "VAL-GM-Q4")!
  const ebitda = createdValues.find((v) => v.id === "VAL-EBITDA-Q4")!
  const revenue = createdValues.find((v) => v.id === "VAL-REV-Q4")!
  const debt = createdValues.find((v) => v.id === "VAL-DEBT-Q4")!
  const leverage = createdValues.find((v) => v.id === "VAL-LEVERAGE")!
  const ebitdaMargin = createdValues.find((v) => v.id === "VAL-EBITDA-MARGIN")!

  await prisma.lineageEdge.createMany({
    data: [
      { sourceValueId: revPrior.id, targetValueId: revGrowth.id, transformation: "previous period revenue", order: 1, runId: primaryRun.id },
      { sourceValueId: rev.id, targetValueId: revGrowth.id, transformation: "current period revenue", order: 2, runId: primaryRun.id },
      { sourceValueId: gp.id, targetValueId: gm.id, transformation: "gross margin = gross profit / revenue", order: 1, runId: primaryRun.id },
      { sourceValueId: revenue.id, targetValueId: gm.id, transformation: "gross margin = gross profit / revenue", order: 2, runId: primaryRun.id },
      { sourceValueId: ebitda.id, targetValueId: ebitdaMargin.id, transformation: "ebitda margin = ebitda / revenue", order: 1, runId: primaryRun.id },
      { sourceValueId: revenue.id, targetValueId: ebitdaMargin.id, transformation: "ebitda margin = ebitda / revenue", order: 2, runId: primaryRun.id },
      { sourceValueId: debt.id, targetValueId: leverage.id, transformation: "leverage = debt / ebitda", order: 1, runId: primaryRun.id },
      { sourceValueId: ebitda.id, targetValueId: leverage.id, transformation: "leverage = debt / ebitda", order: 2, runId: primaryRun.id },
    ],
  })

  await prisma.narrativeSection.create({
    data: {
      runId: primaryRun.id,
      title: "Financial Statement Analysis",
      order: 1,
      chunks: {
        create: [
          {
            runId: primaryRun.id,
            content: "Revenue reached $892M (12.5% growth) with gross margin at 42.1%.",
            primaryValueId: "VAL-REV-GROWTH",
            order: 1,
            values: { create: [{ valueId: "VAL-REV-Q4" }, { valueId: "VAL-REV-Q4-PRIOR" }, { valueId: "VAL-REV-GROWTH" }, { valueId: "VAL-GM-Q4" }] },
          },
          {
            runId: primaryRun.id,
            content: "Leverage improved to 2.8x; debt down to $450M.",
            primaryValueId: "VAL-LEVERAGE",
            order: 2,
            values: { create: [{ valueId: "VAL-LEVERAGE" }, { valueId: "VAL-DEBT-Q4" }] },
          },
          {
            runId: primaryRun.id,
            content: "Credit metrics remain strong: DSCR 2.4x, Current Ratio 1.8x, rating BBB+.",
            primaryValueId: "VAL-RATING",
            order: 3,
            values: { create: [{ valueId: "VAL-DSCR" }, { valueId: "VAL-CR" }, { valueId: "VAL-RATING" }] },
          },
        ],
      },
    },
  })

  console.log("UAT seed values:", createdValues.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
