import sys
import os
import requests
from bs4 import BeautifulSoup
import urllib3
from datetime import datetime
from dateutil import parser
import logging

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Add the backend directory to Python path to import models
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app import create_app
from extensions import db
from models import Article, Country
from automation.utils import detect_type

NCSC_URL = "https://www.ncsc.gov.ie"

def fetch_ncsc_advisories():
    """
    Scrapes cybersecurity advisories from NCSC (Ireland).
    Parses the HTML to extract titles, publish dates, and URLs,
    and saves them to the local SQLite database.
    """
    logging.info(f"Fetching NCSC Ireland advisories from {NCSC_URL}...")
    
    app = create_app()
    with app.app_context():
        ireland = Country.query.filter_by(code="IE").first()
        if not ireland:
            logging.error("Error: Ireland country record not found. Please seed the database first.")
            return

        try:
            response = requests.get(NCSC_URL, verify=False, timeout=10)
            response.raise_for_status()
        except Exception as e:
            logging.error(f"Failed to fetch data from NCSC Ireland: {e}")
            return

        try:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            advisories_added = 0
            
            links = soup.find_all('a', href=True)
            
            for link in links:
                href = link['href']
                text = link.text.strip()
                
                # Identify advisory or news links, avoid short unhelpful texts like 'More'
                if ('news/' in href or 'advisories/' in href) and len(text) > 10 and 'read' not in text.lower():
                    
                    # Format relative URLs properly
                    if href.startswith('/'):
                        full_url = f"{NCSC_URL}{href}"
                    elif not href.startswith('http'):
                        full_url = f"{NCSC_URL}/{href}"
                    else:
                        full_url = href
                    
                    # Try to find a date in the surrounding elements or next paragraph
                    parsed_date = datetime.utcnow()
                    import re
                    
                    # NCSC usually places dates in either the text itself or the subsequent <p> tag
                    date_pattern = r'(\d{1,2}(?:st|nd|rd|th)?\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})'
                    
                    text_match = re.search(date_pattern, text, re.IGNORECASE)
                    if text_match:
                        try:
                            date_str = re.sub(r'(st|nd|rd|th)', '', text_match.group(1))
                            parsed_date = parser.parse(date_str)
                        except:
                            pass
                    else:
                        # Check the next paragraph
                        next_p = link.find_next('p')
                        if next_p and next_p.text:
                            p_match = re.search(date_pattern, next_p.text, re.IGNORECASE)
                            if p_match:
                                try:
                                    date_str = re.sub(r'(st|nd|rd|th)', '', p_match.group(1))
                                    parsed_date = parser.parse(date_str)
                                except:
                                    pass

                    # Simple check to avoid creating duplicates
                    exists = Article.query.filter_by(url=full_url).first()
                    if not exists:
                        desc_text = f"Recent advisory from NCSC Ireland. Read more at the official source."
                        new_article = Article(
                            title=text,
                            content=desc_text,
                            url=full_url,
                            source="NCSC Ireland",
                            country_id=ireland.id,
                            type=detect_type(text, desc_text),
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
            logging.error(f"Error parsing NCSC layout: {e}")


if __name__ == "__main__":
    fetch_ncsc_advisories()

