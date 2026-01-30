@echo off
echo Starting BhoomiAI: Raithu Mithraa (AP Edition)...
set PYTHONPATH=.
pip install -r requirements.txt
python app/data/ap_seed_data.py
python main.py
pause
