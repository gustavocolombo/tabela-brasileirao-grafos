/*
  Warnings:

  - You are about to drop the `Graphs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "team_stadium_key";

-- DropTable
DROP TABLE "Graphs";

-- CreateTable
CREATE TABLE "graphs" (
    "id" SERIAL NOT NULL,
    "nodes" JSONB[],
    "links" JSONB[],

    CONSTRAINT "graphs_pkey" PRIMARY KEY ("id")
);
