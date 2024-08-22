from flask import Flask, session
from flask_cors import CORS

# from .routes import main
from .routes import main
from .routes_worklog import worklog
from .routes_login import login
from .model import db
import os, sys

# SECRET_KEY = os.urandom(24)
SECRET_KEY = "th3DC0d3v3ryS3cr3tK3y"


if getattr(sys, 'frozen', False):
    working_dir = os.path.dirname(os.path.abspath(sys.executable))
else:
    working_dir = os.path.dirname(os.path.abspath(__file__))


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = SECRET_KEY
    username = 'api'
    pwd = 'api123'
    database = 'dTest'
    connection_string = f"mysql+mysqlconnector://{username}:{pwd}@localhost:3306/{database}"

    # app.secret_key = SECRET_KEY
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(os.getcwd(), "database.db")
    app.config["SQLALCHEMY_DATABASE_URI"] = connection_string
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    app.register_blueprint(main)
    app.register_blueprint(worklog)
    app.register_blueprint(login)

    return app
