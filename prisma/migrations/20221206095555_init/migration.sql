-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('NONE', 'BASIC_CARD', 'RIBBON', 'SPECIAL_CARD');

-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('OPEN', 'CLOSED', 'IN_PROGRESS', 'DELIVERED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'PIN', 'BY_INVOICE');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "city" TEXT,
    "phone_number" TEXT NOT NULL,
    "email" TEXT,
    "postal_code" VARCHAR(6),
    "streetName" TEXT,
    "houseNumber" VARCHAR(6),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reciever" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "postal_code" VARCHAR(6) NOT NULL,
    "streetName" TEXT NOT NULL,
    "houseNumber" VARCHAR(6) NOT NULL,

    CONSTRAINT "Reciever_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "recieverId" INTEGER NOT NULL,
    "productInfo" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "extraInfo" TEXT NOT NULL,
    "cardType" "CardType" NOT NULL,
    "includeDelivery" BOOLEAN NOT NULL,
    "price" DECIMAL(2,2) NOT NULL,
    "dateOfDelivery" TIMESTAMP(3) NOT NULL,
    "orderState" "OrderState" NOT NULL DEFAULT 'OPEN',
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" "PaymentMethod" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CustomerToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToOrder_AB_unique" ON "_CustomerToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToOrder_B_index" ON "_CustomerToOrder"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_recieverId_fkey" FOREIGN KEY ("recieverId") REFERENCES "Reciever"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToOrder" ADD CONSTRAINT "_CustomerToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToOrder" ADD CONSTRAINT "_CustomerToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
