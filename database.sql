DROP TABLE IF EXISTS user_roles, users, roles, programs;
DROP TYPE IF EXISTS AccountType;

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
    isActive BOOLEAN DEFAULT TRUE NOT NULL,
    createdAt TIMESTAMP DEFAULT now() NOT NULL,
    updatedAt TIMESTAMP DEFAULT now() NOT NULL
);

-- Table for roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT
);

-- Table for programs
CREATE TABLE programs (
    id SERIAL PRIMARY KEY NOT NULL,
    program_name_th TEXT NOT NULL,
    program_name_en TEXT NOT NULL,
    abbreviation TEXT NOT NULL,
    CONSTRAINT program_name_th_key UNIQUE (program_name_th),
    CONSTRAINT program_name_en_key UNIQUE (program_name_en)
);

-- Table for user_roles (junction table)
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    userId UUID NOT NULL,
    roleId INT NOT NULL,
    programs_id INT,
    createDate TIMESTAMP DEFAULT now() NOT NULL,
    updateDate TIMESTAMP DEFAULT now() NOT NULL,
    createBy varchar(255),
    CONSTRAINT user_roles_userId_roleId_unique UNIQUE (userId, roleId),
    CONSTRAINT user_roles_userId_fkey FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT user_roles_roleId_fkey FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE CASCADE,
    CONSTRAINT user_roles_programs_id_fkey FOREIGN KEY (programs_id) REFERENCES programs (id) ON DELETE CASCADE,
    CONSTRAINT user_roles_createBy_fkey FOREIGN KEY (createBy) REFERENCES users (cmuAccount) ON DELETE CASCADE
);

-- Insert predefined roles
INSERT INTO roles (name, description)
VALUES 
    ('admin', 'Admin role'),
    ('student', 'Student role'),
    ('alumni', 'Alumni role'),
    ('mis_employee', 'MIS Employee role'),
    ('platform_admin', 'Platform Admin role');
