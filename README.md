# Serquest - Business Unit & Task Management Module

A full-stack enterprise management module built with **.NET 10** and **Angular 19**, demonstrating Clean Architecture, CQRS, and reactive state management patterns.

---

## 🛠️ Tech Stack

* **Backend:** .NET 10 Web API, MediatR (CQRS), Dapper ORM
* **Frontend:** Angular 19 (Signals), PrimeNG UI Components
* **Database:** MSSQL Server (Stored Procedures)

---

## 🏗️ Architecture & Key Features

### Backend (.NET 10 Web API)
* **Clean Architecture:** Divided into strict `Domain`, `Application`, `Infrastructure`, and `Presentation` project boundaries.
* **CQRS Pattern:** Complete separation of read queries and write commands using MediatR.
* **Dapper Persistence:** Direct stored procedure execution (`sp_SQBusinessUnit_*`) using `DapperDbContext` with explicit `SCOPE_IDENTITY()` retrieval.
* **Thin Controllers:** Presentation controllers delegate execution solely via `_mediator.Send()`.

### Frontend (Angular 19 & PrimeNG)
* **Angular Signals:** Modern reactive state management without legacy RxJS stream subscriptions.
* **Form State Isolation:** Deep-copied signal values prevent unsubmitted form edits from mutating table grid state prior to saving.
* **Responsive Layout:** Side-by-side 60/40 desktop split-screen built with PrimeNG components (`p-table`, forms) that collapses fluidly on mobile.

---

## 🚀 Quick Start

1. **Database Setup:** Execute your database scripts to create the `[dbo].[SQBusinessUnit]` table and its corresponding stored procedures (`sp_SQBusinessUnit_GetAll`, `sp_SQBusinessUnit_GetById`, `sp_SQBusinessUnit_Insert`, `sp_SQBusinessUnit_Update`).

2. **Backend Setup:**
   - Command: `cd Serquest && dotnet restore && dotnet run --project Serquest.Presentation`
   - API Endpoint: `https://localhost:7017`

3. **Frontend Setup:**
   - Command: `cd Serquest-Client && npm install && ng serve`
   - UI URL: `http://localhost:4200/`
