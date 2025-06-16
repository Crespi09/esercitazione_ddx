/*
  Warnings:

  - You are about to alter the column `storage` on the `file` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `file` MODIFY `storage` DOUBLE NOT NULL;
