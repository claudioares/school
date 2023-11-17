-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birth" DATETIME NOT NULL,
    "nameMother" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nameFather" TEXT NOT NULL,
    "endress" TEXT NOT NULL,
    "highSchool" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_cpf_key" ON "Student"("cpf");
