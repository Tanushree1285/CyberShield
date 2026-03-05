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

MEITY_URL = "https://www.meity.gov.in/cyber-security"

def fetch_meity_advisories():
    logging.info(f"Fetching MeitY advisories from {MEITY_URL}...")
    app = create_app()
    with app.app_context():
        india = Country.query.filter_by(code="IN").first()
        if not india: return
        
        try:
            response = requests.get(MEITY_URL, verify=False, timeout=10)
            response.raise_for_status()
        except Exception as e:
            logging.error(f"Network error fetching MeitY: {e}")
            return

        try:
            soup = BeautifulSoup(response.text, 'html.parser')
            advisories_added = 0
            
            links = soup.find_all('a', href=True)
            for link in links:
                href = link['href']
                text = link.text.strip()
                
                if len(text) > 15 and ('cyber' in text.lower() or 'policy' in text.lower() or 'awareness' in text.lower()):
                    full_url = href if href.startswith('http') else f"https://www.meity.gov.in{href}"
                    
                    if not Article.query.filter_by(url=full_url).first():
                        new_article = Article(
                            title=text,
                            content="Policy update or cyber initiative from Ministry of Electronics and Information Technology.",
                            url=full_url,
                            source="MeitY (India)",
                            country_id=india.id,
                            type=detect_type(text, "policy update cyber awareness"),
                            published_date=datetime.utcnow() 
                        )
                        db.session.add(new_article)
                        advisories_added += 1

            if advisories_added > 0:
                db.session.commit()
                logging.info(f"Added {advisories_added} MeitY articles.")
        except Exception as e:
            logging.error(f"Error parsing MeitY layout: {e}")

if __name__ == "__main__":
    fetch_meity_advisories()
