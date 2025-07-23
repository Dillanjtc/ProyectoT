from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

db = SQLAlchemy()  # <- esta es la línea clave

def create_app():
    load_dotenv()
    app = Flask(__name__)
    CORS(app)

    app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "clave-secreta")
    app.config.from_object('config.Config')

    db.init_app(app)
    JWTManager(app)

    from .routes import main
    from .auth import auth

    app.register_blueprint(main)
    app.register_blueprint(auth)

    return app

# 👇 Esto importa los modelos y hace visible db fuera del paquete
from . import models
