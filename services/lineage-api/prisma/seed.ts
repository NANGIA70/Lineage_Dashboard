import { PrismaClient } from "@prisma/client"

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
  await prisma.user.deleteMany()

  const doc = await prisma.document.create({
    data: {
      type: "AQRR",
      entity: "Acme Corp",
      period: "Q4 2024",
      status: "in_review",
    },
  })

  const doc2 = await prisma.document.create({
    data: {
      type: "Credit Memo",
      entity: "Sterling Partners",
      period: "2024",
      status: "approved",
    },
  })

  const run = await prisma.run.create({
    data: {
      documentId: doc.id,
      version: 3,
      workflowName: "AQRR Generation Pipeline",
      status: "completed",
      startTime: new Date("2024-12-04T08:00:00Z"),
      endTime: new Date("2024-12-04T08:45:00Z"),
      triggeredBy: "john.doe@company.com",
    },
  })

  await prisma.run.create({
    data: {
      documentId: doc2.id,
      version: 1,
      workflowName: "Credit Memo Pipeline",
      status: "completed",
      startTime: new Date("2024-11-30T15:00:00Z"),
      endTime: new Date("2024-11-30T16:00:00Z"),
      triggeredBy: "analyst@example.com",
    },
  })

  const table = await prisma.table.create({
    data: {
      runId: run.id,
      name: "Financial Statement Analysis",
      type: "fsa",
      rowCount: 3,
      columnCount: 3,
    },
  })

  const seedValues = [
    { id: "VAL-REV-Q4", label: "Revenue Q4", value: "$892M", tableId: table.id, rowIndex: 0, columnIndex: 1 },
    { id: "VAL-REV-Q3", label: "Revenue Q3", value: "$845M", tableId: table.id, rowIndex: 0, columnIndex: 2 },
    { id: "VAL-REV-Q4-PRIOR", label: "Revenue Q4 Prior", value: "$793M" },
    { id: "VAL-REV-GROWTH", label: "Revenue Growth", value: "12.5%" },
    { id: "VAL-REV-QOQ", label: "Revenue QoQ", value: "5.6%" },
    { id: "VAL-GP-Q4", label: "Gross Profit Q4", value: "$375M" },
    { id: "VAL-GP-Q3", label: "Gross Profit Q3", value: "$352M" },
    { id: "VAL-GP-Q4-PRIOR", label: "Gross Profit Q4 Prior", value: "$322M" },
    { id: "VAL-GP-YOY", label: "Gross Profit YoY", value: "16.5%" },
    { id: "VAL-GP-QOQ", label: "Gross Profit QoQ", value: "6.5%" },
    { id: "VAL-GM-Q4", label: "Gross Margin Q4", value: "42.1%", tableId: table.id, rowIndex: 1, columnIndex: 1 },
    { id: "VAL-GM-Q3", label: "Gross Margin Q3", value: "41.7%" },
    { id: "VAL-GM-Q4-PRIOR", label: "Gross Margin Q4 Prior", value: "40.6%" },
    { id: "VAL-GM-YOY", label: "Gross Margin YoY", value: "+150bps" },
    { id: "VAL-GM-QOQ", label: "Gross Margin QoQ", value: "+40bps" },
    { id: "VAL-EBITDA-Q4", label: "EBITDA Q4", value: "$217M" },
    { id: "VAL-EBITDA-Q3", label: "EBITDA Q3", value: "$198M" },
    { id: "VAL-EBITDA-Q4-PRIOR", label: "EBITDA Q4 Prior", value: "$178M" },
    { id: "VAL-EBITDA-YOY", label: "EBITDA YoY", value: "21.9%" },
    { id: "VAL-EBITDA-QOQ", label: "EBITDA QoQ", value: "9.6%" },
    { id: "VAL-EBITDA-MARGIN", label: "EBITDA Margin", value: "24.3%" },
    { id: "VAL-EBITDA-MARGIN-Q3", label: "EBITDA Margin Q3", value: "23.4%" },
    { id: "VAL-EBITDA-MARGIN-PRIOR", label: "EBITDA Margin Prior", value: "22.4%" },
    { id: "VAL-EBITDA-MARGIN-YOY", label: "EBITDA Margin YoY", value: "+190bps" },
    { id: "VAL-EBITDA-MARGIN-QOQ", label: "EBITDA Margin QoQ", value: "+90bps" },
    { id: "VAL-NI-Q4", label: "Net Income Q4", value: "$98M" },
    { id: "VAL-NI-Q3", label: "Net Income Q3", value: "$89M" },
    { id: "VAL-NI-Q4-PRIOR", label: "Net Income Q4 Prior", value: "$76M" },
    { id: "VAL-NI-YOY", label: "Net Income YoY", value: "28.9%" },
    { id: "VAL-NI-QOQ", label: "Net Income QoQ", value: "10.1%" },
    { id: "VAL-DEBT-Q4", label: "Total Debt Q4", value: "$450M" },
    { id: "VAL-DEBT-Q3", label: "Total Debt Q3", value: "$475M" },
    { id: "VAL-DEBT-Q4-PRIOR", label: "Total Debt Q4 Prior", value: "$520M" },
    { id: "VAL-DEBT-YOY", label: "Total Debt YoY", value: "-13.5%" },
    { id: "VAL-DEBT-QOQ", label: "Total Debt QoQ", value: "-5.3%" },
    { id: "VAL-LEVERAGE", label: "Leverage", value: "2.8x" },
    { id: "VAL-LEVERAGE-Q3", label: "Leverage Q3", value: "3.0x" },
    { id: "VAL-LEVERAGE-Q4-PRIOR", label: "Leverage Prior", value: "3.5x" },
    { id: "VAL-LEVERAGE-YOY", label: "Leverage YoY", value: "-0.7x" },
    { id: "VAL-LEVERAGE-QOQ", label: "Leverage QoQ", value: "-0.2x" },
    { id: "VAL-INT-COV", label: "Interest Coverage", value: "5.2x" },
    { id: "VAL-FCC", label: "Fixed Charge Coverage", value: "3.1x" },
    { id: "VAL-CASH", label: "Cash", value: "$125M" },
    { id: "VAL-RCF", label: "Revolver Availability", value: "$200M" },
    { id: "VAL-ND-EBITDA", label: "Net Debt/EBITDA", value: "2.3x" },
    { id: "VAL-ND-EBITDA-PRIOR", label: "Net Debt/EBITDA Prior", value: "2.7x" },
    { id: "VAL-COMMODITY-IMPACT", label: "Commodity Impact", value: "8%" },
    { id: "VAL-CUST-CONC", label: "Customer Concentration", value: "45%" },
    { id: "VAL-FX-IMPACT", label: "FX Impact", value: "$12M" },
    { id: "VAL-RATING", label: "Recommended Rating", value: "BBB+" },
    { id: "VAL-DSCR", label: "DSCR", value: "2.4x" },
    { id: "VAL-CR", label: "Current Ratio", value: "1.8x" },
    { id: "VAL-OPEX-RATIO", label: "Opex Ratio", value: "18.2%" },
    { id: "VAL-FACILITY", label: "Facility Size", value: "$75M" },
  ]

  const values = await prisma.$transaction(
    seedValues.map((v) =>
      prisma.value.create({
        data: {
          id: v.id,
          runId: run.id,
          tableId: v.tableId,
          rowIndex: v.rowIndex,
          columnIndex: v.columnIndex,
          label: v.label,
          value: v.value,
        },
      }),
    ),
  )

  const rev = values[0]
  const revPrior = values[1]
  const revGrowth = values[2]
  const gm = values.find((v) => v.id === "VAL-GM-Q4")!
  const gp = values.find((v) => v.id === "VAL-GP-Q4")!
  const ebitda = values.find((v) => v.id === "VAL-EBITDA-Q4")!
  const revenue = values.find((v) => v.id === "VAL-REV-Q4")!
  const debt = values.find((v) => v.id === "VAL-DEBT-Q4")!
  const leverage = values.find((v) => v.id === "VAL-LEVERAGE")!
  const ebitdaMargin = values.find((v) => v.id === "VAL-EBITDA-MARGIN")!

  await prisma.lineageEdge.createMany({
    data: [
      {
        sourceValueId: revPrior.id,
        targetValueId: revGrowth.id,
        transformation: "previous period revenue",
        order: 1,
        runId: run.id,
      },
      {
        sourceValueId: rev.id,
        targetValueId: revGrowth.id,
        transformation: "current period revenue",
        order: 2,
        runId: run.id,
      },
      {
        sourceValueId: gp.id,
        targetValueId: gm.id,
        transformation: "gross margin = gross profit / revenue",
        order: 1,
        runId: run.id,
      },
      {
        sourceValueId: revenue.id,
        targetValueId: gm.id,
        transformation: "gross margin = gross profit / revenue",
        order: 2,
        runId: run.id,
      },
      {
        sourceValueId: ebitda.id,
        targetValueId: ebitdaMargin.id,
        transformation: "ebitda margin = ebitda / revenue",
        order: 1,
        runId: run.id,
      },
      {
        sourceValueId: revenue.id,
        targetValueId: ebitdaMargin.id,
        transformation: "ebitda margin = ebitda / revenue",
        order: 2,
        runId: run.id,
      },
      {
        sourceValueId: debt.id,
        targetValueId: leverage.id,
        transformation: "leverage = debt / ebitda",
        order: 1,
        runId: run.id,
      },
      {
        sourceValueId: ebitda.id,
        targetValueId: leverage.id,
        transformation: "leverage = debt / ebitda",
        order: 2,
        runId: run.id,
      },
    ],
  })

  await prisma.narrativeSection.create({
    data: {
      runId: run.id,
      title: "Financial Statement Analysis",
      order: 1,
      chunks: {
        create: [
          {
            runId: run.id,
            content: "Revenue for the quarter reached $892M, up from $793M in the prior year period. Growth was 12.5%.",
            primaryValueId: revGrowth.id,
            order: 1,
            values: {
              create: [
                { valueId: rev.id },
                { valueId: revPrior.id },
                { valueId: revGrowth.id },
              ],
            },
          },
          {
            runId: run.id,
            content: "Gross margin improved to 42.1% while operating expenses decreased to 18.2% of revenue.",
            primaryValueId: "VAL-GM-Q4",
            order: 2,
            values: {
              create: [
                { valueId: "VAL-GM-Q4" },
                { valueId: "VAL-OPEX-RATIO" },
              ],
            },
          },
        ],
      },
    },
  })

  console.log("Seeded values:", values.map((v) => v.id))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
