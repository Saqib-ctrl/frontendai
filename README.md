
# AI Recruitment & Staffing Web App

This is a full-stack AI-driven recruitment platform powered by FastAPI, React, PostgreSQL, and GPT-4.

## 🚀 Features Implemented (Phases 1–11)
- Resume Upload + GPT-4 Bio Generation
- Candidate & Employer Management
- Job Posting with AI Descriptions
- Application Tracking
- In-App Messaging
- AI Contract Generator
- AI Email & Blog Tools
- Admin Dashboard, Analytics, Audit Logs

## 🐳 Docker Setup

### 1. Environment
Create your `.env` file (already included):

```
OPENAI_API_KEY=your-openai-api-key-here
```

### 2. Run with Docker Compose

```bash
docker-compose up --build
```

- Backend will be available at `http://localhost:8000`
- Database: PostgreSQL on `localhost:5432`

## 📦 Folder Structure
- `backend/`: FastAPI backend
- `components/`: React components (frontend UI)
- `Dockerfile`: Backend Docker container
- `docker-compose.yml`: Full orchestration

## 🛠️ Notes
- Frontend is static components; can be integrated with React framework or hosted separately.
- For production, ensure proper secrets and HTTPS configuration.
