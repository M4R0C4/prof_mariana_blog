from datetime import datetime
from .. import db

class Article(db.Model):

    __tablename__ = "articles"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)

    slug = db.Column(db.String(200), unique=True, nullable=False)

    content = db.Column(db.Text, nullable=False)

    reading_time = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "content": self.content,
            "reading_time": self.reading_time,
            "created_at": self.created_at.isoformat()
        }