@echo off
title BhoomiAI - National Digital Farming Mission
echo ---------------------------------------------------
echo      Starting BhoomiAI: Raithu Mithraa (AP)
echo ---------------------------------------------------
echo.

echo [1/3] Installing/Checking Dependencies...
pip install -r requirements.txt > nul 2>&1
echo Done.
echo.

echo [2/3] Seeding Latest Market Data...
set PYTHONPATH=.
python -m app.data.ap_seed_data
echo Done.
echo.

echo [3/3] Launching Mission Control...
echo Opening http://localhost:8001 ...
start http://localhost:8001

python main.py
pause
