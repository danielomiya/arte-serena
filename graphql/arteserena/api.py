from flask import Flask
from flask_cors import CORS
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy

from arteserena.conf import settings

app = Flask(__name__)
app.config["SECRET_KEY"] = settings.secret_key

app.config["SQLALCHEMY_DATABASE_URI"] = settings.sqlalchemy_database_uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_SQLALCHEMY"] = db
Session(app)
CORS(app)


@app.route("/ping")
def ping():
    return "pong", 200


@app.post("/setup")
def setup():
    db.drop_all()
    db.create_all()
    return "ok"
