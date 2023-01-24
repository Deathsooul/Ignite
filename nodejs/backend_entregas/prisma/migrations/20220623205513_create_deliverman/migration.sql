-- CreateTable
CREATE TABLE "Deliveryman" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Deliveryman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deliveryman_userName_key" ON "Deliveryman"("userName");
