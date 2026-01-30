import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

class APMandiScraper:
    def __init__(self):
        self.base_url = "https://agmarknet.gov.in/SearchReports/SearchReport.aspx?Report_Name=MarketWise&State=1&District=0&Market=0&Commodity=0&Today=1"
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        }

    def scrape_today(self):
        print(f"Fetching AP Mandi data from: {self.base_url}")
        try:
            response = requests.get(self.base_url, headers=self.headers, timeout=30)
            if response.status_code != 200:
                print(f"Error: Status code {response.status_code}")
                return []

            soup = BeautifulSoup(response.text, 'lxml')
            table = soup.find('table', {'id': 'ctl00_ContentPlaceHolder1_gridviewData'})
            
            if not table:
                print("No data table found on the page.")
                return []

            rows = table.find_all('tr')[1:] # Skip header
            mandi_data = []

            for row in rows:
                cols = row.find_all('td')
                if len(cols) >= 10:
                    data = {
                        "state": "Andhra Pradesh",
                        "district": cols[1].text.strip(),
                        "market": cols[2].text.strip(),
                        "commodity": cols[3].text.strip(),
                        "variety": cols[4].text.strip(),
                        "grade": cols[5].text.strip(),
                        "min_price": float(cols[6].text.strip()) if cols[6].text.strip() else 0,
                        "max_price": float(cols[7].text.strip()) if cols[7].text.strip() else 0,
                        "modal_price": float(cols[8].text.strip()) if cols[8].text.strip() else 0,
                        "date": cols[9].text.strip()
                    }
                    mandi_data.append(data)
            
            print(f"Successfully scraped {len(mandi_data)} market entries.")
            return mandi_data

        except Exception as e:
            print(f"Scraper Exception: {str(e)}")
            return []

if __name__ == "__main__":
    scraper = APMandiScraper()
    data = scraper.scrape_today()
    with open("app/data/latest_ap_mandi.json", "w") as f:
        json.dump(data, f, indent=4)
