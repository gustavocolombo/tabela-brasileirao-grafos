-- DropForeignKey
ALTER TABLE "clashes" DROP CONSTRAINT "clashes_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "clashes" DROP CONSTRAINT "clashes_homeTeamId_fkey";

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "team"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "team"("name") ON DELETE SET NULL ON UPDATE CASCADE;
