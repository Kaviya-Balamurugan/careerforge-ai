from fastapi import FastAPI, UploadFile, File

from app.services.agent_planner import create_plan
from app.services.agent_executor import execute_plan

from app.database.database import Base, engine
import app.database.models 

import shutil
import os

from app.services.resume_parser import extract_resume_text
from app.services.skill_extractor import extract_skills
from app.services.ai_role_analyzer import get_required_skills
from app.services.gap_analyzer import analyze_skill_gap
from app.services.roadmap_generator import generate_roadmap
from app.services.resource_recommender import get_resources
from app.services.project_recommender import get_projects
from fastapi.middleware.cors import CORSMiddleware
from app.services.career_summary import generate_career_summary
from app.services.job_recommender import get_job_recommendations
from app.services.resume_improver import get_resume_suggestions
from app.services.ats_analyzer import analyze_ats
from app.services.ai_interview_generator import generate_questions
from app.services.career_chatbot import career_chat
from app.services.jd_matcher import match_resume_with_jd
from app.services.answer_evaluator import evaluate_answer
from app.services.ai_service import ask_ai
from app.services.resume_chat import chat_with_resume
from app.services.resume_rewriter import rewrite_resume
from app.services.role_cache import role_skill_cache
from app.services.ai_readiness import evaluate_readiness
from app.services.resume_score import analyze_resume_score

from app.routers.auth_router import router as auth_router
from app.routers.resume_router import router as resume_router
from app.routers.ats_router import router as ats_router
from app.routers.interview_router import router as interview_router
from app.routers.career_router import router as career_router
from app.routers.jobs_router import router as jobs_router
from app.routers.agent_router import router as agent_router
from app.routers.analysis_router import router as analysis_router
from app.routers.dashboard_router import router as dashboard_router

app = FastAPI()
Base.metadata.create_all(bind=engine)
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(ats_router)
app.include_router(interview_router)
app.include_router(career_router)
app.include_router(jobs_router)
app.include_router(agent_router)
app.include_router(analysis_router)
app.include_router(dashboard_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://careerforge-ai-kaviya.vercel.app",
        "https://careerforge-4lp53rh2v-kaviya-balamurugans-projects.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def home():
    return {"message": "CareerForge AI Backend Running"}