from fastapi import APIRouter

from app.utils.resume_loader import load_resume

from app.services.role_cache import role_skill_cache
from app.services.ai_role_analyzer import get_required_skills
from app.services.gap_analyzer import analyze_skill_gap
from app.services.resume_improver import get_resume_suggestions
from app.services.ats_analyzer import analyze_ats
from app.services.jd_matcher import match_resume_with_jd
from fastapi import Depends
from sqlalchemy.orm import Session


from app.database.database import get_db
from app.database.crud import (
    create_analysis,
    get_resume_by_filename
)
router = APIRouter()


@router.get("/resume-suggestions")
def resume_suggestions(
    filename: str,
    role: str
):

    _, resume_text, current_skills = load_resume(filename)

    if role not in role_skill_cache:
        role_skill_cache[role] = get_required_skills(role)

    required_skills = role_skill_cache[role]

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


@router.get("/ats-score")
def ats_score(
    filename: str,
    role: str,
    db: Session = Depends(get_db)
):

    _, resume_text, _ = load_resume(filename)

    result = analyze_ats(
        resume_text
    )

    return result

@router.post("/jd-match")
def jd_match(
    filename: str,
    job_description: str
):

    _, resume_text, resume_skills = load_resume(filename)

    jd_skills = extract_skills(
        job_description
    )

    result = match_resume_with_jd(
        resume_skills,
        jd_skills
    )

    return result