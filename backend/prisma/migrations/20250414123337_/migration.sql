-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fromPId" TEXT NOT NULL,
    "toPId" TEXT NOT NULL,
    "fromUId" TEXT NOT NULL,
    "toUId" TEXT NOT NULL,
    "deliveryUId" TEXT,
    "price" REAL NOT NULL,
    "reward" REAL NOT NULL,
    "weight" REAL NOT NULL DEFAULT 75,
    "size" TEXT NOT NULL DEFAULT 'L',
    "status" TEXT NOT NULL DEFAULT 'Waiting',
    CONSTRAINT "Package_fromPId_fkey" FOREIGN KEY ("fromPId") REFERENCES "PickUpPoint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_toPId_fkey" FOREIGN KEY ("toPId") REFERENCES "PickUpPoint" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_fromUId_fkey" FOREIGN KEY ("fromUId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_toUId_fkey" FOREIGN KEY ("toUId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_deliveryUId_fkey" FOREIGN KEY ("deliveryUId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Package" ("deliveryUId", "fromPId", "fromUId", "id", "price", "reward", "status", "toPId", "toUId") SELECT "deliveryUId", "fromPId", "fromUId", "id", "price", "reward", "status", "toPId", "toUId" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
