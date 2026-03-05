from flask import Blueprint, jsonify, request
from services.attack_service import AttackService
from models import Country

attack_bp = Blueprint('attack_bp', __name__, url_prefix='/api/attacks')

@attack_bp.route('', methods=['GET'])
def get_attacks():
    country_code = request.args.get('country') # India, Ireland, All
    country_id = None
    if country_code and country_code != 'All':
        country = Country.query.filter_by(name=country_code).first()
        if country:
            country_id = country.id
            
    attacks = AttackService.get_attacks(country_id)
    return jsonify({"status": "success", "data": attacks})

@attack_bp.route('/threat-level', methods=['GET'])
def get_threat_level():
    country_code = request.args.get('country')
    country_id = None
    if country_code and country_code != 'All':
        country = Country.query.filter_by(name=country_code).first()
        if country:
            country_id = country.id
            
    threat_info = AttackService.get_threat_level(country_id)
    return jsonify({"status": "success", "data": threat_info})

@attack_bp.route('/trends', methods=['GET'])
def get_trends():
    country_code = request.args.get('country')
    period = request.args.get('period', '24H')
    country_id = None
    if country_code and country_code != 'All':
        country = Country.query.filter_by(name=country_code).first()
        if country:
            country_id = country.id
            
    trends = AttackService.get_trends(country_id, period)
    return jsonify({"status": "success", "data": trends})

@attack_bp.route('/simulate', methods=['POST'])
def simulate():
    country_code = request.json.get('country', 'India')
    country = Country.query.filter_by(name=country_code).first()
    if country:
        AttackService.simulate_attack(country.id)
        return jsonify({"status": "success", "message": "Attack simulated"})
    return jsonify({"status": "error", "message": "Country not found"}), 404
