-- DropForeignKey
ALTER TABLE "clashes" DROP CONSTRAINT "clashes_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "clashes" DROP CONSTRAINT "clashes_homeTeamId_fkey";

-- AlterTable
ALTER TABLE "clashes" ALTER COLUMN "homeTeamId" SET DATA TYPE TEXT,
ALTER COLUMN "awayTeamId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "team"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "team"("name") ON DELETE SET NULL ON UPDATE CASCADE;
