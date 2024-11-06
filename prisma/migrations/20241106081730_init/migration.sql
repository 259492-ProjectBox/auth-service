/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('StdAcc', 'AlumAcc', 'MISEmpAcc');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "CmuOAuthBasicInfo" (
    "id" SERIAL NOT NULL,
    "cmuitaccount_name" TEXT NOT NULL,
    "cmuitaccount" TEXT NOT NULL,
    "student_id" TEXT,
    "prename_id" TEXT,
    "prename_TH" TEXT,
    "prename_EN" TEXT,
    "firstname_TH" TEXT NOT NULL,
    "firstname_EN" TEXT NOT NULL,
    "lastname_TH" TEXT NOT NULL,
    "lastname_EN" TEXT NOT NULL,
    "organization_code" TEXT NOT NULL,
    "organization_name_TH" TEXT NOT NULL,
    "organization_name_EN" TEXT NOT NULL,
    "itaccounttype" "AccountType" NOT NULL,
    "itaccounttype_TH" TEXT NOT NULL,
    "itaccounttype_EN" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmuOAuthBasicInfo_pkey" PRIMARY KEY ("id")
);
