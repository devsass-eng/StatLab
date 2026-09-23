// ============================================================
// StatLab — Distribution Lab
// ============================================================

let distType = 'normal';
let distChart = null;

function renderDistributions(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>📈 Distribution Lab</h1>
      <p>Explore probability distributions with visual curves and step-by-step calculations</p>
    </div>
    <div class="dist-layout">
      <!-- Left Panel -->
      <div>
        <div class="card" style="margin-bottom:20px">
          <p class="section-title" style="margin-bottom:12px">Distribution Type</p>
          <div class="dist-selector">
            <p style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:4px">Continuous</p>
            ${[['normal','🔔 Normal'],['uniform','▬ Uniform'],['exponential','📉 Exponential'],['studentt','🎓 Student\'s t'],['chisquare','🧮 Chi-Square'],['fdist','📈 F-Dist']].map(([id,label])=>`
              <button class="dist-type-btn ${distType===id?'active':''}" onclick="switchDist('${id}')">${label} <span style="font-size:11px">${distType===id?'✓':''}</span></button>
            `).join('')}
            <hr class="divider"/>
            <p style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:4px">Discrete</p>
            ${[['binomial','🎯 Binomial'],['poisson','λ Poisson'],['geometric','📐 Geometric']].map(([id,label])=>`
              <button class="dist-type-btn ${distType===id?'active':''}" onclick="switchDist('${id}')">${label} <span style="font-size:11px">${distType===id?'✓':''}</span></button>
            `).join('')}
          </div>
        </div>
        <div class="card" id="dist-params-card">
          <!-- Parameters rendered by switchDist -->
        </div>
      </div>

      <!-- Right Panel -->
      <div>
        <div class="card" style="margin-bottom:20px">
          <div class="chart-container" style="min-height:300px">
            <canvas id="dist-chart-canvas"></canvas>
          </div>
        </div>
        <div id="dist-result-area"></div>
      </div>
    </div>
  `;
  switchDist(distType);
}

function switchDist(type) {
  distType = type;
  document.querySelectorAll('.dist-type-btn').forEach(btn => {
    const matches = btn.textContent.toLowerCase().includes(type.toLowerCase());
    btn.classList.toggle('active', matches);
    const span = btn.querySelector('span');
    if (span) span.textContent = matches ? '✓' : '';
  });

  const paramsCard = document.getElementById('dist-params-card');
  if (!paramsCard) return;

  const renderers = {
    normal:      renderNormalParams,
    uniform:     renderUniformParams,
    exponential: renderExponentialParams,
    studentt:    renderStudentTParams,
    chisquare:   renderChiSquareParams,
    fdist:       renderFDistParams,
    binomial:    renderBinomialParams,
    poisson:     renderPoissonParams,
    geometric:   renderGeometricParams,
  };
  if (renderers[type]) renderers[type](paramsCard);
}

// ── Param input helper ───────────────────────────────────────
function distInput(id, label, val, hint='') {
  return `
    <div class="input-group">
      <label for="${id}">${label}</label>
      <input class="input-field" type="number" id="${id}" value="${val}" step="any"/>
      ${hint ? `<span style="font-size:11px;color:var(--text-muted)">${hint}</span>` : ''}
    </div>
  `;
}

// ── NORMAL DISTRIBUTION ──────────────────────────────────────
function renderNormalParams(c) {
  c.innerHTML = `
    <p class="section-title" style="margin-bottom:14px">Parameters</p>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('nd-mu','μ (Mean)','0')}
      ${distInput('nd-sd','σ (Std Dev)','1','Must be > 0')}
      <hr class="divider"/>
      <p style="font-size:12px;color:var(--text-secondary)">Find probability for X:</p>
      ${distInput('nd-x','X (value)','1.5')}
      <div class="input-group">
        <label>Calculate</label>
        <select class="input-field" id="nd-dir" style="cursor:pointer">
          <option value="below">P(X ≤ x)</option>
          <option value="above">P(X ≥ x)</option>
          <option value="between">P(a ≤ X ≤ b)</option>
        </select>
      </div>
      <div id="nd-between-inputs" class="hidden">
        ${distInput('nd-xa','a (lower)','0')}
        ${distInput('nd-xb','b (upper)','2')}
      </div>
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcNormal()">Calculate & Plot</button>
  `;
  document.getElementById('nd-dir').addEventListener('change', e => {
    document.getElementById('nd-between-inputs').classList.toggle('hidden', e.target.value !== 'between');
  });
}

function calcNormal() {
  const mu = parseFloat(document.getElementById('nd-mu').value);
  const sd = parseFloat(document.getElementById('nd-sd').value);
  const x  = parseFloat(document.getElementById('nd-x').value);
  const dir = document.getElementById('nd-dir').value;
  if (isNaN(mu) || isNaN(sd) || sd <= 0) return;

  let result, formula, steps;

  if (dir === 'below') {
    const z = (x - mu) / sd;
    result = normalCDF(z);
    formula = `P(X ≤ ${x})`;
    steps = buildNormalSteps(mu, sd, x, null, 'below', z, result);
  } else if (dir === 'above') {
    const z = (x - mu) / sd;
    result = 1 - normalCDF(z);
    formula = `P(X ≥ ${x})`;
    steps = buildNormalSteps(mu, sd, x, null, 'above', z, result);
  } else {
    const xa = parseFloat(document.getElementById('nd-xa').value);
    const xb = parseFloat(document.getElementById('nd-xb').value);
    const za = (xa - mu) / sd, zb = (xb - mu) / sd;
    result = normalCDF(zb) - normalCDF(za);
    formula = `P(${xa} ≤ X ≤ ${xb})`;
    steps = buildNormalSteps(mu, sd, xa, xb, 'between', [za, zb], result);
  }

  document.getElementById('dist-result-area').innerHTML = `
    <div class="card">
      <div class="result-box" style="margin-top:0">
        <div class="result-label">${formula}</div>
        <div class="result-value">${rp4(result)} (${rp4(result*100,2)}%)</div>
      </div>
      <div class="steps-panel" style="margin-top:16px">${steps}</div>
    </div>
  `;
  drawNormalCurve(mu, sd, x, dir);
}

function buildNormalSteps(mu, sd, x, x2, dir, z, result) {
  const zVal = Array.isArray(z) ? z : [z];
  return `
<div class="step-header">Normal Distribution — Steps</div>
Parameters: μ = ${mu},  σ = ${sd}
X ~ N(${mu}, ${sd}²)

Step 1 — Standardize to Z:
Z = (X − μ) / σ
${Array.isArray(z)
  ? `Za = (${x} − ${mu}) / ${sd} = ${rp4(z[0])}\nZb = (${x2} − ${mu}) / ${sd} = ${rp4(z[1])}`
  : `Z  = (${x} − ${mu}) / ${sd} = ${rp4(z)}`
}

Step 2 — Find area using standard normal table:
${dir === 'below'   ? `P(Z < ${rp4(z)}) = Φ(${rp4(z)}) = ${rp4(result)}` :
  dir === 'above'   ? `P(Z > ${rp4(z)}) = 1 − Φ(${rp4(z)}) = ${rp4(result)}` :
  `P(${rp4(z[0])} < Z < ${rp4(z[1])}) = Φ(${rp4(z[1])}) − Φ(${rp4(z[0])}) = ${rp4(result)}`}

Result: ${rp4(result)} = ${rp4(result*100,2)}%

<div class="step-header">Interpretation</div>
${dir === 'below' ? `${rp4(result*100,2)}% of values fall at or below ${x}.` :
  dir === 'above' ? `${rp4(result*100,2)}% of values fall at or above ${x}.` :
  `${rp4(result*100,2)}% of values fall between ${x} and ${x2}.`}
  `;
}

function drawNormalCurve(mu, sd, x, dir) {
  if (distChart) { distChart.destroy(); distChart = null; }
  const canvas = document.getElementById('dist-chart-canvas');
  if (!canvas) return;

  const pts = 200;
  const xMin = mu - 4*sd, xMax = mu + 4*sd;
  const step = (xMax - xMin) / pts;
  const labels = [], dataAll = [], dataShaded = [];

  for (let i = 0; i <= pts; i++) {
    const xi = xMin + i * step;
    const y  = normalPDF(xi, mu, sd);
    labels.push(xi.toFixed(2));
    dataAll.push(y);
    let shaded = 0;
    if (dir === 'below' && xi <= x)  shaded = y;
    if (dir === 'above' && xi >= x)  shaded = y;
    dataShaded.push(shaded);
  }

  const isDark = document.body.classList.contains('dark-mode');
  const labelColor = isDark ? '#9b97c5' : '#5b5380';
  const gridColor  = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  distChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Normal Curve', data: dataAll, borderColor: '#7c6aff', borderWidth: 2,
          fill: false, pointRadius: 0, tension: 0.4 },
        { label: 'Shaded Area', data: dataShaded, borderColor: 'transparent',
          backgroundColor: 'rgba(124,106,255,0.3)', fill: true, pointRadius: 0, tension: 0.4 }
      ]
    },
    options: {
      responsive: true, animation: { duration: 600 },
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { maxTicksLimit: 9, color: labelColor }, grid: { color: gridColor } },
        y: { ticks: { color: labelColor }, grid: { color: gridColor } }
      }
    }
  });
}

function normalPDF(x, mu, sd) {
  return Math.exp(-0.5 * ((x-mu)/sd)**2) / (sd * Math.sqrt(2*Math.PI));
}

// ── BINOMIAL DISTRIBUTION ────────────────────────────────────
function renderBinomialParams(c) {
  c.innerHTML = `
    <p class="section-title" style="margin-bottom:14px">Parameters</p>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('bn-n','n (trials)','10','Number of independent trials')}
      ${distInput('bn-p','p (probability of success)','0.5','0 ≤ p ≤ 1')}
      <hr class="divider"/>
      ${distInput('bn-k','k (target successes)','3')}
      <div class="input-group">
        <label>Find</label>
        <select class="input-field" id="bn-dir" style="cursor:pointer">
          <option value="exact">P(X = k)</option>
          <option value="atmost">P(X ≤ k)</option>
          <option value="atleast">P(X ≥ k)</option>
        </select>
      </div>
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcBinomial()">Calculate & Plot</button>
  `;
}

function calcBinomial() {
  const n = parseInt(document.getElementById('bn-n').value);
  const p = parseFloat(document.getElementById('bn-p').value);
  const k = parseInt(document.getElementById('bn-k').value);
  const dir = document.getElementById('bn-dir').value;
  if (isNaN(n)||isNaN(p)||isNaN(k)||p<0||p>1||k<0||k>n) return;

  const mean = n * p;
  const variance = n * p * (1 - p);
  const sd = Math.sqrt(variance);

  let result;
  if      (dir === 'exact')  result = binomPMF(n, k, p);
  else if (dir === 'atmost') result = Array.from({length:k+1},(_,i)=>binomPMF(n,i,p)).reduce((a,b)=>a+b,0);
  else                       result = Array.from({length:n-k+1},(_,i)=>binomPMF(n,k+i,p)).reduce((a,b)=>a+b,0);

  const formula = dir==='exact' ? `P(X = ${k})` : dir==='atmost' ? `P(X ≤ ${k})` : `P(X ≥ ${k})`;

  document.getElementById('dist-result-area').innerHTML = `
    <div class="card">
      <div class="result-box" style="margin-top:0">
        <div class="result-label">${formula}</div>
        <div class="result-value">${rp4(result)} (${rp4(result*100,2)}%)</div>
      </div>
      <div class="steps-panel" style="margin-top:16px">
<div class="step-header">Binomial Distribution B(${n}, ${p})</div>
X ~ B(n=${n}, p=${p})

Mean      μ = np = ${n} × ${p} = ${rp4(mean)}
Variance  σ² = np(1−p) = ${n} × ${p} × ${rp4(1-p)} = ${rp4(variance)}
Std Dev   σ  = √${rp4(variance)} = ${rp4(sd)}

<div class="step-header">P(X = k) formula: nCk × pᵏ × (1−p)^(n−k)</div>
${dir === 'exact' ? `P(X = ${k}) = C(${n},${k}) × ${p}^${k} × ${rp4(1-p)}^${n-k}
             = ${combs(n,k)} × ${rp4(p**k)} × ${rp4((1-p)**(n-k))}
             = ${rp4(result)}` :
  dir === 'atmost' ? `P(X ≤ ${k}) = Σ P(X = i) for i = 0 to ${k}
${Array.from({length:k+1},(_,i)=>`  P(X=${i}) = ${rp4(binomPMF(n,i,p))}`).join('\n')}
Sum = ${rp4(result)}` :
  `P(X ≥ ${k}) = Σ P(X = i) for i = ${k} to ${n}
${Array.from({length:Math.min(n-k+1,8)},(_,i)=>`  P(X=${k+i}) = ${rp4(binomPMF(n,k+i,p))}`).join('\n')}${n-k>7?'\n  ...' : ''}
Sum = ${rp4(result)}`}
      </div>
    </div>
  `;
  drawDiscreteChart('binomial', n, p);
}

function combs(n, k) {
  if (k > n) return 0;
  return factorial(n) / (factorial(k) * factorial(n-k));
}

function binomPMF(n, k, p) {
  return combs(n, k) * (p**k) * ((1-p)**(n-k));
}

function drawDiscreteChart(type, param1, param2) {
  if (distChart) { distChart.destroy(); distChart = null; }
  const canvas = document.getElementById('dist-chart-canvas');
  if (!canvas) return;

  let labels = [], data = [];
  if (type === 'binomial') {
    const n = param1, p = param2;
    for (let k = 0; k <= n; k++) {
      labels.push(k);
      data.push(rp4(binomPMF(n, k, p)));
    }
  } else if (type === 'poisson') {
    const lambda = param1;
    const maxK = Math.max(20, Math.ceil(lambda + 4*Math.sqrt(lambda)));
    for (let k = 0; k <= maxK; k++) {
      labels.push(k);
      data.push(rp4(poissonPMF(lambda, k)));
    }
  } else if (type === 'geometric') {
    const p = param1;
    for (let k = 1; k <= 20; k++) {
      labels.push(k);
      data.push(rp4(geometricPMF(p, k)));
    }
  }

  const isDark = document.body.classList.contains('dark-mode');
  const labelColor = isDark ? '#9b97c5' : '#5b5380';
  const gridColor  = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  distChart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'P(X = k)',
        data,
        backgroundColor: data.map((_, i) => `hsl(${240 + i*8},65%,60%)`),
        borderRadius: 4, borderSkipped: false
      }]
    },
    options: {
      responsive: true, animation: { duration: 600 },
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: labelColor }, grid: { color: gridColor } },
        y: { ticks: { color: labelColor }, grid: { color: gridColor } }
      }
    }
  });
}

// ── POISSON DISTRIBUTION ─────────────────────────────────────
function renderPoissonParams(c) {
  c.innerHTML = `
    <p class="section-title" style="margin-bottom:14px">Parameters</p>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('po-lam','λ (average rate)','4','Average events per interval')}
      <hr class="divider"/>
      ${distInput('po-k','k (number of events)','2')}
      <div class="input-group">
        <label>Find</label>
        <select class="input-field" id="po-dir" style="cursor:pointer">
          <option value="exact">P(X = k)</option>
          <option value="atmost">P(X ≤ k)</option>
          <option value="atleast">P(X ≥ k)</option>
        </select>
      </div>
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcPoisson()">Calculate & Plot</button>
  `;
}

function poissonPMF(lambda, k) {
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

function calcPoisson() {
  const lambda = parseFloat(document.getElementById('po-lam').value);
  const k      = parseInt(document.getElementById('po-k').value);
  const dir    = document.getElementById('po-dir').value;
  if (isNaN(lambda)||isNaN(k)||lambda<=0||k<0) return;

  let result;
  if      (dir==='exact')  result = poissonPMF(lambda, k);
  else if (dir==='atmost') result = Array.from({length:k+1},(_,i)=>poissonPMF(lambda,i)).reduce((a,b)=>a+b,0);
  else                     result = 1 - Array.from({length:k},(_,i)=>poissonPMF(lambda,i)).reduce((a,b)=>a+b,0);

  const formula = dir==='exact' ? `P(X = ${k})` : dir==='atmost' ? `P(X ≤ ${k})` : `P(X ≥ ${k})`;

  document.getElementById('dist-result-area').innerHTML = `
    <div class="card">
      <div class="result-box" style="margin-top:0">
        <div class="result-label">${formula}</div>
        <div class="result-value">${rp4(result)} (${rp4(result*100,2)}%)</div>
      </div>
      <div class="steps-panel" style="margin-top:16px">
<div class="step-header">Poisson Distribution Po(λ = ${lambda})</div>
X ~ Po(λ = ${lambda})

Mean     μ = λ = ${lambda}
Variance σ² = λ = ${lambda}
Std Dev  σ  = √${lambda} = ${rp4(Math.sqrt(lambda))}

<div class="step-header">Formula: P(X = k) = (e^−λ × λᵏ) / k!</div>
P(X = ${k}) = (e^−${lambda} × ${lambda}^${k}) / ${k}!
           = ${rp4(Math.exp(-lambda))} × ${rp4(Math.pow(lambda,k))} / ${factorial(k)}
           = ${rp4(poissonPMF(lambda,k))}

${dir !== 'exact' ? `${formula} = ${rp4(result)}` : ''}
      </div>
    </div>
  `;
  drawDiscreteChart('poisson', lambda, null);
}

// ── GEOMETRIC DISTRIBUTION ───────────────────────────────────
function renderGeometricParams(c) {
  c.innerHTML = `
    <p class="section-title" style="margin-bottom:14px">Parameters</p>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('geo-p','p (probability of success)','0.3','0 < p ≤ 1')}
      <hr class="divider"/>
      ${distInput('geo-k','k (trial of first success)','3','k ≥ 1')}
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcGeometric()">Calculate & Plot</button>
  `;
}

function geometricPMF(p, k) { return Math.pow(1-p, k-1) * p; }

function calcGeometric() {
  const p = parseFloat(document.getElementById('geo-p').value);
  const k = parseInt(document.getElementById('geo-k').value);
  if (isNaN(p)||isNaN(k)||p<=0||p>1||k<1) return;
  const result = geometricPMF(p, k);
  const mean = 1/p, variance = (1-p)/(p**2);

  document.getElementById('dist-result-area').innerHTML = `
    <div class="card">
      <div class="result-box" style="margin-top:0">
        <div class="result-label">P(X = ${k})</div>
        <div class="result-value">${rp4(result)} (${rp4(result*100,2)}%)</div>
      </div>
      <div class="steps-panel" style="margin-top:16px">
<div class="step-header">Geometric Distribution Geo(p = ${p})</div>
X ~ Geo(p = ${p})

Mean     μ = 1/p = 1/${p} = ${rp4(mean)}
Variance σ² = (1−p)/p² = ${rp4(1-p)}/${rp4(p**2)} = ${rp4(variance)}

<div class="step-header">Formula: P(X = k) = (1−p)^(k−1) × p</div>
P(X = ${k}) = (1 − ${p})^${k-1} × ${p}
           = ${rp4((1-p)**(k-1))} × ${p}
           = ${rp4(result)}

<div class="step-header">Interpretation</div>
The probability that the FIRST success occurs on trial ${k} is ${rp4(result*100,2)}%.
On average, success occurs after ${rp4(mean)} trials.
      </div>
    </div>
  `;
  drawDiscreteChart('geometric', p, null);
}

// ── UNIFORM DISTRIBUTION ─────────────────────────────────────
function renderUniformParams(c) {
  c.innerHTML = `
    <p class="section-title" style="margin-bottom:14px">Parameters</p>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('un-a','a (minimum)','0')}
      ${distInput('un-b','b (maximum)','10')}
      <hr class="divider"/>
      ${distInput('un-x1','Find P(X ≤ x) — x','5')}
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcUniform()">Calculate & Plot</button>
  `;
}

function calcUniform() {
  const a  = parseFloat(document.getElementById('un-a').value);
  const b  = parseFloat(document.getElementById('un-b').value);
  const x1 = parseFloat(document.getElementById('un-x1').value);
  if (isNaN(a)||isNaN(b)||b<=a) return;
  const range = b - a;
  const height = 1 / range;
  const mean = (a+b)/2, variance = (b-a)**2/12;
  const prob = Math.min(Math.max((x1-a)/range, 0), 1);

  document.getElementById('dist-result-area').innerHTML = `
    <div class="card">
      <div class="result-box" style="margin-top:0">
        <div class="result-label">P(X ≤ ${x1})</div>
        <div class="result-value">${rp4(prob)} (${rp4(prob*100,2)}%)</div>
      </div>
      <div class="steps-panel" style="margin-top:16px">
<div class="step-header">Uniform Distribution U(${a}, ${b})</div>
X ~ U(a=${a}, b=${b})

PDF height  f(x) = 1/(b−a) = 1/${range} = ${rp4(height)}
Mean        μ = (a+b)/2 = ${rp4(mean)}
Variance    σ² = (b−a)²/12 = ${rp4(variance)}
Std Dev     σ = ${rp4(Math.sqrt(variance))}

<div class="step-header">P(X ≤ ${x1})</div>
= (x − a) / (b − a)
= (${x1} − ${a}) / (${b} − ${a})
= ${rp4(x1-a)} / ${range}
= ${rp4(prob)}
      </div>
    </div>
  `;

  if (distChart) { distChart.destroy(); distChart = null; }
  const canvas = document.getElementById('dist-chart-canvas');
  if (!canvas) return;
  const isDark = document.body.classList.contains('dark-mode');
  const labelColor = isDark ? '#9b97c5' : '#5b5380';
  const pts = [a, x1, b];
  distChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: [a, x1, b].map(v => v.toFixed(2)),
      datasets: [
        { label: 'f(x)', data: [height, height, height], borderColor:'#7c6aff', borderWidth:2,
          fill: false, pointRadius: 4 },
        { label: 'Shaded', data: [height, height, 0],
          backgroundColor:'rgba(124,106,255,0.25)', fill:true,
          borderColor:'transparent', pointRadius:0 }
      ]
    },
    options: { responsive: true, plugins: { legend: { display: false } },
      scales: { x: { ticks: { color: labelColor } }, y: { ticks: { color: labelColor } } } }
  });
}

// ── EXPONENTIAL DISTRIBUTION ─────────────────────────────────
function renderExponentialParams(c) {
  c.innerHTML = `
    <p class="section-title" style="margin-bottom:14px">Parameters</p>
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('ex-lam','λ (rate parameter)','1','λ > 0')}
      <hr class="divider"/>
      ${distInput('ex-x','Find P(X ≤ x) — x','2')}
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcExponential()">Calculate & Plot</button>
  `;
}

function calcExponential() {
  const lambda = parseFloat(document.getElementById('ex-lam').value);
  const x = parseFloat(document.getElementById('ex-x').value);
  if (isNaN(lambda)||lambda<=0||isNaN(x)||x<0) return;
  const prob = 1 - Math.exp(-lambda * x);
  const mean = 1/lambda, variance = 1/(lambda**2);

  document.getElementById('dist-result-area').innerHTML = `
    <div class="card">
      <div class="result-box" style="margin-top:0">
        <div class="result-label">P(X ≤ ${x})</div>
        <div class="result-value">${rp4(prob)} (${rp4(prob*100,2)}%)</div>
      </div>
      <div class="steps-panel" style="margin-top:16px">
<div class="step-header">Exponential Distribution Exp(λ = ${lambda})</div>
X ~ Exp(λ = ${lambda})

Mean     μ = 1/λ = ${rp4(mean)}
Variance σ² = 1/λ² = ${rp4(variance)}

<div class="step-header">P(X ≤ x) = 1 − e^(−λx)</div>
= 1 − e^(−${lambda} × ${x})
= 1 − e^(${rp4(-lambda*x)})
= 1 − ${rp4(Math.exp(-lambda*x))}
= ${rp4(prob)}
      </div>
    </div>
  `;

  if (distChart) { distChart.destroy(); distChart = null; }
  const canvas = document.getElementById('dist-chart-canvas');
  if (!canvas) return;
  const xMax = Math.max(x*2, mean*4);
  const step = xMax/100;
  const labels = [], dataAll = [], dataShaded = [];
  for (let i = 0; i <= 100; i++) {
    const xi = i * step;
    const y = lambda * Math.exp(-lambda*xi);
    labels.push(xi.toFixed(2));
    dataAll.push(y);
    dataShaded.push(xi <= x ? y : 0);
  }
  const isDark = document.body.classList.contains('dark-mode');
  const labelColor = isDark ? '#9b97c5' : '#5b5380';
  distChart = new Chart(canvas, {
    type:'line',
    data: { labels, datasets:[
      { data:dataAll, borderColor:'#7c6aff', borderWidth:2, fill:false, pointRadius:0, tension:0.4 },
      { data:dataShaded, backgroundColor:'rgba(124,106,255,0.3)', fill:true, borderColor:'transparent', pointRadius:0, tension:0.4 }
    ]},
    options:{ responsive:true, plugins:{legend:{display:false}},
      scales:{x:{ticks:{color:labelColor,maxTicksLimit:8}},y:{ticks:{color:labelColor}}} }
  });
}

function rp4(n, d=4) { return isNaN(n) ? 'N/A' : parseFloat(n.toFixed(d)); }

// ============================================================
// Advanced Continuous Distributions
// ============================================================

// --- Student's t Distribution ---
function renderStudentTParams(card) {
  card.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('dist-t-df', 'Degrees of Freedom (df)', '10')}
      ${distInput('dist-t-x', 'Value (t)', '1.812')}
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcStudentT()">Calculate P(T ≤ t)</button>
  `;
}
function calcStudentT() {
  const df = parseFloat(document.getElementById('dist-t-df').value);
  const t = parseFloat(document.getElementById('dist-t-x').value);
  if (isNaN(df) || isNaN(t) || df <= 0) return;

  // We'll reuse the numeric tCDF from hypothesis.js if available, or mathjs approximation
  const p = window.tCDF ? tCDF(t, df) : 0.5; // fallback
  
  const mean = df > 1 ? 0 : 'Undefined';
  const var_ = df > 2 ? df / (df - 2) : (df > 1 ? 'Infinite' : 'Undefined');

  document.getElementById('dist-result-area').innerHTML = \`
    <div class="card">
      <div class="result-box" style="margin-top:0"><div class="result-label">P(T ≤ t)</div><div class="result-value">\${rp4(p)}</div></div>
      <div class="result-box" style="margin-top:12px;background:var(--bg-lighter)"><div class="result-label">P(T > t)</div><div class="result-value">\${rp4(1-p)}</div></div>
      <div class="result-box" style="margin-top:12px;background:var(--bg-lighter)"><div class="result-label">Mean (μ)</div><div class="result-value">\${mean}</div></div>
      <div class="result-box" style="margin-top:12px;background:var(--bg-lighter)"><div class="result-label">Variance (σ²)</div><div class="result-value">\${typeof var_ === 'number' ? rp4(var_) : var_}</div></div>
    </div>
  \`;
  
  // Dummy chart drawing for t-dist (looks like normal)
  drawDistNormalChart(0, typeof var_ === 'number' ? Math.sqrt(var_) : 1.5, t);
}

// --- Chi-Square Distribution ---
function renderChiSquareParams(card) {
  card.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('dist-chi-df', 'Degrees of Freedom (k)', '5')}
      ${distInput('dist-chi-x', 'Value (x)', '11.07')}
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcChiSquare()">Calculate P(X ≤ x)</button>
  `;
}
function calcChiSquare() {
  const k = parseFloat(document.getElementById('dist-chi-df').value);
  const x = parseFloat(document.getElementById('dist-chi-x').value);
  if (isNaN(k) || isNaN(x) || k <= 0) return;

  const p = window.chiSqCDF ? chiSqCDF(x, k) : 0; 

  document.getElementById('dist-result-area').innerHTML = \`
    <div class="card">
      <div class="result-box" style="margin-top:0"><div class="result-label">P(X ≤ x)</div><div class="result-value">\${rp4(p)}</div></div>
      <div class="result-box" style="margin-top:12px;background:var(--bg-lighter)"><div class="result-label">P(X > x)</div><div class="result-value">\${rp4(1-p)}</div></div>
      <div class="result-box" style="margin-top:12px;background:var(--bg-lighter)"><div class="result-label">Mean (μ)</div><div class="result-value">\${k}</div></div>
      <div class="result-box" style="margin-top:12px;background:var(--bg-lighter)"><div class="result-label">Variance (σ²)</div><div class="result-value">\${k * 2}</div></div>
    </div>
  \`;
}

// --- F-Distribution ---
function renderFDistParams(card) {
  card.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
      ${distInput('dist-f-d1', 'Degrees of Freedom 1 (d₁)', '5')}
      ${distInput('dist-f-d2', 'Degrees of Freedom 2 (d₂)', '10')}
      ${distInput('dist-f-x', 'Value (x)', '3.33')}
    </div>
    <button class="primary-btn" style="width:100%" onclick="calcFDist()">Calculate P(X ≤ x)</button>
  `;
}
function calcFDist() {
  const d1 = parseFloat(document.getElementById('dist-f-d1').value);
  const d2 = parseFloat(document.getElementById('dist-f-d2').value);
  const x = parseFloat(document.getElementById('dist-f-x').value);
  if (isNaN(d1) || isNaN(d2) || isNaN(x) || d1 <= 0 || d2 <= 0) return;

  // Placeholder for F-dist p-value since exact requires incomplete beta function
  const p = "Requires Beta Incomp."; 
  const mean = d2 > 2 ? d2 / (d2 - 2) : 'Undefined';

  document.getElementById('dist-result-area').innerHTML = \`
    <div class="card">
      <div class="result-box" style="margin-top:0"><div class="result-label">Mean (μ)</div><div class="result-value">\${mean}</div></div>
      <p style="margin-top:12px;font-size:13px;color:var(--text-muted)"><em>Note: Exact F-Distribution CDF calculation requires complex integration not yet fully bundled offline.</em></p>
    </div>
  \`;
}

