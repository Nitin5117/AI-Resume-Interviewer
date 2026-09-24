# AI Interview Platform

AI-powered interview preparation platform that analyzes resumes, generates personalized mock interviews, evaluates candidate answers, and tracks preparation progress.

## Features

- JWT authentication with bcrypt password hashing and protected routes
- PDF resume upload with Multer and text extraction with `pdf-parse`
- Google Gemini resume analysis with ATS scoring, detected skills, missing skills, strengths, and prioritized suggestions
- Personalized mock interviews generated from resume content and configurable role, company, difficulty, experience, focus, and interviewer personality settings
- AI evaluation of completed interviews with overall scoring, category scores, question-level feedback, strengths, weaknesses, recommendations, and hiring decision
- Dashboard and interview history with average score, best score, completed interviews, resume score, and performance history
- Profile management, password changes, request validation, rate limiting, security headers, logging, and centralized error handling

## Architecture

The backend follows a layered architecture to separate responsibilities and improve maintainability:

```text
Routes -> Controllers -> Services -> Repositories -> MongoDB
                         |
                         +-> Gemini AI services
```

The React client communicates with the Express API through Axios. AI-related work is isolated in dedicated services for resume analysis, interview question generation, and interview evaluation.

## Tech Stack

**Frontend:** React, Vite, React Router, Tailwind CSS, Axios, Recharts, Framer Motion

**Backend:** Node.js, Express, Mongoose, MongoDB, JWT, bcryptjs, Joi, Multer, `pdf-parse`

**AI:** Google Gemini API

## Project Structure

```text
ai-interview-platform/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Reusable UI and feature components
│       ├── pages/          # Application screens
│       ├── services/       # API client services
│       ├── routes/          # Public and protected routes
│       └── context/        # Authentication state
├── server/                 # Express backend
│   └── src/
│       ├── routes/         # API route definitions
│       ├── controllers/    # HTTP request handling
│       ├── services/       # Business logic and AI workflows
│       ├── repositories/   # Database access
│       ├── models/         # Mongoose schemas
│       ├── middlewares/    # Auth, validation, upload, and errors
│       └── validators/     # Request validation rules
└── docs/                   # Supporting project documentation
```

## Getting Started

### Prerequisites

- Node.js 22 or later
- MongoDB, local or hosted through MongoDB Atlas
- Google Gemini API key

### 1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2. Configure the server

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai-interview-platform
JWT_SECRET=replace-with-a-long-random-secret
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Start the backend

```bash
cd server
npm run dev
```

The API runs at `http://localhost:5000`.

### 4. Start the frontend

In a second terminal:

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## API Overview

| Area           | Base route       | Purpose                                                 |
| -------------- | ---------------- | ------------------------------------------------------- |
| Authentication | `/api/auth`      | Register, login, and account access                     |
| Resumes        | `/api/resume`    | Upload, analyze, view, and delete resumes               |
| Interviews     | `/api/interview` | Create interviews, submit answers, and generate reports |
| Dashboard      | `/api/dashboard` | Retrieve preparation statistics and performance history |
| Profile        | `/api/profile`   | View and update user profile information                |

Health checks are available at `/api/health`.
