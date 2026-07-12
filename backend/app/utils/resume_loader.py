import os

from fastapi import HTTPException

from app.services.resume_parser import extract_resume_text
from app.services.skill_extractor import extract_skills


def load_resume(filename: str, user_id: int):

    user_folder = os.path.join(

        "uploads",

        f"user_{user_id}"

    )

    file_path = os.path.join(

        user_folder,

        filename

    )

    if not os.path.exists(file_path):

        raise HTTPException(

            status_code=404,

            detail=f"Resume '{filename}' not found."

        )

    resume_text = extract_resume_text(file_path)

    skills = extract_skills(resume_text)

    return file_path, resume_text, skills