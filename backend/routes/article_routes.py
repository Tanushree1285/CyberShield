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

@article_bp.route('/refresh', methods=['POST'])
def refresh_articles():
    """
    Manually triggers the ingestion of all article feeds.
    """
    try:
        from automation.jobs.fetch_certin import fetch_certin_advisories
        from automation.jobs.fetch_ncsc import fetch_ncsc_advisories
        from automation.jobs.fetch_rbi import fetch_rbi_advisories
        from automation.jobs.fetch_pib import fetch_pib_advisories
        from automation.jobs.fetch_meity import fetch_meity_advisories
        from automation.jobs.fetch_gov_ie import fetch_gov_ie_advisories
        from automation.jobs.fetch_garda import fetch_garda_advisories
        from automation.jobs.fetch_central_bank import fetch_central_bank_advisories
        from automation.jobs.fetch_cyber_ireland import fetch_cyber_ireland_advisories

        # Execute jobs
        fetch_certin_advisories()
        fetch_ncsc_advisories()
        fetch_rbi_advisories()
        fetch_pib_advisories()
        fetch_meity_advisories()
        fetch_gov_ie_advisories()
        fetch_garda_advisories()
        fetch_central_bank_advisories()
        fetch_cyber_ireland_advisories()

        return jsonify({"status": "success", "message": "Successfully refreshed all article feeds."})
    except Exception as e:
        return jsonify({"status": "error", "message": f"Failed to refresh feeds: {str(e)}"}), 500

