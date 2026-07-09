import os

from fastapi import HTTPException

from app.services.resume_parser import extract_resume_text
from app.services.skill_extractor import extract_skills


def load_resume(filename: str):

    file_path = f"uploads/{filename}"

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail=f"Resume '{filename}' not found."
        )

    resume_text = extract_resume_text(file_path)

    skills = extract_skills(resume_text)

    return file_path, resume_text, skills