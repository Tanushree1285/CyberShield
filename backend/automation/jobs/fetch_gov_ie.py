import sys
import os
import requests
from bs4 import BeautifulSoup
import urllib3
from datetime import datetime
import logging

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app import create_app
from extensions import db
from models import Article, Country
from automation.utils import detect_type

GOV_IE_URL = "https://www.gov.ie/en/news/"

def fetch_gov_ie_advisories():
    logging.info(f"Fetching Gov.ie advisories from {GOV_IE_URL}...")
    app = create_app()
    with app.app_context():
        ireland = Country.query.filter_by(code="IE").first()
        if not ireland: return
        
        try:
            response = requests.get(GOV_IE_URL, verify=False, timeout=10)
            response.raise_for_status()
        except Exception as e:
            logging.error(f"Network error fetching Gov.ie: {e}")
            return

        try:
            soup = BeautifulSoup(response.text, 'html.parser')
            advisories_added = 0
            
            links = soup.find_all('a', href=True)
            for link in links:
                href = link['href']
                text = link.text.strip()
                
                if len(text) > 15 and ('cyber' in text.lower() or 'security' in text.lower() or 'scam' in text.lower()):
                    full_url = href if href.startswith('http') else f"https://www.gov.ie{href}"
                    
                    if not Article.query.filter_by(url=full_url).first():
                        new_article = Article(
                            title=text,
                            content="Recent security notice from Government of Ireland.",
                            url=full_url,
                            source="Government of Ireland",
                            country_id=ireland.id,
                            type=detect_type(text, "security notice"),
                            published_date=datetime.utcnow() 
                        )
                        db.session.add(new_article)
                        advisories_added += 1

            if advisories_added > 0:
                db.session.commit()
                logging.info(f"Added {advisories_added} Gov.ie articles.")
        except Exception as e:
            logging.error(f"Error parsing Gov.ie layout: {e}")

if __name__ == "__main__":
    fetch_gov_ie_advisories()
