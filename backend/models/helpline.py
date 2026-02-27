from extensions import db

class Helpline(db.Model):
    """Model for cybersecurity helplines and contact numbers."""
    __tablename__ = 'helplines'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    
    # Region-based filtering
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)

    def __repr__(self):
        return f"<Helpline {self.name}>"
