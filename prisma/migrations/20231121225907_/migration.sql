/*
  Warnings:

  - You are about to drop the `edges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `graph` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nodes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "edges" DROP CONSTRAINT "edges_graphId_fkey";

-- DropForeignKey
ALTER TABLE "nodes" DROP CONSTRAINT "nodes_graphId_fkey";

-- DropTable
DROP TABLE "edges";

-- DropTable
DROP TABLE "graph";

-- DropTable
DROP TABLE "nodes";

-- CreateTable
CREATE TABLE "graphs" (
    "id" SERIAL NOT NULL,
    "nodes" JSONB[],
    "links" JSONB[],

    CONSTRAINT "graphs_pkey" PRIMARY KEY ("id")
);
