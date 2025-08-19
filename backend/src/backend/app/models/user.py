import bcrypt
from beanie import Document


class User(Document):
    username: str
    email: str
    password: str

    class Settings:
        name = "users"

    @classmethod
    def create(cls, username: str, email: str, raw_password: str):
        hashed_password = bcrypt.hashpw(
            raw_password.encode(), bcrypt.gensalt()
        ).decode()
        return cls(username=username, email=email, password=hashed_password)
