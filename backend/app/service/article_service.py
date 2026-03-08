from ..models.article import Article
from .. import db

class ArticleService:

    @staticmethod
    def get_all():
        return Article.query.all()

    @staticmethod
    def get_by_slug(slug):
        return Article.query.filter_by(slug=slug).first()

    @staticmethod
    def get_by_id(id):
        return Article.query.filter_by(id=id).first()

    @staticmethod
    def create(data):
        article = Article(
            title=data["title"],
            slug=data["slug"],
            content=data["content"],
            reading_time=data.get("reading_time")
        )

        db.session.add(article)
        db.session.commit()

        return article