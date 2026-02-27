from flask import Blueprint, jsonify, request
from services import GuideService

guide_bp = Blueprint('guide_bp', __name__, url_prefix='/api/guides')

@guide_bp.route('', methods=['GET'])
def get_guides():
    """
    Get all guides, optionally filtered by country_id.
    """
    country_id = request.args.get('country_id')
    guides = GuideService.get_guides_by_country(country_id)
    return jsonify({"status": "success", "data": guides})

@guide_bp.route('/<int:guide_id>', methods=['GET'])
def get_guide(guide_id):
    """
    Get a specific guide by ID.
    """
    guide = GuideService.get_guide_by_id(guide_id)
    return jsonify({"status": "success", "data": guide})
