/*
  Warnings:

  - You are about to drop the `UserOnProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_IssueToUserOnProject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `memberProjectId` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberUserId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserOnProject" DROP CONSTRAINT "UserOnProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnProject" DROP CONSTRAINT "UserOnProject_userId_fkey";

-- DropForeignKey
ALTER TABLE "_IssueToUserOnProject" DROP CONSTRAINT "_IssueToUserOnProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_IssueToUserOnProject" DROP CONSTRAINT "_IssueToUserOnProject_B_fkey";

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "memberProjectId" TEXT NOT NULL,
ADD COLUMN     "memberUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserOnProject";

-- DropTable
DROP TABLE "_IssueToUserOnProject";

-- CreateTable
CREATE TABLE "Member" (
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "authUserId" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Member_pkey" PRIMARY KEY ("projectId","userId")
);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_memberProjectId_memberUserId_fkey" FOREIGN KEY ("memberProjectId", "memberUserId") REFERENCES "Member"("projectId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "auth_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
