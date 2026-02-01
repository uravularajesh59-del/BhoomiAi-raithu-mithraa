# BhoomiAI: Raithu Mithraa (AP Edition) 🌾🚀

BhoomiAI is a premium digital farming platform designed for the farmers of Andhra Pradesh. It leverages AI, GIS, and real-time data to empower the agricultural community.

## 🌟 Key Features

### 1. Advanced GIS Land Measure
- **Satellite Mapping**: Uses Esri World Imagery for high-fidelity field identification.
- **Tapping Tools**: Precision polygon drawing with area (Acres/Hectoares) and perimeter calculation.
- **Auto-Calculations**: Instantly estimates seed requirements and net profit based on field size.

### 2. Smart Crop Advisor
- **Regional Optimization**: Tailored recommendations for AP districts (Guntur, Kurnool, Krishna, etc.).
- **Economic Insights**: Predictive profit analysis and sowing window guidance.

### 3. National Mandi Optimizer
- **Live Discovery**: Real-time price tracking from Agmarknet.
- **Trade Engine**: Finds the most profitable markets using a distance-adjusted modal price score.

### 4. Crop Doctor AI
- **Disease Scanning**: Computer vision simulation for instant botanical diagnosis.
- **Bilingual Treatment**: Telugu and English protocols for 500+ diseases.

## 🛠️ Tech Stack
- **Backend**: FastAPI (Python)
- **GIS Engine**: Leaflet.js
- **Styling**: Premium Glassmorphism (Vanilla CSS)
- **Database**: SQLAlchemy + SQLite

## 🚀 Quick Start
1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Setup Database**:
   ```bash
   python -m app.data.seed_mandi
   ```
3. **Run the Mission**:
   ```bash
   python main.py
   ```
4. **Access UI**: [http://127.0.0.1:8001](http://127.0.0.1:8001)

## 📁 Key Files
- `main.py`: Core API and Route definitions.
- `app/static/js/mission.js`: Mission-critical interactive logic and language switching.
- `app/static/css/prestige.css`: High-end visual styling.
- `app/templates/base.html`: Global layout with bilingual support.

---
**BhoomiAI: Built for the Farmer, Powered by Intelligence.**
