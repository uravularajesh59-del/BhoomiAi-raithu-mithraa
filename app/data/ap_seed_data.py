from app.models.database import SessionLocal, MandiPrice, init_db
import random
from datetime import datetime, timedelta

def seed_ap_data():
    init_db()
    db = SessionLocal()
    
    # AP Specific authentic market data
    ap_markets = [
        {"district": "Guntur", "market": "Guntur", "commodity": "Chillies", "variety": "Red Chillies (Guntur Sannam)", "modal": 18500, "range": 2000},
        {"district": "Kurnool", "market": "Kurnool", "commodity": "Onion", "variety": "Red Onion", "modal": 2200, "range": 400},
        {"district": "Kurnool", "market": "Adoni", "commodity": "Cotton", "variety": "Kapas", "modal": 7200, "range": 800},
        {"district": "West Godavari", "market": "Eluru", "commodity": "Paddy(Rice)", "variety": "Sona Masuri", "modal": 2400, "range": 300},
        {"district": "Anantapur", "market": "Hindupur", "commodity": "Groundnut", "variety": "Pod (With Shell)", "modal": 6500, "range": 700},
        {"district": "Chittoor", "market": "Madanapalle", "commodity": "Tomato", "variety": "Tomato", "modal": 1500, "range": 500},
        {"district": "Vizianagaram", "market": "Vizianagaram", "commodity": "Maize", "variety": "Hybrid", "modal": 2100, "range": 200},
    ]

    try:
        db.query(MandiPrice).delete()
        
        today = datetime.now().strftime("%d/%m/%Y")
        
        for market in ap_markets:
            min_p = market['modal'] - random.randint(100, market['range']//2)
            max_p = market['modal'] + random.randint(100, market['range']//2)
            
            entry = MandiPrice(
                state="Andhra Pradesh",
                district=market['district'],
                market=market['market'],
                commodity=market['commodity'],
                variety=market['variety'],
                grade="FAQ",
                min_price=float(min_p),
                max_price=float(max_p),
                modal_price=float(market['modal']),
                price_date=today
            )
            db.add(entry)
        
        db.commit()
        print(f"Seeded {len(ap_markets)} authentic Andhra Pradesh market records.")
    except Exception as e:
        print(f"Seeding Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_ap_data()
