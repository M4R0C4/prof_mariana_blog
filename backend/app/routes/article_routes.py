from flask import Blueprint, jsonify, request
from ..service.article_service import ArticleService

article_bp = Blueprint("articles", __name__, url_prefix="/articles")


@article_bp.route("/", methods=["GET"])
def get_articles():
    """
    Listar todos os artigos
    ---
    responses:
      200:
        description: Lista de artigos
        examples:
          application/json: [
            {
              "id": 1,
              "title": "Como estudar programação",
              "slug": "como-estudar-programacao",
              "content": "Conteúdo do artigo...",
              "reading_time": 5
            }
          ]
    """
    articles = ArticleService.get_all()

    return jsonify([a.to_dict() for a in articles])


@article_bp.route("/<slug>", methods=["GET"])
def get_article(slug):
    """
    Listar todos os artigos filtrados por slugs
    ---
    responses:
      200:
        description: Lista de artigos
        examples:
          application/json: [
            {
              "id": 1,
              "title": "Como estudar programação",
              "slug": "como-estudar-programacao",
              "content": "Conteúdo do artigo...",
              "reading_time": 5
            }
          ]
    """
    article = ArticleService.get_by_slug(slug)

    if not article:
        return jsonify({"error": "Article not found"}), 404

    return jsonify(article.to_dict())


@article_bp.route("/", methods=["POST"])
def create_article():
    """
    Criar novo artigo
    ---
    parameters:
      - name: article
        in: body
        required: true
        schema:
          type: object
          properties:
            title:
              type: string
            slug:
              type: string
            content:
              type: string
            reading_time:
              type: integer
    responses:
      201:
        description: Artigo criado
    """
    data = request.json

    article = ArticleService.create(data)

    return jsonify(article.to_dict()), 201