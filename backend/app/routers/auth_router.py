from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.schemas import UserCreate
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.database.crud import (
    create_user,
    get_user_by_email
)
from app.database.schemas import (
    UserCreate,
    UserLogin
)

from app.security.auth import verify_password

from app.security.jwt_handler import create_access_token

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
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = get_user_by_email(
        db,
        form_data.username
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "sub": db_user.email,
            "user_id": db_user.id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }