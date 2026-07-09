from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.schemas import UserCreate
from app.database.crud import (
    create_user,
    get_user_by_email
)

router = APIRouter()


@router.post("/register")

def register(

    user: UserCreate,

    db: Session = Depends(get_db)

):

    existing = get_user_by_email(
        db,
        user.email
    )

    if existing:

        raise HTTPException(

            status_code=400,

            detail="Email already registered"

        )

    new_user = create_user(
        db,
        user
    )

    return {

        "message": "User registered successfully",

        "id": new_user.id,

        "email": new_user.email

    }