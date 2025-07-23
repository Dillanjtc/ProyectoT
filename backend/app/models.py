from . import db

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id_usuario = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    contraseña = db.Column(db.String(255), nullable=False)
    rol = db.Column(db.String(10), nullable=False)  # 'usuario' o 'admin'

    perfil = db.relationship('UsuarioPerfil', backref='usuario', uselist=False)
    intereses = db.relationship('UsuarioInteres', backref='usuario')
    valoraciones = db.relationship('ValoracionRevista', backref='usuario')


class UsuarioPerfil(db.Model):
    __tablename__ = 'usuario_perfil'

    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario'), primary_key=True)
    foto_perfil = db.Column(db.String(255))
    biografia = db.Column(db.Text)


class Categoria(db.Model):
    __tablename__ = 'categoria'

    id_categoria = db.Column(db.Integer, primary_key=True)
    nombre_categoria = db.Column(db.String(100), nullable=False)

    intereses = db.relationship('UsuarioInteres', backref='categoria')
    revista_categorias = db.relationship('RevistaCategoria', backref='categoria')


class Revista(db.Model):
    __tablename__ = 'revista'

    id_revista = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    descripcion = db.Column(db.Text)
    editorial = db.Column(db.String(100))
    fecha_publicacion = db.Column(db.Date)
    idioma = db.Column(db.String(50))
    pais_origen = db.Column(db.String(100))

    categorias = db.relationship('RevistaCategoria', backref='revista')
    valoraciones = db.relationship('ValoracionRevista', backref='revista')


class UsuarioInteres(db.Model):
    __tablename__ = 'usuario_interes'

    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario'), primary_key=True)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categoria.id_categoria'), primary_key=True)


class RevistaCategoria(db.Model):
    __tablename__ = 'revista_categoria'

    id_revista = db.Column(db.Integer, db.ForeignKey('revista.id_revista'), primary_key=True)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categoria.id_categoria'), primary_key=True)


class ValoracionRevista(db.Model):
    __tablename__ = 'valoracion_revista'

    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario'), primary_key=True)
    id_revista = db.Column(db.Integer, db.ForeignKey('revista.id_revista'), primary_key=True)
    valoracion = db.Column(db.Integer, nullable=False)
