-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'MODERATOR', 'USER');

-- CreateTable
CREATE TABLE "auth_user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "auth_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_key" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,
    "primary_key" BOOLEAN NOT NULL,
    "expires" BIGINT,

    CONSTRAINT "auth_key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "assignedById" TEXT NOT NULL,
    "assignedToId" TEXT NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "UserOnProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_id_key" ON "auth_user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_username_key" ON "auth_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_email_key" ON "auth_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_session_id_key" ON "auth_session"("id");

-- CreateIndex
CREATE INDEX "auth_session_user_id_idx" ON "auth_session"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "auth_key_id_key" ON "auth_key"("id");

-- CreateIndex
CREATE INDEX "auth_key_user_id_idx" ON "auth_key"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_id_key" ON "Issue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserOnProject_id_key" ON "UserOnProject"("id");

-- AddForeignKey
ALTER TABLE "auth_session" ADD CONSTRAINT "auth_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_key" ADD CONSTRAINT "auth_key_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "UserOnProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "UserOnProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnProject" ADD CONSTRAINT "UserOnProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnProject" ADD CONSTRAINT "UserOnProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
