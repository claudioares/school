-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endress" TEXT NOT NULL,
    "curriculum" TEXT NOT NULL,
    "formation" TEXT NOT NULL,
    "Disciplines" TEXT NOT NULL,
    "Date_of_birth" TEXT NOT NULL,
    "teacher" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
