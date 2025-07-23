from app import create_app, db
from app import models  # Importar para registrar los modelos

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # 🔧 Esto crea las tablas si no existen
    app.run(debug=True)
