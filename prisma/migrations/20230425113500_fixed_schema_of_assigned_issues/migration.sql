/*
  Warnings:

  - You are about to drop the column `assignedById` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `assignedToId` on the `Issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "assignedById",
DROP COLUMN "assignedToId";
