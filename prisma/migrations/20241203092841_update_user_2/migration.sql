/*
  Warnings:

  - You are about to drop the column `cmuitAccount` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `departmentNameEN` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `departmentNameTH` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `facultyMisId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cmuAccount]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountType` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountTypeEN` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountTypeTH` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cmuAccount` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cmuAccountName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationCode` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationNameEN` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationNameTH` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('StdAcc', 'AlumAcc', 'MISEmpAcc');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cmuitAccount",
DROP COLUMN "departmentId",
DROP COLUMN "departmentNameEN",
DROP COLUMN "departmentNameTH",
DROP COLUMN "email",
DROP COLUMN "facultyMisId",
ADD COLUMN     "accountType" "AccountType" NOT NULL,
ADD COLUMN     "accountTypeEN" TEXT NOT NULL,
ADD COLUMN     "accountTypeTH" TEXT NOT NULL,
ADD COLUMN     "cmuAccount" TEXT NOT NULL,
ADD COLUMN     "cmuAccountName" TEXT NOT NULL,
ADD COLUMN     "organizationCode" TEXT NOT NULL,
ADD COLUMN     "organizationNameEN" TEXT NOT NULL,
ADD COLUMN     "organizationNameTH" TEXT NOT NULL,
ADD COLUMN     "prenameId" TEXT,
ADD COLUMN     "studentId" TEXT,
ALTER COLUMN "prenameTH" DROP NOT NULL,
ALTER COLUMN "prenameEN" DROP NOT NULL;

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "prenameTH" TEXT NOT NULL,
    "prenameEN" TEXT NOT NULL,
    "firstNameTH" TEXT NOT NULL,
    "lastNameTH" TEXT NOT NULL,
    "firstNameEN" TEXT NOT NULL,
    "lastNameEN" TEXT NOT NULL,
    "facultyMisId" TEXT NOT NULL,
    "facultyCode" TEXT NOT NULL,
    "facultyNameTH" TEXT NOT NULL,
    "facultyNameEN" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "departmentNameTH" TEXT NOT NULL,
    "departmentNameEN" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "statusName" TEXT NOT NULL,
    "cmuitAccount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "prenameTha" TEXT NOT NULL,
    "prenameEng" TEXT NOT NULL,
    "nameTha" TEXT NOT NULL,
    "middleNameTha" TEXT NOT NULL,
    "surNameTha" TEXT NOT NULL,
    "nameEng" TEXT NOT NULL,
    "middleNameEng" TEXT NOT NULL,
    "surNameEng" TEXT NOT NULL,
    "workStatusNameTha" TEXT NOT NULL,
    "positionNameTha" TEXT NOT NULL,
    "organizationID1" TEXT NOT NULL,
    "organizationName1" TEXT NOT NULL,
    "organizationID2" TEXT NOT NULL,
    "organizationName2" TEXT NOT NULL,
    "organizationID3" TEXT NOT NULL,
    "organizationName3" TEXT NOT NULL,
    "organizationID4" TEXT NOT NULL,
    "organizationName4" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_studentId_key" ON "students"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cmuAccount_key" ON "users"("cmuAccount");
