from flask import Blueprint, jsonify, request
from services.dashboard_service import DashboardService

dashboard_bp = Blueprint('dashboard_bp', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('', methods=['GET'])
def get_dashboard_data():
    """
    Get aggregated dashboard data for a specific country.
    """
    country_id = request.args.get('country_id')
    stats = DashboardService.get_stats(country_id)
    
    data = {
        "articles": stats["articles"],
        "helplines": stats["helplines"],
        "portals": stats["portals"],
        "guides": stats["guides"]
    }
    
    return jsonify({"status": "success", "data": data})
