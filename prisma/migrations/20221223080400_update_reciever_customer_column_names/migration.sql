/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Reciever` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `Reciever` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Reciever` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postaleCode` to the `Reciever` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "phone_number",
DROP COLUMN "postal_code",
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "postcalCode" VARCHAR(6);

-- AlterTable
ALTER TABLE "Reciever" DROP COLUMN "phone_number",
DROP COLUMN "postal_code",
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "postaleCode" VARCHAR(6) NOT NULL;
