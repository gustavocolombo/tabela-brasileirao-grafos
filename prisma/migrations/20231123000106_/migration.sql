/*
  Warnings:

  - The `nodes` column on the `Graphs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Graphs" DROP COLUMN "nodes",
ADD COLUMN     "nodes" JSONB[];
