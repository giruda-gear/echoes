from pydantic import BaseModel, EmailStr, constr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class SignUpRequest(BaseModel):
    username: constr(min_length=2, max_length=20)
    email: EmailStr
    password: constr(min_length=4)
