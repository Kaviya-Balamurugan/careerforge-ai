from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.resume_parser import extract_resume_text
from app.services.skill_extractor import extract_skills
from app.services.resume_chat import chat_with_resume
from app.services.resume_rewriter import rewrite_resume
from app.services.resume_score import analyze_resume_score
from app.utils.resume_loader import load_resume
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.database import get_db
from app.database.crud import create_resume
from app.security.dependencies import get_current_user

from app.security.dependencies import get_current_user
from app.services.ats_feedback import generate_ats_feedback
router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    user_id = current_user["user_id"]

    # Create user folder
    user_folder = os.path.join(
        UPLOAD_DIR,
        f"user_{user_id}"
    )

    os.makedirs(
        user_folder,
        exist_ok=True
    )

    # Extract filename and extension
    filename = file.filename

    name, extension = os.path.splitext(filename)

    # Save resume in database (gets version number)
    temp_path = os.path.join(
        user_folder,
        filename
    )

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_resume_text(temp_path)

    resume = create_resume(
        db=db,
        user_id=user_id,
        filename=filename,
        resume_text=resume_text
    )

    # Final filename with version
    final_filename = f"{name}_v{resume.version}{extension}"

    final_path = os.path.join(
        user_folder,
        final_filename
    )

    os.rename(
        temp_path,
        final_path
    )

    return {

        "message": "Resume uploaded successfully",

        "resume_id": resume.id,

        "version": resume.version,

        "stored_as": final_filename

    }

@router.get("/extract-text")
def extract_text(
    filename: str,
    current_user: dict = Depends(get_current_user)
):

    _, resume_text, _ = load_resume(
        filename,
        current_user["user_id"]
    )

    return {
        "filename": filename,
        "text": resume_text[:3000]
    }


@router.get("/extract-skills")
def get_skills(
    filename: str,
    current_user: dict = Depends(get_current_user)
):

    _, _, skills = load_resume(
        filename,
        current_user["user_id"]
    )

    return {
        "skills": skills
    }

@router.post("/resume-chat")
def resume_chat(
    filename: str,
    role: str,
    question: str,
    current_user: dict = Depends(get_current_user)
):

    _, resume_text, _ = load_resume(
        filename,
        current_user["user_id"]
    )

    response = chat_with_resume(
        resume_text,
        role,
        question
    )

    return {
        "answer": response
    }


@router.post("/rewrite-resume")
def rewrite_resume_api(
    filename: str,
    role: str,
    current_user: dict = Depends(get_current_user)
):

    _, resume_text, _ = load_resume(
        filename,
        current_user["user_id"]
    )

    improved = rewrite_resume(
        resume_text,
        role
    )

    return {
        "resume": improved
    }


@router.get("/resume-score")
def resume_score(
    filename: str,
    role: str,
    current_user: dict = Depends(get_current_user)
):

    _, resume_text, _ = load_resume(
        filename,
        current_user["user_id"]
    )

    result = analyze_resume_score(
        resume_text,
        role
    )

    return result

@router.get("/ats-feedback")
def ats_feedback(
    filename: str,
    role: str,
    current_user: dict = Depends(get_current_user)
):

    _, resume_text, _ = load_resume(
        filename,
        current_user["user_id"]
    )

    feedback = generate_ats_feedback(
        resume_text,
        role
    )

    return {
        "feedback": feedback
    }