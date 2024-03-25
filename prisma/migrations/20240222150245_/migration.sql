/*
  Warnings:

  - You are about to drop the column `loser` on the `clashes` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `clashes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clashes" DROP COLUMN "loser",
DROP COLUMN "winner",
ADD COLUMN     "loserTeamId" INTEGER,
ADD COLUMN     "winnerTeamId" INTEGER;

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_winnerTeamId_fkey" FOREIGN KEY ("winnerTeamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clashes" ADD CONSTRAINT "clashes_loserTeamId_fkey" FOREIGN KEY ("loserTeamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
