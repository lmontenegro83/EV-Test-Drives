(function () {
  'use strict';

  // ── Car Data ──
  const CARS = [
    {
      id: 'enyaq',
      name: 'Skoda Enyaq 85',
      body: 'SUV',
      bodyClass: '',
      boot: '585 L',
      range: '~560 km',
      dcPeak: '175 kW',
      uvp: '~49k',
      lease: '330-470',
      why: 'Best all-around: square boot, wide doors, proven platform, lowest lease.',
      watch: 'Mainstream looks; heat pump optional.'
    },
    {
      id: 'ev5',
      name: 'Kia EV5',
      body: 'SUV',
      bodyClass: '',
      boot: '566 L',
      range: '~530 km',
      dcPeak: '150 kW',
      uvp: '~46k',
      lease: '430-560',
      why: 'Flat 2 m load floor; 7-yr warranty; V2L; strong base kit.',
      watch: '400V only (slower DC); AWD from mid-2026.'
    },
    {
      id: 'id7t',
      name: 'VW ID.7 Tourer',
      body: 'Wagon',
      bodyClass: 'wagon',
      boot: '605 L',
      range: '~620 km',
      dcPeak: '200 kW',
      uvp: '~55k',
      lease: '500-680',
      why: 'Best range + biggest wagon boot; Oberklasse ride quality.',
      watch: 'Not an SUV; higher lease; 1.2 t tow limit.'
    },
    {
      id: 'ex40',
      name: 'Volvo EX40',
      body: 'SUV',
      bodyClass: '',
      boot: '452 L',
      range: '~480 km',
      dcPeak: '200 kW',
      uvp: '~48k',
      lease: '400-550',
      why: 'Volvo safety pedigree; Google Built-In; solid build; 200 kW DC.',
      watch: 'Aging CMA platform; boot only 452 L; no standard heat pump.'
    },
    {
      id: 'buzz',
      name: 'VW ID. Buzz',
      body: 'Van',
      bodyClass: 'van',
      boot: '1,121 L',
      range: '~450 km',
      dcPeak: '200 kW',
      uvp: '~50k',
      lease: '483-700',
      why: 'Sliding doors = child-seat game-changer; massive cabin; 7-seat LWB.',
      watch: '~20 kWh/100 km; shorter range; bigger footprint.'
    },
    {
      id: 'explorer',
      name: 'Ford Explorer EV',
      body: 'SUV',
      bodyClass: '',
      boot: '450 L',
      range: '~600 km',
      dcPeak: '185 kW',
      uvp: '~40k',
      lease: '380-520',
      why: 'Lowest entry price; great real-world range; 17 L Mega Console.',
      watch: 'Smallest boot (450 L); no frunk; recall history.'
    },
    {
      id: 'sealion7',
      name: 'BYD Sealion 7',
      body: 'SUV-Coupe',
      bodyClass: 'coupe',
      boot: '520+58 L',
      range: '~502 km',
      dcPeak: '230 kW',
      uvp: '~50k',
      lease: '550-700',
      why: '800V; 58 L frunk; full equipment standard; 6-yr warranty.',
      watch: 'Max payload only 410 kg (!); young dealer network.'
    },
    {
      id: 'el6',
      name: 'NIO EL6',
      body: 'SUV',
      bodyClass: '',
      boot: '579 L',
      range: '~580 km',
      dcPeak: '180 kW',
      uvp: '~66k',
      lease: '700-900',
      why: 'Premium cabin; battery swap; lounge seat; 23-speaker audio.',
      watch: '~2x Enyaq lease cost; complex battery pricing; thin network.'
    },
    {
      id: 'et5t',
      name: 'NIO ET5 Touring',
      body: 'Wagon',
      bodyClass: 'wagon',
      boot: '450 L',
      range: '~580 km',
      dcPeak: '180 kW',
      uvp: '~60k',
      lease: '625-800',
      why: 'Gorgeous design; battery swap; premium interior.',
      watch: 'Small boot (450 L); tiny rear window; expensive.'
    },
    {
      id: 'ix1',
      name: 'BMW iX1 xDrive30',
      body: 'SUV',
      bodyClass: '',
      boot: '490 L',
      range: '~440 km',
      dcPeak: '130 kW',
      uvp: '~55k',
      lease: '350-550',
      why: 'Premium build & interior; strong BMW dealer network; compact & easy to park.',
      watch: 'Smallest boot & shortest range here; slowest DC (130 kW); 3-yr warranty.'
    }
  ];

  const CRITERIA = [
    'Easy child-seat loading / buckle access',
    'Rear-seat space for two child seats',
    'Stroller fits without removing wheels',
    'Trunk opening shape is practical',
    'Family weekend luggage fit',
    'Front-seat comfort',
    'Rear-seat comfort',
    'Visibility / confidence when driving',
    'Ride comfort over rough roads',
    'Cabin quietness',
    'Infotainment usability',
    'Parking / maneuvering ease',
    'Dealer experience / trust',
    'Lease quote feels acceptable'
  ];

  // ── State ──
  let state = loadState();
  let currentCar = null;

  function defaultState() {
    const scores = {};
    CARS.forEach((car) => {
      scores[car.id] = {
        checks: new Array(CRITERIA.length).fill(false),
        notes: '',
        driveDate: ''
      };
    });
    return { scores };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem('ev-scorer-data');
      if (raw) {
        const parsed = JSON.parse(raw);
        // Ensure all cars exist in state
        CARS.forEach((car) => {
          if (!parsed.scores[car.id]) {
            parsed.scores[car.id] = {
              checks: new Array(CRITERIA.length).fill(false),
              notes: '',
              driveDate: ''
            };
          }
          // Ensure checks array is correct length
          while (parsed.scores[car.id].checks.length < CRITERIA.length) {
            parsed.scores[car.id].checks.push(false);
          }
        });
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    return defaultState();
  }

  function saveState() {
    localStorage.setItem('ev-scorer-data', JSON.stringify(state));
  }

  function getScore(carId) {
    return state.scores[carId].checks.filter(Boolean).length;
  }

  // ── Rendering ──
  function renderHome() {
    const list = document.getElementById('car-list');
    list.innerHTML = CARS.map((car) => {
      const score = getScore(car.id);
      const total = CRITERIA.length;
      const ringClass = score === total ? 'full-score' : score > 0 ? 'has-score' : '';
      return `
        <div class="car-card" data-car="${car.id}">
          <div class="car-card-info">
            <div class="car-card-name">${car.name}</div>
            <div class="car-card-specs">
              <span class="body-tag ${car.bodyClass}">${car.body}</span>
              &nbsp; ${car.boot} &middot; ${car.range} &middot; ${car.dcPeak}
            </div>
          </div>
          <div class="car-card-score">
            <div class="score-ring ${ringClass}">${score}</div>
            <div class="score-total">/ ${total}</div>
          </div>
        </div>`;
    }).join('');

    list.querySelectorAll('.car-card').forEach((card) => {
      card.addEventListener('click', () => {
        const carId = card.dataset.car;
        openScoreView(carId);
      });
    });
  }

  function openScoreView(carId) {
    currentCar = CARS.find((c) => c.id === carId);
    if (!currentCar) return;

    document.getElementById('view-home').classList.remove('active');
    document.getElementById('view-compare').classList.remove('active');
    document.getElementById('view-settings').classList.remove('active');
    document.getElementById('view-score').classList.add('active');

    renderScoreView();
    window.scrollTo(0, 0);
  }

  function renderScoreView() {
    const car = currentCar;
    const data = state.scores[car.id];
    const score = getScore(car.id);
    const view = document.getElementById('view-score');

    view.innerHTML = `
      <div class="score-header">
        <button class="back-btn" id="btn-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div class="score-car-title">${car.name}</div>
        <div class="score-car-badge">${score}/${CRITERIA.length}</div>
      </div>

      <div class="specs-banner">
        <div class="spec-item">
          <div class="spec-value">${car.boot}</div>
          <div class="spec-label">Boot</div>
        </div>
        <div class="spec-item">
          <div class="spec-value">${car.range}</div>
          <div class="spec-label">Range</div>
        </div>
        <div class="spec-item">
          <div class="spec-value">${car.dcPeak}</div>
          <div class="spec-label">DC Peak</div>
        </div>
        <div class="spec-item">
          <div class="spec-value">&euro;${car.lease}</div>
          <div class="spec-label">Lease/mo</div>
        </div>
      </div>

      <div class="car-highlights">
        <div class="highlight-box why"><strong>Why:</strong> ${car.why}</div>
        <div class="highlight-box watch"><strong>Watch:</strong> ${car.watch}</div>
      </div>

      <div class="section-label">Test Drive Date</div>
      <input type="date" class="drive-date-input" id="drive-date" value="${data.driveDate}" />

      <div class="section-label">Checklist</div>
      <div class="checklist" id="checklist">
        ${CRITERIA.map((c, i) => `
          <div class="checklist-item ${data.checks[i] ? 'checked' : ''}" data-index="${i}">
            <div class="check-icon">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div class="checklist-label">${c}</div>
          </div>
        `).join('')}
      </div>

      <div class="section-label">Notes</div>
      <textarea class="notes-area" id="car-notes" placeholder="Impressions, dealer quotes, things to remember...">${data.notes}</textarea>
    `;

    // Event listeners
    document.getElementById('btn-back').addEventListener('click', goHome);

    document.getElementById('drive-date').addEventListener('change', (e) => {
      state.scores[car.id].driveDate = e.target.value;
      saveState();
    });

    document.querySelectorAll('.checklist-item').forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index);
        state.scores[car.id].checks[idx] = !state.scores[car.id].checks[idx];
        saveState();
        item.classList.toggle('checked');
        // Update badge
        const newScore = getScore(car.id);
        document.querySelector('.score-car-badge').textContent = `${newScore}/${CRITERIA.length}`;
      });
    });

    document.getElementById('car-notes').addEventListener('input', (e) => {
      state.scores[car.id].notes = e.target.value;
      saveState();
    });
  }

  function goHome() {
    currentCar = null;
    document.getElementById('view-score').classList.remove('active');
    document.getElementById('view-home').classList.add('active');
    renderHome();
    setActiveTab('tab-home');
  }

  function renderCompare() {
    const wrap = document.getElementById('compare-content');

    const headerCells = CARS.map((c) => `<th>${c.name.replace('Hyundai ', '').replace('Skoda ', '').replace('Ford ', '').replace('BYD ', '').replace('NIO ', '').replace('VW ', '')}</th>`).join('');

    const rows = CRITERIA.map((criterion, ci) => {
      const cells = CARS.map((car) => {
        const checked = state.scores[car.id].checks[ci];
        return `<td>${checked ? '<span class="check-mark">&#10003;</span>' : '<span class="empty-mark">&mdash;</span>'}</td>`;
      }).join('');
      return `<tr><td>${criterion}</td>${cells}</tr>`;
    }).join('');

    // Score row
    const scores = CARS.map((car) => getScore(car.id));
    const maxScore = Math.max(...scores);
    const scoreCells = CARS.map((car, i) => {
      const s = scores[i];
      const winnerClass = s > 0 && s === maxScore ? 'compare-winner' : '';
      return `<td class="${winnerClass}">${s}/${CRITERIA.length}</td>`;
    }).join('');

    wrap.innerHTML = `
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead><tr><th>Criteria</th>${headerCells}</tr></thead>
          <tbody>
            ${rows}
            <tr class="score-row"><td>Total Score</td>${scoreCells}</tr>
          </tbody>
        </table>
      </div>
    `;
  }

  // ── Navigation ──
  function setActiveTab(tabId) {
    document.querySelectorAll('.tab-bar button').forEach((btn) => {
      btn.classList.toggle('active', btn.id === tabId);
    });
  }

  function showView(viewId) {
    document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    window.scrollTo(0, 0);
  }

  // ── Toast ──
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // ── Export / Reset ──
  function exportData() {
    const exportObj = {
      exportDate: new Date().toISOString(),
      cars: CARS.map((car) => ({
        name: car.name,
        driveDate: state.scores[car.id].driveDate,
        score: getScore(car.id) + '/' + CRITERIA.length,
        checks: CRITERIA.map((c, i) => ({
          criterion: c,
          passed: state.scores[car.id].checks[i]
        })),
        notes: state.scores[car.id].notes
      }))
    };
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ev-test-drive-scores.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported');
  }

  function resetData() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('show');

    document.getElementById('modal-confirm').onclick = () => {
      state = defaultState();
      saveState();
      overlay.classList.remove('show');
      renderHome();
      showView('view-home');
      setActiveTab('tab-home');
      showToast('All scores reset');
    };

    document.getElementById('modal-cancel').onclick = () => {
      overlay.classList.remove('show');
    };
  }

  // ── Init ──
  function init() {
    renderHome();

    document.getElementById('tab-home').addEventListener('click', () => {
      currentCar = null;
      showView('view-home');
      setActiveTab('tab-home');
      renderHome();
    });

    document.getElementById('tab-compare').addEventListener('click', () => {
      currentCar = null;
      showView('view-compare');
      setActiveTab('tab-compare');
      renderCompare();
    });

    document.getElementById('tab-settings').addEventListener('click', () => {
      currentCar = null;
      showView('view-settings');
      setActiveTab('tab-settings');
    });

    document.getElementById('btn-export').addEventListener('click', exportData);
    document.getElementById('btn-reset').addEventListener('click', resetData);

    // Dark mode
    const darkToggle = document.getElementById('toggle-dark');
    const savedTheme = localStorage.getItem('ev-scorer-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      darkToggle.checked = true;
    }
    darkToggle.addEventListener('change', () => {
      if (darkToggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ev-scorer-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ev-scorer-theme', 'light');
      }
    });

    // Register service worker & auto-reload on update
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        reg.update();
        reg.addEventListener('updatefound', () => {
          const newSW = reg.installing;
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'activated') {
              window.location.reload();
            }
          });
        });

        // Manual update button
        document.getElementById('btn-update').addEventListener('click', () => {
          reg.update().then(() => {
            caches.keys().then((keys) =>
              Promise.all(keys.map((k) => caches.delete(k)))
            ).then(() => {
              showToast('Updating…');
              setTimeout(() => window.location.reload(), 500);
            });
          });
        });
      }).catch(() => {
        // SW not available — button still clears cache
        document.getElementById('btn-update').addEventListener('click', () => {
          caches.keys().then((keys) =>
            Promise.all(keys.map((k) => caches.delete(k)))
          ).then(() => {
            showToast('Updating…');
            setTimeout(() => window.location.reload(), 500);
          });
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
