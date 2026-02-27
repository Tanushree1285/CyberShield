from extensions import db

class Country(db.Model):
    """Country model to represent different regions (e.g., India, Ireland)."""
    __tablename__ = 'countries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    code = db.Column(db.String(10), nullable=False, unique=True) # e.g., 'IN', 'IE'
    
    # Relationships to other tables
    articles = db.relationship('Article', backref='country', lazy=True)
    helplines = db.relationship('Helpline', backref='country', lazy=True)
    portals = db.relationship('Portal', backref='country', lazy=True)
    guides = db.relationship('Guide', backref='country', lazy=True)
    
    def __repr__(self):
        return f"<Country {self.name}>"
