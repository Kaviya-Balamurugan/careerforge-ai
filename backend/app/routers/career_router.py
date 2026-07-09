from fastapi import APIRouter

from app.services.ai_role_analyzer import get_required_skills
from app.services.gap_analyzer import analyze_skill_gap
from app.services.roadmap_generator import generate_roadmap
from app.services.resource_recommender import get_resources
from app.services.role_cache import role_skill_cache
from app.services.ai_readiness import evaluate_readiness
from app.services.career_summary import generate_career_summary
from app.services.career_chatbot import career_chat
from app.utils.resume_loader import load_resume

router = APIRouter()


@router.get("/analyze-role")
def analyze_role(role: str):

    if role not in role_skill_cache:
        role_skill_cache[role] = get_required_skills(role)

    return {
        "role": role,
        "required_skills": role_skill_cache[role]
    }


@router.get("/skill-gap")
def skill_gap(filename: str, role: str):

    _, resume_text, current_skills = load_resume(filename)

    if role not in role_skill_cache:
        role_skill_cache[role] = get_required_skills(role)

    required_skills = role_skill_cache[role]

    result = analyze_skill_gap(
        current_skills,
        required_skills
    )

    ai_result = evaluate_readiness(
        resume_text,
        role
    )

    return {
        "role": role,
        "current_skills": current_skills,
        "required_skills": required_skills,
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"],
        "readiness_score": ai_result["score"],
        "strengths": ai_result["strengths"],
        "weaknesses": ai_result["weaknesses"],
        "recommendation": ai_result["recommendation"]
    }


@router.get("/roadmap")
def roadmap(filename: str, role: str):

    _, resume_text, current_skills = load_resume(filename)

    if role not in role_skill_cache:
        role_skill_cache[role] = get_required_skills(role)

    required_skills = role_skill_cache[role]

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


@router.get("/learning-plan")
def learning_plan(filename: str, role: str):

    _, resume_text, current_skills = load_resume(filename)

    if role not in role_skill_cache:
        role_skill_cache[role] = get_required_skills(role)

    required_skills = role_skill_cache[role]

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


@router.get("/career-summary")
def career_summary(
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

    summary = generate_career_summary(
        role,
        gap_result["readiness_score"],
        gap_result["matched_skills"],
        gap_result["missing_skills"]
    )

    return {
        "summary": summary
    }


@router.get("/career-chat")
def chat(message: str):

    reply = career_chat(message)

    return {
        "reply": reply
    }