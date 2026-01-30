# BhoomiAI: Raithu Mithraa (AP Edition) 🌾🚀

BhoomiAI is a premium, full-screen digital farming assistant designed specifically for the farmers of Andhra Pradesh. Built as a "National Digital Farming Mission" tier platform, it provides real-time mandi prices, AI-driven crop advice, and instant disease diagnosis.

## 🌟 Key Features

- **AP Mandi Optimizer**: Real-time price discovery for Guntur, Kurnool, Vizag, and more.
- **Smart Crop Advisor**: Personalized crop recommendations based on season and region.
- **Crop Doctor AI**: High-tech scanner to detect and treat crop diseases.
- **Prestige UI**: Immersive glassmorphism design with bilingual support (Telugu & English).

## 🛠️ Tech Stack

- **Backend**: FastAPI (Python 3.12)
- **Database**: SQLAlchemy + SQLite (AP Seeded Data)
- **Frontend**: Jinja2 Templates + Modern Vanilla JS
- **Styling**: Custom "Prestige" Design System (CSS3)

## 🚀 How to Run Locally

### Prerequisites
- Python 3.12+

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/uravularajesh59-del/BhoomiAi-raithu-mithraa.git
   cd BhoomiAi-raithu-mithraa
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Initialize the Database & Seed AP Data**:
   ```bash
   $env:PYTHONPATH="."
   python app/data/ap_seed_data.py
   ```

4. **Launch the Platform**:
   ```bash
   python main.py
   ```

5. **Access the App**:
   Open your browser and go to `http://localhost:8000`

## 📄 License
This project is part of a National Digital Farming Mission initiative.

---
**BhoomiAI - Empowering the Indian Farmer.**
