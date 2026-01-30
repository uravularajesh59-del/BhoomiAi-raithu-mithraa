// BhoomiAI Core Application Logic

let currentLang = 'en';
let currentView = 'home';

const diseaseData = [
    {
        name: "Leaf Rust",
        confidence: "98.4%",
        image: "https://images.unsplash.com/photo-1530836361280-ca8cc0aa097a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        actionTag: "ACTION REQUIRED",
        actionTagBg: "#fed7d7",
        actionTagColor: "#c53030",
        treatment: [
            "Apply <strong>Azoxystrobin</strong> (200ml per acre) immediately.",
            "Prune infected leaves to prevent fungus spread.",
            "Ensure water drainage is clear from the field center."
        ],
        naturalCure: "Spraying diluted neem oil solution can help prevent mild recurrence.",
        spreadRisk: "High (Windborne spores). Notify neighbors in nearest fields."
    },
    {
        name: "Powdery Mildew",
        confidence: "95.2%",
        image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        actionTag: "MODERATE RISK",
        actionTagBg: "#ffeb3b",
        actionTagColor: "#333",
        treatment: [
            "Use sulfur-based fungicides.",
            "Improve air circulation around the plants.",
            "Avoid overhead watering during evening."
        ],
        naturalCure: "Baking soda spray (1 tbsp per gallon of water) is effective.",
        spreadRisk: "Moderate (Spreads in dry, humid conditions)."
    }
];

// --- View Renderers ---

const views = {
    home: () => `
        <div class="animate-up">
            <section class="hero">
                <h1>BhoomiAI: Your Smart Farming Friend</h1>
                <p style="font-size: 1.2rem; max-width: 600px;">Empowering farmers with AI-driven crop advice, live market rates, and instant disease diagnosis.</p>
                <div style="margin-top: 20px; display: flex; gap: 15px;">
                    <button class="btn" style="width: auto; padding: 15px 40px;" onclick="switchView('advisor')">Get Started</button>
                    <button class="btn" style="width: auto; padding: 15px 40px; background: white; color: var(--primary);" onclick="window.scrollTo(0, 800)">Learn More</button>
                </div>
            </section>

            <div class="container">
                <div style="display: flex; gap: 30px; margin-bottom: 50px; align-items: stretch;">
                    <div class="card" style="flex: 2; background: linear-gradient(135deg, var(--primary), #1a3a17); color: white; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden;">
                        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" style="position: absolute; top:0; right:0; width: 50%; height: 100%; object-fit: cover; opacity: 0.3; mask-image: linear-gradient(to left, black, transparent);">
                        <h2 style="margin-bottom: 20px; font-size: 2.5rem;">${t('weather_title')}</h2>
                        <div style="display: flex; gap: 40px; align-items: center;">
                            <div>
                                <div style="font-size: 4rem; font-weight: 800; line-height:1;" id="temp-val">28°C</div>
                                <div style="font-size: 1.2rem; opacity: 0.9;">Clear Sky • Hyderabad, India</div>
                            </div>
                            <div style="text-align: center;">
                                <i class="fas fa-sun" style="font-size: 5rem; color: var(--accent); filter: drop-shadow(0 0 20px rgba(255,215,0,0.5));"></i>
                            </div>
                        </div>
                        <div id="weather-tip" style="margin-top:30px; background: rgba(255,255,255,0.15); padding:20px; border-radius:15px; font-size: 1.1rem; display: flex; align-items: center; gap: 15px;">
                            <i class="fas fa-seedling" style="font-size: 2rem;"></i> 
                            <span>${t('ready_to_spray')}</span>
                        </div>
                    </div>

                    <div class="card" style="flex: 1; padding: 30px; text-align: center; display: flex; flex-direction: column; justify-content: center; background: #eef7ee;">
                        <img src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; border: 5px solid white; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
                        <h3 style="color: var(--primary);">Village Cow Health</h3>
                        <p style="color: #666; font-size: 0.9rem; margin-bottom: 15px;">Support for local livestock and dairy management coming soon.</p>
                        <span style="background: var(--primary); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">LIVE SOON</span>
                    </div>
                </div>

                <div class="feature-grid">
                    <div class="feature-card" onclick="switchView('advisor')">
                        <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 150px; object-fit: cover; border-radius: 15px; margin-bottom: 20px;">
                        <i class="fas fa-robot"></i>
                        <h3>${t('smart_advisor')}</h3>
                        <p style="font-size: 0.85rem; color: #777; margin-top: 10px;">Personalized crop plans for your soil.</p>
                    </div>
                    <div class="feature-card" onclick="switchView('mandi')">
                        <img src="https://images.unsplash.com/photo-1488459711612-bb6bd2f9d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 150px; object-fit: cover; border-radius: 15px; margin-bottom: 20px;">
                        <i class="fas fa-chart-line"></i>
                        <h3>${t('mandi_prices')}</h3>
                        <p style="font-size: 0.85rem; color: #777; margin-top: 10px;">Real-time market rates at your fingertips.</p>
                    </div>
                    <div class="feature-card" onclick="switchView('disease')">
                        <img src="https://images.unsplash.com/photo-1530836361280-ca8cc0aa097a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" style="width: 100%; height: 150px; object-fit: cover; border-radius: 15px; margin-bottom: 20px;">
                        <i class="fas fa-microscope"></i>
                        <h3>${t('crop_doctor')}</h3>
                        <p style="font-size: 0.85rem; color: #777; margin-top: 10px;">Artificial Intelligence for crop health.</p>
                    </div>
                </div>
            </div>
        </div>
    `,

    advisor: () => `
        <div class="animate-up container" style="padding: 50px 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 40px;">
                <i class="fas fa-chevron-left" onclick="switchView('home')" style="font-size: 1.5rem; margin-right: 20px; cursor: pointer; color: var(--primary);"></i>
                <h2 style="font-size: 2.5rem;">${t('smart_advisor')}</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start;">
                <div id="advisor-form" class="card" style="padding: 40px;">
                    <div style="margin-bottom: 25px;">
                        <label style="display:block; margin-bottom: 12px; font-weight: 700; color: var(--text-dark);">${t('village')}</label>
                        <input type="text" id="districtInput" placeholder="Enter Village" style="width: 100%; padding: 18px; border-radius: 15px; border: 2px solid #eee; outline: none;">
                    </div>
                    <div style="margin-bottom: 25px;">
                        <label style="display:block; margin-bottom: 12px; font-weight: 700; color: var(--text-dark);">${t('season')}</label>
                        <select id="seasonSelect" style="width: 100%; padding: 18px; border-radius: 15px; border: 2px solid #eee; outline: none; background: white;">
                            <option value="kharif">Kharif (Monsoon)</option>
                            <option value="rabi">Rabi (Winter)</option>
                            <option value="zaid">Zaid (Summer)</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 30px;">
                        <label style="display:block; margin-bottom: 12px; font-weight: 700; color: var(--text-dark);">${t('land_size')}</label>
                        <input type="number" id="landInput" placeholder="e.g. 5" style="width: 100%; padding: 18px; border-radius: 15px; border: 2px solid #eee; outline: none;">
                    </div>
                    <button class="btn" onclick="runAdvisor()">${t('get_advice')}</button>
                </div>

                <div id="advisor-results" class="card" style="display: none; padding: 40px; border-left: 10px solid var(--primary);">
                    <h3 style="color: var(--primary); font-size: 1.8rem; margin-bottom: 20px;">Top Recommended</h3>
                    <div style="display: flex; align-items: center; margin-bottom: 25px;">
                        <img id="rec-crop-img" src="" style="width: 100px; height: 100px; border-radius: 20px; object-fit: cover; margin-right: 20px;">
                        <div>
                            <div style="font-size: 2rem; font-weight: 800;" id="rec-crop-name"></div>
                        </div>
                    </div>
                    <p id="rec-sowing" style="margin-bottom:10px;"></p>
                    <p id="rec-water" style="margin-bottom:20px;"></p>
                    <button class="btn" style="background: var(--secondary);" onclick="resetAdvisor()">Search Another</button>
                </div>
            </div>
        </div>
    `,

    mandi: () => `
        <div class="animate-up container" style="padding: 50px 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 40px;">
                <i class="fas fa-chevron-left" onclick="switchView('home')" style="font-size: 1.5rem; margin-right: 20px; cursor: pointer; color: var(--primary);"></i>
                <h2 style="font-size: 2.5rem;">${t('mandi_prices')}</h2>
            </div>
            
            <div class="card" style="padding: 0; overflow: hidden;">
                <table style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead style="background: var(--primary); color: white;">
                        <tr>
                            <th style="padding: 20px;">Crop</th>
                            <th style="padding: 20px;">Price</th>
                            <th style="padding: 20px;">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 20px;">Cotton</td>
                            <td style="padding: 20px;">₹7,200/q</td>
                            <td style="padding: 20px; color: green;"><i class="fas fa-arrow-up"></i> 2.5%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,

    disease: () => `
        <div class="animate-up container" style="padding: 50px 20px;">
            <div style="display: flex; align-items: center; margin-bottom: 40px;">
                <i class="fas fa-chevron-left" onclick="switchView('home')" style="font-size: 1.5rem; margin-right: 20px; cursor: pointer; color: var(--primary);"></i>
                <h2 style="font-size: 2.5rem;">${t('crop_doctor')}</h2>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                <div id="disease-upload" class="card" style="text-align: center; padding: 50px;">
                    <i class="fas fa-camera" style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;"></i>
                    <h3>${t('upload_leaf')}</h3>
                    <input type="file" id="fileInput" style="display: none;" onchange="analyzeDisease()">
                    <button class="btn" style="margin-top:20px;" onclick="document.getElementById('fileInput').click()">${t('check_disease')}</button>
                </div>

                <div id="disease-results" class="card" style="display: none; padding: 0; overflow: hidden;">
                    <div id="disease-img" style="height: 200px; background-size: cover; background-position: center;"></div>
                    <div style="padding: 30px;">
                        <h3 id="disease-name" style="color: #c53030;"></h3>
                        <p id="disease-confidence" style="font-weight: 700; color: #666;"></p>
                        <span id="disease-action-tag" style="padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;"></span>
                        <div style="margin-top: 20px; background: #fff5f5; padding: 20px; border-radius: 15px;">
                            <h4 style="color: #c53030;">Treatment:</h4>
                            <ul id="treatment-list" style="margin-top: 10px; margin-left: 20px;"></ul>
                        </div>
                        <p id="natural-cure-text" style="margin-top:20px; color: #856404; font-size: 0.9rem;"></p>
                        <p id="spread-risk-text" style="margin-top:10px; color: #2b6cb0; font-size: 0.9rem;"></p>
                        <button class="btn" style="margin-top:30px; background: var(--secondary);" onclick="resetDisease()">Scan Another</button>
                    </div>
                </div>
            </div>
        </div>
    `
};

// --- Logic Helpers ---

function runAdvisor() {
    const district = document.getElementById('districtInput').value;
    const season = document.getElementById('seasonSelect').value;
    if (!district) return alert("Please enter village.");

    document.getElementById('advisor-form').style.display = 'none';
    const res = document.getElementById('advisor-results');
    res.style.display = 'block';

    const n = document.getElementById('rec-crop-name');
    const i = document.getElementById('rec-crop-img');
    const s = document.getElementById('rec-sowing');
    const w = document.getElementById('rec-water');

    if (season === 'rabi') {
        n.innerText = "Wheat (Kanak)";
        i.src = "https://images.unsplash.com/photo-1542358821-653303429381?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
        s.innerText = "Sowing: Nov 1 - Nov 25";
        w.innerText = "Water: 3-4 Irrigations";
    } else if (season === 'zaid') {
        n.innerText = "Moong Dal";
        i.src = "https://images.unsplash.com/photo-1589133418570-072054668e27?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
        s.innerText = "Sowing: Mar 15 - Apr 10";
        w.innerText = "Water: Low / Sprinkler";
    } else {
        n.innerText = "Cotton (Kapas)";
        i.src = "https://images.unsplash.com/photo-1594285859341-3b5646f888cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80";
        s.innerText = "Sowing: June 15 - July 10";
        w.innerText = "Water: Rainfed";
    }
}

function resetAdvisor() {
    document.getElementById('advisor-form').style.display = 'block';
    document.getElementById('advisor-results').style.display = 'none';
}

function analyzeDisease() {
    document.getElementById('disease-upload').style.display = 'none';
    document.getElementById('disease-results').style.display = 'block';
    const rand = diseaseData[Math.floor(Math.random() * diseaseData.length)];

    document.getElementById('disease-img').style.backgroundImage = `url('${rand.image}')`;
    document.getElementById('disease-name').innerText = rand.name;
    document.getElementById('disease-confidence').innerText = `Confidence: ${rand.confidence}`;

    const tag = document.getElementById('disease-action-tag');
    tag.innerText = rand.actionTag;
    tag.style.background = rand.actionTagBg;
    tag.style.color = rand.actionTagColor;

    const list = document.getElementById('treatment-list');
    list.innerHTML = rand.treatment.map(t => `<li>${t}</li>`).join('');

    document.getElementById('natural-cure-text').innerText = rand.naturalCure;
    document.getElementById('spread-risk-text').innerText = rand.spreadRisk;
}

function resetDisease() {
    document.getElementById('disease-upload').style.display = 'block';
    document.getElementById('disease-results').style.display = 'none';
}

function updateWeather() {
    const temp = document.getElementById('temp-val');
    if (temp) {
        const current = parseInt(temp.innerText);
        const next = current + (Math.random() > 0.5 ? 1 : -1);
        temp.innerText = next + "°C";
    }
}

// --- Core Engine ---

function t(key) {
    return i18n[currentLang][key] || key;
}

function updateUI() {
    document.getElementById('header-context').innerText = t('welcome');
    document.getElementById('main-content').innerHTML = views[currentView]();

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === currentView) item.classList.add('active');
    });
}

function switchView(view) {
    currentView = view;
    updateUI();
    window.scrollTo(0, 0);
}

document.getElementById('langSelect').addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateUI();
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchView(item.getAttribute('data-view')));
});

window.onload = () => {
    updateUI();
    setInterval(updateWeather, 5000);
};
