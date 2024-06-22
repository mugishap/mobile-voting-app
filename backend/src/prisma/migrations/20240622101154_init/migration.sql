/*
  Warnings:

  - A unique constraint covering the columns `[voterId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "votes_voterId_candidateId_key";

-- CreateIndex
CREATE UNIQUE INDEX "votes_voterId_key" ON "votes"("voterId");
