import sys
import os
import requests
from bs4 import BeautifulSoup
import urllib3
from datetime import datetime

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Add the backend directory to Python path to import models
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app import create_app
from extensions import db
from models import Article, Country

# Corrected URL based on user input
CERT_IN_URL = "https://www.cert-in.org.in/s2cMainServlet?pageid=PUBWEL01"

def fetch_certin_advisories():
    """
    Scrapes cybersecurity advisories from CERT-In (India).
    Parses the HTML to extract titles, publish dates, and URLs,
    and saves them to the local SQLite database.
    """
    print(f"Fetching CERT-In advisories from {CERT_IN_URL}...")
    
    app = create_app()
    with app.app_context():
        # Get India country ID
        india = Country.query.filter_by(code="IN").first()
        if not india:
            print("Error: India country record not found. Please seed the database first.")
            return

        try:
            # Disable SSL verification temporarily as some regional sites have certificate issues
            response = requests.get(CERT_IN_URL, verify=False, timeout=15)
            response.raise_for_status()
        except Exception as e:
            print(f"Failed to fetch data from CERT-In: {e}")
            return

        soup = BeautifulSoup(response.text, 'html.parser')
        
        advisories_added = 0
        
        # Look for the links in the table. 
        # Usually they are pointing to "s2cMainServlet?pageid=CIA..." or similar
        links = soup.find_all('a', href=True)
        
        for link in links:
            href = link['href']
            # We look for links that look like advisories
            if 'pageid=PUB' in href or 'pageid=CIA' in href or 'pageid=VU' in href:
                title_text = link.text.strip()
                
                # Skip meaningless links
                if not title_text or len(title_text) < 10 or title_text.lower() in ['read more', 'click here']:
                    continue
                
                full_url = href if href.startswith('http') else f"https://www.cert-in.org.in/{href}"
                
                # Check if it already exists to avoid duplicates
                exists = Article.query.filter_by(url=full_url).first()
                if not exists:
                    new_article = Article(
                        title=title_text,
                        content=f"Recent advisory from CERT-In. Read more at the official source.",
                        url=full_url,
                        source="CERT-In",
                        country_id=india.id,
                        # CERT-In often doesn't have easily parseable dates right next to the links in a standard format, 
                        # so we use current date as a fallback for when it was discovered.
                        published_date=datetime.utcnow() 
                    )
                    db.session.add(new_article)
                    advisories_added += 1

        if advisories_added > 0:
            db.session.commit()
            print(f"Successfully scraped and added {advisories_added} new advisories to the database.")
        else:
            print("No new advisories found to add.")


if __name__ == "__main__":
    fetch_certin_advisories()
