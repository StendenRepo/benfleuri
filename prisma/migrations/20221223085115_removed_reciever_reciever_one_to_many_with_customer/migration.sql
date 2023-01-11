/*
  Warnings:

  - You are about to drop the `Reciever` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CustomerToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_recieverId_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToOrder" DROP CONSTRAINT "_CustomerToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToOrder" DROP CONSTRAINT "_CustomerToOrder_B_fkey";

-- DropTable
DROP TABLE "Reciever";

-- DropTable
DROP TABLE "_CustomerToOrder";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
