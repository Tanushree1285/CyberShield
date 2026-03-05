from app import create_app
from extensions import db
from models import Country, Article
from datetime import datetime

def seed_ireland_articles():
    app = create_app()
    with app.app_context():
        ireland = Country.query.filter_by(code="IE").first()
        if not ireland:
            print("Ireland not found in database.")
            return

        articles = [
            Article(
                title="Romance Scams on the Rise in Ireland",
                content="Gardaí warn of increasing romance scams targeting Irish citizens.",
                type="cybercrime",
                source="Garda Press Office",
                url="https://www.garda.ie/en/about-us/our-departments/garda-national-cyber-crime-bureau-gnccb-/romance-scams/",
                published_date=datetime.now(),
                country_id=ireland.id
            ),
            Article(
                title="Be Web Wise: Protecting Your Personal Information",
                content="A new awareness campaign by NCSC Ireland to educate citizens on web safety.",
                type="awareness",
                source="NCSC Ireland",
                url="https://www.ncsc.gov.ie/awareness/",
                published_date=datetime.now(),
                country_id=ireland.id
            )
        ]
        
        db.session.add_all(articles)
        db.session.commit()
        print("Seeded additional Ireland articles.")

if __name__ == "__main__":
    seed_ireland_articles()
