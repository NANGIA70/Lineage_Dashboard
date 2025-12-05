-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "version" INTEGER,
    "workflowName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "triggeredBy" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rowCount" INTEGER,
    "columnCount" INTEGER,
    "schema" JSONB,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Value" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "tableId" TEXT,
    "rowIndex" INTEGER,
    "columnIndex" INTEGER,
    "label" TEXT,
    "dataType" TEXT,
    "value" TEXT,
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineageEdge" (
    "id" TEXT NOT NULL,
    "runId" TEXT,
    "sourceValueId" TEXT NOT NULL,
    "targetValueId" TEXT NOT NULL,
    "transformation" TEXT,
    "order" INTEGER,

    CONSTRAINT "LineageEdge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NarrativeSection" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "NarrativeSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NarrativeChunk" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "content" TEXT,
    "contentTokens" JSONB,
    "primaryValueId" TEXT,
    "order" INTEGER NOT NULL,

    CONSTRAINT "NarrativeChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NarrativeChunkValue" (
    "chunkId" TEXT NOT NULL,
    "valueId" TEXT NOT NULL,

    CONSTRAINT "NarrativeChunkValue_pkey" PRIMARY KEY ("chunkId","valueId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Run_documentId_version_idx" ON "Run"("documentId", "version");

-- CreateIndex
CREATE INDEX "Run_status_idx" ON "Run"("status");

-- CreateIndex
CREATE INDEX "Table_runId_idx" ON "Table"("runId");

-- CreateIndex
CREATE INDEX "Value_runId_idx" ON "Value"("runId");

-- CreateIndex
CREATE INDEX "Value_tableId_rowIndex_columnIndex_idx" ON "Value"("tableId", "rowIndex", "columnIndex");

-- CreateIndex
CREATE INDEX "LineageEdge_targetValueId_idx" ON "LineageEdge"("targetValueId");

-- CreateIndex
CREATE INDEX "LineageEdge_sourceValueId_idx" ON "LineageEdge"("sourceValueId");

-- CreateIndex
CREATE INDEX "LineageEdge_runId_idx" ON "LineageEdge"("runId");

-- CreateIndex
CREATE INDEX "NarrativeSection_runId_order_idx" ON "NarrativeSection"("runId", "order");

-- CreateIndex
CREATE INDEX "NarrativeChunk_sectionId_order_idx" ON "NarrativeChunk"("sectionId", "order");

-- CreateIndex
CREATE INDEX "NarrativeChunk_primaryValueId_idx" ON "NarrativeChunk"("primaryValueId");

-- CreateIndex
CREATE INDEX "NarrativeChunkValue_valueId_idx" ON "NarrativeChunkValue"("valueId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineageEdge" ADD CONSTRAINT "LineageEdge_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineageEdge" ADD CONSTRAINT "LineageEdge_sourceValueId_fkey" FOREIGN KEY ("sourceValueId") REFERENCES "Value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineageEdge" ADD CONSTRAINT "LineageEdge_targetValueId_fkey" FOREIGN KEY ("targetValueId") REFERENCES "Value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeSection" ADD CONSTRAINT "NarrativeSection_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeChunk" ADD CONSTRAINT "NarrativeChunk_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "NarrativeSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeChunk" ADD CONSTRAINT "NarrativeChunk_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeChunk" ADD CONSTRAINT "NarrativeChunk_primaryValueId_fkey" FOREIGN KEY ("primaryValueId") REFERENCES "Value"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeChunkValue" ADD CONSTRAINT "NarrativeChunkValue_chunkId_fkey" FOREIGN KEY ("chunkId") REFERENCES "NarrativeChunk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NarrativeChunkValue" ADD CONSTRAINT "NarrativeChunkValue_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "Value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
