from flask import Blueprint, jsonify, request
from services import PortalService

portal_bp = Blueprint('portal_bp', __name__, url_prefix='/api/portals')

@portal_bp.route('', methods=['GET'])
def get_portals():
    """
    Get all portals, optionally filtered by country_id.
    """
    country_id = request.args.get('country_id')
    portals = PortalService.get_portals_by_country(country_id)
    return jsonify({"status": "success", "data": portals})
