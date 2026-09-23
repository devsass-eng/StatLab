// ============================================================
// StatLab — Probability Calculator (Complete Rebuild)
// ============================================================

let probCategory = 'basic';
let probTool = 'pa';

const PROB_CATEGORIES = [
  { id: 'basic',       icon: '⚡', label: 'Basic Probability' },
  { id: 'conditional', icon: '🔗', label: 'Conditional' },
  { id: 'bayes',       icon: '🧠', label: "Bayes' Theorem" },
  { id: 'permcomb',    icon: '🔢', label: 'Perm & Comb' },
  { id: 'randvar',     icon: '🎯', label: 'Random Variables' },
  { id: 'expected',    icon: '📊', label: 'Expected Value' },
  { id: 'variance',    icon: '📐', label: 'Variance & SD' },
  { id: 'binomial',    icon: '🎲', label: 'Binomial' },
  { id: 'poisson',     icon: 'λ',  label: 'Poisson' },
  { id: 'normal',      icon: '🔔', label: 'Normal Dist.' },
  { id: 'joint',       icon: '🔀', label: 'Joint Dist.' },
  { id: 'clt',         icon: '📉', label: 'Central Limit' },
  { id: 'urn',         icon: '📦', label: 'Ball & Urn' },
];

const PROB_TOOLS = {
  basic:       [
    { id: 'pa',    label: 'P(A) — Basic Probability' },
    { id: 'pac',   label: "P(A') — Complement" },
    { id: 'paub',  label: 'P(A ∪ B) — Union' },
    { id: 'panb',  label: 'P(A ∩ B) — Intersection' },
  ],
  conditional: [
    { id: 'pab',   label: 'P(A | B) — Conditional' },
    { id: 'pba',   label: 'P(B | A) — Conditional' },
    { id: 'indep', label: 'Independence Test' },
  ],
  bayes:       [
    { id: 'bayes1', label: 'Bayes — P(A | B)' },
    { id: 'bayes2', label: 'Bayes — Multiple Hypotheses' },
  ],
  permcomb:    [
    { id: 'ncr',   label: 'nCr — Combinations' },
    { id: 'npr',   label: 'nPr — Permutations' },
    { id: 'arrangements', label: 'Arrangements with Repeats' },
  ],
  randvar:     [
    { id: 'rv_dist',    label: 'Probability Distribution Table' },
    { id: 'rv_eq',      label: 'P(X = x)' },
    { id: 'rv_leq',     label: 'P(X ≤ x)' },
    { id: 'rv_gt',      label: 'P(X > x)' },
    { id: 'rv_missing', label: 'Find Missing Probability' },
  ],
  expected:    [
    { id: 'ex',    label: 'E(X) — Expected Value' },
    { id: 'ex2',   label: 'E(X²)' },
    { id: 'egx',   label: 'E[g(X)] — Function' },
  ],
  variance:    [
    { id: 'varx',  label: 'Var(X) and SD(X)' },
  ],
  binomial:    [
    { id: 'bin_eq',  label: 'P(X = x)' },
    { id: 'bin_leq', label: 'P(X ≤ x)' },
    { id: 'bin_geq', label: 'P(X ≥ x)' },
    { id: 'bin_stats', label: 'Mean, Variance, SD' },
  ],
  poisson:     [
    { id: 'poi_eq',  label: 'P(X = x)' },
    { id: 'poi_leq', label: 'P(X ≤ x)' },
    { id: 'poi_geq', label: 'P(X ≥ x)' },
    { id: 'poi_stats', label: 'Mean & Variance' },
  ],
  normal:      [
    { id: 'norm_z',    label: 'Convert X to Z-score' },
    { id: 'norm_lt',   label: 'P(X < x)' },
    { id: 'norm_gt',   label: 'P(X > x)' },
    { id: 'norm_bet',  label: 'P(a < X < b)' },
    { id: 'norm_inv',  label: 'Find X from Probability' },
  ],
  joint:       [
    { id: 'joint_prob',  label: 'Joint Probability Table' },
    { id: 'joint_marginal', label: 'Marginal Distributions' },
    { id: 'joint_cov',   label: 'Covariance & Correlation' },
  ],
  clt:         [
    { id: 'clt_se',    label: 'Standard Error' },
    { id: 'clt_lt',    label: 'P(X̄ < x)' },
    { id: 'clt_gt',    label: 'P(X̄ > x)' },
    { id: 'clt_bet',   label: 'P(a < X̄ < b)' },
  ],
  urn:         [
    { id: 'urn_main', label: 'Ball & Urn Solver' },
  ],
};

// ── Main Render ─────────────────────────────────────────────
function renderProbability(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>🎲 Probability Calculator</h1>
      <p>Select a category, then choose your calculation. Get instant results with step-by-step working.</p>
    </div>
    
    <div class="prob-category-grid" id="prob-cat-grid"></div>
    <div class="prob-tools-bar" id="prob-tools-bar"></div>
    <div id="prob-calc-area" style="margin-top:20px"></div>
  `;
  renderProbCategoryGrid();
  switchProbCategory(probCategory);
}

function renderProbCategoryGrid() {
  const grid = document.getElementById('prob-cat-grid');
  if (!grid) return;
  grid.innerHTML = PROB_CATEGORIES.map(cat => `
    <button class="prob-cat-btn ${probCategory === cat.id ? 'active' : ''}"
      onclick="switchProbCategory('${cat.id}')">
      <span class="prob-cat-icon">${cat.icon}</span>
      <span class="prob-cat-label">${cat.label}</span>
    </button>
  `).join('');
}

function switchProbCategory(catId) {
  probCategory = catId;
  renderProbCategoryGrid();

  const tools = PROB_TOOLS[catId] || [];
  const bar = document.getElementById('prob-tools-bar');
  if (!bar) return;

  if (tools.length === 0) {
    bar.innerHTML = '';
    renderProbTool(catId + '_main');
    return;
  }

  bar.innerHTML = `
    <div class="card" style="padding:12px 16px; margin-bottom:16px">
      <div style="display:flex; flex-wrap:wrap; gap:8px">
        ${tools.map(t => `
          <button class="prob-tool-chip ${probTool === t.id ? 'active' : ''}"
            onclick="renderProbTool('${t.id}')">
            ${t.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  // Default to first tool in category
  const firstTool = tools[0].id;
  probTool = firstTool;
  renderProbTool(firstTool);
  // Update chips after render
  bar.querySelectorAll('.prob-tool-chip').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === (tools.find(t=>t.id===firstTool)||{}).label);
  });
}

function renderProbTool(toolId) {
  probTool = toolId;
  // Update chip active states
  document.querySelectorAll('.prob-tool-chip').forEach(btn => {
    const tools = PROB_TOOLS[probCategory] || [];
    const tool = tools.find(t => t.id === toolId);
    btn.classList.toggle('active', tool && btn.textContent.trim() === tool.label);
  });
  
  const area = document.getElementById('prob-calc-area');
  if (!area) return;
  
  const renderers = {
    // Basic
    pa:        renderPA,
    pac:       renderPAC,
    paub:      renderPAUB,
    panb:      renderPANB,
    // Conditional
    pab:       renderPAB,
    pba:       renderPBA,
    indep:     renderIndep,
    // Bayes
    bayes1:    renderBayes1,
    bayes2:    renderBayes2,
    // Perm/Comb
    ncr:       renderNCR2,
    npr:       renderNPR2,
    arrangements: renderArrangements,
    // Random Variable
    rv_dist:   renderRVDist,
    rv_eq:     renderRVEq,
    rv_leq:    renderRVLeq,
    rv_gt:     renderRVGt,
    rv_missing: renderRVMissing,
    // Expected
    ex:        renderEX,
    ex2:       renderEX2,
    egx:       renderEGX,
    // Variance
    varx:      renderVarX,
    // Binomial
    bin_eq:    renderBinEq,
    bin_leq:   renderBinLeq,
    bin_geq:   renderBinGeq,
    bin_stats: renderBinStats,
    // Poisson
    poi_eq:    renderPoiEq,
    poi_leq:   renderPoiLeq,
    poi_geq:   renderPoiGeq,
    poi_stats: renderPoiStats,
    // Normal
    norm_z:    renderNormZ,
    norm_lt:   renderNormLt,
    norm_gt:   renderNormGt,
    norm_bet:  renderNormBet,
    norm_inv:  renderNormInv,
    // Joint
    joint_prob:     renderJointProb,
    joint_marginal: renderJointMarginal,
    joint_cov:      renderJointCov,
    // CLT
    clt_se:    renderCLTSE,
    clt_lt:    renderCLTLt,
    clt_gt:    renderCLTGt,
    clt_bet:   renderCLTBet,
    // Urn
    urn_main:  renderUrnSolver,
  };
  if (renderers[toolId]) renderers[toolId](area);
}

// ── Shared Helpers ───────────────────────────────────────────
function pRound(n, d=4) { return isNaN(n) ? 'N/A' : parseFloat(n.toFixed(d)); }
function pPct(n) { return (n*100).toFixed(2) + '%'; }

function numInput(id, label, val='', min='', step='any') {
  return `<div class="input-group">
    <label>${label}</label>
    <input class="input-field" type="number" id="${id}" value="${val}" step="${step}" ${min!==''?'min="'+min+'"':''} />
  </div>`;
}

function calcPanel(title, icon, inputs, btnLabel, onCalc) {
  return `
    <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:20px; align-items:start">
      <div class="card">
        <h4 style="margin-bottom:16px; color:var(--accent)">${icon} ${title}</h4>
        ${inputs}
        <button class="primary-btn" style="width:100%;margin-top:16px" onclick="${onCalc}()">${btnLabel}</button>
      </div>
      <div id="prob-result-panel">
        <div class="card" style="text-align:center; padding:40px; color:var(--text-muted)">
          <div style="font-size:40px;margin-bottom:12px">🎲</div>
          Enter values and click Calculate
        </div>
      </div>
    </div>
  `;
}

function showResult(html) {
  const el = document.getElementById('prob-result-panel');
  if (el) el.innerHTML = html;
}

function resultCard(label, value, steps='', pct=true) {
  return `<div class="card">
    <div class="result-box" style="margin-top:0">
      <div class="result-label">${label}</div>
      <div class="result-value">${value}</div>
      ${pct && typeof value === 'number' ? `<div style="color:var(--text-muted);font-size:13px;margin-top:4px">${pPct(value)}</div>` : ''}
    </div>
    ${steps ? `<div class="steps-panel" style="margin-top:16px">${steps}</div>` : ''}
  </div>`;
}

// ── Normal CDF ───────────────────────────────────────────────
function normalCDF(z) {
  const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429, p=0.3275911;
  const sign = z < 0 ? -1 : 1;
  z = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + p * z);
  const y = 1 - ((((a5*t+a4)*t+a3)*t+a2)*t+a1)*t*Math.exp(-z*z);
  return 0.5 * (1 + sign * y);
}

// ── Factorial ────────────────────────────────────────────────
function fact(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function mathComb(n, r) {
  if (r > n || r < 0) return 0;
  if (r === 0 || r === n) return 1;
  let res = 1;
  for (let i = 1; i <= r; i++) res = res * (n - i + 1) / i;
  return res;
}

function mathPerm(n, r) {
  if (r > n || r < 0) return 0;
  let res = 1;
  for (let i = 0; i < r; i++) res *= (n - i);
  return res;
}

// ============================================================
// 1. BASIC PROBABILITY
// ============================================================
function renderPA(c) {
  c.innerHTML = calcPanel('P(A) — Basic Probability', '⚡',
    numInput('pa-fav', 'Favourable Outcomes (f)', '3', '0') +
    numInput('pa-total', 'Total Outcomes (N)', '10', '1'),
    'Calculate', 'calcPA');
}
function calcPA() {
  const f = parseFloat(document.getElementById('pa-fav').value);
  const N = parseFloat(document.getElementById('pa-total').value);
  if (isNaN(f)||isNaN(N)||N===0) return;
  const p = f / N;
  showResult(resultCard('P(A)', pRound(p), `
<div class="step-header">Formula</div>
P(A) = Favourable Outcomes / Total Outcomes
     = ${f} / ${N}
     = ${pRound(p)}  (${pPct(p)})

<div class="step-header">Interpretation</div>
There is a ${pPct(p)} chance that event A occurs.
P(A') = 1 − ${pRound(p)} = ${pRound(1-p)}  (${pPct(1-p)})`));
}

function renderPAC(c) {
  c.innerHTML = calcPanel("P(A') — Complement", '🔄',
    numInput('pac-pa', 'P(A)', '0.3', '0', '0.001'),
    'Calculate', 'calcPAC');
}
function calcPAC() {
  const pa = parseFloat(document.getElementById('pac-pa').value);
  if (isNaN(pa)) return;
  const pac = 1 - pa;
  showResult(resultCard("P(A')", pRound(pac), `
<div class="step-header">Formula</div>
P(A') = 1 − P(A)
      = 1 − ${pa}
      = ${pRound(pac)}  (${pPct(pac)})`));
}

function renderPAUB(c) {
  c.innerHTML = calcPanel('P(A ∪ B) — Union', '∪',
    numInput('paub-pa', 'P(A)', '0.4', '0', '0.001') +
    numInput('paub-pb', 'P(B)', '0.3', '0', '0.001') +
    numInput('paub-panb', 'P(A ∩ B)', '0.1', '0', '0.001'),
    'Calculate', 'calcPAUB');
}
function calcPAUB() {
  const pa = parseFloat(document.getElementById('paub-pa').value);
  const pb = parseFloat(document.getElementById('paub-pb').value);
  const panb = parseFloat(document.getElementById('paub-panb').value);
  if (isNaN(pa)||isNaN(pb)||isNaN(panb)) return;
  const paub = pa + pb - panb;
  showResult(resultCard('P(A ∪ B)', pRound(paub), `
<div class="step-header">Addition Rule</div>
P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
         = ${pa} + ${pb} − ${panb}
         = ${pRound(paub)}  (${pPct(paub)})`));
}

function renderPANB(c) {
  c.innerHTML = calcPanel('P(A ∩ B) — Intersection', '∩',
    numInput('panb-pa', 'P(A)', '0.4') +
    numInput('panb-pb', 'P(B)', '0.3') +
    `<div class="input-group">
      <label>Event Type</label>
      <select class="input-field" id="panb-type">
        <option value="indep">Independent Events</option>
        <option value="cond">Dependent (use P(B|A))</option>
      </select>
    </div>` +
    numInput('panb-pba', 'P(B | A) — if dependent', '0.25'),
    'Calculate', 'calcPANB');
}
function calcPANB() {
  const pa = parseFloat(document.getElementById('panb-pa').value);
  const pb = parseFloat(document.getElementById('panb-pb').value);
  const type = document.getElementById('panb-type').value;
  let panb, steps;
  if (type === 'indep') {
    panb = pa * pb;
    steps = `<div class="step-header">Independent Events Rule</div>
P(A ∩ B) = P(A) × P(B)
         = ${pa} × ${pb}
         = ${pRound(panb)}`;
  } else {
    const pba = parseFloat(document.getElementById('panb-pba').value);
    panb = pa * pba;
    steps = `<div class="step-header">Multiplication Rule</div>
P(A ∩ B) = P(A) × P(B | A)
         = ${pa} × ${pba}
         = ${pRound(panb)}`;
  }
  showResult(resultCard('P(A ∩ B)', pRound(panb), steps));
}

// ============================================================
// 2. CONDITIONAL PROBABILITY
// ============================================================
function renderPAB(c) {
  c.innerHTML = calcPanel('P(A | B) — Conditional', '|',
    numInput('pab-panb', 'P(A ∩ B)', '0.12') +
    numInput('pab-pb', 'P(B)', '0.3'),
    'Calculate', 'calcPAB');
}
function calcPAB() {
  const panb = parseFloat(document.getElementById('pab-panb').value);
  const pb = parseFloat(document.getElementById('pab-pb').value);
  if (isNaN(panb)||isNaN(pb)||pb===0) return;
  const pab = panb / pb;
  showResult(resultCard('P(A | B)', pRound(pab), `
<div class="step-header">Conditional Probability Formula</div>
P(A | B) = P(A ∩ B) / P(B)
         = ${panb} / ${pb}
         = ${pRound(pab)}  (${pPct(pab)})

<div class="step-header">Interpretation</div>
Given that B has already occurred, the probability that A also occurs is ${pPct(pab)}.`));
}

function renderPBA(c) {
  c.innerHTML = calcPanel('P(B | A) — Conditional', '|',
    numInput('pba-panb', 'P(A ∩ B)', '0.12') +
    numInput('pba-pa', 'P(A)', '0.4'),
    'Calculate', 'calcPBA');
}
function calcPBA() {
  const panb = parseFloat(document.getElementById('pba-panb').value);
  const pa = parseFloat(document.getElementById('pba-pa').value);
  if (isNaN(panb)||isNaN(pa)||pa===0) return;
  const pba = panb / pa;
  showResult(resultCard('P(B | A)', pRound(pba), `
P(B | A) = P(A ∩ B) / P(A)
         = ${panb} / ${pa}
         = ${pRound(pba)}  (${pPct(pba)})`));
}

function renderIndep(c) {
  c.innerHTML = calcPanel('Independence Test', '🔍',
    numInput('indep-pa', 'P(A)', '0.4') +
    numInput('indep-pb', 'P(B)', '0.3') +
    numInput('indep-panb', 'P(A ∩ B)', '0.12'),
    'Test Independence', 'calcIndep');
}
function calcIndep() {
  const pa = parseFloat(document.getElementById('indep-pa').value);
  const pb = parseFloat(document.getElementById('indep-pb').value);
  const panb = parseFloat(document.getElementById('indep-panb').value);
  if (isNaN(pa)||isNaN(pb)||isNaN(panb)) return;
  const papb = pa * pb;
  const isIndep = Math.abs(panb - papb) < 0.0001;
  showResult(`<div class="card">
    <div class="result-box" style="margin-top:0;border-color:${isIndep?'var(--accent)':'var(--accent-2)'}">
      <div class="result-label">Events are:</div>
      <div class="result-value">${isIndep ? '✅ INDEPENDENT' : '❌ DEPENDENT'}</div>
    </div>
    <div class="steps-panel" style="margin-top:16px">
<div class="step-header">Test: P(A ∩ B) = P(A) × P(B)?</div>
P(A) × P(B) = ${pa} × ${pb} = ${pRound(papb)}
P(A ∩ B)    = ${panb}

${isIndep ? '✓ Equal → Events are INDEPENDENT' : '✗ Not equal → Events are DEPENDENT'}
    </div>
  </div>`);
}

// ============================================================
// 3. BAYES' THEOREM
// ============================================================
function renderBayes1(c) {
  c.innerHTML = calcPanel("Bayes' Theorem — P(A|B)", '🧠',
    numInput('b1-pa', 'P(A) — Prior', '0.3') +
    numInput('b1-pba', 'P(B | A)', '0.7') +
    numInput('b1-pbac', "P(B | A') — False Positive Rate", '0.2'),
    'Apply Bayes', 'calcBayes1');
}
function calcBayes1() {
  const pa = parseFloat(document.getElementById('b1-pa').value);
  const pba = parseFloat(document.getElementById('b1-pba').value);
  const pbac = parseFloat(document.getElementById('b1-pbac').value);
  if (isNaN(pa)||isNaN(pba)||isNaN(pbac)) return;
  const pac = 1 - pa;
  const pb = pba * pa + pbac * pac;
  const pab = (pba * pa) / pb;
  showResult(resultCard("P(A | B)", pRound(pab), `
<div class="step-header">Step 1 — Calculate P(B) using Total Probability</div>
P(B) = P(B|A)·P(A) + P(B|A')·P(A')
     = ${pba}×${pa} + ${pbac}×${pRound(pac)}
     = ${pRound(pb)}

<div class="step-header">Step 2 — Apply Bayes' Theorem</div>
P(A|B) = P(B|A)·P(A) / P(B)
       = ${pba}×${pa} / ${pRound(pb)}
       = ${pRound(pab)}  (${pPct(pab)})`));
}

function renderBayes2(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🧠 Bayes' Theorem — Multiple Hypotheses</h4>
    <p style="margin-bottom:16px; font-size:13px; color:var(--text-muted)">Enter hypotheses with their priors and likelihoods (P(E|H)). Separate values with commas.</p>
    <div class="input-group"><label>Prior Probabilities P(H) — comma separated</label>
      <input class="input-field" id="b2-priors" value="0.3, 0.5, 0.2" /></div>
    <div class="input-group" style="margin-top:12px"><label>Likelihoods P(E|H) — comma separated</label>
      <input class="input-field" id="b2-likelihoods" value="0.7, 0.4, 0.1" /></div>
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcBayes2()">Apply Bayes</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcBayes2() {
  const priors = document.getElementById('b2-priors').value.split(',').map(Number);
  const likes  = document.getElementById('b2-likelihoods').value.split(',').map(Number);
  if (priors.length !== likes.length || priors.some(isNaN) || likes.some(isNaN)) {
    showResult('<div class="card"><p style="color:var(--wrong-color)">Arrays must be equal length with valid numbers.</p></div>'); return;
  }
  const joints = priors.map((p,i) => p * likes[i]);
  const pe = joints.reduce((a,b)=>a+b, 0);
  const posteriors = joints.map(j => j / pe);
  const rows = priors.map((p,i)=>`
    <tr><td>H${i+1}</td><td>${p}</td><td>${likes[i]}</td><td>${pRound(joints[i])}</td><td><strong>${pRound(posteriors[i])}</strong></td></tr>
  `).join('');
  showResult(`<div class="card">
    <h4 style="margin-bottom:12px">Posterior Probabilities</h4>
    <p style="margin-bottom:12px; font-family:monospace; font-size:13px">P(E) = ${pRound(pe)}</p>
    <div style="overflow-x:auto"><table class="freq-table">
      <thead><tr><th>Hypothesis</th><th>P(H)</th><th>P(E|H)</th><th>P(H∩E)</th><th>P(H|E)</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
  </div>`);
}

// ============================================================
// 4. PERMUTATIONS & COMBINATIONS
// ============================================================
function renderNCR2(c) {
  c.innerHTML = calcPanel('nCr — Combinations', '🔢',
    numInput('ncr-n', 'n (Total)', '10', '0') +
    numInput('ncr-r', 'r (Choose)', '3', '0'),
    'Calculate nCr', 'calcNCR2');
}
function calcNCR2() {
  const n = parseInt(document.getElementById('ncr-n').value);
  const r = parseInt(document.getElementById('ncr-r').value);
  if (isNaN(n)||isNaN(r)||r>n||r<0) return;
  const val = mathComb(n, r);
  showResult(resultCard('nCr', val.toLocaleString(), `
<div class="step-header">Formula</div>
nCr = n! / (r! × (n−r)!)
${n}C${r} = ${n}! / (${r}! × ${n-r}!)
    = ${val.toLocaleString()}

<div class="step-header">Meaning</div>
There are ${val.toLocaleString()} ways to choose ${r} items from ${n} items where order does NOT matter.`, false));
}

function renderNPR2(c) {
  c.innerHTML = calcPanel('nPr — Permutations', '🔢',
    numInput('npr-n', 'n (Total)', '10', '0') +
    numInput('npr-r', 'r (Arrange)', '3', '0'),
    'Calculate nPr', 'calcNPR2');
}
function calcNPR2() {
  const n = parseInt(document.getElementById('npr-n').value);
  const r = parseInt(document.getElementById('npr-r').value);
  if (isNaN(n)||isNaN(r)||r>n||r<0) return;
  const val = mathPerm(n, r);
  showResult(resultCard('nPr', val.toLocaleString(), `
<div class="step-header">Formula</div>
nPr = n! / (n−r)!
${n}P${r} = ${n}! / ${n-r}!
    = ${val.toLocaleString()}

<div class="step-header">Meaning</div>
There are ${val.toLocaleString()} ways to arrange ${r} items from ${n} items where order MATTERS.`, false));
}

function renderArrangements(c) {
  c.innerHTML = calcPanel('Arrangements with Repeats', '🔀',
    numInput('arr-n', 'Total Items (n)', '6', '1') +
    `<div class="input-group"><label>Repeat Frequencies (comma-separated, e.g. 2,2,1,1)</label>
      <input class="input-field" id="arr-reps" value="2, 2, 1, 1" /></div>`,
    'Calculate', 'calcArrangements');
}
function calcArrangements() {
  const n = parseInt(document.getElementById('arr-n').value);
  const reps = document.getElementById('arr-reps').value.split(',').map(s=>parseInt(s.trim())).filter(x=>!isNaN(x));
  const sumReps = reps.reduce((a,b)=>a+b,0);
  if (isNaN(n) || sumReps !== n) {
    showResult('<div class="card"><p style="color:var(--wrong-color)">Sum of frequencies must equal n.</p></div>'); return;
  }
  const denom = reps.reduce((a,r) => a * fact(r), 1);
  const val = fact(n) / denom;
  showResult(resultCard('Arrangements', val.toLocaleString(), `
<div class="step-header">Formula</div>
n! / (n₁! × n₂! × ... × nₖ!)
= ${n}! / (${reps.map(r=>r+'!').join(' × ')})
= ${fact(n).toLocaleString()} / ${denom.toLocaleString()}
= ${val.toLocaleString()}`, false));
}

// ============================================================
// 5. RANDOM VARIABLES
// ============================================================
let rvTable = [];

function parseRVTable() {
  const xVals = document.getElementById('rv-x').value.split(',').map(s=>parseFloat(s.trim()));
  const pVals = document.getElementById('rv-p').value.split(',').map(s=>parseFloat(s.trim()));
  if (xVals.length !== pVals.length || xVals.some(isNaN) || pVals.some(isNaN)) return null;
  rvTable = xVals.map((x,i) => ({ x, p: pVals[i] }));
  return rvTable;
}

function rvInputs() {
  return `<div class="input-group"><label>Values of X (comma-separated)</label>
      <input class="input-field" id="rv-x" value="0, 1, 2, 3" /></div>
    <div class="input-group" style="margin-top:12px"><label>Probabilities P(X=x) (comma-separated)</label>
      <input class="input-field" id="rv-p" value="0.1, 0.3, 0.4, 0.2" /></div>`;
}

function renderRVDist(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🎯 Probability Distribution Table</h4>
    ${rvInputs()}
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcRVDist()">Build Table</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcRVDist() {
  const tbl = parseRVTable();
  if (!tbl) { showResult('<div class="card"><p style="color:var(--wrong-color)">Invalid input. Arrays must match in length.</p></div>'); return; }
  const sumP = tbl.reduce((a,r)=>a+r.p, 0);
  const ex  = tbl.reduce((a,r)=>a+r.x*r.p, 0);
  const ex2 = tbl.reduce((a,r)=>a+r.x*r.x*r.p, 0);
  const varx = ex2 - ex*ex;
  let cumP = 0;
  const rows = tbl.map(r => { cumP+=r.p; return `<tr><td>${r.x}</td><td>${pRound(r.p)}</td><td>${pRound(cumP)}</td></tr>`; }).join('');
  showResult(`<div class="card">
    <h4 style="margin-bottom:12px">Distribution Table</h4>
    <div style="overflow-x:auto"><table class="freq-table">
      <thead><tr><th>X</th><th>P(X=x)</th><th>Cumulative P</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px">
      ${['Sum Σp = ' + pRound(sumP) + (Math.abs(sumP-1)<0.001?' ✅':' ⚠️'), 'E(X) = ' + pRound(ex), 'E(X²) = ' + pRound(ex2), 'Var(X) = ' + pRound(varx), 'SD(X) = ' + pRound(Math.sqrt(varx))].map(s=>`<div class="result-box" style="margin-top:0; padding:12px"><div style="font-size:13px">${s}</div></div>`).join('')}
    </div>
  </div>`);
}

function renderRVEq(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🎯 P(X = x)</h4>
    ${rvInputs()}
    ${numInput('rv-eq-x', 'Find P(X = x) where x =', '1')}
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcRVEq()">Calculate</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcRVEq() {
  const tbl = parseRVTable(); if (!tbl) return;
  const xFind = parseFloat(document.getElementById('rv-eq-x').value);
  const row = tbl.find(r => Math.abs(r.x - xFind) < 0.0001);
  const val = row ? row.p : 0;
  showResult(resultCard('P(X = ' + xFind + ')', pRound(val), `From the distribution table: P(X = ${xFind}) = ${pRound(val)}`));
}

function renderRVLeq(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🎯 P(X ≤ x)</h4>
    ${rvInputs()}
    ${numInput('rv-leq-x', 'Find P(X ≤ x) where x =', '2')}
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcRVLeq()">Calculate</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcRVLeq() {
  const tbl = parseRVTable(); if (!tbl) return;
  const xFind = parseFloat(document.getElementById('rv-leq-x').value);
  const val = tbl.filter(r=>r.x<=xFind).reduce((a,r)=>a+r.p,0);
  const terms = tbl.filter(r=>r.x<=xFind).map(r=>`P(X=${r.x})=${pRound(r.p)}`).join(' + ');
  showResult(resultCard('P(X ≤ ' + xFind + ')', pRound(val), `P(X ≤ ${xFind}) = ${terms} = ${pRound(val)}`));
}

function renderRVGt(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🎯 P(X > x)</h4>
    ${rvInputs()}
    ${numInput('rv-gt-x', 'Find P(X > x) where x =', '1')}
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcRVGt()">Calculate</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcRVGt() {
  const tbl = parseRVTable(); if (!tbl) return;
  const xFind = parseFloat(document.getElementById('rv-gt-x').value);
  const val = tbl.filter(r=>r.x>xFind).reduce((a,r)=>a+r.p,0);
  showResult(resultCard('P(X > ' + xFind + ')', pRound(val), `
P(X > ${xFind}) = 1 − P(X ≤ ${xFind})
              = 1 − ${pRound(1-val)}
              = ${pRound(val)}`));
}

function renderRVMissing(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🎯 Find Missing Probability</h4>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Enter known probabilities. Use a blank or '?' for the missing value. Since Σp = 1, the missing value is calculated automatically.</p>
    <div class="input-group"><label>Known P values (comma-separated, use 0 for unknown)</label>
      <input class="input-field" id="rv-miss-vals" value="0.1, 0.3, 0, 0.2" /></div>
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcRVMissing()">Find Missing P</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcRVMissing() {
  const vals = document.getElementById('rv-miss-vals').value.split(',').map(s=>parseFloat(s.trim()));
  if (vals.some(isNaN)) return;
  const zeroCount = vals.filter(v=>v===0).length;
  if (zeroCount !== 1) { showResult('<div class="card"><p style="color:var(--wrong-color)">Exactly one value should be 0 (the unknown).</p></div>'); return; }
  const known = vals.filter(v=>v!==0).reduce((a,b)=>a+b,0);
  const missing = 1 - known;
  const idx = vals.indexOf(0);
  showResult(resultCard('Missing P', pRound(missing), `
<div class="step-header">Using Σ P(X=x) = 1</div>
Known probabilities sum: ${pRound(known)}
Missing value = 1 − ${pRound(known)} = ${pRound(missing)}
This is the probability at position ${idx+1}.`));
}

// ============================================================
// 6. EXPECTED VALUE
// ============================================================
function renderEX(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">📊 E(X) — Expected Value</h4>
    ${rvInputs()}
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcEX()">Calculate E(X)</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcEX() {
  const tbl = parseRVTable(); if (!tbl) return;
  const terms = tbl.map(r=>`${r.x}×${pRound(r.p)}`).join(' + ');
  const ex = tbl.reduce((a,r)=>a+r.x*r.p, 0);
  showResult(resultCard('E(X)', pRound(ex), `
<div class="step-header">Formula: E(X) = Σ x·P(X=x)</div>
E(X) = ${terms}
     = ${pRound(ex)}`, false));
}

function renderEX2(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">📊 E(X²)</h4>
    ${rvInputs()}
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcEX2()">Calculate E(X²)</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcEX2() {
  const tbl = parseRVTable(); if (!tbl) return;
  const terms = tbl.map(r=>`${r.x}²×${pRound(r.p)}`).join(' + ');
  const ex2 = tbl.reduce((a,r)=>a+r.x*r.x*r.p, 0);
  showResult(resultCard('E(X²)', pRound(ex2), `
<div class="step-header">Formula: E(X²) = Σ x²·P(X=x)</div>
E(X²) = ${terms}
      = ${pRound(ex2)}`, false));
}

function renderEGX(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">📊 E[g(X)]</h4>
    ${rvInputs()}
    <div class="input-group" style="margin-top:12px"><label>Transformation g(x) — e.g. 2x+1 or x^2-3</label>
      <input class="input-field" id="egx-fn" value="2*x+1" /></div>
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcEGX()">Calculate E[g(X)]</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcEGX() {
  const tbl = parseRVTable(); if (!tbl) return;
  const fn = document.getElementById('egx-fn').value;
  let egx = 0;
  const terms = [];
  for (const row of tbl) {
    try {
      const x = row.x;
      // safe eval of simple expressions
      const gx = Function('x', 'return ' + fn)(x);
      egx += gx * row.p;
      terms.push(`g(${x})×${pRound(row.p)} = ${pRound(gx)}×${pRound(row.p)}`);
    } catch(e) {
      showResult('<div class="card"><p style="color:var(--wrong-color)">Invalid function. Use standard JS math expressions.</p></div>'); return;
    }
  }
  showResult(resultCard('E[g(X)]', pRound(egx), `
<div class="step-header">Formula: E[g(X)] = Σ g(x)·P(X=x)</div>
${terms.join('\n')}

E[g(X)] = ${pRound(egx)}`, false));
}

// ============================================================
// 7. VARIANCE & STANDARD DEVIATION
// ============================================================
function renderVarX(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">📐 Var(X) and SD(X)</h4>
    ${rvInputs()}
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcVarX()">Calculate</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcVarX() {
  const tbl = parseRVTable(); if (!tbl) return;
  const ex  = tbl.reduce((a,r)=>a+r.x*r.p, 0);
  const ex2 = tbl.reduce((a,r)=>a+r.x*r.x*r.p, 0);
  const varx = ex2 - ex*ex;
  const sdx = Math.sqrt(varx);
  showResult(`<div class="card">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px">
      ${[['E(X)', pRound(ex)], ['E(X²)', pRound(ex2)], ['Var(X)', pRound(varx)], ['SD(X)', pRound(sdx)]].map(([l,v])=>`
        <div class="result-box" style="margin-top:0"><div class="result-label">${l}</div><div class="result-value">${v}</div></div>
      `).join('')}
    </div>
    <div class="steps-panel" style="margin-top:16px">
<div class="step-header">Working (Shortcut Formula)</div>
E(X)  = Σ x·P(X=x) = ${pRound(ex)}
E(X²) = Σ x²·P(X=x) = ${pRound(ex2)}

Var(X) = E(X²) − [E(X)]²
       = ${pRound(ex2)} − ${pRound(ex)}²
       = ${pRound(ex2)} − ${pRound(ex*ex)}
       = ${pRound(varx)}

SD(X) = √Var(X) = √${pRound(varx)} = ${pRound(sdx)}
    </div>
  </div>`);
}

// ============================================================
// 8. BINOMIAL DISTRIBUTION
// ============================================================
function binPMF(x, n, p) {
  return mathComb(n, x) * Math.pow(p, x) * Math.pow(1-p, n-x);
}

function binInputs() {
  return numInput('bin-n', 'n (Trials)', '10', '1', '1') +
         numInput('bin-p', 'p (Success Probability)', '0.4', '0', '0.001') +
         numInput('bin-x', 'x (Successes)', '3', '0', '1');
}

function renderBinEq(c) {
  c.innerHTML = calcPanel('Binomial — P(X = x)', '🎲', binInputs(), 'Calculate', 'calcBinEq');
}
function calcBinEq() {
  const n = parseInt(document.getElementById('bin-n').value);
  const p = parseFloat(document.getElementById('bin-p').value);
  const x = parseInt(document.getElementById('bin-x').value);
  if (isNaN(n)||isNaN(p)||isNaN(x)) return;
  const val = binPMF(x,n,p);
  showResult(resultCard('P(X = '+x+')', pRound(val), `
<div class="step-header">Formula: P(X=x) = nCx × pˣ × (1−p)ⁿ⁻ˣ</div>
P(X=${x}) = ${n}C${x} × ${p}^${x} × ${pRound(1-p)}^${n-x}
         = ${mathComb(n,x)} × ${pRound(Math.pow(p,x),6)} × ${pRound(Math.pow(1-p,n-x),6)}
         = ${pRound(val)}`));
}

function renderBinLeq(c) {
  c.innerHTML = calcPanel('Binomial — P(X ≤ x)', '🎲', binInputs(), 'Calculate', 'calcBinLeq');
}
function calcBinLeq() {
  const n = parseInt(document.getElementById('bin-n').value);
  const p = parseFloat(document.getElementById('bin-p').value);
  const x = parseInt(document.getElementById('bin-x').value);
  if (isNaN(n)||isNaN(p)||isNaN(x)) return;
  let val = 0;
  const terms = [];
  for (let k=0; k<=x; k++) { const b=binPMF(k,n,p); val+=b; terms.push(`P(X=${k})=${pRound(b,5)}`); }
  showResult(resultCard('P(X ≤ '+x+')', pRound(val), `
<div class="step-header">P(X ≤ ${x}) = Σ P(X=k) for k=0 to ${x}</div>
${terms.join('\n')}
Sum = ${pRound(val)}`));
}

function renderBinGeq(c) {
  c.innerHTML = calcPanel('Binomial — P(X ≥ x)', '🎲', binInputs(), 'Calculate', 'calcBinGeq');
}
function calcBinGeq() {
  const n = parseInt(document.getElementById('bin-n').value);
  const p = parseFloat(document.getElementById('bin-p').value);
  const x = parseInt(document.getElementById('bin-x').value);
  if (isNaN(n)||isNaN(p)||isNaN(x)) return;
  let leq = 0;
  for (let k=0; k<x; k++) leq += binPMF(k,n,p);
  const val = 1 - leq;
  showResult(resultCard('P(X ≥ '+x+')', pRound(val), `
<div class="step-header">P(X ≥ ${x}) = 1 − P(X ≤ ${x-1})</div>
P(X ≤ ${x-1}) = ${pRound(leq)}
P(X ≥ ${x})  = 1 − ${pRound(leq)} = ${pRound(val)}`));
}

function renderBinStats(c) {
  c.innerHTML = calcPanel('Binomial — Mean, Var, SD', '🎲',
    numInput('bin-n', 'n (Trials)', '10', '1', '1') +
    numInput('bin-p', 'p (Success Probability)', '0.4', '0', '0.001'),
    'Calculate', 'calcBinStats');
}
function calcBinStats() {
  const n = parseInt(document.getElementById('bin-n').value);
  const p = parseFloat(document.getElementById('bin-p').value);
  if (isNaN(n)||isNaN(p)) return;
  const q = 1-p;
  const mu = n*p, varx = n*p*q, sdx = Math.sqrt(varx);
  showResult(`<div class="card">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[['Mean (np)', pRound(mu)], ['q = 1−p', pRound(q)], ['Variance (npq)', pRound(varx)], ['SD (√npq)', pRound(sdx)]].map(([l,v])=>`
        <div class="result-box" style="margin-top:0"><div class="result-label">${l}</div><div class="result-value">${v}</div></div>
      `).join('')}
    </div>
    <div class="steps-panel" style="margin-top:16px">
Mean = np = ${n} × ${p} = ${pRound(mu)}
Var(X) = npq = ${n} × ${p} × ${pRound(q)} = ${pRound(varx)}
SD(X) = √npq = √${pRound(varx)} = ${pRound(sdx)}
    </div>
  </div>`);
}

// ============================================================
// 9. POISSON DISTRIBUTION
// ============================================================
function poisPMF(x, lam) {
  return (Math.pow(lam, x) * Math.exp(-lam)) / fact(x);
}

function poiInputs() {
  return numInput('poi-lam', 'λ (Mean / Rate)', '3', '0', '0.001') +
         numInput('poi-x', 'x (Events)', '2', '0', '1');
}

function renderPoiEq(c) {
  c.innerHTML = calcPanel('Poisson — P(X = x)', 'λ', poiInputs(), 'Calculate', 'calcPoiEq');
}
function calcPoiEq() {
  const lam = parseFloat(document.getElementById('poi-lam').value);
  const x = parseInt(document.getElementById('poi-x').value);
  if (isNaN(lam)||isNaN(x)) return;
  const val = poisPMF(x, lam);
  showResult(resultCard('P(X = '+x+')', pRound(val), `
<div class="step-header">Formula: P(X=x) = e^(−λ) × λˣ / x!</div>
P(X=${x}) = e^(−${lam}) × ${lam}^${x} / ${x}!
         = ${pRound(Math.exp(-lam),6)} × ${pRound(Math.pow(lam,x),4)} / ${fact(x)}
         = ${pRound(val)}`));
}

function renderPoiLeq(c) {
  c.innerHTML = calcPanel('Poisson — P(X ≤ x)', 'λ', poiInputs(), 'Calculate', 'calcPoiLeq');
}
function calcPoiLeq() {
  const lam = parseFloat(document.getElementById('poi-lam').value);
  const x = parseInt(document.getElementById('poi-x').value);
  if (isNaN(lam)||isNaN(x)) return;
  let val=0, terms=[];
  for(let k=0;k<=x;k++){const b=poisPMF(k,lam);val+=b;terms.push(`P(X=${k})=${pRound(b,5)}`);}
  showResult(resultCard('P(X ≤ '+x+')', pRound(val), terms.join('\n')+'\nSum = '+pRound(val)));
}

function renderPoiGeq(c) {
  c.innerHTML = calcPanel('Poisson — P(X ≥ x)', 'λ', poiInputs(), 'Calculate', 'calcPoiGeq');
}
function calcPoiGeq() {
  const lam = parseFloat(document.getElementById('poi-lam').value);
  const x = parseInt(document.getElementById('poi-x').value);
  if (isNaN(lam)||isNaN(x)) return;
  let leq=0;
  for(let k=0;k<x;k++) leq+=poisPMF(k,lam);
  const val=1-leq;
  showResult(resultCard('P(X ≥ '+x+')', pRound(val), `P(X ≥ ${x}) = 1 − P(X ≤ ${x-1}) = 1 − ${pRound(leq)} = ${pRound(val)}`));
}

function renderPoiStats(c) {
  c.innerHTML = calcPanel('Poisson — Mean & Variance', 'λ',
    numInput('poi-lam', 'λ (Mean / Rate)', '3', '0', '0.001'),
    'Show Stats', 'calcPoiStats');
}
function calcPoiStats() {
  const lam = parseFloat(document.getElementById('poi-lam').value);
  if (isNaN(lam)) return;
  showResult(`<div class="card">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[['Mean E(X)', pRound(lam)], ['Variance Var(X)', pRound(lam)], ['SD(X)', pRound(Math.sqrt(lam))], ['Parameter λ', pRound(lam)]].map(([l,v])=>`
        <div class="result-box" style="margin-top:0"><div class="result-label">${l}</div><div class="result-value">${v}</div></div>
      `).join('')}
    </div>
    <div class="steps-panel" style="margin-top:16px">
For a Poisson distribution with λ = ${lam}:
Mean     = λ = ${pRound(lam)}
Variance = λ = ${pRound(lam)}
SD       = √λ = ${pRound(Math.sqrt(lam))}
    </div>
  </div>`);
}

// ============================================================
// 10. NORMAL DISTRIBUTION
// ============================================================
function normInputs(extra='') {
  return numInput('norm-mu', 'Mean (μ)', '0', '') +
         numInput('norm-sig', 'Std Dev (σ)', '1', '0.001') + extra;
}

function renderNormZ(c) {
  c.innerHTML = calcPanel('Convert X to Z-score', '🔔',
    normInputs(numInput('norm-x', 'Value (x)', '72')),
    'Calculate Z', 'calcNormZ');
}
function calcNormZ() {
  const mu = parseFloat(document.getElementById('norm-mu').value);
  const sig = parseFloat(document.getElementById('norm-sig').value);
  const x = parseFloat(document.getElementById('norm-x').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(x)) return;
  const z = (x - mu) / sig;
  showResult(resultCard('Z-Score', pRound(z), `
Z = (X − μ) / σ
  = (${x} − ${mu}) / ${sig}
  = ${pRound(z)}

X = ${x} is ${Math.abs(pRound(z))} standard deviations ${z>=0?'above':'below'} the mean.`, false));
}

function renderNormLt(c) {
  c.innerHTML = calcPanel('P(X < x)', '🔔',
    normInputs(numInput('norm-x', 'Value (x)', '72')),
    'Calculate', 'calcNormLt');
}
function calcNormLt() {
  const mu = parseFloat(document.getElementById('norm-mu').value);
  const sig = parseFloat(document.getElementById('norm-sig').value);
  const x = parseFloat(document.getElementById('norm-x').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(x)) return;
  const z = (x-mu)/sig;
  const p = normalCDF(z);
  showResult(resultCard('P(X < '+x+')', pRound(p), `
Z = (${x} − ${mu}) / ${sig} = ${pRound(z)}
P(Z < ${pRound(z)}) = ${pRound(p)}  (${pPct(p)})`));
}

function renderNormGt(c) {
  c.innerHTML = calcPanel('P(X > x)', '🔔',
    normInputs(numInput('norm-x', 'Value (x)', '72')),
    'Calculate', 'calcNormGt');
}
function calcNormGt() {
  const mu = parseFloat(document.getElementById('norm-mu').value);
  const sig = parseFloat(document.getElementById('norm-sig').value);
  const x = parseFloat(document.getElementById('norm-x').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(x)) return;
  const z = (x-mu)/sig;
  const p = 1 - normalCDF(z);
  showResult(resultCard('P(X > '+x+')', pRound(p), `
Z = (${x} − ${mu}) / ${sig} = ${pRound(z)}
P(Z > ${pRound(z)}) = 1 − P(Z < ${pRound(z)}) = 1 − ${pRound(1-p)} = ${pRound(p)}`));
}

function renderNormBet(c) {
  c.innerHTML = calcPanel('P(a < X < b)', '🔔',
    normInputs(numInput('norm-a','Lower bound (a)','65') + numInput('norm-b','Upper bound (b)','80')),
    'Calculate', 'calcNormBet');
}
function calcNormBet() {
  const mu = parseFloat(document.getElementById('norm-mu').value);
  const sig = parseFloat(document.getElementById('norm-sig').value);
  const a = parseFloat(document.getElementById('norm-a').value);
  const b = parseFloat(document.getElementById('norm-b').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(a)||isNaN(b)) return;
  const za = (a-mu)/sig, zb = (b-mu)/sig;
  const p = normalCDF(zb) - normalCDF(za);
  showResult(resultCard('P('+a+' < X < '+b+')', pRound(p), `
Za = (${a} − ${mu}) / ${sig} = ${pRound(za)}
Zb = (${b} − ${mu}) / ${sig} = ${pRound(zb)}
P(${a} < X < ${b}) = P(Z < ${pRound(zb)}) − P(Z < ${pRound(za)})
                  = ${pRound(normalCDF(zb))} − ${pRound(normalCDF(za))}
                  = ${pRound(p)}`));
}

function renderNormInv(c) {
  c.innerHTML = calcPanel('Find X from Probability', '🔔',
    normInputs(numInput('norm-prob', 'P(X < x) = ?', '0.95', '0', '0.001')),
    'Find X', 'calcNormInv');
}
function calcNormInv() {
  const mu = parseFloat(document.getElementById('norm-mu').value);
  const sig = parseFloat(document.getElementById('norm-sig').value);
  const prob = parseFloat(document.getElementById('norm-prob').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(prob)) return;
  // Inverse normal via rational approximation
  function invNorm(p) {
    const a=[2.515517,0.802853,0.010328], b=[1.432788,0.189269,0.001308];
    if (p < 0.5) {
      const t = Math.sqrt(-2*Math.log(p));
      return -(t-(a[0]+a[1]*t+a[2]*t*t)/(1+b[0]*t+b[1]*t*t+b[2]*t*t*t));
    } else {
      const t = Math.sqrt(-2*Math.log(1-p));
      return (t-(a[0]+a[1]*t+a[2]*t*t)/(1+b[0]*t+b[1]*t*t+b[2]*t*t*t));
    }
  }
  const z = invNorm(prob);
  const x = mu + z * sig;
  showResult(resultCard('X', pRound(x), `
<div class="step-header">Inverse Normal</div>
P(X < x) = ${prob}
Z-score for probability ${prob}: Z = ${pRound(z)}

X = μ + Z × σ
  = ${mu} + ${pRound(z)} × ${sig}
  = ${pRound(x)}`, false));
}

// ============================================================
// 11. JOINT DISTRIBUTIONS
// ============================================================
function renderJointProb(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🔀 Joint Probability Table</h4>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Enter a joint probability table. Row headers = X values, Column headers = Y values. Values = P(X=x, Y=y).</p>
    <div class="input-group"><label>X values (comma-separated)</label><input class="input-field" id="jt-x" value="0, 1, 2"/></div>
    <div class="input-group" style="margin-top:12px"><label>Y values (comma-separated)</label><input class="input-field" id="jt-y" value="0, 1"/></div>
    <div class="input-group" style="margin-top:12px"><label>Joint probabilities (row by row, semicolon-separated rows)</label>
      <input class="input-field" id="jt-data" value="0.1, 0.2; 0.15, 0.25; 0.1, 0.2"/></div>
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcJointProb()">Build Table</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcJointProb() {
  const xVals = document.getElementById('jt-x').value.split(',').map(s=>parseFloat(s.trim()));
  const yVals = document.getElementById('jt-y').value.split(',').map(s=>parseFloat(s.trim()));
  const rows = document.getElementById('jt-data').value.split(';').map(r=>r.split(',').map(s=>parseFloat(s.trim())));
  if (rows.length !== xVals.length || rows.some(r=>r.length!==yVals.length)) {
    showResult('<div class="card"><p style="color:var(--wrong-color)">Dimension mismatch. Check rows/columns.</p></div>'); return;
  }
  const margX = rows.map(r=>r.reduce((a,b)=>a+b,0));
  const margY = yVals.map((_,j)=>rows.reduce((a,r)=>a+r[j],0));
  const sumAll = margX.reduce((a,b)=>a+b,0);
  const header = `<tr><th>X \\ Y</th>${yVals.map(y=>`<th>${y}</th>`).join('')}<th>P(X)</th></tr>`;
  const tableRows = xVals.map((x,i)=>`<tr><th>${x}</th>${rows[i].map(v=>`<td>${pRound(v)}</td>`).join('')}<td><strong>${pRound(margX[i])}</strong></td></tr>`).join('');
  const footerRow = `<tr><th>P(Y)</th>${margY.map(v=>`<td><strong>${pRound(v)}</strong></td>`).join('')}<td>${pRound(sumAll)}</td></tr>`;
  showResult(`<div class="card"><h4 style="margin-bottom:12px">Joint Distribution Table</h4>
    <div style="overflow-x:auto"><table class="freq-table"><thead>${header}</thead><tbody>${tableRows}${footerRow}</tbody></table></div>
  </div>`);
}

function renderJointMarginal(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🔀 Marginal Distributions</h4>
    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Build the joint table first, then use the marginal row/column to find P(X=x) and P(Y=y).</p>
    <div class="meaning-panel">
      <div class="meaning-title">How Marginals Work</div>
      <p>P(X = x) = Σ P(X=x, Y=y) over all y  (sum across the row)</p>
      <p style="margin-top:8px">P(Y = y) = Σ P(X=x, Y=y) over all x  (sum down the column)</p>
      <p style="margin-top:8px">Use the Joint Probability Table tool above to get these values.</p>
    </div>
  </div>`;
}

function renderJointCov(c) {
  c.innerHTML = `<div class="card">
    <h4 style="margin-bottom:16px; color:var(--accent)">🔀 Covariance & Correlation</h4>
    <div class="input-group"><label>X values (comma-separated)</label><input class="input-field" id="cov-x" value="1, 2, 3, 4"/></div>
    <div class="input-group" style="margin-top:12px"><label>Y values (comma-separated)</label><input class="input-field" id="cov-y" value="2, 4, 5, 4"/></div>
    <button class="primary-btn" style="width:100%;margin-top:16px" onclick="calcCov()">Calculate</button>
    <div id="prob-result-panel" style="margin-top:20px"></div>
  </div>`;
}
function calcCov() {
  const xv = document.getElementById('cov-x').value.split(',').map(Number);
  const yv = document.getElementById('cov-y').value.split(',').map(Number);
  if (xv.length !== yv.length || xv.some(isNaN) || yv.some(isNaN)) return;
  const n = xv.length;
  const mx = xv.reduce((a,b)=>a+b)/n, my = yv.reduce((a,b)=>a+b)/n;
  const cov = xv.reduce((a,v,i)=>a+(v-mx)*(yv[i]-my),0)/n;
  const sdx = Math.sqrt(xv.reduce((a,v)=>a+(v-mx)**2,0)/n);
  const sdy = Math.sqrt(yv.reduce((a,v)=>a+(v-my)**2,0)/n);
  const cor = cov / (sdx * sdy);
  showResult(`<div class="card">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[['E(X)', pRound(mx)], ['E(Y)', pRound(my)], ['Cov(X,Y)', pRound(cov)], ['Corr(X,Y)', pRound(cor)]].map(([l,v])=>`
        <div class="result-box" style="margin-top:0"><div class="result-label">${l}</div><div class="result-value">${v}</div></div>
      `).join('')}
    </div>
    <div class="steps-panel" style="margin-top:16px">
Cov(X,Y) = Σ[(xᵢ−μx)(yᵢ−μy)] / n = ${pRound(cov)}
Corr(X,Y) = Cov / (σx × σy) = ${pRound(cov)} / (${pRound(sdx)} × ${pRound(sdy)}) = ${pRound(cor)}
    </div>
  </div>`, false);
}

// ============================================================
// 12. CENTRAL LIMIT THEOREM
// ============================================================
function cltInputs(extra='') {
  return numInput('clt-mu', 'Population Mean (μ)', '50') +
         numInput('clt-sig', 'Population SD (σ)', '10', '0.001') +
         numInput('clt-n', 'Sample Size (n)', '30', '1', '1') + extra;
}

function renderCLTSE(c) {
  c.innerHTML = calcPanel('Standard Error of the Mean', '📉',
    cltInputs(), 'Calculate SE', 'calcCLTSE');
}
function calcCLTSE() {
  const mu = parseFloat(document.getElementById('clt-mu').value);
  const sig = parseFloat(document.getElementById('clt-sig').value);
  const n = parseInt(document.getElementById('clt-n').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(n)) return;
  const se = sig / Math.sqrt(n);
  showResult(resultCard('Standard Error', pRound(se), `
SE = σ / √n = ${sig} / √${n} = ${pRound(se)}

By CLT: X̄ ~ N(μ = ${mu}, SE = ${pRound(se)})`, false));
}

function renderCLTLt(c) {
  c.innerHTML = calcPanel('P(X̄ < x)', '📉',
    cltInputs(numInput('clt-x', 'Sample Mean value (x)', '48')),
    'Calculate', 'calcCLTLt');
}
function calcCLTLt() {
  const mu = parseFloat(document.getElementById('clt-mu').value);
  const sig = parseFloat(document.getElementById('clt-sig').value);
  const n = parseInt(document.getElementById('clt-n').value);
  const x = parseFloat(document.getElementById('clt-x').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(n)||isNaN(x)) return;
  const se = sig/Math.sqrt(n);
  const z = (x-mu)/se;
  const p = normalCDF(z);
  showResult(resultCard('P(X̄ < '+x+')', pRound(p), `
SE = σ/√n = ${sig}/√${n} = ${pRound(se)}
Z  = (x − μ) / SE = (${x} − ${mu}) / ${pRound(se)} = ${pRound(z)}
P(X̄ < ${x}) = P(Z < ${pRound(z)}) = ${pRound(p)}`));
}

function renderCLTGt(c) {
  c.innerHTML = calcPanel('P(X̄ > x)', '📉',
    cltInputs(numInput('clt-x', 'Sample Mean value (x)', '52')),
    'Calculate', 'calcCLTGt');
}
function calcCLTGt() {
  const mu = parseFloat(document.getElementById('clt-mu').value);
  const sig = parseFloat(document.getElementById('clt-sig').value);
  const n = parseInt(document.getElementById('clt-n').value);
  const x = parseFloat(document.getElementById('clt-x').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(n)||isNaN(x)) return;
  const se = sig/Math.sqrt(n);
  const z = (x-mu)/se;
  const p = 1 - normalCDF(z);
  showResult(resultCard('P(X̄ > '+x+')', pRound(p), `
SE = σ/√n = ${pRound(se)}
Z  = ${pRound(z)}
P(X̄ > ${x}) = 1 − P(Z < ${pRound(z)}) = ${pRound(p)}`));
}

function renderCLTBet(c) {
  c.innerHTML = calcPanel('P(a < X̄ < b)', '📉',
    cltInputs(numInput('clt-a','Lower bound (a)','48') + numInput('clt-b','Upper bound (b)','54')),
    'Calculate', 'calcCLTBet');
}
function calcCLTBet() {
  const mu = parseFloat(document.getElementById('clt-mu').value);
  const sig = parseFloat(document.getElementById('clt-sig').value);
  const n = parseInt(document.getElementById('clt-n').value);
  const a = parseFloat(document.getElementById('clt-a').value);
  const b = parseFloat(document.getElementById('clt-b').value);
  if (isNaN(mu)||isNaN(sig)||isNaN(n)||isNaN(a)||isNaN(b)) return;
  const se = sig/Math.sqrt(n);
  const za = (a-mu)/se, zb = (b-mu)/se;
  const p = normalCDF(zb)-normalCDF(za);
  showResult(resultCard('P('+a+' < X̄ < '+b+')', pRound(p), `
SE = ${pRound(se)}, Za = ${pRound(za)}, Zb = ${pRound(zb)}
P = ${pRound(normalCDF(zb))} − ${pRound(normalCDF(za))} = ${pRound(p)}`));
}

// ============================================================
// Ball & Urn Solver (kept from before)
// ============================================================
function renderUrnSolver(c) {
  c.innerHTML = `
    <div class="card" style="border-top: 4px solid var(--accent)">
      <h3 style="margin-bottom:16px;color:var(--text-primary)">📦 Ball & Urn Probability Solver</h3>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:20px; line-height: 1.5">
        Solve complex problems involving selecting multiple colored items from a container.
      </p>
      <div style="display:flex; gap:16px; margin-bottom:16px">
        <div style="flex:1"><label style="display:block;margin-bottom:8px;font-size:12px;font-weight:600;color:var(--text-secondary)">Red Balls</label>
          <input class="input-field" type="number" id="urn-red" value="8" min="0"/></div>
        <div style="flex:1"><label style="display:block;margin-bottom:8px;font-size:12px;font-weight:600;color:var(--text-secondary)">Blue Balls</label>
          <input class="input-field" type="number" id="urn-blue" value="5" min="0"/></div>
        <div style="flex:1"><label style="display:block;margin-bottom:8px;font-size:12px;font-weight:600;color:var(--text-secondary)">Green Balls</label>
          <input class="input-field" type="number" id="urn-green" value="7" min="0"/></div>
      </div>
      <div style="display:flex; gap:16px; margin-bottom:24px">
        <div style="flex:1"><label style="display:block;margin-bottom:8px;font-size:12px;font-weight:600;color:var(--text-secondary)">Balls Selected (n)</label>
          <input class="input-field" type="number" id="urn-draw" value="3" min="1"/></div>
        <div style="flex:1"><label style="display:block;margin-bottom:8px;font-size:12px;font-weight:600;color:var(--text-secondary)">Sampling Method</label>
          <select class="input-field" id="urn-replace">
            <option value="without" selected>Without Replacement</option>
            <option value="with">With Replacement</option>
          </select></div>
      </div>
      <button class="primary-btn" style="width:100%" onclick="calcUrnProbabilities()">Solve Problem</button>
    </div>
    <div id="urn-results-area" style="margin-top:24px"></div>
  `;
}

function mathComb(n, r) {
  if (r > n || r < 0) return 0;
  if (r === 0 || r === n) return 1;
  let res = 1;
  for (let i = 1; i <= r; i++) res = res * (n - i + 1) / i;
  return res;
}

function card(title, body) {
  return '<div class="card" style="margin-bottom:20px"><h4 style="margin-bottom:12px; color:var(--accent)">' + title + '</h4>' + body + '</div>';
}
function mono(text) { return '<p style="font-family:monospace; margin-top:8px">' + text + '</p>'; }

function calcUrnProbabilities() {
  const red   = parseInt(document.getElementById('urn-red').value)   || 0;
  const blue  = parseInt(document.getElementById('urn-blue').value)  || 0;
  const green = parseInt(document.getElementById('urn-green').value) || 0;
  const n     = parseInt(document.getElementById('urn-draw').value)  || 0;
  const replace = document.getElementById('urn-replace').value === 'with';
  const N = red + blue + green;
  if (N === 0 || n <= 0 || (!replace && n > N)) {
    document.getElementById('urn-results-area').innerHTML = '<div class="card"><p style="color:var(--wrong-color)">Invalid parameters.</p></div>'; return;
  }
  const totalWays = replace ? Math.pow(N, n) : mathComb(N, n);
  const pRed_ = red/N, pBlue_ = blue/N, pGreen_ = green/N;
  let html = '';
  html += '<div class="card" style="margin-bottom:20px; border-left:4px solid var(--accent-2)"><h4 style="margin-bottom:8px">📖 Sampling ' + (replace?'With':'Without') + ' Replacement</h4><p>' + (replace?'Events are <strong>independent</strong> — ball returned after each draw.':'Events are <strong>dependent</strong> — ball NOT returned, total decreases each draw.') + '</p></div>';
  // (a) Total ways
  html += card('(a) Total ways to select ' + n + ' balls', '<p>' + (replace?'Each draw has '+N+' outcomes:':'Choosing without replacement:') + '</p>' + mono((replace ? N+'^'+n+'='+totalWays : N+'C'+n+' = '+totalWays)));
  // (b) All Red
  const waysAllRed = mathComb(red, n), pAllRed = replace ? Math.pow(pRed_,n) : waysAllRed/totalWays;
  html += card('(b) P(All '+n+' balls are Red)', mono(replace ? 'P=('+red+'/'+N+')^'+n+'=<strong>'+pRound(pAllRed)+'</strong>' : red+'C'+n+'/'+N+'C'+n+'='+waysAllRed+'/'+totalWays+'=<strong>'+pRound(pAllRed)+'</strong>'));
  // (c) Exactly 2 Blue
  if (n>=2) {
    const w2b = mathComb(blue,2)*mathComb(N-blue,n-2), p2b = replace ? mathComb(n,2)*Math.pow(pBlue_,2)*Math.pow(1-pBlue_,n-2) : w2b/totalWays;
    html += card('(c) P(Exactly 2 Blue)', mono(replace ? n+'C2×('+blue+'/'+N+')²×('+((N-blue))+'/'+N+')^'+(n-2)+'=<strong>'+pRound(p2b)+'</strong>' : '('+blue+'C2×'+(N-blue)+'C'+(n-2)+')/'+N+'C'+n+'='+w2b+'/'+totalWays+'=<strong>'+pRound(p2b)+'</strong>'));
  }
  // (d) All different (n=3)
  if (n===3) {
    const wd = red*blue*green, pd = replace ? 6*pRed_*pBlue_*pGreen_ : wd/totalWays;
    html += card('(d) P(All 3 different colours)', mono(replace ? '3!×('+red+'/'+N+')×('+blue+'/'+N+')×('+green+'/'+N+')=<strong>'+pRound(pd)+'</strong>' : '('+red+'×'+blue+'×'+green+')/'+N+'C3='+wd+'/'+totalWays+'=<strong>'+pRound(pd)+'</strong>'));
  }
  // (e) At least 1 Green
  const wng = mathComb(N-green,n), png = replace ? Math.pow(1-pGreen_,n) : wng/totalWays, pa1g = 1-png;
  html += card('(e) P(At least 1 Green)', '<p>Complement: 1 − P(No Green)</p>' + mono('P(No Green)='+pRound(png)+'<br>P(At least 1)=1−'+pRound(png)+'=<strong>'+pRound(pa1g)+'</strong>'));
  // (f) Conditional
  if (n>=2 && pa1g>0) {
    const pe2g = replace ? mathComb(n,2)*Math.pow(pGreen_,2)*Math.pow(1-pGreen_,n-2) : (mathComb(green,2)*mathComb(N-green,n-2))/totalWays;
    html += card('(f) P(Exactly 2 Green | At least 1 Green)', '<p>P(A|B) = P(A∩B)/P(B)</p>' + mono('='+pRound(pe2g)+'/'+pRound(pa1g)+'=<strong>'+pRound(pe2g/pa1g)+'</strong>'));
  }
  // (g,h,i) E(X), Var(X)
  const eX = n*(red/N), varX = replace ? n*(red/N)*(1-red/N) : n*(red/N)*((N-red)/N)*((N-n)/(N-1)), sdX = Math.sqrt(varX);
  html += card('(g,h,i) E(X), Var(X), SD(X) — Red Balls', '<p>X ~ ' + (replace?'Binomial':'Hypergeometric') + '</p>' + mono('E(X) = n×(K/N) = '+n+'×('+red+'/'+N+') = <strong>'+pRound(eX)+'</strong>') + mono('Var(X) = <strong>'+pRound(varX)+'</strong>') + mono('SD(X) = <strong>'+pRound(sdX)+'</strong>'));
  // (j) 1st Red, 2nd Blue
  if (n>=2) {
    const pj = replace ? (red/N)*(blue/N) : (red/N)*(blue/(N-1));
    html += card('(j) P(1st Red AND 2nd Blue)', mono((replace?'('+red+'/'+N+')×('+blue+'/'+N+')':'('+red+'/'+N+')×('+blue+'/'+(N-1)+')')+'=<strong>'+pRound(pj)+'</strong>'));
  }
  // (k) 2nd Red | 1st Blue
  if (n>=2) {
    const pk = replace ? red/N : red/(N-1);
    html += card('(k) P(2nd Red | 1st Blue)', mono((replace?red+'/'+N+' (independent)':red+'/'+(N-1)+' (1 blue removed)')+'=<strong>'+pRound(pk)+'</strong>'));
  }
  // (l) With replacement comparison
  const pAllRedWith = Math.pow(red/N, n);
  html += card('(l) With Replacement — P(All '+n+' Red)', mono('('+red+'/'+N+')^'+n+' = <strong>'+pRound(pAllRedWith)+'</strong>'));
  document.getElementById('urn-results-area').innerHTML = html;
}