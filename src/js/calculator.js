// ============================================================
// StatLab — Scientific Calculator
// ============================================================

let calcExpression = '';
let calcHistory = JSON.parse(localStorage.getItem('calc-history') || '[]');
let calcMode = 'DEG'; // DEG or RAD

function renderCalculator(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>🧮 Scientific Calculator</h1>
      <p>Full scientific calculator with live preview and history</p>
    </div>
    <div class="calculator-wrapper">
      <div>
        <div class="calc-mode-toggle">
          <button class="mode-btn ${calcMode==='DEG'?'active':''}" id="calc-deg-btn" onclick="setCalcMode('DEG')">DEG</button>
          <button class="mode-btn ${calcMode==='RAD'?'active':''}" id="calc-rad-btn" onclick="setCalcMode('RAD')">RAD</button>
        </div>
        <div class="calc-display">
          <div class="calc-expression" id="calc-expr-display"></div>
          <div class="calc-result" id="calc-result-display">0</div>
        </div>

        <!-- Scientific Row -->
        <div class="calc-grid calc-grid-sci">
          ${[
            ['sin',  'sin('],   ['cos',  'cos('],   ['tan',  'tan('],
            ['sin⁻¹','asin('],  ['cos⁻¹','acos('],  ['tan⁻¹','atan('],
            ['log',  'log('],   ['ln',   'ln('],    ['√',    'sqrt('],
            ['x²',  '^2'],      ['xⁿ',  '^'],       ['ⁿ√',   'nthRoot('],
            ['π',   'pi'],      ['e',   'e'],        ['n!',  '!'],
            ['nCr', 'nCr('],    ['nPr', 'nPr('],    ['|x|', 'abs('],
            ['MC',  'MC'],      ['MR',  'MR'],       ['M+',  'M+'],     ['M−','M-'],    ['(',  '('],
          ].map(([label, val]) => `
            <button class="calc-btn sci" onclick="calcPress('${val}', '${label}')">${label}</button>
          `).join('')}
        </div>

        <!-- Basic Keypad -->
        <div class="calc-grid calc-grid-basic" style="margin-top:10px">
          <button class="calc-btn danger" onclick="calcClear()">AC</button>
          <button class="calc-btn op"     onclick="calcPress(')')">)</button>
          <button class="calc-btn op"     onclick="calcPress('%')">%</button>
          <button class="calc-btn op accent" onclick="calcPress('÷')">÷</button>

          <button class="calc-btn" onclick="calcPress('7')">7</button>
          <button class="calc-btn" onclick="calcPress('8')">8</button>
          <button class="calc-btn" onclick="calcPress('9')">9</button>
          <button class="calc-btn op accent" onclick="calcPress('×')">×</button>

          <button class="calc-btn" onclick="calcPress('4')">4</button>
          <button class="calc-btn" onclick="calcPress('5')">5</button>
          <button class="calc-btn" onclick="calcPress('6')">6</button>
          <button class="calc-btn op accent" onclick="calcPress('-')">−</button>

          <button class="calc-btn" onclick="calcPress('1')">1</button>
          <button class="calc-btn" onclick="calcPress('2')">2</button>
          <button class="calc-btn" onclick="calcPress('3')">3</button>
          <button class="calc-btn op accent" onclick="calcPress('+')">+</button>

          <button class="calc-btn op" onclick="calcToggleSign()">±</button>
          <button class="calc-btn" onclick="calcPress('0')">0</button>
          <button class="calc-btn" onclick="calcPress('.')">.</button>
          <button class="calc-btn accent" onclick="calcEvaluate()">=</button>

          <button class="calc-btn op" style="grid-column:span 4" onclick="calcBackspace()">⌫ Backspace</button>
        </div>
      </div>

      <!-- History Panel -->
      <div class="calc-history">
        <h3>History</h3>
        <div class="history-list" id="calc-history-list"></div>
        <button class="clear-history-btn" onclick="clearCalcHistory()">Clear History</button>
      </div>
    </div>
  `;
  renderCalcHistory();
  updateCalcDisplay();
}

// ── Memory ──────────────────────────────────────────────────
let calcMemory = 0;

function setCalcMode(mode) {
  calcMode = mode;
  document.querySelectorAll('#calc-deg-btn, #calc-rad-btn').forEach(btn => {
    btn.classList.toggle('active', btn.id === `calc-${mode.toLowerCase()}-btn`);
  });
}

// ── Input Handling ───────────────────────────────────────────
function calcPress(val, label) {
  if (val === 'MC') { calcMemory = 0; return; }
  if (val === 'MR') { calcExpression += calcMemory; updateCalcDisplay(); return; }
  if (val === 'M+') {
    try { calcMemory += parseFloat(evaluateExpression(calcExpression) || 0); } catch(e){}
    return;
  }
  if (val === 'M-') {
    try { calcMemory -= parseFloat(evaluateExpression(calcExpression) || 0); } catch(e){}
    return;
  }
  if (val === 'pi') { calcExpression += 'π'; }
  else calcExpression += val;
  updateCalcDisplay();
}

function calcClear() { calcExpression = ''; updateCalcDisplay(); }

function calcBackspace() {
  calcExpression = calcExpression.slice(0, -1);
  updateCalcDisplay();
}

function calcToggleSign() {
  if (calcExpression.startsWith('-')) calcExpression = calcExpression.slice(1);
  else calcExpression = '-' + calcExpression;
  updateCalcDisplay();
}

function calcEvaluate() {
  if (!calcExpression) return;
  try {
    const result = evaluateExpression(calcExpression);
    const entry = { expr: calcExpression, result };
    calcHistory.unshift(entry);
    if (calcHistory.length > 30) calcHistory.pop();
    localStorage.setItem('calc-history', JSON.stringify(calcHistory));
    renderCalcHistory();

    document.getElementById('calc-expr-display').textContent = calcExpression + ' =';
    const rd = document.getElementById('calc-result-display');
    rd.textContent = formatNumber(result);
    rd.className = 'calc-result';
    calcExpression = String(result);
  } catch(e) {
    document.getElementById('calc-result-display').textContent = 'Error: ' + e.message;
    document.getElementById('calc-result-display').className = 'calc-result error';
  }
}

function evaluateExpression(expr) {
  // Pre-process the expression for math.js
  let e = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'pi')
    .replace(/(\d+)!/g, 'factorial($1)')
    .replace(/(\d+)nCr\((\d+)/g, 'combinations($1,$2')
    .replace(/(\d+)nPr\((\d+)/g, 'permutations($1,$2')
    .replace(/nCr\((\d+),\s*(\d+)\)/g, 'combinations($1,$2)')
    .replace(/nPr\((\d+),\s*(\d+)\)/g, 'permutations($1,$2)');

  // Handle trig degree mode
  if (calcMode === 'DEG') {
    e = e
      .replace(/\bsin\(/g, 'sin(pi/180*')
      .replace(/\bcos\(/g, 'cos(pi/180*')
      .replace(/\btan\(/g, 'tan(pi/180*')
      .replace(/\basin\(/g, '(180/pi)*asin(')
      .replace(/\bacos\(/g, '(180/pi)*acos(')
      .replace(/\batan\(/g, '(180/pi)*atan(');
  }

  const result = math.evaluate(e);
  if (typeof result === 'object' && result.entries) return result.entries[0];
  return result;
}

function updateCalcDisplay() {
  const exprEl = document.getElementById('calc-expr-display');
  const resultEl = document.getElementById('calc-result-display');
  if (!exprEl) return;

  exprEl.textContent = calcExpression;

  if (!calcExpression) {
    resultEl.textContent = '0';
    resultEl.className = 'calc-result';
    return;
  }

  try {
    const preview = evaluateExpression(calcExpression);
    if (preview !== undefined && !isNaN(preview)) {
      resultEl.textContent = formatNumber(preview);
      resultEl.className = 'calc-result preview';
    }
  } catch(e) {
    resultEl.className = 'calc-result preview';
  }
}

function formatNumber(n) {
  if (n === undefined || n === null) return '0';
  const num = parseFloat(n);
  if (isNaN(num)) return 'Error';
  if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }
  // Round to 10 sig figs max
  const str = parseFloat(num.toPrecision(10)).toString();
  return str;
}

function renderCalcHistory() {
  const list = document.getElementById('calc-history-list');
  if (!list) return;
  if (calcHistory.length === 0) {
    list.innerHTML = '<div class="history-empty">No calculations yet</div>';
    return;
  }
  list.innerHTML = calcHistory.map((h, i) => `
    <div class="history-item" onclick="useHistoryItem(${i})">
      <div class="history-expr">${h.expr}</div>
      <div class="history-result">= ${formatNumber(h.result)}</div>
    </div>
  `).join('');
}

function useHistoryItem(i) {
  calcExpression = String(calcHistory[i].result);
  updateCalcDisplay();
}

function clearCalcHistory() {
  calcHistory = [];
  localStorage.removeItem('calc-history');
  renderCalcHistory();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (currentPage !== 'calculator') return;
  if (e.key >= '0' && e.key <= '9') calcPress(e.key);
  else if (e.key === '+') calcPress('+');
  else if (e.key === '-') calcPress('-');
  else if (e.key === '*') calcPress('×');
  else if (e.key === '/') { e.preventDefault(); calcPress('÷'); }
  else if (e.key === '.') calcPress('.');
  else if (e.key === 'Enter' || e.key === '=') calcEvaluate();
  else if (e.key === 'Backspace') calcBackspace();
  else if (e.key === 'Escape') calcClear();
  else if (e.key === '(') calcPress('(');
  else if (e.key === ')') calcPress(')');
});
