from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.resume_parser import extract_resume_text
from app.services.skill_extractor import extract_skills
from app.services.resume_chat import chat_with_resume
from app.services.resume_rewriter import rewrite_resume
from app.services.resume_score import analyze_resume_score
from app.utils.resume_loader import load_resume

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename
    }


@router.get("/extract-text")
def extract_text(filename: str):

    _, resume_text, _ = load_resume(filename)

    return {
        "filename": filename,
        "text": resume_text[:3000]
    }


@router.get("/extract-skills")
def get_skills(filename: str):

    _, _, skills = load_resume(filename)

    return {
        "skills": skills
    }


@router.post("/resume-chat")
def resume_chat(
    filename: str,
    role: str,
    question: str
):

    _, resume_text, _ = load_resume(filename)

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
    role: str
):

    _, resume_text, _ = load_resume(filename)

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
    role: str
):

    _, resume_text, _ = load_resume(filename)

    result = analyze_resume_score(
        resume_text,
        role
    )

    return result