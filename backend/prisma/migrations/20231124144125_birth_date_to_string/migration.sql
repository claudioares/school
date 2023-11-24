-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birth" TEXT,
    "nameMother" TEXT,
    "cpf" TEXT,
    "nameFather" TEXT,
    "endress" TEXT,
    "highSchool" BOOLEAN
);
INSERT INTO "new_Student" ("birth", "cpf", "email", "endress", "highSchool", "id", "nameFather", "nameMother", "password", "student") SELECT "birth", "cpf", "email", "endress", "highSchool", "id", "nameFather", "nameMother", "password", "student" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE UNIQUE INDEX "Student_cpf_key" ON "Student"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
