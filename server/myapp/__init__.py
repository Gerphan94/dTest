from flask import Flask, session
from flask_cors import CORS

# from .routes import main
from .routes import main
from .routes_worklog import worklog
from .model import db
import os, sys


if getattr(sys, 'frozen', False):
    working_dir = os.path.dirname(os.path.abspath(sys.executable))
else:
    working_dir = os.path.dirname(os.path.abspath(__file__))


def create_app():
    app = Flask(__name__)
  
    app.secret_key = "cwFXy5ALzg"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(os.getcwd(), "database.db")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    app.register_blueprint(main)
    app.register_blueprint(worklog)
   

    return app
