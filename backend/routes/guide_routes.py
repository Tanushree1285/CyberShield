from flask import Blueprint, jsonify, request
from services import GuideService

guide_bp = Blueprint('guide_bp', __name__, url_prefix='/api/guides')

@guide_bp.route('', methods=['GET'])
def get_guides():
    """
    Get all guides, optionally filtered by country_id with pagination.
    """
    country_id = request.args.get('country_id')
    
    # Clamp pagination inputs to prevent abuse
    page = max(1, request.args.get('page', 1, type=int))
    per_page = min(100, max(1, request.args.get('per_page', 20, type=int)))
    
    paginated_data = GuideService.get_guides_by_country(country_id, page, per_page)
    
    return jsonify({
        "status": "success", 
        "data": paginated_data["items"],
        "pagination": {
            "total": paginated_data["total"],
            "pages": paginated_data["pages"],
            "current_page": paginated_data["current_page"]
        }
    })

@guide_bp.route('/<int:guide_id>', methods=['GET'])
def get_guide(guide_id):
    """
    Get a specific guide by ID.
    """
    guide = GuideService.get_guide_by_id(guide_id)
    return jsonify({"status": "success", "data": guide})
