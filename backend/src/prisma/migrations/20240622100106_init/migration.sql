/*
  Warnings:

  - The values [USER] on the enum `roles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `email` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `names` on the `candidates` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `candidates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `candidates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "roles_new" AS ENUM ('ADMIN', 'VOTER', 'CANDIDATE');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "roles_new" USING ("role"::text::"roles_new");
ALTER TYPE "roles" RENAME TO "roles_old";
ALTER TYPE "roles_new" RENAME TO "roles";
DROP TYPE "roles_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'VOTER';
COMMIT;

-- DropIndex
DROP INDEX "candidates_email_key";

-- DropIndex
DROP INDEX "candidates_names_email_telephone_idx";

-- DropIndex
DROP INDEX "candidates_telephone_key";

-- AlterTable
ALTER TABLE "candidates" DROP COLUMN "email",
DROP COLUMN "names",
DROP COLUMN "telephone",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "candidateId" TEXT,
ALTER COLUMN "role" SET DEFAULT 'VOTER';

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "voterId" TEXT NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidates_userId_key" ON "candidates"("userId");

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
