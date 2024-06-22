/*
  Warnings:

  - A unique constraint covering the columns `[voterId,candidateId]` on the table `votes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "votes_voterId_candidateId_key" ON "votes"("voterId", "candidateId");
