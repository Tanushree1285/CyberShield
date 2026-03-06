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

CB_URL = "https://www.centralbank.ie/regulation/how-we-regulate/cyber-security"

def fetch_central_bank_advisories():
    logging.info(f"Fetching Central Bank IE advisories from {CB_URL}...")
    app = create_app()
    with app.app_context():
        ireland = Country.query.filter_by(code="IE").first()
        if not ireland: return
        
        try:
            response = requests.get(CB_URL, verify=False, timeout=10)
            response.raise_for_status()
        except Exception as e:
            logging.error(f"Network error fetching Central Bank: {e}")
            return

        try:
            soup = BeautifulSoup(response.text, 'html.parser')
            advisories_added = 0
            
            links = soup.find_all('a', href=True)
            for link in links:
                href = link['href']
                text = link.text.strip()
                
                if len(text) > 15 and ('cyber' in text.lower() or 'security' in text.lower() or 'resilience' in text.lower()):
                    full_url = href if href.startswith('http') else f"https://www.centralbank.ie{href}"
                    
                    parsed_date = datetime.utcnow()
                    import re
                    from dateutil import parser
                    
                    parent_text = link.parent.get_text() if link.parent else text
                    date_pattern = r'(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})'
                    d_match = re.search(date_pattern, parent_text, re.IGNORECASE)
                    
                    if d_match:
                        try:
                            parsed_date = parser.parse(d_match.group(1))
                        except:
                            pass

                    if not Article.query.filter_by(url=full_url).first():
                        new_article = Article(
                            title=text,
                            content="Cybersecurity regulation update or notice from the Central Bank of Ireland.",
                            url=full_url,
                            source="Central Bank of Ireland",
                            country_id=ireland.id,
                            type=detect_type(text, "cybersecurity regulation notice"),
                            published_date=parsed_date 
                        )
                        db.session.add(new_article)
                        advisories_added += 1

            if advisories_added > 0:
                db.session.commit()
                logging.info(f"Added {advisories_added} Central Bank articles.")
        except Exception as e:
            logging.error(f"Error parsing Central Bank layout: {e}")

if __name__ == "__main__":
    fetch_central_bank_advisories()
