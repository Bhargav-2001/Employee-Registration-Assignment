/********************************************************************
    Employee Registration Assignment
    Database Script
********************************************************************/
------------------------------------------------------------
-- Create Database
------------------------------------------------------------
CREATE DATABASE Employee;
GO

USE Employee;
GO
-- Create Country_Mst Table
------------------------------------------------------------
CREATE TABLE Country_Mst
(
    CountryId INT IDENTITY(1,1) PRIMARY KEY,
    CountryName VARCHAR(100) NOT NULL
);
GO
------------------------------------------------------------
-- Create State_Mst Table
------------------------------------------------------------
CREATE TABLE State_Mst
(
    StateId INT IDENTITY(1,1) PRIMARY KEY,
    StateName VARCHAR(100) NOT NULL,
    CountryId INT NOT NULL,

    CONSTRAINT FK_State_Country
    FOREIGN KEY (CountryId)
    REFERENCES Country_Mst(CountryId)
);
GO

------------------------------------------------------------
-- Create Employee_Mst Table
------------------------------------------------------------
CREATE TABLE Employee_Mst
(
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,

    EmployeeName VARCHAR(30) NOT NULL,

    Age INT NOT NULL,

    MobileNum VARCHAR(10) NOT NULL,

    Pincode VARCHAR(6) NOT NULL,

    DOB DATETIME NULL,

    AddressLine1 VARCHAR(250) NOT NULL,

    AddressLine2 VARCHAR(250) NULL,

    StateId INT NOT NULL,

    CountryId INT NOT NULL,

    CONSTRAINT UQ_Employee_Mobile
    UNIQUE (MobileNum),

    CONSTRAINT FK_Employee_State
    FOREIGN KEY (StateId)
    REFERENCES State_Mst(StateId),

    CONSTRAINT FK_Employee_Country
    FOREIGN KEY (CountryId)
    REFERENCES Country_Mst(CountryId)
);
GO

/********************************************************************
                    INSERT DATA
********************************************************************/

------------------------------------------------------------
-- Insert Countries
------------------------------------------------------------
INSERT INTO Country_Mst (CountryName)
VALUES
('India'),
('USA'),
('Canada');
GO

------------------------------------------------------------
-- Insert States
------------------------------------------------------------
INSERT INTO State_Mst (StateName, CountryId)
VALUES
('Telangana',1),
('Andhra Pradesh',1),
('Karnataka',1),
('Tamil Nadu',1),
('California',2),
('Texas',2),
('New York',2),
('Ontario',3),
('Quebec',3);
GO
------------------------------------------------------------
-- Create State_Mst Table
------------------------------------------------------------
CREATE TABLE State_Mst
(
    StateId INT IDENTITY(1,1) PRIMARY KEY,
    StateName VARCHAR(100) NOT NULL,
    CountryId INT NOT NULL,

    CONSTRAINT FK_State_Country
    FOREIGN KEY (CountryId)
    REFERENCES Country_Mst(CountryId)
);
GO

------------------------------------------------------------
-- Create Employee_Mst Table
------------------------------------------------------------
CREATE TABLE Employee_Mst
(
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,

    EmployeeName VARCHAR(30) NOT NULL,

    Age INT NOT NULL,

    MobileNum VARCHAR(10) NOT NULL,

    Pincode VARCHAR(6) NOT NULL,

    DOB DATETIME NULL,

    AddressLine1 VARCHAR(250) NOT NULL,

    AddressLine2 VARCHAR(250) NULL,

    StateId INT NOT NULL,

    CountryId INT NOT NULL,

    CONSTRAINT UQ_Employee_Mobile
    UNIQUE (MobileNum),

    CONSTRAINT FK_Employee_State
    FOREIGN KEY (StateId)
    REFERENCES State_Mst(StateId),

    CONSTRAINT FK_Employee_Country
    FOREIGN KEY (CountryId)
    REFERENCES Country_Mst(CountryId)
);
GO

/********************************************************************
                    INSERT MASTER DATA
********************************************************************/

------------------------------------------------------------
-- Insert Countries
------------------------------------------------------------
INSERT INTO Country_Mst (CountryName)
VALUES
('India'),
('USA'),
('Canada');
GO

------------------------------------------------------------
-- Insert States
------------------------------------------------------------
INSERT INTO State_Mst (StateName, CountryId)
VALUES
('Telangana',1),
('Andhra Pradesh',1),
('Karnataka',1),
('Tamil Nadu',1),
('California',2),
('Texas',2),
('New York',2),
('Ontario',3),
('Quebec',3);
GO
