/*
  Warnings:

  - The primary key for the `clashes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `clashes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `team` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "clashes" DROP CONSTRAINT "clashes_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "clashes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "team" DROP CONSTRAINT "team_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "team_pkey" PRIMARY KEY ("id");

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
