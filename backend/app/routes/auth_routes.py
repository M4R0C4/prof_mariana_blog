from flask import Blueprint, request, jsonify
from app.models.user import User
from app import db

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.route("/register", methods=["POST"])
def register():
    """
    Registrar novo usuário
    """

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # validação simples
    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # verificar se usuário já existe
    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"error": "Email already registered"}), 409

    # criar usuário
    user = User(
        username=username,
        email=email
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 201