/*
  Warnings:

  - You are about to drop the `graphs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "graphs";

-- CreateTable
CREATE TABLE "nodes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "graphId" TEXT,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edges" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "graphId" TEXT,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graph" (
    "id" TEXT NOT NULL,

    CONSTRAINT "graph_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "graph"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "graph"("id") ON DELETE SET NULL ON UPDATE CASCADE;
