from fastapi import APIRouter, HTTPException
import os

from app.services.resume_parser import extract_resume_text
from app.services.skill_extractor import extract_skills
from app.services.ai_role_analyzer import get_required_skills
from app.services.gap_analyzer import analyze_skill_gap
from app.services.project_recommender import get_projects
from app.services.job_recommender import get_job_recommendations
from app.services.role_cache import role_skill_cache

router = APIRouter()


@router.get("/project-recommendations")
def project_recommendations(
    filename: str,
    role: str
):

    _, resume_text, current_skills = load_resume(filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail=f"Resume '{filename}' not found."
        )

    if role not in role_skill_cache:
        role_skill_cache[role] = get_required_skills(role)

    required_skills = role_skill_cache[role]

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


@router.get("/job-recommendations")
def job_recommendations(
    filename: str,
    role: str
):

    file_path = f"uploads/{filename}"

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail=f"Resume '{filename}' not found."
        )

    resume_text = extract_resume_text(file_path)

    jobs = get_job_recommendations(
        resume_text,
        role
    )

    return {
        "jobs": jobs
    }