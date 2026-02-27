from flask import Blueprint, jsonify, request
from services import ArticleService

article_bp = Blueprint('article_bp', __name__, url_prefix='/api/articles')

@article_bp.route('', methods=['GET'])
def get_articles():
    """
    Get all articles, optionally filtered by country_id.
    """
    country_id = request.args.get('country_id')
    articles = ArticleService.get_articles_by_country(country_id)
    return jsonify({"status": "success", "data": articles})

@article_bp.route('/<int:article_id>', methods=['GET'])
def get_article(article_id):
    """
    Get a specific article by ID.
    """
    article = ArticleService.get_article_by_id(article_id)
    return jsonify({"status": "success", "data": article})
