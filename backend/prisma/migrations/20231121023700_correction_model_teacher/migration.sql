/*
  Warnings:

  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

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
    "Disciplines" TEXT NOT NULL,
    "Date_of_birth" TEXT NOT NULL,
    "teacher" BOOLEAN NOT NULL
);
INSERT INTO "new_Teacher" ("Date_of_birth", "Disciplines", "curriculum", "email", "endress", "formation", "id", "name", "teacher") SELECT "Date_of_birth", "Disciplines", "curriculum", "email", "endress", "formation", "id", "name", "teacher" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
