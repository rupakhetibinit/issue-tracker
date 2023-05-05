/*
  Warnings:

  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Member` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_memberProjectId_memberUserId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "userId",
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("projectId", "authUserId");

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_memberProjectId_memberUserId_fkey" FOREIGN KEY ("memberProjectId", "memberUserId") REFERENCES "Member"("projectId", "authUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
