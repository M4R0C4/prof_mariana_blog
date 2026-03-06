from flask import Blueprint, jsonify, request
from ..service.article_service import ArticleService

article_bp = Blueprint("articles", __name__, url_prefix="/articles")


@article_bp.route("/", methods=["GET"])
def get_articles():

    articles = ArticleService.get_all()

    return jsonify([a.to_dict() for a in articles])


@article_bp.route("/<slug>", methods=["GET"])
def get_article(slug):

    article = ArticleService.get_by_slug(slug)

    if not article:
        return jsonify({"error": "Article not found"}), 404

    return jsonify(article.to_dict())


@article_bp.route("/", methods=["POST"])
def create_article():

    data = request.json

    article = ArticleService.create(data)

    return jsonify(article.to_dict()), 201