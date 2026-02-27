import requests
from bs4 import BeautifulSoup
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

URL = "https://www.cert-in.org.in/s2cMainServlet?pageid=PUBWEL01"
response = requests.get(URL, verify=False)
soup = BeautifulSoup(response.text, 'html.parser')

print(f"Fetching links from {URL}...")
for a in soup.find_all('a', href=True):
    href = a['href']
    if 'pageid=PUB' in href or 'pageid=CIA' in href or 'pageid=VU' in href:
        title = a.text.strip()
        if title and len(title) > 10 and title.lower() not in ['read more', 'click here']:
            print(f"FOUND ADVISORY: {title} -> {href}")


