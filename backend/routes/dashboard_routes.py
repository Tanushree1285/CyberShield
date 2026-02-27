from flask import Blueprint, jsonify, request

dashboard_bp = Blueprint('dashboard_bp', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('', methods=['GET'])
def get_dashboard_data():
    """
    Get aggregated dashboard data for a specific country.
    """
    country_id = request.args.get('country_id')
    
    # TODO: Connect to appropriate services to build the dashboard statistics
    data = {
        "active_advisories": 0,
        "reported_cases_estimate": 0,
        "top_threats": []
    }
    
    return jsonify({"status": "success", "data": data})
