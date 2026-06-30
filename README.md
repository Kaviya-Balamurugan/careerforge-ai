# 🚀 CareerForge AI – Agentic AI Career Assistant

> An AI-powered career assistant that analyzes resumes, identifies skill gaps, evaluates ATS readiness, generates personalized learning roadmaps, recommends jobs, prepares users for interviews, and provides AI-powered career guidance using an Agentic AI workflow.

🌐 **Live Demo:** https://careerforge-ai-kaviya.vercel.app

📂 **GitHub Repository:** https://github.com/Kaviya-Balamurugan/careerforge-ai

---

# ✨ Features

- 📄 Resume Upload & Parsing
- 📊 ATS Resume Analysis
- 🎯 Skill Gap Analysis
- 📈 Resume Readiness Score
- 🛣 Personalized Learning Roadmap
- 📚 Learning Resource Recommendations
- 💼 AI Job Recommendations
- 🤖 AI Career Summary
- 💬 AI Resume Chat Assistant
- 🎤 AI Interview Question Generator
- ✅ AI Interview Answer Evaluation
- ✍️ AI Resume Rewriter
- 📑 Resume vs Job Description Matching
- 📥 PDF Report Generation

---

# 🧠 Agentic AI Workflow

CareerForge AI follows an **Agentic AI architecture** where the system autonomously plans, reasons, executes tools, observes results, and reflects before deciding the next action.

```
Perceive
    ↓
Plan
    ↓
Decide
    ↓
Execute Tools
    ↓
Observe
    ↓
Reflect
    ↓
Goal Achieved
```

The agent dynamically selects the required tools instead of executing every module sequentially.

---

# 🏗 System Architecture

```
Frontend (React.js)

        │

        ▼

 FastAPI Backend

        │

        ▼

Agent Planner
Agent Memory
Agent Decider
Agent Executor
Agent Observer
Agent Reflector

        │

        ▼

AI Modules

• Resume Parser
• ATS Analyzer
• Skill Gap Analyzer
• Resume Score
• Career Summary
• Learning Roadmap
• Job Recommendation
• Resume Chat
• Resume Rewriter
• Interview Generator
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- Axios
- CSS
- jsPDF

## Backend

- FastAPI
- Python
- Groq API (Llama 3.3)
- PyMuPDF

## AI Features

- LLM-powered Resume Analysis
- ATS Evaluation
- Resume Chat
- Interview Generation
- Resume Rewriting
- Agentic AI Workflow

---

# 📸 Application Modules

### 📄 Dashboard

- Upload Resume
- Select Target Role
- Resume Analysis
- Job Description Matching

### 📊 Analytics

- Resume Score
- Readiness Score
- ATS Score

### 🎯 Skills

- Skill Gap Analysis
- Personalized Learning Roadmap
- Learning Resources

### 💼 Projects

- AI Recommended Projects

### 📑 ATS

- ATS Report
- Career Summary
- Resume Suggestions
- Resume Rewrite
- Job Recommendations

### 🤖 AI Assistant

- Resume-based Chat
- Career Guidance
- Download PDF Report

### 🎤 Interview

- AI Interview Questions
- AI Answer Evaluation
- Feedback & Suggestions

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Kaviya-Balamurugan/careerforge-ai.git

cd careerforge-ai
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=your_groq_api_key
```

---

# 📂 Project Structure

```
careerforge-ai/

├── backend/
│   ├── app/
│   │   ├── services/
│   │   └── uploads/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# 📈 Future Improvements

- User Authentication
- Resume History
- Multi-Resume Comparison
- AI Cover Letter Generator
- Company-specific Interview Preparation
- Live Job API Integration
- Resume Version Tracking
- AI Career Progress Dashboard

---

# 👩‍💻 Author

**Kaviya B**

- GitHub: https://github.com/Kaviya-Balamurugan
- LinkedIn: https://www.linkedin.com/in/kaviyabalamurugan

---

# ⭐ If you like this project

Please consider giving the repository a **Star ⭐**.
