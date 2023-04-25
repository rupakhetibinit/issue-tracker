-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_assignedById_fkey";

-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_assignedToId_fkey";

-- CreateTable
CREATE TABLE "_IssueToUserOnProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IssueToUserOnProject_AB_unique" ON "_IssueToUserOnProject"("A", "B");

-- CreateIndex
CREATE INDEX "_IssueToUserOnProject_B_index" ON "_IssueToUserOnProject"("B");

-- AddForeignKey
ALTER TABLE "_IssueToUserOnProject" ADD CONSTRAINT "_IssueToUserOnProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IssueToUserOnProject" ADD CONSTRAINT "_IssueToUserOnProject_B_fkey" FOREIGN KEY ("B") REFERENCES "UserOnProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
