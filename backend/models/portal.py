from extensions import db

class Portal(db.Model):
    """Model for official reporting portals and online resources."""
    __tablename__ = 'portals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    
    # Region-based filtering
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)

    def __repr__(self):
        return f"<Portal {self.name}>"
