/*
  Warnings:

  - You are about to drop the column `loser` on the `clashes` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `clashes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clashes" DROP COLUMN "loser",
DROP COLUMN "winner";
