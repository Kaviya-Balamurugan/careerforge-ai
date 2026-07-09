from fastapi import APIRouter

from app.services.ai_interview_generator import generate_questions
from app.services.answer_evaluator import evaluate_answer
from app.utils.resume_loader import load_resume
router = APIRouter()

@router.get("/interview-questions")
def interview_questions(
    filename: str,
    role: str
):

    _, resume_text, _ = load_resume(filename)

    questions = generate_questions(
        role,
        resume_text
    )

    return {
        "questions": questions
    }