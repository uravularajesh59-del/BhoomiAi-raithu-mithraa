// BhoomiAI National Mission Interactivity

const AP_ADVISOR_DATA = {
    'kharif': {
        'default': { name: 'Paddy (MTU 1224)', sowing: 'June 15 - July 15', water: 'High (Irrigated)', profit: '₹35,000' },
        'Guntur': { name: 'Chilli (Teja)', sowing: 'July 1 - Aug 15', water: 'Medium (Drip)', profit: '₹1,20,000' },
        'Kurnool': { name: 'Cotton (Bt)', sowing: 'June 1 - July 10', water: 'Medium (Rainfed)', profit: '₹45,000' }
    },
    'rabi': {
        'default': { name: 'Groundnut', sowing: 'Nov 1 - Dec 15', water: 'Low (Sprinkler)', profit: '₹25,000' },
        'Nellore': { name: 'Paddy (Late)', sowing: 'Oct 15 - Nov 15', water: 'High', profit: '₹30,000' }
    },
    'zaid': {
        'default': { name: 'Green Gram', sowing: 'March 1 - March 25', water: 'Low', profit: '₹15,000' }
    }
};

function runPrestigeAdvisor() {
    const district = document.getElementById('districtInput').value;
    const season = document.getElementById('seasonSelect').value;

    if (!district) {
        alert("Precision data requires a village or district name.");
        return;
    }

    const rec = (AP_ADVISOR_DATA[season] && AP_ADVISOR_DATA[season][district]) ||
        (AP_ADVISOR_DATA[season] && AP_ADVISOR_DATA[season]['default']) ||
        AP_ADVISOR_DATA['kharif']['default'];

    document.getElementById('advisor-form').style.opacity = '0.5';
    document.getElementById('advisor-placeholder').style.display = 'none';

    const results = document.getElementById('advisor-results');
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('rec-crop-name').innerText = rec.name;
    document.getElementById('rec-sowing').innerText = rec.sowing;
    document.getElementById('rec-water').innerText = rec.water;
    document.querySelector('#advisor-results .mission-card div div div').innerText = rec.profit + "/acre";
}

function updateLiveWeather() {
    // Simulated weather for AP
    const conditions = ['Sunny', 'Partly Cloudy', 'Humidity High', 'Spray Warning'];
    const temp = Math.floor(Math.random() * 5 + 28);
    const cond = conditions[Math.floor(Math.random() * conditions.length)];

    const weatherPill = document.getElementById('liveWeatherPill');
    if (weatherPill) {
        weatherPill.innerHTML = `<i class="fas fa-sun"></i> ${temp}°C - ${cond}`;
        if (cond === 'Spray Warning') weatherPill.style.background = '#ff4444';
    }
}
setInterval(updateLiveWeather, 5000);
window.onload = updateLiveWeather;

// Scan Simulation
function startMissionScan() {
    const loader = document.getElementById('scanner-line');
    if (loader) loader.style.display = 'block';

    setTimeout(() => {
        if (loader) loader.style.display = 'none';
        document.getElementById('doctor-upload').style.display = 'none';
        document.getElementById('doctor-results').style.display = 'block';
    }, 3000);
}

// Language Pulse Logic
function updateGlobalLanguage(lang) {
    console.log("Mission Language Switched:", lang);
    document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = el.getAttribute('data-' + lang);
        } else {
            el.innerText = el.getAttribute('data-' + lang);
        }
    });
}

document.getElementById('langSelect').addEventListener('change', (e) => {
    updateGlobalLanguage(e.target.value);
    localStorage.setItem('bhoomi_lang', e.target.value);
});

// Init Lang
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('bhoomi_lang') || 'en';
    document.getElementById('langSelect').value = savedLang;
    updateGlobalLanguage(savedLang);
});

// Weather Pulse
function updateLiveWeather() {
    const conditions = ['Sunny', 'Clear Sky', 'High Humidity', 'Ideal for Spray'];
    const temp = Math.floor(Math.random() * 4 + 30);
    const cond = conditions[Math.floor(Math.random() * conditions.length)];

    const weatherPill = document.getElementById('liveWeatherPill');
    if (weatherPill) {
        weatherPill.innerHTML = `<i class="fas fa-temperature-high"></i> ${temp}°C - ${cond}`;
        if (cond === 'High Humidity') weatherPill.style.background = '#f6ad55';
        else weatherPill.style.background = '#4CAF50';
    }
}
setInterval(updateLiveWeather, 8000);

// GIS Calculations Refined
function calculatePolygonArea(latlngs) {
    if (latlngs.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < latlngs.length; i++) {
        let j = (i + 1) % latlngs.length;
        area += latlngs[i][0] * latlngs[j][1] - latlngs[j][0] * latlngs[i][1];
    }
    // Correct scale for AP latitude
    const meterScale = 111320 * 111320 * Math.cos(latlngs[0][0] * Math.PI / 180);
    return (Math.abs(area) * meterScale) / 2;
}

// Live Mandi System
async function refreshMandi() {
    const commodity = document.getElementById('commoditySearch').value;
    const district = document.getElementById('districtSearch').value;

    try {
        const response = await fetch(`/api/prices?commodity=${commodity}&district=${district}`);
        const data = await response.json();
        renderMandiTable(data);

        if (commodity) {
            optimizeTrade(commodity, district);
        }
    } catch (e) {
        console.error("Mandi search failed:", e);
    }
}

const CROP_TRANSLATIONS = {
    'Chilli': 'మిరప',
    'Chillies': 'మిరప',
    'Red Chillies (Teja)': 'ఎర్ర మిరప (తేజ)',
    'Cotton': 'పత్తి',
    'Bt Cotton': 'Bt పత్తి',
    'Paddy': 'వరి',
    'Paddy(Rice)': 'వరి (బియ్యం)',
    'Rice': 'బియ్యం',
    'BPT 5204': 'BPT 5204',
    'Tobacco': 'పొగాకు',
    'Groundnut': 'వేరుశనగ',
    'Tomato': 'టమాటో',
    'Maize': 'మొక్కజొన్న',
    'Coconut': 'కొబ్బరి',
    'Bengal Gram': 'శనగలు',
    'Onion': 'ఉల్లిపాయ',
    'Red Onion': 'ఎర్ర ఉల్లిపాయ'
};

function renderMandiTable(data) {
    const tbody = document.getElementById('mandi-table-body');
    tbody.innerHTML = '';
    const currentLang = localStorage.getItem('bhoomi_lang') || 'en';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="padding: 40px; text-align: center; color: #999;">No data found for your search.</td></tr>';
        return;
    }

    data.forEach(p => {
        let displayName = p.commodity;
        let displayVariety = p.variety;

        if (currentLang === 'te') {
            displayName = CROP_TRANSLATIONS[p.commodity] || p.commodity;
            displayVariety = CROP_TRANSLATIONS[p.variety] || p.variety;
        }

        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #eee';
        row.innerHTML = `
            <td style="padding: 25px; font-weight: 800;">
                ${displayName}
                <div style="font-size: 0.8rem; color: #888; font-weight: normal;">${displayVariety}</div>
            </td>
            <td style="padding: 25px; color: #666;">${p.market} (${p.district})</td>
            <td style="padding: 25px; font-weight: 800; color: var(--primary); font-size: 1.3rem;">₹${p.modal_price}/q</td>
            <td style="padding: 25px;">
                <span style="background: #e6fffa; color: #2D5A27; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">LIVE</span>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function optimizeTrade(commodity, district) {
    const optimizeBtn = document.getElementById('optimizeBtn');
    const content = document.getElementById('optimizer-content');

    try {
        const response = await fetch(`/api/best-market?commodity=${commodity}&district=${district}`);
        const best = await response.json();

        if (best.error) {
            content.innerHTML = `<p style="opacity: 0.8;">${best.error}</p>`;
            return;
        }

        content.innerHTML = `
            <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
                AI Optimizer suggests selling <strong>${commodity}</strong> at <strong>${best.market}</strong>.
            </p>
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 20px; margin-bottom: 20px;">
                <div style="font-size: 0.8rem; opacity: 0.7; text-transform: uppercase;">Best Net Price</div>
                <div style="font-size: 2rem; font-weight: 800; color: var(--accent);">₹${best.modal_price}/q</div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 0.9rem;">
                    <span><i class="fas fa-truck"></i> ${best.distance_km}km</span>
                    <span style="color: #4CAF50;">+₹${best.estimated_profit_score} profit score</span>
                </div>
            </div>
            <p style="font-size: 0.9rem; opacity: 0.9; font-style: italic;">"${best.advice}"</p>
        `;
        optimizeBtn.style.display = 'block';
    } catch (e) {
        console.error("Optimization failed:", e);
    }
}
