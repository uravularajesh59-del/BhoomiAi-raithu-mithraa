from app.models.database import SessionLocal, MandiPrice, init_db
from datetime import datetime

def seed_data():
    init_db()
    db = SessionLocal()
    
    # Curated Real Prices for AP (Approx based on recent trends)
    data = [
        {"district": "Guntur", "market": "Guntur", "commodity": "Chilli", "variety": "Guntur Sannam", "min": 18000, "max": 22000, "modal": 21000},
        {"district": "Kurnool", "market": "Adoni", "commodity": "Cotton", "variety": "Bt Cotton", "min": 6500, "max": 7800, "modal": 7200},
        {"district": "Krishna", "market": "Vijayawada", "commodity": "Paddy", "variety": "BPT 5204", "min": 2100, "max": 2500, "modal": 2350},
        {"district": "Prakasam", "market": "Ongole", "commodity": "Chilli", "variety": "Teja", "min": 19000, "max": 23000, "modal": 21500},
        {"district": "Guntur", "market": "Tenali", "commodity": "Paddy", "variety": "Common", "min": 2000, "max": 2300, "modal": 2150},
        {"district": "Vizianagaram", "market": "Salur", "commodity": "Maize", "variety": "Hybrid", "min": 1800, "max": 2200, "modal": 2050},
        {"district": "Chittoor", "market": "Madanapalle", "commodity": "Tomato", "variety": "Local", "min": 800, "max": 1500, "modal": 1200},
    ]

    try:
        # Clear previous demo data
        db.query(MandiPrice).delete()
        
        for item in data:
            entry = MandiPrice(
                state="Andhra Pradesh",
                district=item['district'],
                market=item['market'],
                commodity=item['commodity'],
                variety=item['variety'],
                grade="FAQ",
                min_price=item['min'],
                max_price=item['max'],
                modal_price=item['modal'],
                price_date=datetime.now().strftime("%d/%m/%Y")
            )
            db.add(entry)
        
        db.commit()
        print(f"Successfully seeded {len(data)} premium records into BhoomiAI.")
    except Exception as e:
        print(f"Seeding error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
