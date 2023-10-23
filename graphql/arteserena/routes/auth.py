import typing as t
from datetime import timedelta
from http import HTTPStatus
from urllib.parse import quote

from flask import (
    Blueprint,
    Response,
    make_response,
    redirect,
    request,
    session,
)
from flask.typing import ResponseReturnValue

from arteserena import constants as c
from arteserena.api import db
from arteserena.models import User
from arteserena.services.bcrypt import BcryptService
from arteserena.shared.flask import with_body

auth = Blueprint("auth", __name__)
bcrypt_service = BcryptService()


@auth.post("/logIn")
@with_body(required=True)
def log_in(request_json: dict[str, t.Any]) -> ResponseReturnValue:
    username = request_json.get(c.USERNAME)
    password = request_json.get(c.PASSWORD)

    if not username:
        return {
            c.MESSAGE: "User name must not be empty."
        }, HTTPStatus.BAD_REQUEST

    user = db.session.query(User).filter(User.email == username).first()

    if not user or not bcrypt_service.compare_password(
        password, user.password_hash
    ):
        return {c.MESSAGE: "Invalid credentials."}, HTTPStatus.UNAUTHORIZED

    response = make_response("", HTTPStatus.OK)
    return create_session(response, user.id)


@auth.post("/signUp")
@with_body(required=True)
def sign_up(request_json: dict[str, t.Any]) -> ResponseReturnValue:
    email = request_json.get(c.EMAIL)
    password = request_json.get(c.PASSWORD)
    full_name = request_json.get(c.FULL_NAME)

    if not full_name:
        return {
            c.MESSAGE: "Full name must not be empty."
        }, HTTPStatus.BAD_REQUEST

    if not email:
        return {c.MESSAGE: "Email must not be empty."}, HTTPStatus.BAD_REQUEST

    if not password:
        return {
            c.MESSAGE: "Password must not be empty."
        }, HTTPStatus.BAD_REQUEST

    password_hash = bcrypt_service.hash_password(password)

    user = User(name=full_name, email=email, password_hash=password_hash)
    db.session.add(user)
    db.session.commit()

    response = make_response("", HTTPStatus.CREATED)
    return create_session(response, user.id)


@auth.get("/authenticate")
def authenticate() -> ResponseReturnValue:
    redirect_uri = request.args.get(c.AUTH_REDIRECT_URI_PARAM, c.ROOT_ROUTE)
    session_actor = session.get(c.ACTOR)
    cookies_actor = request.cookies.get(c.ACTOR)
    has_valid_session = (
        session_actor and cookies_actor and session_actor == cookies_actor
    )

    if has_valid_session:
        return redirect(redirect_uri, HTTPStatus.SEE_OTHER)

    return redirect(
        f"{c.LOGIN_ROUTE}?{c.AUTH_REDIRECT_URI_PARAM}={quote(redirect_uri)}"
    )


def create_session(response: Response, user_id: int) -> Response:
    uid = str(user_id)
    session[c.ACTOR] = uid
    # session["token"] = generate_jwt(user.id)
    response.set_cookie(
        c.ACTOR,
        uid,
        max_age=timedelta(days=7),
        httponly=False,
        samesite="Lax",
        secure=False,
    )
    return response
