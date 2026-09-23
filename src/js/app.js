// ============================================================
// StatLab — App Router & Theme Toggle
// ============================================================

const { ipcRenderer } = require('electron');

// ── Theme ──────────────────────────────────────────────────
let isDark = true;

function initTheme() {
  const saved = localStorage.getItem('statlab-theme') || 'dark';
  isDark = saved === 'dark';
  applyTheme();
}

function applyTheme() {
  document.getElementById('app-body').className = isDark ? 'dark-mode' : 'light-mode';
  document.getElementById('theme-toggle').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('statlab-theme', isDark ? 'dark' : 'light');
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  isDark = !isDark;
  applyTheme();
});

// ── Window Controls ─────────────────────────────────────────
document.getElementById('btn-min').addEventListener('click', () => ipcRenderer.send('minimize-window'));
document.getElementById('btn-max').addEventListener('click', () => ipcRenderer.send('maximize-window'));
document.getElementById('btn-close').addEventListener('click', () => ipcRenderer.send('close-window'));

// ── Page Definitions ────────────────────────────────────────
const pages = {
  home:          { title: 'Home',                   render: (c) => renderHome(c) },
  calculator:    { title: 'Scientific Calculator',  render: (c) => renderCalculator(c) },
  statistics:    { title: 'Statistics Lab',         render: (c) => renderStatistics(c) },
  hypothesis:    { title: 'Hypothesis Testing',     render: (c) => renderHypothesis(c) },
  regression:    { title: 'Linear Regression',      render: (c) => renderRegression(c) },
  probability:   { title: 'Probability Calculator', render: (c) => renderProbability(c) },
  distributions: { title: 'Distribution Lab',       render: (c) => renderDistributions(c) },
  simulation:    { title: 'Simulation Mode',        render: (c) => renderSimulation(c) },
  practice:      { title: 'Exam Practice',          render: (c) => renderPractice(c) },
  exercises:     { title: 'Exercises',              render: (c) => renderExercises(c) },
  formulas:      { title: 'Formula Reference',      render: (c) => renderFormulas(c) },
};

let currentPage = 'home';

function navigateTo(page) {
  if (!pages[page]) return;
  currentPage = page;

  // Update sidebar
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  // Update title bar
  document.getElementById('page-title').textContent = pages[page].title;

  // Render page
  const main = document.getElementById('main-content');
  main.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'page-enter';
  div.style.height = '100%';
  main.appendChild(div);
  pages[page].render(div);
}

// ── Sidebar Navigation Listeners ────────────────────────────
document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(el.dataset.page);
  });
});

// ── HOME PAGE ───────────────────────────────────────────────
function renderHome(container) {
  const modules = [
    { page: 'calculator',    icon: '🧮', title: 'Scientific Calculator', desc: 'Full scientific calculator with history and live preview' },
    { page: 'statistics',    icon: '📊', title: 'Statistics Lab',        desc: 'Enter raw data → compute all stats → see steps → visualize' },
    { page: 'probability',   icon: '🎲', title: 'Probability Calculator',desc: 'P(A), P(A|B), Bayes\' theorem, nCr/nPr with full working' },
    { page: 'distributions', icon: '📈', title: 'Distribution Lab',      desc: 'Normal, Binomial, Poisson distributions with visual curves' },
    { page: 'simulation',    icon: '🧪', title: 'Simulation Mode',       desc: 'Coin & dice simulations — watch experimental vs theoretical' },
    { page: 'practice',      icon: '📝', title: 'Exam Practice',         desc: 'Topic-based questions with explanations & performance tracker' },
    { page: 'exercises',     icon: '📖', title: 'Exercises',             desc: 'Textbook-style worked problems with step-by-step solutions' },
    { page: 'formulas',      icon: '📚', title: 'Formula Reference',     desc: 'Quick-access formulas for all stats & probability topics' },
  ];

  container.innerHTML = `
    <div class="welcome-banner">
      <div class="welcome-text">
        <h2>Welcome to StatLab ∑</h2>
        <p>Your personal Statistics & Probability study companion. Enter data, compute results, see step-by-step working, and understand what it all means — all in one place.</p>
      </div>
      <div class="welcome-emoji">📐</div>
    </div>
    <p class="section-title">Modules</p>
    <div class="home-grid">
      ${modules.map(m => `
        <div class="home-card" data-page="${m.page}" id="home-card-${m.page}">
          <div class="home-card-icon">${m.icon}</div>
          <div>
            <div class="home-card-title">${m.title}</div>
            <div class="home-card-desc mt-16">${m.desc}</div>
          </div>
          <div class="home-card-arrow">→</div>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.home-card').forEach(card => {
    card.addEventListener('click', () => navigateTo(card.dataset.page));
  });
}

// ── Init ────────────────────────────────────────────────────
initTheme();
navigateTo('home');
