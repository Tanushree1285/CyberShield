from app import create_app
from extensions import db
from models import Country, Article, Helpline, Portal, Guide
from datetime import datetime

def seed_db():
    app = create_app()
    with app.app_context():
        # Create all tables
        db.create_all()

        # Check if already seeded
        if Country.query.first() is not None:
            print("Database is already seeded.")
            return

        print("Seeding database...")

        # Create Countries
        india = Country(name="India", code="IN")
        ireland = Country(name="Ireland", code="IE")
        db.session.add_all([india, ireland])
        db.session.commit()

        # Articles
        # Articles are now dynamically scraped via automation jobs (e.g. fetch_certin.py)
        # We no longer seed placeholder articles.

        # Helplines
        helplines = [
            Helpline(name="National Cyber Crime Reporting Portal Helpline", phone_number="1930", description="24/7 dedicated helpline for reporting financial cyber fraud in India.", country_id=india.id),
            Helpline(name="Garda Confidential Line", phone_number="1800 666 111", description="Confidential reporting of cyber incidents and cybercrime in Ireland.", country_id=ireland.id),
        ]
        db.session.add_all(helplines)

        # Portals
        portals = [
            Portal(name="Cybercrime.gov.in", url="https://cybercrime.gov.in", description="Official portal to report cyber crime in India.", country_id=india.id),
            Portal(name="Garda Cyber Crime Bureau", url="https://www.garda.ie/en/about-us/our-departments/garda-national-cyber-crime-bureau-gnccb-/", description="Official cybercrime reporting resources in Ireland.", country_id=ireland.id),
        ]
        db.session.add_all(portals)

        # Guides
        guides = [
            Guide(title="How to Secure Your UPI", content="Guide on setting PINs, two-factor authentication, and identifying fake payout requests.", category="Financial Security", country_id=india.id),
            Guide(title="GDPR Checklist for SMEs", content="Essential steps to ensure your small business is compliant with GDPR requirements for data handling.", category="Compliance", country_id=ireland.id),
        ]
        db.session.add_all(guides)

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_db()
