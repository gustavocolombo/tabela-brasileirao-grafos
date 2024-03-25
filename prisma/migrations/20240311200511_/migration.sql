/*
  Warnings:

  - The `homeTeamId` column on the `clashes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `awayTeamId` column on the `clashes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "clashes" DROP CONSTRAINT "clashes_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "clashes" DROP CONSTRAINT "clashes_homeTeamId_fkey";

-- AlterTable
ALTER TABLE "clashes" DROP COLUMN "homeTeamId",
ADD COLUMN     "homeTeamId" INTEGER,
DROP COLUMN "awayTeamId",
ADD COLUMN     "awayTeamId" INTEGER;

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
