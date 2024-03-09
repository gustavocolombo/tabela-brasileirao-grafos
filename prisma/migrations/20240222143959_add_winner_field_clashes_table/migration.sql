/*
  Warnings:

  - Added the required column `loser` to the `clashes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winner` to the `clashes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clashes" ADD COLUMN     "loser" TEXT NOT NULL,
ADD COLUMN     "winner" TEXT NOT NULL;
