/*
  Warnings:

  - You are about to drop the column `Date_of_birth` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `Disciplines` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `date_of_birth` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplines` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "endress" TEXT NOT NULL,
    "curriculum" TEXT NOT NULL,
    "formation" TEXT NOT NULL,
    "disciplines" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "teacher" BOOLEAN NOT NULL
);
INSERT INTO "new_Teacher" ("curriculum", "email", "endress", "formation", "id", "name", "password", "teacher") SELECT "curriculum", "email", "endress", "formation", "id", "name", "password", "teacher" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
