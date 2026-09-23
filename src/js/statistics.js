// ============================================================
// StatLab — Statistics Lab
// ============================================================

let statsData = [];
let statsCurrentTab = 'results';
let statsChart = null;
let statsChartType = 'bar';

function renderStatistics(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>📊 Statistics Lab</h1>
      <p>Enter your data and get full descriptive statistics with step-by-step working</p>
    </div>

    <div class="card stats-full" style="margin-bottom:24px">
      <p class="section-title">Enter Data</p>
      <textarea class="data-input-area" id="stats-data-input"
        placeholder="Enter numbers separated by commas or spaces, e.g: 12, 15, 18, 20, 20, 22, 25"></textarea>
      <div class="btn-group" style="margin-top:12px">
        <button class="primary-btn" onclick="computeStats()">Calculate ∑</button>
        <button class="secondary-btn" onclick="clearStats()">Clear</button>
        <button class="secondary-btn" onclick="loadSampleData()">Load Sample Data</button>
      </div>
    </div>

    <div id="stats-output" class="hidden">
      <div class="tabs">
        <button class="tab-btn ${statsCurrentTab==='results'?'active':''}" onclick="switchStatsTab('results')">📋 Results</button>
        <button class="tab-btn ${statsCurrentTab==='steps'?'active':''}" onclick="switchStatsTab('steps')">🔍 Show Steps</button>
        <button class="tab-btn ${statsCurrentTab==='meaning'?'active':''}" onclick="switchStatsTab('meaning')">💡 Meaning</button>
        <button class="tab-btn ${statsCurrentTab==='charts'?'active':''}" onclick="switchStatsTab('charts')">📈 Charts</button>
        <button class="tab-btn ${statsCurrentTab==='freq'?'active':''}" onclick="switchStatsTab('freq')">📋 Freq. Table</button>
      </div>

      <div id="stats-tab-content"></div>
    </div>
  `;
}

function loadSampleData() {
  document.getElementById('stats-data-input').value = '12, 15, 18, 20, 20, 22, 25, 28, 30, 18, 22, 15';
}

function clearStats() {
  document.getElementById('stats-data-input').value = '';
  document.getElementById('stats-output').classList.add('hidden');
  statsData = [];
}

function parseData(input) {
  return input.split(/[\s,;]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
}

function computeStats() {
  const raw = document.getElementById('stats-data-input').value;
  statsData = parseData(raw);
  if (statsData.length === 0) {
    alert('Please enter valid numbers.');
    return;
  }
  document.getElementById('stats-output').classList.remove('hidden');
  switchStatsTab('results');
}

function switchStatsTab(tab) {
  statsCurrentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase().includes(
      tab === 'results' ? 'results' :
      tab === 'steps'   ? 'steps'   :
      tab === 'meaning' ? 'meaning' :
      tab === 'charts'  ? 'charts'  : 'freq'
    ));
  });

  const content = document.getElementById('stats-tab-content');
  const s = computeAllStats(statsData);

  if (tab === 'results')  renderStatsResults(content, s);
  if (tab === 'steps')    renderStatsSteps(content, s);
  if (tab === 'meaning')  renderStatsMeaning(content, s);
  if (tab === 'charts')   renderStatsCharts(content, s);
  if (tab === 'freq')     renderFreqTable(content, s);
}

// ── Core Stats Engine ────────────────────────────────────────
function computeAllStats(data) {
  const sorted = [...data].sort((a, b) => a - b);
  const n = data.length;
  const sum = data.reduce((a, b) => a + b, 0);
  const mean = sum / n;

  // Median
  let median;
  if (n % 2 === 0) median = (sorted[n/2 - 1] + sorted[n/2]) / 2;
  else median = sorted[Math.floor(n/2)];

  // Mode
  const freq = {};
  data.forEach(v => freq[v] = (freq[v] || 0) + 1);
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.keys(freq).filter(k => freq[k] === maxFreq).map(Number);

  // Variance & SD
  const sumSqDiff = data.reduce((a, v) => a + (v - mean) ** 2, 0);
  const varPop  = sumSqDiff / n;
  const varSamp = n > 1 ? sumSqDiff / (n - 1) : 0;
  const sdPop   = Math.sqrt(varPop);
  const sdSamp  = Math.sqrt(varSamp);

  // Quartiles (inclusive method)
  const q1 = percentile(sorted, 25);
  const q2 = percentile(sorted, 50);
  const q3 = percentile(sorted, 75);
  const iqr = q3 - q1;

  // Range
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;

  // Skewness (Pearson's)
  const skewness = sdPop !== 0 ? (3 * (mean - median)) / sdPop : 0;

  // Mean Deviations
  const sumMdMean = data.reduce((a, v) => a + Math.abs(v - mean), 0);
  const sumMdMedian = data.reduce((a, v) => a + Math.abs(v - median), 0);
  const mdMean = sumMdMean / n;
  const mdMedian = sumMdMedian / n;

  // Coefficient of Variation
  const cv = mean !== 0 ? (sdSamp / mean) * 100 : 0;

  return { data, sorted, n, sum, mean, median, modes, freq,
           varPop, varSamp, sdPop, sdSamp, q1, q2, q3, iqr,
           min, max, range, sumSqDiff, skewness,
           mdMean, mdMedian, cv };
}

function percentile(sorted, p) {
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

function r(n, d = 4) { return parseFloat(n.toFixed(d)); }

// ── Results Tab ─────────────────────────────────────────────
function renderStatsResults(container, s) {
  const items = [
    ['Count (n)',        s.n],
    ['Sum (Σx)',         r(s.sum)],
    ['Mean (x̄)',         r(s.mean)],
    ['Median',           r(s.median)],
    ['Mode',             s.modes.join(', ')],
    ['Range',            r(s.range)],
    ['Min',              r(s.min)],
    ['Max',              r(s.max)],
    ['Mean Dev (Mean)',  r(s.mdMean)],
    ['Mean Dev (Median)',r(s.mdMedian)],
    ['Variance (samp)',  r(s.varSamp)],
    ['Std Dev (samp) s', r(s.sdSamp)],
    ['Coeff of Var (CV)',r(s.cv) + '%'],
    ['Q1',               r(s.q1)],
    ['Q2 (Median)',      r(s.q2)],
    ['Q3',               r(s.q3)],
    ['IQR',              r(s.iqr)],
    ['Skewness',         r(s.skewness)],
  ];

  container.innerHTML = `
    <div class="stats-results-grid">
      ${items.map(([label, val]) => `
        <div class="stat-card">
          <div class="stat-label">${label}</div>
          <div class="stat-value">${val}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Steps Tab ───────────────────────────────────────────────
function renderStatsSteps(container, s) {
  const deviations = s.data.map(v => r(v - s.mean, 4));
  const sqDeviations = s.data.map(v => r((v - s.mean)**2, 4));

  container.innerHTML = `
    <div class="steps-panel">
      <div class="step-header">Step 1 — Count & Sum</div>
Data: ${s.data.join(', ')}
n = ${s.n}
Σx = ${s.data.join(' + ')} = ${r(s.sum)}

<div class="step-header">Step 2 — Mean</div>
x̄ = Σx / n
  = ${r(s.sum)} / ${s.n}
  = ${r(s.mean)}

<div class="step-header">Step 3 — Median</div>
Sorted data: ${s.sorted.join(', ')}
n = ${s.n} (${s.n % 2 === 0 ? 'even' : 'odd'})
${s.n % 2 === 0
  ? `Median = (${s.sorted[s.n/2-1]} + ${s.sorted[s.n/2]}) / 2 = ${r(s.median)}`
  : `Median = middle value = ${r(s.median)}`
}

<div class="step-header">Step 4 — Mode</div>
Frequencies: ${Object.entries(s.freq).map(([k,v])=>`${k}→${v}`).join(', ')}
Highest frequency: ${Math.max(...Object.values(s.freq))}
Mode(s): ${s.modes.join(', ')}

<div class="step-header">Step 5 — Variance & Standard Deviation</div>
Deviations from mean (xᵢ - x̄):
${s.data.map((v,i) => `  ${v} - ${r(s.mean)} = ${deviations[i]}`).join('\n')}

Squared deviations (xᵢ - x̄)²:
${s.data.map((v,i) => `  ${deviations[i]}² = ${sqDeviations[i]}`).join('\n')}

Σ(xᵢ - x̄)² = ${r(s.sumSqDiff)}

Population Variance σ² = Σ(xᵢ-x̄)² / n = ${r(s.sumSqDiff)} / ${s.n} = ${r(s.varPop)}
Sample Variance    s²  = Σ(xᵢ-x̄)² / (n-1) = ${r(s.sumSqDiff)} / ${s.n-1} = ${r(s.varSamp)}

Population SD σ = √${r(s.varPop)} = ${r(s.sdPop)}
Sample SD     s = √${r(s.varSamp)} = ${r(s.sdSamp)}

<div class="step-header">Step 6 — Quartiles & IQR</div>
Sorted: ${s.sorted.join(', ')}
Q1 (25th percentile) = ${r(s.q1)}
Q2 (50th percentile) = ${r(s.q2)}
Q3 (75th percentile) = ${r(s.q3)}
IQR = Q3 - Q1 = ${r(s.q3)} - ${r(s.q1)} = ${r(s.iqr)}
    </div>
  `;
}

// ── Meaning Tab ─────────────────────────────────────────────
function renderStatsMeaning(container, s) {
  const skewDesc = s.skewness > 0.5 ? 'positively skewed (tail on the right)' :
                   s.skewness < -0.5 ? 'negatively skewed (tail on the left)' :
                   'approximately symmetric';

  container.innerHTML = `
    <div class="meaning-panel">
      <div class="meaning-title">📖 What Do Your Results Mean?</div>
      <p><strong>Mean (${r(s.mean)}):</strong> On average, the values in your dataset are ${r(s.mean)}. This is the balancing point of your data.</p>
      <br/>
      <p><strong>Median (${r(s.median)}):</strong> Half the values fall below ${r(s.median)} and half above. ${Math.abs(s.mean - s.median) > s.sdPop * 0.1 ? 'The mean and median differ, suggesting the data may be skewed.' : 'The mean and median are close, suggesting your data is roughly symmetric.'}</p>
      <br/>
      <p><strong>Mode (${s.modes.join(', ')}):</strong> ${s.modes.length === 1 ? `The value ${s.modes[0]} appears most often (${s.freq[s.modes[0]]} times).` : `Multiple modes exist, meaning no single value dominates the dataset.`}</p>
      <br/>
      <p><strong>Standard Deviation (σ = ${r(s.sdPop)}):</strong> The data values typically vary about ${r(s.sdPop)} units from the mean of ${r(s.mean)}. ${s.sdPop < s.mean * 0.2 ? 'This is relatively small — your data is tightly clustered.' : s.sdPop > s.mean * 0.5 ? 'This is relatively large — your data is spread out.' : 'This indicates moderate spread around the mean.'}</p>
      <br/>
      <p><strong>IQR (${r(s.iqr)}):</strong> The middle 50% of your data spans a range of ${r(s.iqr)} units (from ${r(s.q1)} to ${r(s.q3)}). Values below ${r(s.q1 - 1.5 * s.iqr)} or above ${r(s.q3 + 1.5 * s.iqr)} may be outliers.</p>
      <br/>
      <p><strong>Skewness (${r(s.skewness)}):</strong> Your data is ${skewDesc}.</p>
      <br/>
      <div style="padding:16px;background:var(--accent-2);border-radius:8px;color:#fff;margin-top:12px;">
        <h4 style="margin-bottom:8px">💡 Best Measure of Central Tendency</h4>
        <p>${
          Math.abs(s.skewness) > 0.5 
            ? 'Because your data is skewed (it has extreme values pulling the mean), the <strong>Median</strong> is the most appropriate measure of central tendency. The mean is too sensitive to outliers.' 
            : 'Because your data is roughly symmetric and not heavily skewed, the <strong>Mean</strong> is the most appropriate measure of central tendency.'
        }</p>
      </div>
    </div>
  `;
}

// ── Charts Tab ──────────────────────────────────────────────
function renderStatsCharts(container, s) {
  container.innerHTML = `
    <div class="chart-type-selector">
      ${['bar','histogram','pie','box'].map(t => `
        <button class="chart-type-btn ${statsChartType===t?'active':''}"
          onclick="changeStatsChart('${t}')">${t.charAt(0).toUpperCase()+t.slice(1)}</button>
      `).join('')}
    </div>
    <div class="chart-container">
      <canvas id="stats-chart-canvas"></canvas>
    </div>
    ${statsChartType === 'box' ? renderBoxPlot(s) : ''}
  `;
  drawStatsChart(s);
}

function changeStatsChart(type) {
  statsChartType = type;
  const s = computeAllStats(statsData);
  renderStatsCharts(document.getElementById('stats-tab-content'), s);
}

function drawStatsChart(s) {
  if (statsChart) { statsChart.destroy(); statsChart = null; }
  const canvas = document.getElementById('stats-chart-canvas');
  if (!canvas) return;

  if (statsChartType === 'box') { canvas.style.display = 'none'; return; }

  const isDarkMode = document.body.classList.contains('dark-mode');
  const gridColor = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const labelColor = isDarkMode ? '#9b97c5' : '#5b5380';

  const accent = '#7c6aff';
  const accent2 = '#ff6ab0';

  let config;
  if (statsChartType === 'bar') {
    const labels = Object.keys(s.freq).sort((a,b)=>a-b);
    config = {
      type: 'bar',
      data: {
        labels,
        datasets: [{ label: 'Frequency', data: labels.map(l => s.freq[l]),
          backgroundColor: labels.map((_, i) => `hsl(${240 + i*25},70%,65%)`),
          borderRadius: 6, borderSkipped: false }]
      },
      options: { responsive: true, plugins: { legend: { display: false } },
        scales: { x: { grid: { color: gridColor }, ticks: { color: labelColor } },
                  y: { grid: { color: gridColor }, ticks: { color: labelColor } } } }
    };
  } else if (statsChartType === 'histogram') {
    const bins = buildHistogramBins(s.data, 8);
    config = {
      type: 'bar',
      data: {
        labels: bins.map(b => `${r(b.from,2)}–${r(b.to,2)}`),
        datasets: [{ label: 'Frequency', data: bins.map(b => b.count),
          backgroundColor: accent + 'aa', borderColor: accent, borderWidth: 1,
          borderRadius: 4, borderSkipped: false }]
      },
      options: { responsive: true, plugins: { legend: { display: false } },
        scales: { x: { grid: { color: gridColor }, ticks: { color: labelColor } },
                  y: { grid: { color: gridColor }, ticks: { color: labelColor } } } }
    };
  } else if (statsChartType === 'pie') {
    const labels = Object.keys(s.freq);
    config = {
      type: 'pie',
      data: {
        labels,
        datasets: [{ data: labels.map(l => s.freq[l]),
          backgroundColor: labels.map((_, i) => `hsl(${240 + i*35},65%,65%)`),
          borderWidth: 2, borderColor: isDarkMode ? '#0d0d1a' : '#fff' }]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: labelColor } } } }
    };
  }

  if (config) statsChart = new Chart(canvas, config);
}

function buildHistogramBins(data, numBins) {
  const min = Math.min(...data), max = Math.max(...data);
  const width = (max - min) / numBins;
  const bins = Array.from({ length: numBins }, (_, i) => ({
    from: min + i * width, to: min + (i + 1) * width, count: 0
  }));
  data.forEach(v => {
    const idx = Math.min(Math.floor((v - min) / width), numBins - 1);
    bins[idx].count++;
  });
  return bins;
}

function renderBoxPlot(s) {
  const total = s.max - s.min || 1;
  const pct = v => ((v - s.min) / total * 100).toFixed(1);
  const q1p = pct(s.q1), medp = pct(s.median), q3p = pct(s.q3);
  const minp = pct(s.min), maxp = pct(s.max);

  return `
    <div style="margin-top:24px;padding:24px;background:var(--bg-input);border:1px solid var(--border);border-radius:14px;">
      <p class="section-title" style="margin-bottom:20px">Box-and-Whisker Plot</p>
      <div style="position:relative;height:60px;margin:0 20px">
        <!-- Whiskers -->
        <div style="position:absolute;left:${minp}%;top:22px;width:${q1p-minp}%;height:2px;background:var(--accent)"></div>
        <div style="position:absolute;left:${q3p}%;top:22px;width:${maxp-q3p}%;height:2px;background:var(--accent)"></div>
        <!-- Box -->
        <div style="position:absolute;left:${q1p}%;top:8px;width:${q3p-q1p}%;height:30px;background:rgba(124,106,255,0.2);border:2px solid var(--accent);border-radius:4px"></div>
        <!-- Median line -->
        <div style="position:absolute;left:${medp}%;top:8px;width:3px;height:30px;background:var(--accent-2)"></div>
        <!-- Labels -->
        <div style="position:absolute;left:${minp}%;bottom:-20px;transform:translateX(-50%);font-size:11px;color:var(--text-muted)">${r(s.min)}</div>
        <div style="position:absolute;left:${q1p}%;bottom:-20px;transform:translateX(-50%);font-size:11px;color:var(--text-secondary)">Q1=${r(s.q1)}</div>
        <div style="position:absolute;left:${medp}%;bottom:-20px;transform:translateX(-50%);font-size:11px;color:var(--accent-2)">Med=${r(s.median)}</div>
        <div style="position:absolute;left:${q3p}%;bottom:-20px;transform:translateX(-50%);font-size:11px;color:var(--text-secondary)">Q3=${r(s.q3)}</div>
        <div style="position:absolute;left:${maxp}%;bottom:-20px;transform:translateX(-50%);font-size:11px;color:var(--text-muted)">${r(s.max)}</div>
      </div>
    </div>
  `;
}

// ── Frequency Table Tab ──────────────────────────────────────
function renderFreqTable(container, s) {
  const sorted = Object.keys(s.freq).map(Number).sort((a,b)=>a-b);
  let cumFreq = 0;
  let sumFx = 0;
  const rows = sorted.map(v => {
    const f = s.freq[v];
    const fx = v * f;
    cumFreq += f;
    sumFx += fx;
    return { v, f, fx: r(fx), rf: r(f / s.n, 4), cf: cumFreq, rcp: r(cumFreq / s.n * 100, 2) };
  });

  container.innerHTML = `
    <div class="card">
      <p class="section-title" style="margin-bottom:16px">Frequency Distribution Table</p>
      <div style="overflow-x:auto">
        <table class="freq-table">
          <thead>
            <tr>
              <th>Value (x)</th>
              <th>Frequency (f)</th>
              <th>fx</th>
              <th>Relative Freq</th>
              <th>Cum Freq</th>
              <th>Cum %</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                <td>${row.v}</td>
                <td>${row.f}</td>
                <td>${row.fx}</td>
                <td>${row.rf}</td>
                <td>${row.cf}</td>
                <td>${row.rcp}%</td>
              </tr>
            `).join('')}
            <tr style="font-weight:700">
              <td>Total</td>
              <td>Σf = ${s.n}</td>
              <td>Σfx = ${sumFx}</td>
              <td>1.0000</td>
              <td>${s.n}</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-top:20px;padding:16px;background:var(--bg-input);border-radius:8px;">
        <p style="font-weight:600;margin-bottom:8px">Grouped Mean Calculation</p>
        <p>Mean (x̄) = Σfx / Σf = ${sumFx} / ${s.n} = <strong>${r(sumFx / s.n)}</strong></p>
        <p style="font-size:13px;color:var(--text-muted);margin-top:4px">Notice that this grouped calculation matches the arithmetic mean calculated in part (a).</p>
      </div>
    </div>
  `;
}
