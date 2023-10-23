import os
from http import HTTPStatus

from ariadne import graphql_sync, load_schema_from_path, make_executable_schema
from ariadne.explorer.graphiql import ExplorerGraphiQL
from flask import Blueprint, request
from flask.typing import ResponseReturnValue

from arteserena.api import app
from arteserena.resolvers.feed import post_mutation, post_query
from arteserena.resolvers.me import me_query
from arteserena.resolvers.upload import upload_mutation

graphql = Blueprint("graphql", __name__)

type_defs = load_schema_from_path(
    os.path.join(os.path.dirname(__file__), "..", "types")
)

schema = make_executable_schema(
    type_defs,
    [post_mutation, post_query, me_query, upload_mutation],
    convert_names_case=True,
)

html = ExplorerGraphiQL(
    title="Arte Serena GraphQL", explorer_plugin=True
).html(None)


@graphql.get("/graphql")
def get_graphql() -> ResponseReturnValue:
    return html, HTTPStatus.OK


@graphql.post("/graphql")
def post_graphql() -> ResponseReturnValue:
    data = request.get_json()
    success, result = graphql_sync(
        schema, data, context_value=request, debug=app.debug
    )
    status_code = HTTPStatus.OK if success else HTTPStatus.BAD_REQUEST
    return result, status_code
