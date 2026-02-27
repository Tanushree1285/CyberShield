from flask import Blueprint, jsonify, request
from services import HelplineService

helpline_bp = Blueprint('helpline_bp', __name__, url_prefix='/api/helplines')

@helpline_bp.route('', methods=['GET'])
def get_helplines():
    """
    Get all helplines, optionally filtered by country_id.
    """
    country_id = request.args.get('country_id')
    helplines = HelplineService.get_helplines_by_country(country_id)
    return jsonify({"status": "success", "data": helplines})
