from flask import Blueprint, jsonify, request, current_app
from werkzeug.utils import secure_filename
import os

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "API funcionando"})

@main.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({"msg": "No se encontró archivo"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"msg": "Nombre de archivo vacío"}), 400

    filename = secure_filename(file.filename)
    upload_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    file.save(upload_path)

    return jsonify({"msg": "Archivo subido", "filename": filename})
