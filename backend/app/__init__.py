from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flasgger import Swagger
from flask_cors import CORS
from .config import Config


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    Swagger(app)
    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)


    from .routes.article_routes import article_bp
    app.register_blueprint(article_bp)

    return app