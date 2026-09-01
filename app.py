from flask import Flask
from flask import (request, redirect, url_for,
                   make_response, session, flash, jsonify, render_template)
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///desejos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Class
class Livro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    autor = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "autor": self.autor,
            "status": self.status
        }

with app.app_context():
    db.create_all()

# Rotas

@app.route('/', methods=['GET'])
def home():
    livros = Livro.query.all()
    return render_template("index.html", livros=livros)

@app.route('/livro/<int:livro_id>', methods=['GET'])
def livro(livro_id):
    livro = Livro.query.get_or_404(livro_id)
    return render_template("detalhe.html", livro=livro)

@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        titulo = request.form.get('titulo', '').strip()
        autor = request.form.get('autor', '').strip()
        status = request.form.get('status', '').strip()

        erros = []
        if not titulo:
            erros.append("Título é obrigatório")
        if not autor:
            erros.append("Autor é obrigatório")
        if not status:
            erros.append("Selecione um Status")

        if erros:
            return render_template("cadastro.html", erros=erros)

        novo_livro = Livro(titulo=titulo, autor=autor, status=status)
        db.session.add(novo_livro)
        db.session.commit()
        flash('Livro cadastrado com sucesso!', 'success')
        return redirect(url_for('home'))

    return render_template("cadastrar.html")

@app.route('/editar/<int:editar_id>', methods=['GET', 'POST'])
def editar(editar_id):
    livro = Livro.query.get_or_404(editar_id)

    if request.method == 'POST':
        titulo = request.form.get('titulo', '').strip()
        autor = request.form.get('autor', '').strip()
        status = request.form.get('status', '').strip()

        erros = []
        if not titulo:
            erros.append("Título é obrigatório")
        if not autor:
            erros.append("Autor é obrigatório")
        if not status:
            erros.append("Selecione um Status")

        if erros:
            return render_template("editar.html", livro=livro, erros=erros)

        livro.titulo = titulo
        livro.autor = autor
        livro.status = status
        db.session.commit()
        flash('Livro atualizado com sucesso!', 'success')
        return redirect(url_for('home'))

    return render_template("editar.html", livro=livro)

@app.route('/deletar/<int:deletar_id>', methods=['POST'])
def deletar(deletar_id):
    livro = Livro.query.get_or_404(deletar_id)
    db.session.delete(livro)
    db.session.commit()
    flash('Livro deletado com sucesso!', 'success')
    return redirect(url_for('home'))

#COKIE
'''@app.route('/tema', methods=['POST'])  # CORRIGIDO: adicionar a barra
def tema():'''

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)