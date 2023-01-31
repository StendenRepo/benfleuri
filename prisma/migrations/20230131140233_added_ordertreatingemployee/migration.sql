-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "clientName" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderTreatingEmployeeId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderTreatingEmployeeId_fkey" FOREIGN KEY ("orderTreatingEmployeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
