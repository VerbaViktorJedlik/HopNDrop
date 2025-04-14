/*
  Warnings:

  - Added the required column `name` to the `PickUpPoint` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PickUpPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_PickUpPoint" ("id", "location") SELECT "id", "location" FROM "PickUpPoint";
DROP TABLE "PickUpPoint";
ALTER TABLE "new_PickUpPoint" RENAME TO "PickUpPoint";
CREATE UNIQUE INDEX "PickUpPoint_location_key" ON "PickUpPoint"("location");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
