from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash
from app.models import Usuario

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('usuario')  # puedes cambiar esto a 'email' si prefieres
    password = data.get('password')

    user = Usuario.query.filter_by(email=email).first()

    if user and check_password_hash(user.contraseña, password):
        token = create_access_token(identity={
            "id": user.id_usuario,
            "email": user.email,
            "rol": user.rol
        })
        return jsonify(access_token=token), 200

    return jsonify({"msg": "Credenciales inválidas"}), 401
