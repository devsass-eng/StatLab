// ============================================================
// StatLab — Formula Reference
// ============================================================

function renderFormulas(container) {
  const sections = [
    {
      title: '📊 Descriptive Statistics',
      formulas: [
        { name: 'Mean',               expr: 'x̄ = Σx / n',                desc: 'Sum of all values divided by count' },
        { name: 'Population Variance',expr: 'σ² = Σ(xᵢ − x̄)² / n',       desc: 'Average squared deviation from mean' },
        { name: 'Sample Variance',    expr: 's² = Σ(xᵢ − x̄)² / (n−1)',    desc: 'Uses n−1 (Bessel\'s correction)' },
        { name: 'Population Std Dev', expr: 'σ = √[Σ(xᵢ−x̄)²/n]',          desc: 'Square root of population variance' },
        { name: 'Sample Std Dev',     expr: 's = √[Σ(xᵢ−x̄)²/(n−1)]',      desc: 'Square root of sample variance' },
        { name: 'Range',              expr: 'Range = Max − Min',            desc: 'Spread between largest and smallest' },
        { name: 'IQR',                expr: 'IQR = Q3 − Q1',               desc: 'Spread of middle 50% of data' },
        { name: 'Z-Score',            expr: 'Z = (X − μ) / σ',             desc: 'Standard deviations from the mean' },
        { name: 'Percentile Index',   expr: 'L = (p/100) × (n−1)',         desc: 'Position of pth percentile in sorted data' },
        { name: 'Outlier Lower Fence',expr: 'Q1 − 1.5 × IQR',             desc: 'Values below this are potential outliers' },
        { name: 'Outlier Upper Fence',expr: 'Q3 + 1.5 × IQR',             desc: 'Values above this are potential outliers' },
        { name: 'Skewness (Pearson)', expr: 'Sk = 3(x̄ − Median) / σ',     desc: 'Measure of asymmetry of distribution' },
      ]
    },
    {
      title: '🎲 Probability',
      formulas: [
        { name: 'Basic Probability',       expr: 'P(A) = n(A) / n(S)',                    desc: 'Favourable outcomes over total outcomes' },
        { name: 'Complement',              expr: "P(A') = 1 − P(A)",                      desc: 'Probability A does NOT occur' },
        { name: 'Addition Rule',           expr: 'P(A∪B) = P(A) + P(B) − P(A∩B)',        desc: 'Probability of A or B' },
        { name: 'Mutually Exclusive',      expr: 'P(A∪B) = P(A) + P(B)',                  desc: 'When P(A∩B) = 0' },
        { name: 'Multiplication Rule',     expr: 'P(A∩B) = P(A) × P(B|A)',               desc: 'Probability of A and B (dependent)' },
        { name: 'Independent Events',      expr: 'P(A∩B) = P(A) × P(B)',                  desc: 'When A and B don\'t influence each other' },
        { name: 'Conditional Probability', expr: 'P(A|B) = P(A∩B) / P(B)',               desc: 'Probability of A given B occurred' },
        { name: "Bayes' Theorem",          expr: 'P(A|B) = P(B|A)·P(A) / P(B)',          desc: 'Update probability with new evidence' },
        { name: 'Total Probability',       expr: 'P(B) = Σ P(B|Aᵢ)·P(Aᵢ)',              desc: 'Overall probability via partition' },
      ]
    },
    {
      title: '🧮 Combinatorics',
      formulas: [
        { name: 'Factorial',         expr: 'n! = n × (n−1) × ... × 2 × 1',   desc: '0! = 1 by definition' },
        { name: 'Permutations nPr',  expr: 'nPr = n! / (n−r)!',              desc: 'Ordered arrangements — ORDER MATTERS' },
        { name: 'Combinations nCr',  expr: 'nCr = n! / [r!(n−r)!]',          desc: 'Unordered selections — ORDER DOESN\'T MATTER' },
        { name: 'Relation',          expr: 'nPr = nCr × r!',                  desc: 'Permutation = Combination × arrangements of r' },
        { name: 'Complement nCr',    expr: 'nCr = nC(n−r)',                   desc: 'Choosing r same as excluding n−r' },
      ]
    },
    {
      title: '📈 Binomial Distribution B(n,p)',
      formulas: [
        { name: 'PMF',           expr: 'P(X=k) = C(n,k) × pᵏ × (1−p)^(n−k)', desc: 'Probability of exactly k successes' },
        { name: 'Mean',         expr: 'μ = np',                                 desc: 'Expected number of successes' },
        { name: 'Variance',     expr: 'σ² = np(1−p)',                           desc: 'Variance of binomial' },
        { name: 'Std Dev',      expr: 'σ = √[np(1−p)]',                        desc: 'Standard deviation of binomial' },
        { name: 'Conditions',   expr: 'Fixed n, constant p, independent trials', desc: 'Binomial applies when all conditions met' },
      ]
    },
    {
      title: 'λ Poisson Distribution Po(λ)',
      formulas: [
        { name: 'PMF',       expr: 'P(X=k) = (e^−λ × λᵏ) / k!',   desc: 'Probability of exactly k events' },
        { name: 'Mean',      expr: 'μ = λ',                          desc: 'Mean equals rate parameter' },
        { name: 'Variance',  expr: 'σ² = λ',                         desc: 'Unique: mean equals variance in Poisson' },
        { name: 'Std Dev',   expr: 'σ = √λ',                         desc: 'Standard deviation of Poisson' },
        { name: 'Rescaling', expr: 'Po(λt) for time interval t',     desc: 'Adjust rate for different time periods' },
      ]
    },
    {
      title: '🔔 Normal Distribution N(μ, σ²)',
      formulas: [
        { name: 'PDF',               expr: 'f(x) = e^[−(x−μ)²/2σ²] / (σ√2π)',    desc: 'Probability density function' },
        { name: 'Standardize',       expr: 'Z = (X − μ) / σ',                      desc: 'Convert X to Standard Normal Z' },
        { name: 'Unstandardize',     expr: 'X = μ + Zσ',                           desc: 'Convert Z back to X' },
        { name: '68-95-99.7 Rule',   expr: 'μ±σ=68%, μ±2σ=95%, μ±3σ=99.7%',      desc: 'Empirical rule for normal distributions' },
        { name: 'Symmetry',          expr: 'P(Z < −z) = P(Z > z) = 1−Φ(z)',       desc: 'Standard normal is symmetric about 0' },
      ]
    },
    {
      title: '📐 Geometric Distribution Geo(p)',
      formulas: [
        { name: 'PMF',      expr: 'P(X=k) = (1−p)^(k−1) × p',    desc: 'P(first success on kth trial)' },
        { name: 'Mean',     expr: 'μ = 1/p',                        desc: 'Expected trial number of first success' },
        { name: 'Variance', expr: 'σ² = (1−p) / p²',               desc: 'Variance of geometric' },
      ]
    },
    {
      title: '▬ Uniform Distribution U(a,b)',
      formulas: [
        { name: 'PDF',       expr: 'f(x) = 1/(b−a)  for a≤x≤b',    desc: 'Constant height rectangle' },
        { name: 'CDF',       expr: 'P(X≤x) = (x−a)/(b−a)',          desc: 'Cumulative probability' },
        { name: 'Mean',      expr: 'μ = (a+b)/2',                    desc: 'Midpoint of range' },
        { name: 'Variance',  expr: 'σ² = (b−a)²/12',                desc: 'Variance of uniform distribution' },
      ]
    },
    {
      title: '📉 Exponential Distribution Exp(λ)',
      formulas: [
        { name: 'PDF',      expr: 'f(x) = λe^(−λx)  for x≥0',     desc: 'Probability density function' },
        { name: 'CDF',      expr: 'P(X≤x) = 1 − e^(−λx)',          desc: 'Cumulative probability' },
        { name: 'Mean',     expr: 'μ = 1/λ',                        desc: 'Average waiting time' },
        { name: 'Variance', expr: 'σ² = 1/λ²',                      desc: 'Variance of exponential' },
        { name: 'Memoryless', expr: 'P(X>s+t|X>s) = P(X>t)',       desc: 'Key property of exponential' },
      ]
    },
  ];

  container.innerHTML = `
    <div class="page-header">
      <h1>📚 Formula Reference</h1>
      <p>Quick-access reference for all statistics and probability formulas</p>
    </div>
    <div class="formulas-layout">
      ${sections.map(section => `
        <div class="formula-section card">
          <h3>${section.title}</h3>
          <div class="formula-grid">
            ${section.formulas.map(f => `
              <div class="formula-card">
                <div class="formula-name">${f.name}</div>
                <div class="formula-expr">${f.expr}</div>
                <div class="formula-desc">${f.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
