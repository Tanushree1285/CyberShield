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
        #if Country.query.first() is not None:
         #   print("Database is already seeded.")
          #  return

        print("Seeding database...")

        # Create Countries
        # Create Countries safely (avoid duplicates)
        india = Country.query.filter_by(code="IN").first()
        if not india:
            india = Country(name="India", code="IN")
            db.session.add(india)

        ireland = Country.query.filter_by(code="IE").first()
        if not ireland:
            ireland = Country(name="Ireland", code="IE")
            db.session.add(ireland)

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

    # INDIA
    Portal(
        name="Cybercrime.gov.in",
        url="https://cybercrime.gov.in",
        description="Official portal to report cyber crime in India.",
        country_id=india.id
    ),

    Portal(
        name="CERT-In",
        url="https://www.cert-in.org.in",
        description="Indian Computer Emergency Response Team handling cybersecurity incidents and issuing security alerts.",
        country_id=india.id
    ),

    Portal(
        name="Cyber Volunteer Portal",
        url="https://cybervolunteer.mha.gov.in",
        description="Government portal allowing citizens to report unlawful online content and support cyber awareness.",
        country_id=india.id
    ),

    Portal(
        name="Sanchar Saathi",
        url="https://sancharsaathi.gov.in",
        description="Portal to report telecom fraud, block lost mobile phones, and manage spam communications.",
        country_id=india.id
    ),

    Portal(
        name="Maharashtra Cyber",
        url="https://www.mahacyber.gov.in",
        description="Cybercrime awareness and reporting portal managed by Maharashtra Cyber Cell.",
        country_id=india.id
    ),

    # IRELAND
    Portal(
        name="Garda Cyber Crime Bureau",
        url="https://www.garda.ie/en/about-us/our-departments/garda-national-cyber-crime-bureau-gnccb-/",
        description="Cybercrime investigation unit of the Irish police providing reporting guidance.",
        country_id=ireland.id
    ),

    Portal(
        name="National Cyber Security Centre Ireland",
        url="https://www.ncsc.gov.ie",
        description="Ireland’s national authority responsible for cybersecurity guidance and incident response.",
        country_id=ireland.id
    ),

    Portal(
        name="CSIRT-IE Incident Reporting",
        url="https://www.ncsc.gov.ie/contact/report-an-incident/",
        description="Official portal to report cybersecurity incidents affecting organisations in Ireland.",
        country_id=ireland.id
    ),

    Portal(
        name="Hotline.ie",
        url="https://www.hotline.ie",
        description="Irish internet safety hotline to report illegal or harmful online content.",
        country_id=ireland.id
    ),

    Portal(
        name="IRISS",
        url="https://www.iriss.ie",
        description="Irish cyber threat intelligence and security information sharing service.",
        country_id=ireland.id
    ),
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
