import typing as t
from functools import wraps
from http import HTTPStatus

from flask import request
from flask.typing import ResponseReturnValue

from arteserena import constants as c

RequestHandler = t.Callable[..., ResponseReturnValue]


def with_body(
    required: bool = False,
) -> t.Callable[[RequestHandler], RequestHandler]:
    def decorator(func: RequestHandler) -> RequestHandler:
        @wraps(func)
        def wrapper(*args, **kwargs) -> ResponseReturnValue:
            request_body = request.get_json(silent=True)
            if not request_body and required:
                return {
                    c.MESSAGE: "Request body is required."
                }, HTTPStatus.BAD_REQUEST
            return func(request_body, *args, **kwargs)

        return wrapper

    return decorator
