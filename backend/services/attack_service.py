import random
from datetime import datetime, timedelta
from extensions import db
from models import Attack, Country

class AttackService:
    ATTACK_TYPES = ["Phishing", "Malware", "Ransomware", "DDoS"]
    SEVERITIES = ["low", "medium", "high", "critical"]
    
    CITIES = {
        "India": ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Jaipur", "Ahmedabad", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Howrah", "Ranchi", "Guwahati", "Gwalior", "Jabalpur", "Coimbatore", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Chandigarh", "Trivandrum", "Kochi", "Bhubaneswar", "Dehradun", "Noida", "Gurgaon"],
        "Ireland": ["Dublin", "Cork", "Galway", "Limerick", "Waterford", "Drogheda", "Dundalk", "Kilkenny", "Sligo", "Athlone", "Wexford", "Tralee", "Killarney", "Letterkenny", "Bray", "Ennis"]
    }

    @staticmethod
    def get_attacks(country_id=None, limit=200):
        query = Attack.query
        if country_id:
            query = query.filter_by(country_id=country_id)
        
        attacks = query.order_by(Attack.timestamp.desc()).limit(limit).all()
        
        # If no attacks exist for the country, simulate some initial ones
        if not attacks and country_id:
            AttackService.simulate_attack(country_id, count=150)
            attacks = query.order_by(Attack.timestamp.desc()).limit(limit).all()
            
        return [a.to_dict() for a in attacks]

    @staticmethod
    def get_threat_level(country_id=None):
        query = Attack.query
        if country_id:
            query = query.filter_by(country_id=country_id)
        
        # Consider attacks in the last 24 hours for threat level
        last_24h = datetime.utcnow() - timedelta(hours=24)
        attacks = query.filter(Attack.timestamp >= last_24h).all()
        
        if not attacks and country_id:
            # Seed some data if empty to show the gauge working
            AttackService.simulate_attack(country_id, count=20)
            attacks = query.filter(Attack.timestamp >= last_24h).all()

        high_count = sum(1 for a in attacks if a.severity in ['high', 'critical'])
        medium_count = sum(1 for a in attacks if a.severity == 'medium')
        low_count = sum(1 for a in attacks if a.severity == 'low')
        
        # Threat Score Formula: (High * 3) + (Medium * 2) + (Low * 1)
        score = (high_count * 3) + (medium_count * 2) + (low_count * 1)
        
        level = "Low"
        if score > 50:
            level = "Severe"
        elif score > 20:
            level = "Elevated"
            
        return {
            "score": score,
            "level": level,
            "breakdown": {
                "high": high_count,
                "medium": medium_count,
                "low": low_count
            }
        }

    @staticmethod
    def get_trends(country_id=None, period="24H"):
        # Period: 24H, 7D, 30D
        now = datetime.utcnow()
        if period == "24H":
            start_date = now - timedelta(hours=24)
            interval = timedelta(hours=1)
            format_str = "%H:00"
            steps = 24
        elif period == "7D":
            start_date = now - timedelta(days=7)
            interval = timedelta(days=1)
            format_str = "%b %d"
            steps = 7
        else: # 30D
            start_date = now - timedelta(days=30)
            interval = timedelta(days=5)
            format_str = "%b %d"
            steps = 6

        trends = []
        for i in range(steps):
            step_start = start_date + (interval * i)
            step_end = step_start + interval
            
            query = Attack.query.filter(Attack.timestamp >= step_start, Attack.timestamp < step_end)
            if country_id:
                query = query.filter_by(country_id=country_id)
            
            counts = {}
            for atype in AttackService.ATTACK_TYPES:
                counts[atype] = query.filter_by(attack_type=atype).count()
                
            trends.append({
                "time": step_start.strftime(format_str),
                **counts
            })
            
        return trends

    @staticmethod
    def simulate_attack(country_id, count=1):
        country = Country.query.get(country_id)
        if not country:
            return
            
        cities = AttackService.CITIES.get(country.name, ["Unknown"])
        
        for _ in range(count):
            attack = Attack(
                country_id=country_id,
                city=random.choice(cities),
                attack_type=random.choice(AttackService.ATTACK_TYPES),
                severity=random.choice(AttackService.SEVERITIES),
                timestamp=datetime.utcnow() - timedelta(minutes=random.randint(0, 1440)), # Random time in last 24h
                source="Simulated Intel",
                status="active"
            )
            db.session.add(attack)
            
        db.session.commit()
        return True
