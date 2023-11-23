/*
  Warnings:

  - You are about to drop the column `year_fundation` on the `team` table. All the data in the column will be lost.
  - Added the required column `yearFundation` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team" DROP COLUMN "year_fundation",
ADD COLUMN     "yearFundation" INTEGER NOT NULL;
