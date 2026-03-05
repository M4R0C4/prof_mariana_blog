from flask import Blueprint, jsonify

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return jsonify({
        "message": "API da Professora Helena funcionando"
    })


@main.route("/articles")
def articles():
    return jsonify([
        {
            "id": 1,
            "title": "Como aprender 50 palavras por dia",
            "reading_time": "5 min"
        },
        {
            "id": 2,
            "title": "Dicas para estudar idiomas",
            "reading_time": "4 min"
        }
    ])