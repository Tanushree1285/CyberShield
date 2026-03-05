import requests
from bs4 import BeautifulSoup
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

URL = "https://www.ncsc.gov.ie/"
response = requests.get(URL, verify=False)
soup = BeautifulSoup(response.text, 'html.parser')

print(f"Fetching links from {URL}...")

# We know the URL is the homepage. We need to look for typical advisory elements or the "Advisories" section links.
for a in soup.find_all('a', href=True):
    href = a['href']
    text = a.text.strip()
    if ('news/' in href or 'advisories/' in href) and len(text) > 5:
         print(f"Link: {text} -> {href}")
