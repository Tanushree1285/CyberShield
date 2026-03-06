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

CYBER_IRELAND_URL = "https://cyberireland.ie/news/"

def fetch_cyber_ireland_advisories():
    logging.info(f"Fetching Cyber Ireland news from {CYBER_IRELAND_URL}...")
    app = create_app()
    with app.app_context():
        ireland = Country.query.filter_by(code="IE").first()
        if not ireland: return
        
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(CYBER_IRELAND_URL, headers=headers, verify=False, timeout=10)
            response.raise_for_status()
        except Exception as e:
            logging.error(f"Network error fetching Cyber Ireland: {e}")
            return

        try:
            soup = BeautifulSoup(response.text, 'html.parser')
            advisories_added = 0
            
            # Find all article or post elements
            articles = soup.find_all('article')
            if not articles:
                # Fallback to general links
                links = soup.find_all('a', href=True)
                articles_to_process = []
                for link in links:
                    if len(link.text.strip()) > 20 and 'read' not in link.text.lower():
                        articles_to_process.append(link)
            else:
                articles_to_process = articles

            for item in articles_to_process:
                # Extract URL and Title
                if item.name == 'a':
                    href = item['href']
                    text = item.text.strip()
                    parent = item.parent
                else:
                    link_el = item.find('a', href=True)
                    if not link_el: continue
                    href = link_el['href']
                    text = link_el.text.strip() if link_el.text.strip() else link_el.get('title', '')
                    if not text:
                        h_tag = item.find(['h2', 'h3'])
                        if h_tag: text = h_tag.text.strip()
                    parent = item

                if not text or len(text) < 15: continue
                
                full_url = href if href.startswith('http') else f"https://cyberireland.ie{href}"
                
                # Extract Date
                parsed_date = datetime.utcnow()
                import re
                from dateutil import parser
                
                parent_text = parent.get_text() if parent else text
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
                        content="Cybersecurity industry news and updates from Cyber Ireland.",
                        url=full_url,
                        source="Cyber Ireland",
                        country_id=ireland.id,
                        type=detect_type(text, "cybersecurity industry news"),
                        published_date=parsed_date 
                    )
                    db.session.add(new_article)
                    advisories_added += 1

            if advisories_added > 0:
                db.session.commit()
                logging.info(f"Added {advisories_added} Cyber Ireland articles.")
        except Exception as e:
            logging.error(f"Error parsing Cyber Ireland layout: {e}")

if __name__ == "__main__":
    fetch_cyber_ireland_advisories()
