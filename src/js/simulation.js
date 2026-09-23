// ============================================================
// StatLab — Simulation Mode
// ============================================================

let simRunning = false;
let simChart = null;
let simType = 'coin';
let simResults = {};

function renderSimulation(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>🧪 Simulation Mode</h1>
      <p>Run probability experiments and watch experimental results converge to theoretical values</p>
    </div>
    <div class="sim-layout">
      <!-- Controls -->
      <div>
        <div class="card" style="margin-bottom:20px">
          <p class="section-title" style="margin-bottom:14px">Experiment Type</p>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
            <button class="dist-type-btn ${simType==='coin'?'active':''}" onclick="setSimType('coin')">🪙 Coin Flip</button>
            <button class="dist-type-btn ${simType==='dice'?'active':''}" onclick="setSimType('dice')">🎲 Dice Roll</button>
            <button class="dist-type-btn ${simType==='custom'?'active':''}" onclick="setSimType('custom')">⚙️ Custom Event</button>
          </div>

          <div id="sim-params"><!-- rendered by setSimType --></div>
        </div>

        <div class="card">
          <p class="section-title" style="margin-bottom:14px">Number of Trials</p>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
            ${[10, 100, 1000, 10000, 100000].map(n=>`
              <button class="secondary-btn" onclick="runSimulation(${n})" style="text-align:left">
                ${n.toLocaleString()} trials
              </button>
            `).join('')}
          </div>
          <button class="danger-btn" onclick="resetSim()" style="
            background:rgba(255,94,122,0.1);border:1px solid var(--wrong-color);
            border-radius:10px;color:var(--wrong-color);padding:10px;
            width:100%;cursor:pointer;font-family:Inter,sans-serif;font-weight:600;font-size:13px">
            Reset
          </button>
        </div>
      </div>

      <!-- Results -->
      <div>
        <div class="card" style="margin-bottom:20px">
          <div id="sim-results-display">
            <div style="text-align:center;padding:40px 0;color:var(--text-muted)">
              <div style="font-size:48px;margin-bottom:12px">🎯</div>
              <div>Select an experiment and number of trials to begin</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="chart-container" style="min-height:280px">
            <canvas id="sim-chart-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
  setSimType(simType);
}

function setSimType(type) {
  simType = type;
  simResults = {};
  document.querySelectorAll('.dist-type-btn').forEach(btn => {
    btn.classList.toggle('active',
      (type==='coin'   && btn.textContent.includes('Coin')) ||
      (type==='dice'   && btn.textContent.includes('Dice')) ||
      (type==='custom' && btn.textContent.includes('Custom'))
    );
  });
  const params = document.getElementById('sim-params');
  if (!params) return;

  if (type === 'coin') {
    params.innerHTML = `
      <p class="section-title" style="margin-bottom:10px">Theoretical Probability</p>
      <div class="sim-result-grid">
        <div class="sim-result-card"><div class="label">P(Heads)</div><div class="value">0.5</div><div class="pct">50%</div></div>
        <div class="sim-result-card"><div class="label">P(Tails)</div><div class="value">0.5</div><div class="pct">50%</div></div>
      </div>
    `;
  } else if (type === 'dice') {
    params.innerHTML = `
      <p class="section-title" style="margin-bottom:10px">Theoretical Probability</p>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        ${[1,2,3,4,5,6].map(n=>`
          <div class="sim-result-card"><div class="label">P(${n})</div><div class="value">1/6</div><div class="pct">16.67%</div></div>
        `).join('')}
      </div>
    `;
  } else {
    params.innerHTML = `
      <p class="section-title" style="margin-bottom:10px">Custom Event</p>
      <div class="input-group" style="margin-bottom:12px">
        <label>P(success) — Theoretical</label>
        <input class="input-field" type="number" id="sim-custom-p" value="0.3" min="0" max="1" step="0.01"/>
      </div>
    `;
  }
}

function runSimulation(n) {
  const display = document.getElementById('sim-results-display');
  if (!display) return;

  let results;
  if (simType === 'coin') {
    results = simulateCoin(n);
    renderCoinResults(display, results, n);
    drawSimChart('coin', results, n);
  } else if (simType === 'dice') {
    results = simulateDice(n);
    renderDiceResults(display, results, n);
    drawSimChart('dice', results, n);
  } else {
    const p = parseFloat(document.getElementById('sim-custom-p').value);
    if (isNaN(p)||p<0||p>1) return;
    results = simulateCustom(n, p);
    renderCustomResults(display, results, n, p);
    drawSimChart('custom', results, n, p);
  }
}

// ── Coin Simulation ──────────────────────────────────────────
function simulateCoin(n) {
  let heads = 0, tails = 0;
  for (let i = 0; i < n; i++) {
    if (Math.random() < 0.5) heads++; else tails++;
  }
  return { heads, tails };
}

function renderCoinResults(container, r, n) {
  const pH = (r.heads/n), pT = (r.tails/n);
  container.innerHTML = `
    <div style="text-align:center;margin-bottom:16px">
      <div class="sim-counter">${n.toLocaleString()}</div>
      <div style="color:var(--text-secondary);font-size:13px">trials completed</div>
    </div>
    <div class="sim-result-grid">
      <div class="sim-result-card">
        <div class="label">🪙 Heads</div>
        <div class="value">${r.heads.toLocaleString()}</div>
        <div class="pct">${(pH*100).toFixed(2)}%</div>
      </div>
      <div class="sim-result-card">
        <div class="label">🪙 Tails</div>
        <div class="value">${r.tails.toLocaleString()}</div>
        <div class="pct">${(pT*100).toFixed(2)}%</div>
      </div>
    </div>
    <div class="meaning-panel" style="margin-top:16px">
      <div class="meaning-title">📊 Experimental vs Theoretical</div>
      <p>Theoretical: P(Heads) = <strong>0.5000 (50%)</strong></p>
      <p>Experimental: P(Heads) = <strong>${pH.toFixed(4)} (${(pH*100).toFixed(2)}%)</strong></p>
      <p style="margin-top:8px;font-size:13px">
        Difference: ${Math.abs(pH - 0.5).toFixed(4)}
        ${Math.abs(pH-0.5) < 0.01 ? ' — Very close! Law of Large Numbers in action.' :
          Math.abs(pH-0.5) < 0.05 ? ' — Reasonably close. Try more trials!' :
          ' — Try more trials to converge to the theoretical value.'}
      </p>
    </div>
  `;
}

// ── Dice Simulation ──────────────────────────────────────────
function simulateDice(n) {
  const counts = {1:0,2:0,3:0,4:0,5:0,6:0};
  for (let i=0; i<n; i++) counts[Math.ceil(Math.random()*6)]++;
  return counts;
}

function renderDiceResults(container, r, n) {
  container.innerHTML = `
    <div style="text-align:center;margin-bottom:16px">
      <div class="sim-counter">${n.toLocaleString()}</div>
      <div style="color:var(--text-secondary);font-size:13px">dice rolls</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px">
      ${[1,2,3,4,5,6].map(face => `
        <div class="sim-result-card">
          <div class="label">Face ${face}</div>
          <div class="value">${r[face].toLocaleString()}</div>
          <div class="pct">${(r[face]/n*100).toFixed(2)}%</div>
        </div>
      `).join('')}
    </div>
    <div class="meaning-panel">
      <div class="meaning-title">📊 Theoretical vs Experimental</div>
      <p>Theoretical P(any face) = <strong>1/6 ≈ 16.67%</strong></p>
      ${[1,2,3,4,5,6].map(face => `
        <p>Face ${face}: ${(r[face]/n*100).toFixed(2)}% (diff: ${Math.abs(r[face]/n - 1/6).toFixed(4)})</p>
      `).join('')}
    </div>
  `;
}

// ── Custom Event Simulation ──────────────────────────────────
function simulateCustom(n, p) {
  let success = 0;
  for (let i=0; i<n; i++) if (Math.random() < p) success++;
  return { success, failure: n - success };
}

function renderCustomResults(container, r, n, p) {
  const pExp = r.success/n;
  container.innerHTML = `
    <div style="text-align:center;margin-bottom:16px">
      <div class="sim-counter">${n.toLocaleString()}</div>
      <div style="color:var(--text-secondary);font-size:13px">trials</div>
    </div>
    <div class="sim-result-grid">
      <div class="sim-result-card">
        <div class="label">✅ Successes</div>
        <div class="value">${r.success.toLocaleString()}</div>
        <div class="pct">${(pExp*100).toFixed(2)}%</div>
      </div>
      <div class="sim-result-card">
        <div class="label">❌ Failures</div>
        <div class="value">${r.failure.toLocaleString()}</div>
        <div class="pct">${((1-pExp)*100).toFixed(2)}%</div>
      </div>
    </div>
    <div class="meaning-panel" style="margin-top:16px">
      <div class="meaning-title">📊 Experimental vs Theoretical</div>
      <p>Theoretical: P(success) = <strong>${p} (${(p*100).toFixed(2)}%)</strong></p>
      <p>Experimental: P(success) = <strong>${pExp.toFixed(4)} (${(pExp*100).toFixed(2)}%)</strong></p>
      <p style="margin-top:8px;font-size:13px">Difference: ${Math.abs(pExp-p).toFixed(4)}</p>
    </div>
  `;
}

// ── Sim Chart ────────────────────────────────────────────────
function drawSimChart(type, results, n, p) {
  if (simChart) { simChart.destroy(); simChart = null; }
  const canvas = document.getElementById('sim-chart-canvas');
  if (!canvas) return;

  const isDark = document.body.classList.contains('dark-mode');
  const labelColor = isDark ? '#9b97c5' : '#5b5380';
  const gridColor  = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  let labels, expData, theoData;

  if (type === 'coin') {
    labels = ['Heads','Tails'];
    expData  = [results.heads/n, results.tails/n];
    theoData = [0.5, 0.5];
  } else if (type === 'dice') {
    labels = ['1','2','3','4','5','6'];
    expData  = labels.map(l => results[l]/n);
    theoData = labels.map(() => 1/6);
  } else {
    labels = ['Success','Failure'];
    expData  = [results.success/n, results.failure/n];
    theoData = [p, 1-p];
  }

  simChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Experimental', data: expData,
          backgroundColor: 'rgba(124,106,255,0.7)', borderRadius: 6, borderSkipped: false },
        { label: 'Theoretical',  data: theoData,
          backgroundColor: 'rgba(0,210,180,0.5)',   borderRadius: 6, borderSkipped: false },
      ]
    },
    options: {
      responsive: true, animation: { duration: 800 },
      plugins: { legend: { labels: { color: labelColor } } },
      scales: {
        x: { ticks: { color: labelColor }, grid: { color: gridColor } },
        y: { ticks: { color: labelColor, callback: v => (v*100).toFixed(1)+'%' },
             grid: { color: gridColor }, max: 1 }
      }
    }
  });
}

function resetSim() {
  simResults = {};
  const display = document.getElementById('sim-results-display');
  if (display) display.innerHTML = `
    <div style="text-align:center;padding:40px 0;color:var(--text-muted)">
      <div style="font-size:48px;margin-bottom:12px">🎯</div>
      <div>Simulation reset. Select trials to run.</div>
    </div>
  `;
  if (simChart) { simChart.destroy(); simChart = null; }
}
