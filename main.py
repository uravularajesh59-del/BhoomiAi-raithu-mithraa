from fastapi import FastAPI, Request, Body
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.models.database import SessionLocal, MandiPrice, Field
import json
import os

app = FastAPI(title="BhoomiAI: National Digital Farming Mission")

# Mount static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Initialize templates
templates = Jinja2Templates(directory="app/templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "title": "BhoomiAI - Empowering Farmers"})

@app.get("/advisor", response_class=HTMLResponse)
async def advisor(request: Request):
    return templates.TemplateResponse("advisor.html", {"request": request})

@app.get("/mandi", response_class=HTMLResponse)
async def mandi(request: Request):
    db = SessionLocal()
    prices = db.query(MandiPrice).all()
    db.close()
    return templates.TemplateResponse("mandi.html", {"request": request, "prices": prices})

@app.get("/api/prices")
async def get_prices(commodity: str = None, district: str = None):
    db = SessionLocal()
    query = db.query(MandiPrice)
    if commodity:
        query = query.filter(MandiPrice.commodity.ilike(f"%{commodity}%"))
    if district:
        query = query.filter(MandiPrice.district.ilike(f"%{district}%"))
    
    prices = query.order_by(MandiPrice.price_date.desc()).all()
    db.close()
    return prices

@app.get("/api/best-market")
async def best_market(commodity: str, district: str, transport_cost: float = 2.0):
    """
    Best Market Formula: score = modal_price - (distance_km * transport_cost)
    """
    db = SessionLocal()
    options = db.query(MandiPrice).filter(MandiPrice.commodity.ilike(f"%{commodity}%")).all()
    db.close()
    
    if not options:
        return {"error": "No market data found for this commodity"}

    # Mock Distance Data for Demo (In real app, use GIS/Google Maps API)
    # Guntur to various mandis (simulated)
    mock_distances = {
        "Guntur": 10,
        "Tenali": 30,
        "Vijayawada": 45,
        "Hyderabad": 270,
        "Kurnool": 300,
        "Adoni": 350
    }

    best_option = None
    max_score = -float('inf')

    for opt in options:
        dist = mock_distances.get(opt.market, 50) # Default 50km if not in mock
        score = opt.modal_price - (dist * transport_cost)
        
        if score > max_score:
            max_score = score
            best_option = {
                "market": opt.market,
                "district": opt.district,
                "modal_price": opt.modal_price,
                "distance_km": dist,
                "estimated_profit_score": round(score, 2),
                "advice": f"Sell at {opt.market} ({dist}km). Estimated net: ₹{round(score, 2)}/q after transport."
            }
    
    return best_option

@app.get("/measure", response_class=HTMLResponse)
async def measure(request: Request):
    return templates.TemplateResponse("measure.html", {"request": request})

@app.post("/api/save-field")
async def save_field(data: dict = Body(...)):
    db = SessionLocal()
    try:
        new_field = Field(
            field_name=data.get("name", "My Field"),
            area_acres=float(data.get("area_acres", 0)),
            area_hectares=float(data.get("area_hectares", 0)),
            perimeter_m=float(data.get("perimeter_m", 0)),
            coordinates=json.dumps(data.get("coordinates", []))
        )
        db.add(new_field)
        db.commit()
        return {"status": "success", "field_id": new_field.id}
    except Exception as e:
        db.rollback()
        return JSONResponse(status_code=400, content={"status": "error", "message": str(e)})
    finally:
        db.close()

@app.get("/api/fields")
async def get_fields():
    db = SessionLocal()
    fields = db.query(Field).order_by(Field.created_at.desc()).all()
    db.close()
    return fields

@app.get("/doctor", response_class=HTMLResponse)
async def doctor(request: Request):
    return templates.TemplateResponse("doctor.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
