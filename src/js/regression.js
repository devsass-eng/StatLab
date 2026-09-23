// ============================================================
// StatLab — Linear Regression & Correlation
// ============================================================

let regressionChart = null;

function renderRegression(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>📉 Linear Regression</h1>
      <p>Analyze bivariate data to find correlation (r), coefficient of determination (r²), and the line of best fit.</p>
    </div>

    <div class="dist-layout">
      <!-- Left Panel: Data Entry -->
      <div style="flex: 1;">
        <div class="card" style="margin-bottom:20px">
          <p class="section-title">Enter Bivariate Data</p>
          <div class="input-group">
            <label>X Variable (Independent)</label>
            <textarea class="data-input-area" id="reg-x-data" style="min-height:80px"
              placeholder="e.g. 1, 2, 3, 4, 5"></textarea>
          </div>
          <div class="input-group" style="margin-top:16px">
            <label>Y Variable (Dependent)</label>
            <textarea class="data-input-area" id="reg-y-data" style="min-height:80px"
              placeholder="e.g. 2.1, 4.3, 6.2, 8.5, 10.1"></textarea>
          </div>
          <button class="primary-btn" style="width:100%;margin-top:20px" onclick="calcRegression()">Calculate Regression</button>
        </div>

        <div id="reg-stats-area"></div>
      </div>

      <!-- Right Panel: Visual & Interpretation -->
      <div style="flex: 1.5;">
        <div class="card">
          <p class="section-title">Scatterplot & Line of Best Fit</p>
          <div class="chart-container" style="height:350px">
            <canvas id="reg-chart"></canvas>
          </div>
        </div>

        <div id="reg-interpretation-area"></div>
      </div>
    </div>
  `;
}

function calcRegression() {
  const xStr = document.getElementById('reg-x-data').value.split(',').map(s=>parseFloat(s.trim()));
  const yStr = document.getElementById('reg-y-data').value.split(',').map(s=>parseFloat(s.trim()));

  const xData = xStr.filter(v => !isNaN(v));
  const yData = yStr.filter(v => !isNaN(v));

  if (xData.length === 0 || yData.length === 0 || xData.length !== yData.length || xData.length < 2) {
    alert("Please enter equal-length valid comma-separated lists for X and Y, with at least 2 points.");
    return;
  }

  const n = xData.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += xData[i];
    sumY += yData[i];
    sumXY += xData[i] * yData[i];
    sumX2 += xData[i] * xData[i];
    sumY2 += yData[i] * yData[i];
  }

  const meanX = sumX / n;
  const meanY = sumY / n;

  // Correlation Coefficient (r)
  const numerator = (n * sumXY) - (sumX * sumY);
  const denX = Math.sqrt((n * sumX2) - (sumX * sumX));
  const denY = Math.sqrt((n * sumY2) - (sumY * sumY));
  
  let r = 0;
  if (denX !== 0 && denY !== 0) {
    r = numerator / (denX * denY);
  }
  
  const r2 = r * r;

  // Line of Best Fit (y = mx + c)
  let m = 0;
  if (denX !== 0) {
    m = numerator / ((n * sumX2) - (sumX * sumX));
  }
  const c = meanY - m * meanX;

  // Render Stats
  document.getElementById('reg-stats-area').innerHTML = `
    <div class="card">
      <p class="section-title">Statistical Output</p>
      <div class="result-box" style="margin-top:0">
        <div class="result-label">Line of Best Fit</div>
        <div class="result-value">ŷ = ${m.toFixed(4)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c).toFixed(4)}</div>
      </div>
      <div class="result-box" style="margin-top:12px; background:var(--bg-lighter);">
        <div class="result-label">Pearson Correlation (r)</div>
        <div class="result-value">${r.toFixed(4)}</div>
      </div>
      <div class="result-box" style="margin-top:12px; background:var(--bg-lighter);">
        <div class="result-label">Coefficient of Determination (r²)</div>
        <div class="result-value">${r2.toFixed(4)} (${(r2*100).toFixed(1)}%)</div>
      </div>
    </div>
  `;

  // Render Interpretation
  let corrStrength = "weak";
  if (Math.abs(r) >= 0.8) corrStrength = "strong";
  else if (Math.abs(r) >= 0.5) corrStrength = "moderate";

  let corrDir = r > 0 ? "positive" : (r < 0 ? "negative" : "no");

  document.getElementById('reg-interpretation-area').innerHTML = `
    <div class="card" style="margin-top:20px; border-left: 4px solid var(--accent)">
      <p class="section-title">Interpretation</p>
      <p style="margin-bottom:8px"><strong>Correlation:</strong> There is a <strong>${corrStrength} ${corrDir}</strong> linear relationship between X and Y (r = ${r.toFixed(3)}).</p>
      <p style="margin-bottom:8px"><strong>Explanation of r²:</strong> ${(r2*100).toFixed(1)}% of the variation in the dependent variable (Y) can be explained by the variation in the independent variable (X).</p>
      <p><strong>Equation:</strong> For every 1 unit increase in X, Y changes by ${m.toFixed(4)} units on average.</p>
    </div>
  `;

  // Draw Chart
  drawRegChart(xData, yData, m, c);
}

function drawRegChart(xData, yData, m, c) {
  const ctx = document.getElementById('reg-chart').getContext('2d');
  
  if (regressionChart) {
    regressionChart.destroy();
  }

  const scatterPoints = xData.map((x, i) => ({ x: x, y: yData[i] }));
  
  // Calculate line points
  const minX = Math.min(...xData);
  const maxX = Math.max(...xData);
  
  // Buffer space
  const rangeX = maxX - minX;
  const startX = minX - (rangeX * 0.1);
  const endX = maxX + (rangeX * 0.1);

  const linePoints = [
    { x: startX, y: m * startX + c },
    { x: endX, y: m * endX + c }
  ];

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();

  regressionChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Data Points',
          data: scatterPoints,
          backgroundColor: primaryColor,
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          type: 'line',
          label: 'Line of Best Fit',
          data: linePoints,
          borderColor: 'rgba(239, 68, 68, 0.8)', // Red line
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: { display: true, text: 'X Variable', color: textColor },
          ticks: { color: textColor },
          grid: { color: 'rgba(128, 128, 128, 0.1)' }
        },
        y: {
          title: { display: true, text: 'Y Variable', color: textColor },
          ticks: { color: textColor },
          grid: { color: 'rgba(128, 128, 128, 0.1)' }
        }
      },
      plugins: {
        legend: { labels: { color: textColor } }
      }
    }
  });
}
