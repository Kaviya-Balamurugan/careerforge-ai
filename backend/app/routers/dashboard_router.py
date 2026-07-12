from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.database.crud import (
    count_user_resumes,
    latest_resume,
    get_all_analysis
)

from app.security.dependencies import get_current_user

router = APIRouter()

@router.get("/dashboard")
def dashboard(

    db: Session = Depends(get_db),

    current_user: dict = Depends(get_current_user)

):

    user_id = current_user["user_id"]

    total_resumes = count_user_resumes(
        db,
        user_id
    )

    latest = latest_resume(
        db,
        user_id
    )

    analyses = get_all_analysis(
        db
    )

    average_ats = 0

    if analyses:

        average_ats = int(

            sum(a.ats_score for a in analyses)

            / len(analyses)

        )

    return {

        "user_id": user_id,

        "total_resumes": total_resumes,

        "average_ats": average_ats,

        "latest_resume": latest.filename if latest else None

    }