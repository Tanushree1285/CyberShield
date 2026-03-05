from extensions import db
from datetime import datetime

class Attack(db.Model):
    __tablename__ = 'attacks'

    id = db.Column(db.Integer, primary_key=True)
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)
    region = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    attack_type = db.Column(db.String(50), nullable=False) # phishing, malware, ransomware, ddos
    severity = db.Column(db.String(20), nullable=False) # low, medium, high, critical
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    source = db.Column(db.String(100), nullable=True)
    status = db.Column(db.String(20), default='active')

    # Relationship with Country
    country = db.relationship('Country', backref=db.backref('attacks', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'country': self.country.name if self.country else None,
            'region': self.region,
            'city': self.city,
            'attack_type': self.attack_type,
            'severity': self.severity,
            'timestamp': self.timestamp.isoformat(),
            'source': self.source,
            'status': self.status
        }
