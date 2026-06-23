from fastapi import FastAPI, UploadFile, File
import shutil
import os

from backend.app.services.resume_parser import extract_resume_text
from backend.app.services.skill_extractor import extract_skills
from backend.app.services.role_analyzer import get_required_skills
from backend.app.services.gap_analyzer import analyze_skill_gap
from backend.app.services.roadmap_generator import generate_roadmap
from backend.app.services.resource_recommender import get_resources
from backend.app.services.project_recommender import get_projects
from fastapi.middleware.cors import CORSMiddleware
from backend.app.services.career_summary import generate_career_summary
from backend.app.services.job_recommender import get_job_recommendations
from backend.app.services.resume_improver import get_resume_suggestions
from backend.app.services.ats_analyzer import analyze_ats
from backend.app.services.interview_generator import generate_questions
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "backend/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def home():
    return {"message": "CareerForge AI Backend Running"}


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }


# ADD THIS HERE
@app.get("/extract-text")
def extract_text(filename: str):

    file_path = f"backend/uploads/{filename}"

    text = extract_resume_text(file_path)

    return {
        "filename": filename,
        "text": text[:3000]
    }

@app.get("/extract-skills")
def get_skills(filename: str):

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    skills = extract_skills(resume_text)

    return {
        "skills": skills
    }

@app.get("/analyze-role")
def analyze_role(role: str):

    required_skills = get_required_skills(role)

    return {
        "role": role,
        "required_skills": required_skills
    }

@app.get("/skill-gap")
def skill_gap(filename: str, role: str):

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    current_skills = extract_skills(resume_text)

    required_skills = get_required_skills(role)

    result = analyze_skill_gap(
        current_skills,
        required_skills
    )

    return {
    "role": role,
    "current_skills": current_skills,
    "required_skills": required_skills,
    "matched_skills": result["matched_skills"],
    "missing_skills": result["missing_skills"],
    "readiness_score": result["readiness_score"]
}

@app.get("/roadmap")
def roadmap(filename: str, role: str):

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    current_skills = extract_skills(resume_text)

    required_skills = get_required_skills(role)

    gap_result = analyze_skill_gap(
        current_skills,
        required_skills
    )

    roadmap = generate_roadmap(
        gap_result["missing_skills"]
    )

    return {
        "role": role,
        "readiness_score": gap_result["readiness_score"],
        "roadmap": roadmap
    }

@app.get("/learning-plan")
def learning_plan(filename: str, role: str):

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    current_skills = extract_skills(resume_text)

    required_skills = get_required_skills(role)

    gap_result = analyze_skill_gap(
        current_skills,
        required_skills
    )

    roadmap = generate_roadmap(
        gap_result["missing_skills"]
    )

    learning_plan = {}

    for week, skill in roadmap.items():
        learning_plan[week] = {
            "skill": skill,
            "resources": get_resources(skill)
        }

    return learning_plan

@app.get("/project-recommendations")
def project_recommendations(
    filename: str,
    role: str
):
    

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    current_skills = extract_skills(resume_text)

    required_skills = get_required_skills(role)

    gap_result = analyze_skill_gap(
        current_skills,
        required_skills
    )

    projects = get_projects(
        gap_result["missing_skills"]
    )

    return {
        "recommended_projects": projects
    }

@app.get("/career-summary")
def career_summary(
    filename: str,
    role: str
):

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    current_skills = extract_skills(resume_text)

    required_skills = get_required_skills(role)

    gap_result = analyze_skill_gap(
        current_skills,
        required_skills
    )

    summary = generate_career_summary(
        role,
        gap_result["readiness_score"],
        gap_result["matched_skills"],
        gap_result["missing_skills"]
    )

    return {
        "summary": summary
    }

@app.get("/job-recommendations")
def job_recommendations(filename: str):

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    current_skills = extract_skills(resume_text)

    jobs = get_job_recommendations(current_skills)

    return {
        "jobs": jobs
    }

@app.get("/resume-suggestions")
def resume_suggestions(
    filename: str,
    role: str
):

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    current_skills = extract_skills(
        resume_text
    )

    required_skills = get_required_skills(
        role
    )

    gap_result = analyze_skill_gap(
        current_skills,
        required_skills
    )

    suggestions = get_resume_suggestions(
        current_skills,
        gap_result["missing_skills"]
    )

    return {
        "suggestions": suggestions
    }

@app.get("/ats-score")
def ats_score(filename: str):

    file_path = f"backend/uploads/{filename}"

    resume_text = extract_resume_text(file_path)

    result = analyze_ats(resume_text)

    return result

@app.get("/interview-questions")
def interview_questions(role: str):

    questions = generate_questions(role)

    return {
        "questions": questions
    }