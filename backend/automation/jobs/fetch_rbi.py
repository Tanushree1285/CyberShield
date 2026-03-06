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

RBI_URL = "https://rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx"

def fetch_rbi_advisories():
    logging.info(f"Fetching RBI advisories from {RBI_URL}...")
    app = create_app()
    with app.app_context():
        india = Country.query.filter_by(code="IN").first()
        if not india: return
        
        try:
            response = requests.get(RBI_URL, verify=False, timeout=10)
            response.raise_for_status()
        except Exception as e:
            logging.error(f"Network error fetching RBI: {e}")
            return

        try:
            soup = BeautifulSoup(response.text, 'html.parser')
            advisories_added = 0
            
            links = soup.find_all('a', href=True)
            for link in links:
                href = link['href']
                text = link.text.strip()
                
                if len(text) > 15 and ('cyber' in text.lower() or 'fraud' in text.lower() or 'security' in text.lower()):
                    full_url = href if href.startswith('http') else f"https://rbi.org.in/Scripts/{href}"
                    parsed_date = datetime.utcnow()
                    import re
                    from dateutil import parser
                    
                    parent_text = link.parent.get_text() if link.parent else text
                    date_pattern = r'(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})'
                    d_match = re.search(date_pattern, parent_text, re.IGNORECASE)
                    
                    if d_match:
                        try:
                            date_str = re.sub(r'(st|nd|rd|th)', '', d_match.group(1))
                            parsed_date = parser.parse(date_str)
                        except:
                            pass
                    else:
                        date_pattern_short = r'(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})'
                        d_match_short = re.search(date_pattern_short, parent_text, re.IGNORECASE)
                        if d_match_short:
                            try:
                                parsed_date = parser.parse(d_match_short.group(1))
                            except:
                                pass

                    if not Article.query.filter_by(url=full_url).first():
                        new_article = Article(
                            title=text,
                            content="Recent circular/advisory from the Reserve Bank of India.",
                            url=full_url,
                            source="Reserve Bank of India",
                            country_id=india.id,
                            type=detect_type(text, "Recent circular/advisory from the Reserve Bank of India."),
                            published_date=parsed_date 
                        )
                        db.session.add(new_article)
                        advisories_added += 1

            if advisories_added > 0:
                db.session.commit()
                logging.info(f"Added {advisories_added} RBI articles.")
        except Exception as e:
            logging.error(f"Error parsing RBI layout: {e}")

if __name__ == "__main__":
    fetch_rbi_advisories()
