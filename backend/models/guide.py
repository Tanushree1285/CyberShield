from extensions import db

class Guide(db.Model):
    """Model for educational cybersecurity guides and tutorials."""
    __tablename__ = 'guides'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500), nullable=True)  # Short summary for card display
    content = db.Column(db.Text, nullable=False)             # Full detailed guide body (HTML)
    category = db.Column(db.String(100))
    
    # Region-based filtering
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)

    def __repr__(self):
        return f"<Guide {self.title}>"
