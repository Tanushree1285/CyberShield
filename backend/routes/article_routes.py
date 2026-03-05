from flask import Blueprint, jsonify, request
from services import ArticleService

article_bp = Blueprint('article_bp', __name__, url_prefix='/api/articles')

@article_bp.route('', methods=['GET'])
def get_articles():
    """
    Get all articles, optionally filtered by country name, type, and sort.
    """
    country_name = request.args.get('country')
    article_type = request.args.get('type')
    sort = request.args.get('sort')
    
    # Clamp pagination inputs to prevent abuse
    page = max(1, request.args.get('page', 1, type=int))
    per_page = min(50, max(1, request.args.get('per_page', 20, type=int)))
    
    paginated_data = ArticleService.get_articles_by_country(country_name, article_type, sort, page, per_page)
    
    return jsonify({
        "status": "success", 
        "data": paginated_data["items"],
        "pagination": {
            "total": paginated_data["total"],
            "pages": paginated_data["pages"],
            "current_page": paginated_data["current_page"]
        }
    })

@article_bp.route('/<int:article_id>', methods=['GET'])
def get_article(article_id):
    """
    Get a specific article by ID.
    """
    article = ArticleService.get_article_by_id(article_id)
    return jsonify({"status": "success", "data": article})
