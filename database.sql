CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Enum for AccountType
CREATE TYPE AccountType AS ENUM ('StdAcc', 'AlumAcc', 'MISEmpAcc');

-- Table for users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cmuAccountName TEXT NOT NULL,
    cmuAccount TEXT UNIQUE NOT NULL,
    studentId TEXT,
    prenameId TEXT,
    prenameTH TEXT,
    prenameEN TEXT,
    firstNameTH TEXT NOT NULL,
    firstNameEN TEXT NOT NULL,
    lastNameTH TEXT NOT NULL,
    lastNameEN TEXT NOT NULL,
    organizationCode TEXT NOT NULL,
    organizationNameTH TEXT NOT NULL,
    organizationNameEN TEXT NOT NULL,
    it_accountType AccountType NOT NULL,
    it_accountTypeTH TEXT NOT NULL,
    it_accountTypeEN TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT now() NOT NULL,
    updatedAt TIMESTAMP DEFAULT now() NOT NULL,
    CONSTRAINT users_cmuAccount_unique UNIQUE (cmuAccount)
);

-- Table for roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

-- Table for user_roles (junction table)
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    userId UUID NOT NULL,
    roleId INT NOT NULL,
    CONSTRAINT user_roles_userId_roleId_unique UNIQUE (userId, roleId),
    CONSTRAINT user_roles_userId_fkey FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT user_roles_roleId_fkey FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE
);


INSERT INTO roles (name, description) VALUES ('admin', 'Admin role' ), ('student' , 'Student role' ), ('alumni' , 'Alumni role' ), ('mis_employee' , 'MIS Employee role' );