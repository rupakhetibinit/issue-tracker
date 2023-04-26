/*
  Warnings:

  - The values [WONTFIX] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('EXTREME', 'HIGH', 'MEDIUM', 'LOW');
ALTER TABLE "Issue" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
COMMIT;

-- AlterTable
ALTER TABLE "Issue" ALTER COLUMN "priority" SET DEFAULT 'HIGH';
