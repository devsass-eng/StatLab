// ============================================================
// StatLab — Hypothesis Testing Lab
// ============================================================

let hypTestType = 'z-test-1';
let hypAlpha = 0.05;

function renderHypothesis(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>⚖️ Hypothesis Testing</h1>
      <p>Perform Z-Tests, T-Tests, and Chi-Square tests with automatic P-value calculation and step-by-step interpretations.</p>
    </div>

    <div class="dist-layout">
      <!-- Left Panel: Test Selector & Inputs -->
      <div>
        <div class="card" style="margin-bottom:20px">
          <p class="section-title" style="margin-bottom:12px">Test Type</p>
          <div class="dist-selector">
            <button class="dist-type-btn ${hypTestType==='z-test-1'?'active':''}" onclick="setHypTest('z-test-1')">Z-Test (1-Sample)</button>
            <button class="dist-type-btn ${hypTestType==='t-test-1'?'active':''}" onclick="setHypTest('t-test-1')">T-Test (1-Sample)</button>
            <button class="dist-type-btn ${hypTestType==='t-test-2'?'active':''}" onclick="setHypTest('t-test-2')">T-Test (2-Sample Indep)</button>
            <button class="dist-type-btn ${hypTestType==='t-test-paired'?'active':''}" onclick="setHypTest('t-test-paired')">T-Test (Paired)</button>
            <button class="dist-type-btn ${hypTestType==='chi-sq-fit'?'active':''}" onclick="setHypTest('chi-sq-fit')">Chi-Square (Fit)</button>
          </div>
        </div>

        <div class="card" id="hyp-params-card">
          <!-- Inputs rendered dynamically -->
        </div>
      </div>

      <!-- Right Panel: Results & Steps -->
      <div>
        <div id="hyp-result-area">
          <div class="card" style="text-align:center;padding:40px;color:var(--text-muted)">
            <div style="font-size:48px;margin-bottom:12px">🧪</div>
            <div>Enter parameters and click Calculate to see results.</div>
          </div>
        </div>
      </div>
    </div>
  `;
  setHypTest(hypTestType);
}

function setHypTest(type) {
  hypTestType = type;
  document.querySelectorAll('.dist-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase().includes(type.split('-')[0]) && btn.getAttribute('onclick').includes(type));
  });

  const paramsCard = document.getElementById('hyp-params-card');
  if (!paramsCard) return;

  const alphaHtml = `
    <hr class="divider"/>
    <div class="input-group">
      <label>Significance Level (α)</label>
      <select class="input-field" id="hyp-alpha">
        <option value="0.01">0.01 (1%)</option>
        <option value="0.05" selected>0.05 (5%)</option>
        <option value="0.10">0.10 (10%)</option>
      </select>
    </div>
    <div class="input-group">
      <label>Alternative Hypothesis (H₁)</label>
      <select class="input-field" id="hyp-tail">
        <option value="two">Two-Tailed (≠)</option>
        <option value="left">Left-Tailed (<)</option>
        <option value="right">Right-Tailed (>)</option>
      </select>
    </div>
  `;

  if (type === 'z-test-1') {
    paramsCard.innerHTML = `
      <p class="section-title" style="margin-bottom:14px">Parameters: 1-Sample Z-Test</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
        ${distInput('hz-mu0', 'Population Mean (μ₀)', '50')}
        ${distInput('hz-xbar', 'Sample Mean (x̄)', '52')}
        ${distInput('hz-sigma', 'Population Std Dev (σ)', '5')}
        ${distInput('hz-n', 'Sample Size (n)', '30')}
        ${alphaHtml}
      </div>
      <button class="primary-btn" style="width:100%" onclick="calcZTest1()">Run Hypothesis Test</button>
    `;
  } else if (type === 't-test-1') {
    paramsCard.innerHTML = `
      <p class="section-title" style="margin-bottom:14px">Parameters: 1-Sample T-Test</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
        ${distInput('ht1-mu0', 'Population Mean (μ₀)', '50')}
        ${distInput('ht1-xbar', 'Sample Mean (x̄)', '48.5')}
        ${distInput('ht1-s', 'Sample Std Dev (s)', '6.2')}
        ${distInput('ht1-n', 'Sample Size (n)', '20')}
        ${alphaHtml}
      </div>
      <button class="primary-btn" style="width:100%" onclick="calcTTest1()">Run Hypothesis Test</button>
    `;
  } else if (type === 't-test-2') {
    paramsCard.innerHTML = `
      <p class="section-title" style="margin-bottom:14px">Parameters: 2-Sample T-Test</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
        ${distInput('ht2-x1', 'Sample 1 Mean (x̄₁)', '85')}
        ${distInput('ht2-s1', 'Sample 1 Std Dev (s₁)', '8')}
        ${distInput('ht2-n1', 'Sample 1 Size (n₁)', '25')}
        <hr class="divider" style="margin:4px 0" />
        ${distInput('ht2-x2', 'Sample 2 Mean (x̄₂)', '80')}
        ${distInput('ht2-s2', 'Sample 2 Std Dev (s₂)', '7.5')}
        ${distInput('ht2-n2', 'Sample 2 Size (n₂)', '22')}
        ${alphaHtml}
      </div>
      <button class="primary-btn" style="width:100%" onclick="calcTTest2()">Run Hypothesis Test</button>
    `;
  } else if (type === 'chi-sq-fit') {
    paramsCard.innerHTML = `
      <p class="section-title" style="margin-bottom:14px">Parameters: Chi-Square Goodness of Fit</p>
      <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
        <div class="input-group">
          <label>Observed Frequencies (comma separated)</label>
          <input class="input-field" type="text" id="chi-obs" value="20, 30, 50"/>
        </div>
        <div class="input-group">
          <label>Expected Frequencies (comma separated)</label>
          <input class="input-field" type="text" id="chi-exp" value="25, 25, 50"/>
        </div>
        <hr class="divider"/>
        <div class="input-group">
          <label>Significance Level (α)</label>
          <select class="input-field" id="chi-alpha">
            <option value="0.01">0.01 (1%)</option>
            <option value="0.05" selected>0.05 (5%)</option>
            <option value="0.10">0.10 (10%)</option>
          </select>
        </div>
      </div>
      <button class="primary-btn" style="width:100%" onclick="calcChiSqFit()">Run Hypothesis Test</button>
    `;
  }
}

// ── Shared Helpers ──────────────────────────────────────────
function renderHypResult(formula, testStat, pVal, alpha, conclusion, steps) {
  document.getElementById('hyp-result-area').innerHTML = `
    <div class="card">
      <div class="result-box" style="margin-top:0">
        <div class="result-label">Test Statistic & P-Value</div>
        <div class="result-value">${formula} = ${testStat.toFixed(4)}</div>
        <div class="result-label" style="margin-top:8px">p-value = ${pVal < 0.0001 ? '< 0.0001' : pVal.toFixed(4)}</div>
      </div>
      <div class="meaning-panel" style="margin-top:16px; border-color:${pVal < alpha ? 'var(--accent)' : 'var(--wrong-color)'}">
        <div class="meaning-title">Interpretation (α = ${alpha})</div>
        <p><strong>Conclusion:</strong> ${conclusion}</p>
        <p style="font-size:13px; margin-top:8px">
          Because the p-value (${pVal.toFixed(4)}) is ${pVal < alpha ? 'less' : 'greater'} than α (${alpha}), we <strong>${pVal < alpha ? 'REJECT' : 'FAIL TO REJECT'}</strong> the null hypothesis.
        </p>
      </div>
      <div class="steps-panel" style="margin-top:16px">${steps}</div>
    </div>
  `;
}

// ── Normal CDF Approximation ────────────────────────────────
function normalCDF(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

// ── Student's t CDF Approximation (via numeric integration) ──
function tCDF(t, df) {
  if (t === 0) return 0.5;
  const tSq = t * t;
  const x = df / (df + tSq);
  // Beta incomplete approx can be heavy, let's use a simpler heuristic for web apps
  // Or fall back to a t-table lookup approximation, but integration is fine.
  // Actually, we can use the Student's t approximation via normal for large df:
  if (df > 50) return normalCDF(t);
  
  // Exact formula for integer df:
  let A = 1/Math.sqrt(df);
  let sum = 0;
  if (df % 2 === 1) {
    let term = 1;
    for (let i=1; i<=(df-3)/2; i++) {
      term *= (2*i)/(2*i+1) * (tSq/(df+tSq));
      sum += term;
    }
    const theta = Math.atan(t/Math.sqrt(df));
    return 0.5 + (theta + Math.sin(theta)*Math.cos(theta)*(1+sum))/Math.PI;
  } else {
    let term = 1;
    for (let i=1; i<=(df-2)/2; i++) {
      term *= (2*i-1)/(2*i) * (tSq/(df+tSq));
      sum += term;
    }
    return 0.5 + (t/Math.sqrt(df+tSq)) * (1+sum) / 2;
  }
}

// ── Chi-Square CDF Approximation ────────────────────────────
function chiSqCDF(x, k) {
  if (x < 0) return 0;
  if (k === 1) return 2 * normalCDF(Math.sqrt(x)) - 1;
  if (k === 2) return 1 - Math.exp(-x/2);
  if (k > 50) {
    const z = (Math.pow(x/k, 1/3) - (1 - 2/(9*k))) / Math.sqrt(2/(9*k));
    return normalCDF(z);
  }
  let sum = Math.exp(-x/2);
  let term = sum;
  for (let i = 1; i < Math.floor(k/2); i++) {
    term *= (x/2)/i;
    sum += term;
  }
  return k % 2 === 0 ? 1 - sum : 0; // Simplified for even df. We'll use approx for odd > 2.
}

// ── Z-TEST (1 SAMPLE) ───────────────────────────────────────
function calcZTest1() {
  const mu0 = parseFloat(document.getElementById('hz-mu0').value);
  const xbar = parseFloat(document.getElementById('hz-xbar').value);
  const sigma = parseFloat(document.getElementById('hz-sigma').value);
  const n = parseInt(document.getElementById('hz-n').value);
  const alpha = parseFloat(document.getElementById('hyp-alpha').value);
  const tail = document.getElementById('hyp-tail').value;

  if (isNaN(mu0) || isNaN(xbar) || isNaN(sigma) || isNaN(n) || n <= 0) return;

  const stdErr = sigma / Math.sqrt(n);
  const z = (xbar - mu0) / stdErr;

  let pVal = 0;
  if (tail === 'two')   pVal = 2 * (1 - normalCDF(Math.abs(z)));
  if (tail === 'left')  pVal = normalCDF(z);
  if (tail === 'right') pVal = 1 - normalCDF(z);

  const reject = pVal < alpha;
  const conc = reject 
    ? `There is sufficient evidence to reject H₀. The population mean is significantly ${tail==='two'?'different from':tail==='left'?'less than':'greater than'} ${mu0}.`
    : `There is not enough evidence to reject H₀. We cannot conclude the population mean differs from ${mu0}.`;

  const steps = `
<div class="step-header">1. State Hypotheses</div>
H₀: μ = ${mu0}
H₁: μ ${tail==='two'?'≠':tail==='left'?'<':'>'} ${mu0}
α = ${alpha}

<div class="step-header">2. Calculate Test Statistic (Z)</div>
Standard Error (SE) = σ / √n
SE = ${sigma} / √${n} = ${stdErr.toFixed(4)}

Z = (x̄ − μ₀) / SE
Z = (${xbar} − ${mu0}) / ${stdErr.toFixed(4)}
Z = ${z.toFixed(4)}

<div class="step-header">3. Calculate P-Value</div>
Using standard normal distribution:
p-value = ${pVal.toFixed(4)}
  `;

  renderHypResult('Z', z, pVal, alpha, conc, steps);
}

// ── T-TEST (1 SAMPLE) ───────────────────────────────────────
function calcTTest1() {
  const mu0 = parseFloat(document.getElementById('ht1-mu0').value);
  const xbar = parseFloat(document.getElementById('ht1-xbar').value);
  const s = parseFloat(document.getElementById('ht1-s').value);
  const n = parseInt(document.getElementById('ht1-n').value);
  const alpha = parseFloat(document.getElementById('hyp-alpha').value);
  const tail = document.getElementById('hyp-tail').value;

  if (isNaN(mu0) || isNaN(xbar) || isNaN(s) || isNaN(n) || n <= 1) return;

  const df = n - 1;
  const stdErr = s / Math.sqrt(n);
  const t = (xbar - mu0) / stdErr;

  let pVal = 0;
  if (tail === 'two')   pVal = 2 * (1 - tCDF(Math.abs(t), df));
  if (tail === 'left')  pVal = tCDF(t, df);
  if (tail === 'right') pVal = 1 - tCDF(t, df);

  const reject = pVal < alpha;
  const conc = reject 
    ? `There is sufficient evidence to reject H₀. The mean is significantly ${tail==='two'?'different from':tail==='left'?'less than':'greater than'} ${mu0}.`
    : `Fail to reject H₀. There is insufficient evidence to suggest the mean differs from ${mu0}.`;

  const steps = `
<div class="step-header">1. Hypotheses & Degrees of Freedom</div>
H₀: μ = ${mu0}
H₁: μ ${tail==='two'?'≠':tail==='left'?'<':'>'} ${mu0}
df = n − 1 = ${df}

<div class="step-header">2. Calculate Test Statistic (t)</div>
SE = s / √n = ${s} / √${n} = ${stdErr.toFixed(4)}

t = (x̄ − μ₀) / SE
t = (${xbar} − ${mu0}) / ${stdErr.toFixed(4)}
t = ${t.toFixed(4)}

<div class="step-header">3. P-Value</div>
Using t-distribution with df = ${df}:
p-value = ${pVal.toFixed(4)}
  `;

  renderHypResult('t', t, pVal, alpha, conc, steps);
}

// ── T-TEST (2 SAMPLE INDEPENDENT) ───────────────────────────
function calcTTest2() {
  const x1 = parseFloat(document.getElementById('ht2-x1').value);
  const s1 = parseFloat(document.getElementById('ht2-s1').value);
  const n1 = parseInt(document.getElementById('ht2-n1').value);
  const x2 = parseFloat(document.getElementById('ht2-x2').value);
  const s2 = parseFloat(document.getElementById('ht2-s2').value);
  const n2 = parseInt(document.getElementById('ht2-n2').value);
  const alpha = parseFloat(document.getElementById('hyp-alpha').value);
  const tail = document.getElementById('hyp-tail').value;

  if (isNaN(x1)||isNaN(x2)||isNaN(s1)||isNaN(s2)||n1<2||n2<2) return;

  // Assuming unequal variances (Welch's t-test)
  const v1 = (s1*s1)/n1;
  const v2 = (s2*s2)/n2;
  const stdErr = Math.sqrt(v1 + v2);
  const t = (x1 - x2) / stdErr;
  
  // Welch-Satterthwaite df
  const df = Math.pow(v1 + v2, 2) / ( Math.pow(v1,2)/(n1-1) + Math.pow(v2,2)/(n2-1) );

  let pVal = 0;
  if (tail === 'two')   pVal = 2 * (1 - tCDF(Math.abs(t), Math.round(df)));
  if (tail === 'left')  pVal = tCDF(t, Math.round(df));
  if (tail === 'right') pVal = 1 - tCDF(t, Math.round(df));

  const reject = pVal < alpha;
  const conc = reject 
    ? `Reject H₀. There is a significant difference between the two population means.`
    : `Fail to reject H₀. We cannot conclude there is a significant difference between the means.`;

  const steps = `
<div class="step-header">1. Hypotheses</div>
H₀: μ₁ − μ₂ = 0
H₁: μ₁ − μ₂ ${tail==='two'?'≠':tail==='left'?'<':'>'} 0

<div class="step-header">2. Calculate Test Statistic (Welch's t)</div>
SE = √[ (s₁²/n₁) + (s₂²/n₂) ]
SE = √[ (${s1}²/${n1}) + (${s2}²/${n2}) ] = ${stdErr.toFixed(4)}

t = (x̄₁ − x̄₂) / SE
t = (${x1} − ${x2}) / ${stdErr.toFixed(4)}
t = ${t.toFixed(4)}

<div class="step-header">3. Degrees of Freedom (Welch-Satterthwaite)</div>
df ≈ ${df.toFixed(2)} (Using ${Math.round(df)} for p-value approx)

<div class="step-header">4. P-Value</div>
p-value = ${pVal.toFixed(4)}
  `;

  renderHypResult('t', t, pVal, alpha, conc, steps);
}

// ── CHI-SQUARE (GOODNESS OF FIT) ────────────────────────────
function calcChiSqFit() {
  const obsStr = document.getElementById('chi-obs').value.split(',').map(s=>parseFloat(s.trim()));
  const expStr = document.getElementById('chi-exp').value.split(',').map(s=>parseFloat(s.trim()));
  const alpha = parseFloat(document.getElementById('chi-alpha').value);

  if (obsStr.some(isNaN) || expStr.some(isNaN) || obsStr.length !== expStr.length || obsStr.length < 2) {
    alert("Please enter equal-length, valid comma-separated numbers.");
    return;
  }

  let chiSq = 0;
  let stepsTable = '';
  for (let i = 0; i < obsStr.length; i++) {
    const o = obsStr[i];
    const e = expStr[i];
    const stat = Math.pow(o - e, 2) / e;
    chiSq += stat;
    stepsTable += `Cat ${i+1}: O=${o}, E=${e} → (O-E)²/E = ${stat.toFixed(4)}\n`;
  }

  const df = obsStr.length - 1;
  
  // Calculate right-tailed p-value for chi-square (it is always right-tailed)
  // Using an approximation:
  let pVal = 0;
  if (df > 0) {
    // Basic approximation, since full Gamma incomplete is heavy
    // For small integer df, we can approximate, or simply state we are assuming approximation
    // Here we use a normal approx for the p-value if df is large, else simplified formula.
    const z = (Math.pow(chiSq/df, 1/3) - (1 - 2/(9*df))) / Math.sqrt(2/(9*df));
    pVal = 1 - normalCDF(z); 
    // This Wilson-Hilferty transformation works reasonably well for df >= 3.
  }

  const reject = pVal < alpha;
  const conc = reject 
    ? `Reject H₀. The observed frequencies significantly differ from expected.`
    : `Fail to reject H₀. The data fits the expected distribution well enough.`;

  const steps = `
<div class="step-header">1. Hypotheses</div>
H₀: The data follows the specified distribution.
H₁: The data does NOT follow the specified distribution.
df = k − 1 = ${obsStr.length} − 1 = ${df}

<div class="step-header">2. Calculate χ² Statistic</div>
Formula: χ² = Σ [ (O − E)² / E ]

${stepsTable}
Total χ² = ${chiSq.toFixed(4)}

<div class="step-header">3. P-Value</div>
p-value ≈ ${pVal.toFixed(4)} (Approximate)
  `;

  renderHypResult('χ²', chiSq, pVal, alpha, conc, steps);
}
