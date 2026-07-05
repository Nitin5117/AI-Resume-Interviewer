---
# 📚 Learning Journal

This section documents my learning throughout the development of this project.
---

# Sprint 1 — Project Setup

## ✅ Completed

- Project Structure
- React (Vite) Setup
- Express Server
- MongoDB Atlas Connection
- Health API
- Environment Variables
- Axios Setup
- Backend Folder Structure
- Frontend Folder Structure

---

## 📖 Concepts Learned

### Why separate `app.js` and `server.js`?

**app.js**

Responsible for:

- Creating Express App
- Registering Middlewares
- Registering Routes

**server.js**

Responsible for:

- Loading Environment Variables
- Connecting Database
- Starting Server

This separation makes the application easier to test and maintain.

---

### Why use `.env`?

Environment variables keep sensitive information outside the source code.

Examples:

- MongoDB URI
- JWT Secret
- Gemini API Key

---

### Why MongoDB Atlas?

- Cloud Database
- Easy Deployment
- Automatic Scaling
- Secure Connection

---

### Why Axios?

Axios simplifies communication between React and Express.

Instead of

```javascript
fetch(...)
```

we use

```javascript
axios.get(...)
```

because it provides:

- Better Error Handling
- Automatic JSON Parsing
- Request Interceptors
- Response Interceptors

---

## 🎯 Interview Questions

### Q1. Why did you separate `app.js` and `server.js`?

**Answer**

`app.js` creates the Express application and registers middleware and routes.

`server.js` starts the server and connects external services such as MongoDB.

This improves maintainability and testing.

---

### Q2. What is CORS?

**Answer**

Cross-Origin Resource Sharing (CORS) is a browser security mechanism that controls which domains can access backend resources.

React and Express run on different ports during development, so CORS is required.

---

### Q3. Why use Environment Variables?

**Answer**

Environment variables store sensitive configuration like API keys and database credentials outside the source code, improving security.

---

### Q4. Why use MongoDB Atlas instead of Local MongoDB?

**Answer**

MongoDB Atlas provides a cloud-hosted database that is easy to deploy, access remotely, and scale.

---

### Q5. Why use Axios instead of Fetch?

**Answer**

Axios offers cleaner syntax, automatic JSON conversion, better error handling, request/response interceptors, and easier configuration.

---

# Sprint 2 — User Model

## ✅ Completed

- User Schema
- MongoDB Model
- Database Indexes

---

## 📖 Concepts Learned

### What is a Schema?

A schema defines the structure and validation rules of documents stored in MongoDB.

---

### Why use Mongoose?

Mongoose provides:

- Schema Validation
- Middleware
- Models
- Query Helpers
- Better Developer Experience

---

### Why use `trim: true`?

Automatically removes leading and trailing spaces.

```
" Monu "
```

becomes

```
"Monu"
```

---

### Why use `lowercase: true`?

Ensures emails and usernames are stored in lowercase.

```
MONU@gmail.com
```

↓

```
monu@gmail.com
```

---

### Why use `select: false`?

Passwords should never be returned accidentally.

They are only fetched when explicitly requested during login.

---

### Why use `timestamps: true`?

Automatically creates

- createdAt
- updatedAt

without writing extra code.

---

### Why use `enum`?

Restricts values.

Example

```javascript
role: {
  enum: ["user", "admin"];
}
```

This prevents invalid roles.

---

### Why create Indexes?

Indexes improve search performance.

Searching by

- Email
- Username

becomes significantly faster.

---

## 🎯 Interview Questions

### Q1. What is the difference between Schema and Model?

**Answer**

Schema defines the structure of documents.

Model provides an interface to interact with MongoDB using that schema.

---

### Q2. Why should passwords use `select: false`?

**Answer**

It prevents passwords from being returned in normal queries, improving application security.

---

### Q3. Why do we create indexes?

**Answer**

Indexes reduce query execution time by allowing MongoDB to locate documents without scanning the entire collection.

---

### Q4. Why use `timestamps: true`?

**Answer**

Automatically manages createdAt and updatedAt fields, reducing manual work and ensuring consistency.

---

### Q5. Why use `enum`?

**Answer**

Enum restricts a field to predefined values, preventing invalid data from being stored.

---

# Sprint 3 — Repository Layer

## ✅ Completed

- Repository Pattern
- User Repository

---

## 📖 Concepts Learned

### What is Repository Pattern?

Repository Pattern separates database logic from business logic.

Instead of

```
Controller

↓

MongoDB
```

we use

```
Controller

↓

Service

↓

Repository

↓

MongoDB
```

---

### Advantages

- Cleaner Code
- Easier Testing
- Better Maintainability
- Database Independence

---

### Repository Responsibilities

- Create User
- Find User
- Update User
- Delete User

Only database queries belong here.

---

## 🎯 Interview Questions

### Q1. What is the Repository Pattern?

**Answer**

The Repository Pattern isolates database operations from business logic, making applications easier to maintain, test, and extend.

---

### Q2. Why shouldn't Controllers access MongoDB directly?

**Answer**

Controllers should only handle HTTP requests and responses.

Database operations belong in the Repository layer.

---

### Q3. Why is the Repository Pattern useful?

**Answer**

If the database changes in the future (e.g., MongoDB to PostgreSQL), only the repository layer needs modification.

---

### Q4. What are the responsibilities of a Repository?

**Answer**

- Create
- Read
- Update
- Delete

Database-related operations only.

---

# 🚀 Next Sprint

Authentication

- JWT
- Password Hashing
- Register API
- Login API
- Protected Routes
- Authentication Middleware

---

# Sprint 4 — Service Layer

## ✅ Completed

- Business Logic
- Password Hashing
- Email Validation
- Duplicate User Validation

---

## 📖 Concepts Learned

### What is Service Layer?

Service Layer contains business logic.

Examples:

- Register User
- Login User
- Generate Interview
- Evaluate Answers

Controllers should never contain business logic.

---

### Why hash passwords?

Passwords should never be stored in plain text.

Instead

password123

↓

$2b$10$ksjdfh...

---

### Why use bcrypt?

bcrypt

- Generates Salt
- Hashes Password
- Protects Against Rainbow Table Attacks

---

## 🎯 Interview Questions

### What is Business Logic?

Business logic represents application-specific rules such as user registration, validation, hashing passwords, and interview evaluation.

---

### Why hash passwords?

To protect user credentials even if the database is compromised.

---

### Why use Service Layer?

It separates business logic from HTTP request handling and database access, making the application cleaner and easier to maintain.

# Sprint 5 — Backend Architecture Foundation

## ✅ Completed

- Repository Pattern
- Service Layer
- Controller Layer
- Express Routes
- Global Error Middleware
- Async Handler
- Custom AppError Class
- MongoDB Atlas Connection
- First Authentication API Structure

---

## 📂 Backend Architecture

```
Client (React)
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
Services
      │
      ▼
Repositories
      │
      ▼
MongoDB
```

### Why this Architecture?

Each layer has a single responsibility.

| Layer        | Responsibility                  |
| ------------ | ------------------------------- |
| Routes       | Define API endpoints            |
| Controllers  | Handle Request & Response       |
| Services     | Business Logic                  |
| Repositories | Database Queries                |
| Models       | Database Schema                 |
| Middlewares  | Authentication & Error Handling |
| Utils        | Helper Functions                |

This architecture follows the **Single Responsibility Principle (SRP)** and makes the project easier to maintain and scale.

---

# Repository Layer

## Responsibilities

- Create User
- Find User by Email
- Find User by Username
- Find User by ID

Only database operations belong here.

### Example Flow

```
Controller

↓

Service

↓

Repository

↓

MongoDB
```

---

# Service Layer

The Service Layer contains **business logic**.

Examples:

- Register User
- Login User
- Hash Password
- Validate Existing User
- Generate JWT
- Generate Interview Questions
- Evaluate Answers

Controllers should **never** contain business logic.

---

# Controller Layer

Controllers should only:

- Receive HTTP Request
- Call Service Layer
- Return HTTP Response

Controllers should **not**:

- Query MongoDB
- Hash Passwords
- Generate Tokens

---

# Error Handling

Implemented:

```
asyncHandler
```

```
AppError
```

```
Global Error Middleware
```

Instead of

```javascript
try {
   ...
} catch(error){
   ...
}
```

we now use

```javascript
const register = asyncHandler(async (req,res)=>{
    ...
});
```

Advantages:

- Cleaner Controllers
- Less Duplicate Code
- Centralized Error Handling
- Easier Debugging

---

# Authentication Flow

```
Client

↓

POST /register

↓

Route

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Response
```

---

# MongoDB

Successfully Connected to MongoDB Atlas.

Current Database:

```
ai-interview-platform
```

Collections (Future)

```
users

resumes

resumeReviews

interviews

questions

answers

reports
```

---

# Current Backend Structure

```
src
│
├── config
│     db.js
│
├── controllers
│     authController.js
│
├── errors
│     AppError.js
│
├── middlewares
│     authMiddleware.js
│     errorMiddleware.js
│
├── models
│     User.js
│
├── repositories
│     userRepository.js
│
├── routes
│     authRoutes.js
│
├── services
│     authService.js
│
├── uploads
│
├── utils
│     asyncHandler.js
│
├── validators
│
├── app.js
└── server.js
```

---

# 📖 Concepts Learned

## What is Layered Architecture?

Layered Architecture separates an application into independent layers.

Benefits:

- Easier Testing
- Better Maintainability
- Loose Coupling
- High Reusability

---

## What is Business Logic?

Business Logic represents application rules.

Examples:

- Register User
- Login User
- AI Evaluation
- Resume Analysis

Business Logic belongs in the **Service Layer**.

---

## What is Repository Pattern?

Repository Pattern separates database queries from business logic.

Advantages:

- Database Independence
- Better Testing
- Cleaner Code
- Easy Migration

---

## What is asyncHandler?

asyncHandler automatically catches asynchronous errors.

Without asyncHandler

```javascript
try {
   ...
}catch(error){
   ...
}
```

With asyncHandler

```javascript
const register = asyncHandler(async(req,res)=>{
   ...
});
```

---

## What is AppError?

A custom Error class that allows us to create meaningful API errors.

Example

```javascript
throw new AppError("Email already exists", 400);
```

instead of

```javascript
throw new Error("Email already exists");
```

---

## Why Global Error Middleware?

Instead of handling errors inside every controller, all errors are processed in one place.

Benefits:

- Consistent API Responses
- Easier Logging
- Cleaner Code
- Better Debugging

---

# 🎯 Interview Questions

## Q1. What is Layered Architecture?

**Answer**

Layered Architecture divides an application into multiple layers such as Routes, Controllers, Services, Repositories, and Database. Each layer has a specific responsibility, improving maintainability and scalability.

---

## Q2. Why shouldn't Controllers access MongoDB directly?

**Answer**

Controllers should only handle HTTP requests and responses. Database operations belong in the Repository layer, while business logic belongs in the Service layer.

---

## Q3. What is the Repository Pattern?

**Answer**

The Repository Pattern isolates database operations from business logic, making the application easier to maintain, test, and migrate to another database.

---

## Q4. What is Business Logic?

**Answer**

Business logic contains application-specific rules such as password hashing, duplicate email checking, AI evaluation, and interview generation.

---

## Q5. Why use asyncHandler?

**Answer**

It automatically catches asynchronous errors and forwards them to Express error middleware, eliminating repetitive try-catch blocks.

---

## Q6. Why use Global Error Middleware?

**Answer**

It centralizes error handling, ensuring consistent error responses, cleaner controllers, and easier debugging.

---

## Q7. What is AppError?

**Answer**

AppError is a custom error class that provides meaningful HTTP status codes and structured error messages instead of generic JavaScript errors.

---

## Q8. Explain the flow of a Register API.

**Answer**

```
Client

↓

Route

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Response
```

---

# 🚀 Current Progress

| Module             | Status |
| ------------------ | ------ |
| Project Setup      | ✅     |
| MongoDB Atlas      | ✅     |
| Folder Structure   | ✅     |
| User Model         | ✅     |
| Repository Pattern | ✅     |
| Service Layer      | ✅     |
| Controller Layer   | ✅     |
| Express Routes     | ✅     |
| Error Handling     | ✅     |
| Register API       | 🔄     |
| Login API          | ⏳     |
| JWT Authentication | ⏳     |
| Protected Routes   | ⏳     |
| Resume Upload      | ⏳     |
| AI Integration     | ⏳     |

---

# 📝 Development Notes

### Improvements Planned

- Joi Validation
- JWT Authentication
- Refresh Tokens
- Role-Based Access Control (RBAC)
- API Response Formatter
- Logging with Winston
- Rate Limiting
- Security Headers
- API Documentation using Swagger

---

# 🎯 Next Sprint

Authentication Module

- Complete Register API
- Login API
- JWT Generation
- Authentication Middleware
- Protected Routes
- Thunder Client API Testing

# 🚀 AI Interview Platform

An AI-powered full-stack interview preparation platform that simulates technical interviews, analyzes resumes, evaluates answers using AI, and tracks user progress over time.

> **Status:** 🚧 In Development

---

# 📖 Table of Contents

- Overview
- Features
- Tech Stack
- System Architecture
- Project Structure
- Database Design
- Authentication Flow
- Resume Module
- API Endpoints
- Development Progress
- Learning Outcomes
- Future Roadmap

---

# 📌 Overview

The AI Interview Platform helps candidates prepare for technical interviews by providing:

- AI-powered resume analysis
- Personalized interview questions
- AI answer evaluation
- Interview performance reports
- Progress tracking
- Resume improvement suggestions

---

# ✨ Features

## ✅ Authentication

- Register
- Login
- JWT Authentication
- Protected Routes
- User Profile

---

## 🚧 Resume Module

- Upload Resume (PDF)
- Store Resume Metadata
- PDF Parsing
- AI Resume Review _(Upcoming)_
- ATS Score _(Upcoming)_
- Resume Suggestions _(Upcoming)_

---

## 🚧 Interview Module

- Choose Role
- Select Difficulty
- Select Duration
- AI Question Generation
- Follow-up Questions
- Timer
- Progress Tracking

---

## 🚧 AI Evaluation

- Technical Score
- Communication Score
- Confidence Score
- Problem Solving Score
- Sample Answers
- Suggestions

---

## 🚧 Dashboard

- Resume Score
- Interview History
- Performance Analytics
- Progress Charts
- Weak Topics
- Strong Topics

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB Atlas
- Mongoose

---

## Authentication

- JWT
- bcryptjs

---

## File Upload

- Multer

---

## PDF Parsing

- pdf-parse

---

## AI

- Google Gemini API _(Upcoming)_

---

# 🏗 System Architecture

```
                React Frontend
                       │
                 Axios Requests
                       │
                 Express Server
                       │
     ┌─────────────────┼─────────────────┐
     │                 │                 │
 Authentication     Resume         Interview
     │                 │                 │
 Services         Services         Services
     │                 │                 │
Repositories   Repositories   Repositories
     │                 │                 │
          MongoDB Atlas Database
                       │
                Google Gemini AI
```

---

# 📁 Project Structure

```
server
│
├── src
│   │
│   ├── config
│   │     db.js
│   │
│   ├── controllers
│   │     authController.js
│   │     resumeController.js
│   │
│   ├── models
│   │     User.js
│   │     Resume.js
│   │
│   ├── repositories
│   │     userRepository.js
│   │     resumeRepository.js
│   │
│   ├── services
│   │     authService.js
│   │     resumeService.js
│   │
│   ├── middlewares
│   │     authMiddleware.js
│   │     uploadMiddleware.js
│   │     errorMiddleware.js
│   │
│   ├── routes
│   │     authRoutes.js
│   │     resumeRoutes.js
│   │
│   ├── utils
│   │     asyncHandler.js
│   │     generateToken.js
│   │     pdfParser.js
│   │
│   ├── validators
│   │
│   ├── errors
│   │     AppError.js
│   │
│   ├── uploads
│   │     resumes
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# 🗄 Database Design

## User

```
User

_id
firstName
lastName
username
email
password
profilePicture
role
isVerified
lastLogin
createdAt
updatedAt
```

---

## Resume

```
Resume

_id
user
fileName
originalName
filePath
fileSize
mimeType
parsedText
skills
education
experience
projects
certifications
createdAt
updatedAt
```

---

# 🔐 Authentication Flow

```
Register

↓

Hash Password

↓

Store User

↓

Login

↓

Verify Password

↓

Generate JWT

↓

Protected Routes

↓

Profile API
```

---

# 📄 Resume Upload Flow

```
User

↓

Select PDF

↓

Upload

↓

Multer

↓

Store File

↓

Parse PDF

↓

Save Resume

↓

AI Review (Upcoming)
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint           | Status |
| ------ | ------------------ | ------ |
| POST   | /api/auth/register | ✅     |
| POST   | /api/auth/login    | ✅     |
| GET    | /api/auth/profile  | ✅     |

---

## Resume

| Method | Endpoint           | Status |
| ------ | ------------------ | ------ |
| POST   | /api/resume/upload | ✅     |

---

# 📚 Concepts Implemented

## Backend

- MVC-inspired Layered Architecture
- Repository Pattern
- Service Layer
- JWT Authentication
- Password Hashing
- Middleware
- File Upload
- PDF Parsing
- Global Error Handling
- Async Handler

---

## Security

- Password Hashing
- JWT Authentication
- Protected Routes
- Role-based Design
- Environment Variables

---

# 📈 Development Progress

| Module             | Status |
| ------------------ | ------ |
| Project Setup      | ✅     |
| MongoDB Atlas      | ✅     |
| Authentication     | ✅     |
| JWT Authentication | ✅     |
| Protected Routes   | ✅     |
| Resume Upload      | ✅     |
| PDF Parsing        | ✅     |
| AI Resume Review   | 🚧     |
| Interview Module   | 🚧     |
| AI Evaluation      | 🚧     |
| Dashboard          | 🚧     |
| Admin Panel        | 🚧     |
| Frontend           | 🚧     |
| Deployment         | 🚧     |

---

# 🎯 Learning Outcomes

This project demonstrates understanding of:

- REST API Development
- Express.js
- MongoDB
- Authentication
- Authorization
- Repository Pattern
- Layered Architecture
- File Uploads
- PDF Parsing
- AI Integration
- Clean Code Principles

---

# 🚀 Upcoming Features

## Resume

- AI Resume Review
- ATS Score
- Resume Suggestions
- Missing Skills Detection

---

## Interview

- AI Question Generation
- Dynamic Follow-up Questions
- Coding Interview
- HR Interview

---

## Dashboard

- Performance Analytics
- Interview History
- Progress Tracking
- Weak Topics
- Strong Topics

---

## AI

- Resume Analysis
- Interview Evaluation
- Personalized Learning Roadmap
- Company-specific Interview Questions

---

# 📅 Current Milestone

✅ Authentication Module Completed

✅ Resume Upload Completed

✅ PDF Parsing Completed

🔄 Starting Frontend Development

---

# 👨‍💻 Author

**Monu Baindara**

AI Interview Platform — Portfolio Project

Built to demonstrate Full Stack Development, AI Integration, Clean Architecture, and Production-ready Backend Design.
