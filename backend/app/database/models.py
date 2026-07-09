from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Text,
)

from sqlalchemy.orm import relationship

from app.database.database import Base


# ---------------- USER ----------------

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


# ---------------- RESUME ----------------

class Resume(Base):

    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    filename = Column(String)

    resume_text = Column(Text)

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship("User")


# ---------------- ANALYSIS ----------------

class Analysis(Base):

    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id")
    )

    target_role = Column(String)

    readiness_score = Column(Integer)

    resume_score = Column(Integer)

    ats_score = Column(Integer)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    resume = relationship("Resume")