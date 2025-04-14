-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fromPId" TEXT NOT NULL,
    "toPId" TEXT NOT NULL,
    "fromUId" TEXT NOT NULL,
    "toUId" TEXT NOT NULL,
    "deliveryUId" TEXT,
    CONSTRAINT "Package_fromPId_fkey" FOREIGN KEY ("fromPId") REFERENCES "PickUpPoint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_toPId_fkey" FOREIGN KEY ("toPId") REFERENCES "PickUpPoint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_fromUId_fkey" FOREIGN KEY ("fromUId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_toUId_fkey" FOREIGN KEY ("toUId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_deliveryUId_fkey" FOREIGN KEY ("deliveryUId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PickUpPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" REAL NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "PickUpPoint_location_key" ON "PickUpPoint"("location");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
