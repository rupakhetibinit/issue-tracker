/*
  Warnings:

  - Added the required column `priority` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('EXTREME', 'HIGH', 'MEDIUM', 'LOW', 'WONTFIX');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "priority" "Priority" NOT NULL;
