# BhoomiAI: Raithu Mithraa (AP Edition) 🌾🚀

![Status](https://img.shields.io/badge/Status-Production_Ready-success) ![Tech](https://img.shields.io/badge/Tech-FastAPI_%7C_Leaflet_%7C_AI-blue) ![Region](https://img.shields.io/badge/Region-Andhra_Pradesh-orange)

**BhoomiAI** is a premium digital farming platform designed specifically for the farmers of Andhra Pradesh. It leverages Artificial Intelligence, GIS Satellite Mapping, and Real-Time Market Data to empower the agricultural community with actionable insights.

---

## 🌟 Key Features

### 1. 🛰️ Advanced GIS Land Measure
- **Satellite Precision**: Uses Esri World Imagery to map fields with high-fidelity.
- **Tools**: Draw polygons to instantly calculate Area (Acres/Hectares) and Perimeter.
- **Smart Insights**: Auto-estimates seed requirements and projected profit based on field size.

### 2. 🧠 Smart Crop Advisor
- **Hyper-Local**: Tailored recommendations for AP districts (Guntur, Kurnool, Krishna, etc.).
- **Profit Analysis**: Predictive economic modeling to suggest the most profitable crop for the season.

### 3. 🍅 National Mandi Optimizer
- **Live Prices**: Real-time integration with Agmarknet for authentic market prices.
- **Trade Engine**: Finds the best market to sell at by calculating net profit after transport costs.
- **Bilingual**: Full English and Telugu support (e.g., "Chilli" ↔ "మిరప").

### 4. 🌿 Crop Doctor AI
- **Instant Diagnosis**: Computer vision engine to detect diseases from photos.
- **Treatment Protocols**: Provides immediate chemical and organic remedies in Telugu and English.

---

## 🚀 Live Demo
You can view the live project here:  
**[👉 Launch BhoomiAI Live](https://bhoomiai-raithu-mithraa.onrender.com)**  
*(Note: If the link is sleeping, please allow 30 seconds for the free server to wake up.)*

---

## 🛠️ Tech Stack
- **Backend**: FastAPI (Python High-Performance)
- **Frontend**: HTML5, Vanilla CSS (Glassmorphism), JavaScript
- **Mapping**: Leaflet.js + Esri GIS
- **Database**: SQLAlchemy + SQLite
- **Deployment**: Render / Docker

## 📦 Local Installation
To run this project on your machine:

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/uravularajesh59-del/BhoomiAi-raithu-mithraa.git
    cd BhoomAi
    pip install -r requirements.txt
    ```
2.  **Magic Run** (Windows):
    Double-click `run.bat` to automatically seed data and launch the app in your browser.
    
    *Or manually:*
    ```bash
    python -m app.data.ap_seed_data
    python main.py
    ```

---
**BhoomiAI: Built for the Farmer, Powered by Intelligence.**  
*© 2026 AP Digital Farming Mission*
