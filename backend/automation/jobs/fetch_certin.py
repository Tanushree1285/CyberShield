import sys
import os
import requests
from bs4 import BeautifulSoup
import urllib3
from datetime import datetime
import logging
from dateutil import parser

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Add the backend directory to Python path to import models
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app import create_app
from extensions import db
from models import Article, Country
from automation.utils import detect_type

CERT_IN_URL = "https://www.cert-in.org.in/s2cMainServlet?pageid=PUBWEL01"

def fetch_certin_advisories():
    """
    Scrapes cybersecurity advisories from CERT-In (India).
    Parses the HTML to extract titles, publish dates, and URLs,
    and saves them to the local SQLite database.
    """
    logging.info(f"Fetching CERT-In advisories from {CERT_IN_URL}...")
    
    app = create_app()
    with app.app_context():
        # Get India country ID
        india = Country.query.filter_by(code="IN").first()
        if not india:
            logging.error("Error: India country record not found. Please seed the database first.")
            return

        try:
            # Disable SSL verification temporarily as some regional sites have certificate issues
            response = requests.get(CERT_IN_URL, verify=False, timeout=10)
            response.raise_for_status()
        except Exception as e:
            logging.error(f"Failed to fetch data from CERT-In: {e}")
            return

        try:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            advisories_added = 0
            
            # Look for the links in the table. 
            links = soup.find_all('a', href=True)
            
            for link in links:
                href = link['href']
                if 'pageid=PUB' in href or 'pageid=CIA' in href or 'pageid=VU' in href:
                    title_text = link.text.strip()
                    
                    # Skip meaningless links
                    if not title_text or len(title_text) < 10 or title_text.lower() in ['read more', 'click here']:
                        continue
                    
                    full_url = href if href.startswith('http') else f"https://www.cert-in.org.in/{href}"
                    # Date Extraction
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

                    # Check if it already exists to avoid duplicates
                    exists = Article.query.filter_by(url=full_url).first()
                    if not exists:
                        desc_text = f"Recent advisory from CERT-In. Read more at the official source."
                        new_article = Article(
                            title=title_text,
                            content=desc_text,
                            url=full_url,
                            source="CERT-In",
                            country_id=india.id,
                            type=detect_type(title_text, desc_text),
                            published_date=parsed_date 
                        )
                        db.session.add(new_article)
                        advisories_added += 1

            if advisories_added > 0:
                db.session.commit()
                logging.info(f"Successfully scraped and added {advisories_added} new advisories to the database.")
            else:
                logging.info("No new advisories found to add.")
        except Exception as e:
            logging.error(f"Error parsing CERT-In layout: {e}")


if __name__ == "__main__":
    fetch_certin_advisories()

