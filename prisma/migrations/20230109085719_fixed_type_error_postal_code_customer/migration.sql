/*
  Warnings:

  - You are about to drop the column `postcalCode` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "postcalCode",
ADD COLUMN     "postalCode" VARCHAR(6);
