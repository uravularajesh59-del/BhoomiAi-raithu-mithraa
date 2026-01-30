from sqlalchemy import Column, Integer, String, Float, DateTime, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

Base = declarative_base()

class MandiPrice(Base):
    __tablename__ = 'mandi_prices'
    id = Column(Integer, primary_key=True)
    state = Column(String(50))
    district = Column(String(50))
    market = Column(String(100))
    commodity = Column(String(100))
    variety = Column(String(100))
    grade = Column(String(50))
    min_price = Column(Float)
    max_price = Column(Float)
    modal_price = Column(Float)
    price_date = Column(String(50))
    created_at = Column(DateTime, default=datetime.utcnow)

# Database Setup
engine = create_engine('sqlite:///app/data/bhoomiai_ap.db')
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at app/data/bhoomiai_ap.db")
