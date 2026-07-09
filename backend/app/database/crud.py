from sqlalchemy.orm import Session

from app.database.models import User
from app.database.schemas import UserCreate

from app.security.auth import hash_password


def get_user_by_email(
    db: Session,
    email: str
):

    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def create_user(
    db: Session,
    user: UserCreate
):

    hashed_password = hash_password(
        user.password
    )

    db_user = User(

        name=user.name,

        email=user.email,

        password=hashed_password

    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user