import json
from app.models.database import SessionLocal, MandiPrice, init_db
from app.data.scraper import APMandiScraper

def ingest_data():
    init_db()
    scraper = APMandiScraper()
    data = scraper.scrape_today()
    
    if not data:
        print("No data to ingest.")
        return

    db = SessionLocal()
    try:
        # Clear old data for today to avoid duplicates in demo
        # (In production, we'd use a unique constraint or composite key)
        # db.query(MandiPrice).delete() 
        
        for entry in data:
            price_entry = MandiPrice(
                state=entry['state'],
                district=entry['district'],
                market=entry['market'],
                commodity=entry['commodity'],
                variety=entry['variety'],
                grade=entry['grade'],
                min_price=entry['min_price'],
                max_price=entry['max_price'],
                modal_price=entry['modal_price'],
                price_date=entry['date']
            )
            db.add(price_entry)
        
        db.commit()
        print(f"Ingested {len(data)} records into the database.")
    except Exception as e:
        print(f"Ingestion Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    ingest_data()
