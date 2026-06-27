# 🚀 CareerForge AI

### AI-Powered Agentic Career Assistant

> **CareerForge AI** is an Agentic AI platform that helps students and job seekers improve their resumes, identify skill gaps, prepare for interviews, optimize ATS scores, and build personalized career roadmaps.

Built for the **KartiLine Agentic AI Hackathon 2026**.

---

# 📌 Problem Statement

Students often struggle to understand why their resumes are rejected, what skills they are missing, which projects to build, and how to prepare for interviews.

Current career platforms provide fragmented solutions:

* Resume analyzers
* ATS checkers
* Learning platforms
* Interview preparation tools

Users must switch between multiple platforms.

CareerForge AI unifies all these tasks into one intelligent AI agent.

---

# 🎯 Objective

Build an Agentic AI Career Assistant that can:

* Analyze resumes
* Detect missing skills
* Recommend personalized learning paths
* Suggest projects
* Improve ATS compatibility
* Generate interview questions
* Rewrite resumes
* Recommend jobs
* Provide AI-powered career guidance

---

# 🧠 Agentic AI Workflow

CareerForge AI follows the complete Agentic AI loop.

## 👀 Perceive

The agent collects information by:

* Reading uploaded resume
* Extracting skills
* Understanding the target role
* Parsing optional job descriptions

---

## 🤔 Decide

The planner decides which tools should execute.

Examples:

* Skill Gap Analysis
* Resume Scoring
* ATS Analysis
* Career Summary
* Resume Suggestions
* Learning Roadmap
* Project Recommendations
* Job Recommendations
* Resume Rewrite
* Interview Question Generation

---

## ⚡ Act

The agent executes AI services to:

* Analyze resume
* Generate ATS feedback
* Recommend jobs
* Rewrite resume
* Chat with user
* Evaluate interview answers

---

## 👁 Observe

The system stores observations in memory after each action.

Examples:

* Resume analysis
* Skill gaps
* ATS results
* Generated roadmap
* Interview questions
* AI reflections

---

## 🔁 Reflect

After every action the agent reflects whether the goal has been completed.

Example:

```
Goal:
Become an ML Engineer

↓

Skill Gap

↓

Roadmap

↓

Resume Score

↓

Projects

↓

ATS

↓

Interview Preparation

↓

Goal Completed
```

---

# ✨ Features

## 📄 Resume Analysis

* Resume parsing
* Resume quality score
* Technical skill extraction

---

## 🎯 Skill Gap Detection

Compares resume skills against target role.

Outputs:

* Missing Skills
* Matching Skills
* Readiness Score

---

## 🛣 Personalized Learning Roadmap

Generates weekly roadmap.

Example:

Week 1 → PyTorch

Week 2 → NumPy

Week 3 → OpenCV

---

## 📚 Learning Resources

Provides official resources for every missing skill.

---

## 🚀 Project Recommendations

Suggests projects based on missing skills.

Example:

* Brain Tumor Classification
* Object Detection System
* AI Resume Analyzer
* CareerForge AI

---

## 📈 Resume Analytics

Shows

* Resume Score
* Technical Skills Score
* Project Score
* Experience Score
* ATS Score

---

## 📄 ATS Resume Analyzer

Analyzes resume for ATS compatibility.

Provides

* ATS Score
* ATS Suggestions

---

## 🤖 AI Career Summary

Generates personalized career summary based on

* Resume
* Skills
* Target Role

---

## 💼 AI Job Recommendation

Suggests relevant job roles based on resume skills.

---

## 🎤 AI Interview Preparation

Generates role-specific interview questions.

Examples

* ML Engineer
* AI Engineer
* Data Scientist
* Frontend Developer

---

## ⭐ AI Interview Evaluation

Evaluates user answers.

Returns

* Score
* Feedback
* Improvement Suggestions

---

## 💬 AI Career Assistant

Allows users to ask questions like

* Improve my resume
* What skills am I missing?
* How can I become an AI Engineer?
* Suggest projects
* Prepare me for interviews

---

## ✍ AI Resume Rewrite

Generates an improved ATS-friendly resume.

---

## 📥 Career Report

Exports a downloadable report containing

* Skill Gap
* ATS Report
* Projects
* Roadmap
* Interview Questions

---

# 🏗 System Architecture

```
React Frontend
        │
        ▼
FastAPI Backend
        │
        ▼
Agent Planner
        │
        ▼
Agent Executor
        │
        ▼
Perceive → Decide → Act → Observe → Reflect
        │
        ▼
Groq Llama 3.3 70B
```

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* CSS
* Axios

## Backend

* Python
* FastAPI
* Uvicorn

## AI

* Groq API
* Llama 3.3 70B

## Resume Processing

* PyPDF2
* PDF Parsing
* Skill Extraction

---

# 📂 Project Structure

```
careerforge-ai/

backend/
    app/
        services/
    uploads/
    main.py

frontend/
    src/
        components/
    App.jsx

README.md
requirements.txt
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/careerforge-ai.git
```

---

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn backend.main:app --reload
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

Create a `.env` file

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

## 🎥 Demo Video

Watch the complete demo of CareerForge AI here:

**Google Drive:**  
https://drive.google.com/drive/folders/10-dIY2bGw2NxptNiGuTogk7hIycVCRy4?usp=drive_link


# 🚀 Future Enhancements

* Multi-agent collaboration
* Resume ranking
* Company-specific interview preparation
* LinkedIn profile optimization
* Cover letter generation
* Internship recommendation engine
* Live job search integration
* Email automation
* Memory-enhanced AI coaching

---

# 👩‍💻 Team

**The Innovators**

Developed for the **KartiLine Agentic AI Hackathon 2026**.

