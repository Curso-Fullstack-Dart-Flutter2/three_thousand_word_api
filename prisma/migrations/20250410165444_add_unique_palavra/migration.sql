/*
  Warnings:

  - A unique constraint covering the columns `[palavra]` on the table `WordInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WordInfo_palavra_key" ON "WordInfo"("palavra");
