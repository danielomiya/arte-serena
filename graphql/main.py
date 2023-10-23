from arteserena.api import app
from arteserena.routes.auth import auth
from arteserena.routes.graphql import graphql

app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(graphql, url_prefix="/api/v1")
