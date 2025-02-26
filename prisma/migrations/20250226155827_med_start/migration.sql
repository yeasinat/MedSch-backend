/*
  Warnings:

  - You are about to drop the column `endDate` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Medication` table. All the data in the column will be lost.
  - Added the required column `medEndDate` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medStartDate` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "dosagePerDay" INTEGER NOT NULL,
    "frequency" INTEGER NOT NULL,
    "medStartDate" DATETIME NOT NULL,
    "medEndDate" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Medication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Medication" ("dosagePerDay", "frequency", "id", "name", "userId") SELECT "dosagePerDay", "frequency", "id", "name", "userId" FROM "Medication";
DROP TABLE "Medication";
ALTER TABLE "new_Medication" RENAME TO "Medication";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
