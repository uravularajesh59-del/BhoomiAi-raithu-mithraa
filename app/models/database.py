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

class Field(Base):
    __tablename__ = 'fields'
    id = Column(Integer, primary_key=True)
    field_name = Column(String(100))
    area_acres = Column(Float)
    area_hectares = Column(Float)
    perimeter_m = Column(Float)
    coordinates = Column(String)  # Stored as JSON string
    created_at = Column(DateTime, default=datetime.utcnow)

# Database Setup
import os
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///app/data/bhoomiai_ap.db")

# If using PostgreSQL, we might need to handle the 'postgres://' vs 'postgresql://' prefix issue with Heroku/Render
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at app/data/bhoomiai_ap.db")
