# Employee Registration Assignment

## Project Overview
This is a Full Stack Employee Registration Application developed using:

- Frontend: Angular
- Backend: ASP.NET Core Web API (.NET 8)
- Database: SQL Server

The application allows users to:

- Register Employees
- View Employee List
- Edit Employee Details
- Delete Employees
- Search Employees by Name and Mobile Number
- Filter Country and State
- Validate Duplicate Mobile Numbers

---

## Technology Stack

### Frontend
- Angular
- TypeScript
- Bootstrap
- HTML/CSS

### Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core

### Database
- SQL Server

---

## Project Structure

```text
Employee-Registration-Assignment
│
├── Database
│   └── EmployeeDB.sql
│
├── Ezo_assign
│   └── ASP.NET Core Web API (.NET 8)
│
├── Front-End
│   └── Angular Application
│
├── README.md
└── .gitignore
```

---

## Features Implemented

### Employee Registration
- Auto-generated Employee Id
- Employee Name validation (Alphabets only)
- Age validation (Numbers only)
- Mobile Number validation (10 digits)
- Duplicate Mobile Number validation
- Date of Birth validation
- Address validation
- Pincode validation
- Country and State dropdown functionality

### Employee Management
- Create Employee
- View Employee List
- Edit Employee
- Delete Employee
- Search by Employee Name
- Search by Mobile Number
- Pagination (5 records per page)

---

# Database Setup

### Step 1
Open SQL Server Management Studio (SSMS).

### Step 2
Execute:

```text
Database/EmployeeDB.sql
```

This script will:

- Create Employee database
- Create Country_Mst table
- Create State_Mst table
- Create Employee_Mst table
- Insert sample Country and State data

---

# Backend Setup

## Prerequisites
- Visual Studio 2022
- .NET 8 SDK
- SQL Server

## Steps

1. Open:

```text
Ezo_assign.sln
```

2. Update the connection string in:

```text
appsettings.json
```

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=Employee;Trusted_Connection=True;TrustServerCertificate=True"
}
```

3. Run the application.

Swagger URL:

```text
https://localhost:<port>/swagger
```

---

# Frontend Setup

## Prerequisites

- Node.js
- Angular CLI

## Install Dependencies

```bash
npm install
```

## Run the Application

```bash
ng serve
```

Application URL:

```text
http://localhost:4200
```

---

# API Endpoints

## Employee APIs

| Method | Endpoint |
|--------|-----------|
| GET | /api/employee |
| GET | /api/employee/{id} |
| POST | /api/employee |
| PUT | /api/employee/{id} |
| DELETE | /api/employee/{id} |



# Author

**Bhargav Kumar**

Full Stack Developer (.NET | Angular)
