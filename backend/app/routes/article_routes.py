from flask import Blueprint, jsonify, request

from ..models.user import User
from ..service.article_service import ArticleService
from .. import db
from app.models.article import Article
from flask_jwt_extended import get_jwt_identity, jwt_required
from slugify import slugify

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
@jwt_required()
def create_article():
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
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    data = request.get_json()

    # Verifica se o usuário existe
    if not user:
        return jsonify({"error":"User not found"}), 404
    
    # Verifica se o body veio como JSON
    if not data:
        return jsonify({'error': 'Request body must be JSON'}), 400

    # Verifica campos obrigatórios
    required = ['title', 'slug', 'content']
    missing = [field for field in required if not data.get(field)]
    if missing:
      return jsonify({'error': f'Missing fields: {missing}'}), 400
    
    # Gera o slug se não foi enviado
    if not data.get('slug'):
      data['slug'] = slugify(data['title'])


    # Verifica slug duplicado antes de criar
    existing = Article.query.filter_by(slug=data['slug']).first()
    if existing:
      return jsonify({'error': 'Este slug já está em uso. Escolha outro.'}), 409
    
    # Garante unicidade adicionando sufixo se necessário
    base_slug = data['slug']
    counter = 1
    while Article.query.filter_by(slug=data['slug']).first():
        data['slug'] = f'{base_slug}-{counter}'
        counter += 1

        
    article = ArticleService.create(data,author_id=int(user_id))
    return jsonify(article.to_dict()), 201


@article_bp.route("/<int:id>", methods=["GET", "PATCH", "PUT", "DELETE"])
@jwt_required()
def delete_upgrade_article(id):
    """
    Deleta e atualiza artigo por id
    """
    article = ArticleService.get_by_id(id)

    if not article:
        return jsonify({"error": "Article not found"}), 404

    
    
    if request.method == "DELETE":
        db.session.delete(article)
        db.session.commit()
        return jsonify({"message": "Article deleted successfully"}), 200

    elif request.method in ["PUT","PATCH"]:
        data = request.get_json()
        article.title = data.get("title", article.title)
        article.slug = data.get("slug", article.slug)
        article.content = data.get("content", article.content)
        article.reading_time = data.get("reading_time", article.reading_time)
        db.session.commit()
        return jsonify(article.to_dict()), 200    
    return jsonify(article.to_dict()), 200
