from flask import session

from arteserena.api import db
from arteserena.models import User


def get_authenticated_user_id() -> int | None:
    return session.get("actor")


def get_user_by_id(uid: int) -> User | None:
    db.session.query(User).filter(User.id == uid).first()
