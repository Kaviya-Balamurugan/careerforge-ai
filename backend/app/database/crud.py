from sqlalchemy.orm import Session

from app.database.models import User
from app.database.schemas import UserCreate
from app.security.auth import hash_password
from app.database.models import Resume
from app.database.models import Analysis

def get_user_by_email(
    db: Session,
    email: str
):

    return db.query(User).filter(
        User.email == email
    ).first()


def create_user(
    db: Session,
    user: UserCreate
):

    db_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user

def create_resume(
    db: Session,
    user_id: int,
    filename: str,
    resume_text: str
):

    latest = (

        db.query(Resume)

        .filter(Resume.user_id == user_id)

        .filter(Resume.filename == filename)

        .order_by(Resume.version.desc())

        .first()

    )

    version = 1

    if latest:

        version = latest.version + 1

    resume = Resume(

        user_id=user_id,

        filename=filename,

        version=version,

        resume_text=resume_text

    )

    db.add(resume)

    db.commit()

    db.refresh(resume)

    return resume

def get_user_resumes(
    db: Session,
    user_id: int
):

    return db.query(Resume).filter(
        Resume.user_id == user_id
    ).all()
def get_resume_by_filename(
    db: Session,
    filename: str
):

    return db.query(Resume).filter(
        Resume.filename == filename
    ).first()


def create_analysis(
    db: Session,
    resume_id: int,
    role: str,
    ats_score: int,
    resume_score: int,
    readiness_score: int
):

    analysis = Analysis(
        resume_id=resume_id,
        target_role=role,
        ats_score=ats_score,
        resume_score=resume_score,
        readiness_score=readiness_score
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return analysis


def get_analysis_by_resume(
    db: Session,
    resume_id: int
):

    return db.query(Analysis).filter(
        Analysis.resume_id == resume_id
    ).all()

def count_user_resumes(
    db: Session,
    user_id: int
):

    return db.query(Resume).filter(
        Resume.user_id == user_id
    ).count()

def latest_resume(
    db: Session,
    user_id: int
):

    return (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.uploaded_at.desc())
        .first()
    )

def get_all_analysis(
    db: Session
):

    return db.query(Analysis).all()