from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):

    name: str

    email: EmailStr

    password: str


class UserLogin(BaseModel):

    email: EmailStr

    password: str

from pydantic import BaseModel


class UserLogin(BaseModel):

    email: str

    password: str