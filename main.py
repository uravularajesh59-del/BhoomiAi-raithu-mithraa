from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.models.database import SessionLocal, MandiPrice
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

@app.get("/api/mandi/optimize/{commodity}")
async def optimize_mandi(commodity: str):
    db = SessionLocal()
    options = db.query(MandiPrice).filter(MandiPrice.commodity.ilike(f"%{commodity}%")).all()
    db.close()
    
    if not options:
        return {"error": "No data found for this commodity"}

    # Optimization Logic: Best Price (In a real app, we'd add Distance/Transport cost)
    best = max(options, key=lambda x: x.modal_price)
    
    return {
        "best_market": best.market,
        "district": best.district,
        "price": best.modal_price,
        "advice": f"Sell at {best.market} for maximum profit. Target price: ₹{best.modal_price}/q."
    }

@app.get("/doctor", response_class=HTMLResponse)
async def doctor(request: Request):
    return templates.TemplateResponse("doctor.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
