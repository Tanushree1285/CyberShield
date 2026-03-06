from extensions import db
from datetime import datetime

class Article(db.Model):
    """Model for cybercrime advisories and articles."""
    __tablename__ = 'articles'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    source = db.Column(db.String(100)) # e.g., 'CERT-In', 'NCSC'
    url = db.Column(db.String(255), index=True)
    type = db.Column(db.String(50), nullable=False, default="advisory", index=True)
    published_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, index=True)
    
    # Region-based filtering
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)

    def __repr__(self):
        return f"<Article {self.title}>"
