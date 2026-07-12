from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.crud import (
    get_resume_by_filename,
    create_analysis
)

from app.utils.resume_loader import load_resume

from app.services.ats_analyzer import analyze_ats
from app.services.resume_score import analyze_resume_score
from app.services.ai_readiness import evaluate_readiness

router = APIRouter()


@router.post("/analyze-resume")
def analyze_resume(
    filename: str,
    role: str,
    db: Session = Depends(get_db)
):

    _, resume_text, _ = load_resume(filename)

    ats_result = analyze_ats(
        resume_text
    )

    resume_result = analyze_resume_score(
        resume_text,
        role
    )

    readiness_result = evaluate_readiness(
        resume_text,
        role
    )

    resume = get_resume_by_filename(
        db,
        filename
    )

    create_analysis(
        db=db,
        resume_id=resume.id,
        role=role,
        ats_score=ats_result["ats_score"],
        resume_score=resume_result["resume_score"],
        readiness_score=readiness_result["score"]
    )

    return {

        "ats": ats_result,

        "resume": resume_result,

        "readiness": readiness_result

    }