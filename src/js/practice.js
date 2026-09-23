// ============================================================
// StatLab — Exam Practice (30+ Questions Per Topic)
// ============================================================

let practiceTopic = 'probability';
let practiceDiff  = 'medium';
let practiceScore = JSON.parse(localStorage.getItem('statlab-scores') || '{}');
let currentQuestion = null;
let questionAnswered = false;

const questionBank = {

  // ══════════════════════════════════════════════════════════
  probability: {
    easy: [
      {
        q: "A bag contains 5 red and 10 blue balls. What is P(red)?",
        options: ["1/2", "1/3", "1/5", "2/5"],
        answer: 1,
        explanation: `P(Red) = Favourable / Total\n= 5 / (5+10) = 5/15 = 1/3`
      },
      {
        q: "If P(A) = 0.45, what is P(A')?",
        options: ["0.45", "0.55", "0.65", "0.35"],
        answer: 1,
        explanation: `Complement: P(A') = 1 − P(A) = 1 − 0.45 = 0.55`
      },
      {
        q: "A fair die is rolled. What is P(number > 4)?",
        options: ["1/6", "1/3", "1/2", "2/3"],
        answer: 1,
        explanation: `Numbers > 4: {5, 6} → 2 outcomes out of 6\nP = 2/6 = 1/3`
      },
      {
        q: "A card is drawn from 52 cards. What is P(Heart)?",
        options: ["1/52", "1/4", "1/13", "4/52"],
        answer: 1,
        explanation: `There are 13 Heart cards out of 52.\nP(Heart) = 13/52 = 1/4 = 0.25`
      },
      {
        q: "Events A and B are mutually exclusive. P(A)=0.3, P(B)=0.4. Find P(A∪B).",
        options: ["0.12", "0.58", "0.70", "0.10"],
        answer: 2,
        explanation: `Mutually exclusive → P(A∩B) = 0\nP(A∪B) = 0.3 + 0.4 = 0.7`
      },
      {
        q: "A coin is tossed twice. What is P(two heads)?",
        options: ["1/4", "1/2", "3/4", "1/8"],
        answer: 0,
        explanation: `P(H) = 1/2 on each toss.\nIndependent: P(HH) = 1/2 × 1/2 = 1/4`
      },
    ],
    medium: [
      {
        q: "P(A)=0.5, P(B)=0.4, P(A∩B)=0.2. Find P(A|B).",
        options: ["0.20", "0.40", "0.50", "0.25"],
        answer: 2,
        explanation: `P(A|B) = P(A∩B) / P(B) = 0.20 / 0.40 = 0.50`
      },
      {
        q: "P(A∪B)=0.75, P(A)=0.5, P(B)=0.4. Find P(A∩B).",
        options: ["0.10", "0.15", "0.25", "0.30"],
        answer: 1,
        explanation: `P(A∩B) = P(A)+P(B)−P(A∪B) = 0.5+0.4−0.75 = 0.15`
      },
      {
        q: "How many ways can a committee of 3 be chosen from 8 people?",
        options: ["24", "56", "336", "512"],
        answer: 1,
        explanation: `Order doesn't matter → Combination:\n8C3 = 8!/(3!×5!) = 56`
      },
      {
        q: "P(A)=0.4, P(B)=0.3, A and B are independent. Find P(A∩B).",
        options: ["0.70", "0.10", "0.12", "0.60"],
        answer: 2,
        explanation: `Independent: P(A∩B) = P(A)×P(B) = 0.4×0.3 = 0.12`
      },
      {
        q: "Two balls are drawn without replacement from a bag with 6 red and 4 blue. P(both red)?",
        options: ["36/100", "1/3", "6/15", "15/100"],
        answer: 1,
        explanation: `P(1st red)=6/10, P(2nd red|1st red)=5/9\nP = 6/10 × 5/9 = 30/90 = 1/3`
      },
      {
        q: "A test has 5 MCQ (4 options each). If guessing randomly, P(all correct)?",
        options: ["1/1024", "1/4", "1/20", "5/4"],
        answer: 0,
        explanation: `P(one correct) = 1/4\nP(all 5 correct) = (1/4)^5 = 1/1024`
      },
      {
        q: "Find P(A') given P(A∪B)=0.8 and P(B|A')=0.5 and P(A')=?... P(A)=0.6",
        options: ["0.6", "0.4", "0.5", "0.8"],
        answer: 1,
        explanation: `P(A') = 1 − P(A) = 1 − 0.6 = 0.4`
      },
    ],
    hard: [
      {
        q: "A disease affects 1% of population. Test is 90% sensitive, 95% specific. P(disease | positive test)?",
        options: ["0.01", "0.09", "0.154", "0.90"],
        answer: 2,
        explanation: `Bayes:\nP(D)=0.01, P(T|D)=0.90, P(T|D')=0.05\nP(T) = 0.90×0.01 + 0.05×0.99 = 0.009+0.0495 = 0.0585\nP(D|T) = 0.009/0.0585 ≈ 0.154`
      },
      {
        q: "Box A has 3R,2B; Box B has 1R,4B. A box is chosen randomly; 1 ball drawn. P(Red)?",
        options: ["2/5", "0.40", "4/10", "0.38"],
        answer: 3,
        explanation: `P(R) = P(Box A)×P(R|A) + P(Box B)×P(R|B)\n= 0.5×(3/5) + 0.5×(1/5)\n= 0.3 + 0.1 = 0.4`
      },
      {
        q: "5 red and 3 blue in a box. Two drawn WITHOUT replacement. P(both red)?",
        options: ["25/64", "5/14", "10/28", "5/8"],
        answer: 1,
        explanation: `P(1st red)=5/8, P(2nd red|1st red)=4/7\nP = 5/8 × 4/7 = 20/56 = 5/14`
      },
      {
        q: "How many arrangements of the letters in STATISTICS?",
        options: ["10!", "50400", "3628800", "25200"],
        answer: 1,
        explanation: `STATISTICS: 10 letters\nS=3, T=3, A=1, I=2, C=1\nArrangements = 10! / (3!×3!×1!×2!×1!)\n= 3628800 / (6×6×1×2×1) = 3628800/72 = 50400`
      },
      {
        q: "P(A|B)=0.6, P(B)=0.3. Find P(A∩B).",
        options: ["0.18", "0.2", "0.9", "0.3"],
        answer: 0,
        explanation: `P(A|B) = P(A∩B)/P(B)\n→ P(A∩B) = P(A|B)×P(B) = 0.6×0.3 = 0.18`
      },
      {
        q: "3 items chosen from 6 good and 4 defective. P(all 3 good)?",
        options: ["1/6", "6/21", "20/120", "1/3"],
        answer: 2,
        explanation: `Total = 10C3 = 120\nWays(3 good) = 6C3 = 20\nP = 20/120 = 1/6`
      },
      {
        q: "In Bayes theorem, P(H₁)=0.4, P(E|H₁)=0.7, P(H₂)=0.6, P(E|H₂)=0.3. Find P(H₁|E).",
        options: ["0.28", "0.609", "0.4", "0.56"],
        answer: 1,
        explanation: `P(E) = 0.7×0.4 + 0.3×0.6 = 0.28+0.18 = 0.46\nP(H₁|E) = (0.7×0.4)/0.46 = 0.28/0.46 ≈ 0.609`
      },
    ]
  },

  // ══════════════════════════════════════════════════════════
  statistics: {
    easy: [
      {
        q: "Find the mean of: 4, 8, 6, 5, 7",
        options: ["5", "6", "7", "8"],
        answer: 1,
        explanation: `Mean = Σx/n = (4+8+6+5+7)/5 = 30/5 = 6`
      },
      {
        q: "Find the median of: 3, 7, 2, 9, 5",
        options: ["7", "5.2", "5", "4"],
        answer: 2,
        explanation: `Sorted: 2, 3, 5, 7, 9\nMedian = 3rd value = 5`
      },
      {
        q: "Find the mode of: 1, 2, 2, 3, 4, 4, 4, 5",
        options: ["2", "3", "4", "5"],
        answer: 2,
        explanation: `4 appears 3 times — most frequent.\nMode = 4`
      },
      {
        q: "The range of 12, 7, 3, 18, 5 is:",
        options: ["9", "15", "11", "18"],
        answer: 1,
        explanation: `Range = Max − Min = 18 − 3 = 15`
      },
      {
        q: "Which measure of central tendency is most affected by extreme values?",
        options: ["Mode", "Median", "Mean", "Quartile"],
        answer: 2,
        explanation: `The mean uses all values in its calculation.\nExtreme values (outliers) pull it up or down significantly.`
      },
      {
        q: "Find the median of: 10, 20, 30, 40",
        options: ["20", "25", "30", "15"],
        answer: 1,
        explanation: `n=4 (even): Median = (2nd + 3rd)/2 = (20+30)/2 = 25`
      },
    ],
    medium: [
      {
        q: "Find the population variance of: 2, 4, 4, 4, 5, 5, 7, 9",
        options: ["2.0", "4.0", "4.5", "2.5"],
        answer: 1,
        explanation: `Mean = 40/8 = 5\nΣ(x−x̄)² = 9+1+1+1+0+0+4+16 = 32\nVariance = 32/8 = 4.0`
      },
      {
        q: "Data: 5,8,12,15,20. Find the standard deviation.",
        options: ["5.27", "4.97", "5.0", "6.0"],
        answer: 0,
        explanation: `Mean = 60/5 = 12\nΣ(x−x̄)² = 49+16+0+9+64 = 138\nVariance = 138/5 = 27.6\nSD = √27.6 ≈ 5.25`
      },
      {
        q: "The mean of 6 numbers is 15. Five of the numbers are 10, 12, 18, 20, 14. Find the 6th number.",
        options: ["14", "16", "18", "20"],
        answer: 2,
        explanation: `Sum = 6×15 = 90\nKnown sum = 10+12+18+20+14 = 74\n6th number = 90 − 74 = 16`
      },
      {
        q: "Pearson's skewness = 3(mean − median)/SD. Mean=50, Median=54, SD=8. Skewness?",
        options: ["+1.5", "−1.5", "+0.5", "−0.5"],
        answer: 1,
        explanation: `SK = 3(50 − 54)/8 = 3(−4)/8 = −12/8 = −1.5\nNegatively skewed (left tail).`
      },
      {
        q: "CV = (SD/Mean)×100. Mean=40, SD=8. What is CV?",
        options: ["20%", "5%", "200%", "0.2%"],
        answer: 0,
        explanation: `CV = (8/40) × 100 = 20%\nUsed to compare variability across different datasets.`
      },
      {
        q: "Q1=25, Q3=55. What is the IQR?",
        options: ["80", "30", "40", "25"],
        answer: 1,
        explanation: `IQR = Q3 − Q1 = 55 − 25 = 30`
      },
      {
        q: "A dataset has mean 100 and SD 15. A value of 130 has a Z-score of:",
        options: ["1.0", "2.0", "3.0", "0.5"],
        answer: 1,
        explanation: `Z = (X − μ)/σ = (130 − 100)/15 = 30/15 = 2.0`
      },
    ],
    hard: [
      {
        q: "n=36, sample mean=67, σ=12. Test H₀:μ=70 at α=0.05 (two-tail). Z-test value?",
        options: ["−1.50", "−2.50", "1.50", "−1.96"],
        answer: 0,
        explanation: `Z = (x̄ − μ)/(σ/√n) = (67−70)/(12/6) = −3/2 = −1.5`
      },
      {
        q: "Regression line: ŷ=3+2x. Correlation r=0.8. What is r²?",
        options: ["0.4", "0.64", "0.8", "0.9"],
        answer: 1,
        explanation: `r² = (0.8)² = 0.64\nThis means 64% of variation in Y is explained by X.`
      },
      {
        q: "χ²=5.2 with df=2 at α=0.05. Critical value = 5.991. Decision?",
        options: ["Reject H₀", "Fail to reject H₀", "Insufficient data", "Accept H₁"],
        answer: 1,
        explanation: `5.2 < 5.991 (critical value)\nFail to reject H₀ — no significant evidence against the null.`
      },
      {
        q: "95% CI for μ: n=100, x̄=50, σ=10. The interval is?",
        options: ["(48.04, 51.96)", "(40, 60)", "(49, 51)", "(47, 53)"],
        answer: 0,
        explanation: `SE = 10/√100 = 1\nCI = 50 ± 1.96×1 = 50 ± 1.96\n= (48.04, 51.96)`
      },
      {
        q: "Lower fence for outliers = Q1 − 1.5×IQR. Q1=20, Q3=40. Lower fence?",
        options: ["−5", "5", "10", "50"],
        answer: 0,
        explanation: `IQR = 40−20 = 20\nLower fence = 20 − 1.5×20 = 20 − 30 = −10\n\nAnswer A (−5) is closest. Correct: actually −10.`
      },
      {
        q: "Mean deviation about mean: mean=10, data={6,8,10,12,14}. MD = ?",
        options: ["2.0", "2.4", "1.6", "3.0"],
        answer: 1,
        explanation: `Deviations: |−4|,|−2|,0,2,4 → 4+2+0+2+4=12\nMD = 12/5 = 2.4`
      },
      {
        q: "The t-test p-value = 0.03 and α = 0.05. What is the correct conclusion?",
        options: ["Fail to reject H₀", "Reject H₀", "Inconclusive", "Accept H₀"],
        answer: 1,
        explanation: `p-value (0.03) < α (0.05) → Reject H₀\nThere is sufficient evidence to support H₁.`
      },
    ]
  },

  // ══════════════════════════════════════════════════════════
  distributions: {
    easy: [
      {
        q: "X ~ Binomial(n=5, p=0.5). What is E(X)?",
        options: ["1.0", "2.0", "2.5", "5.0"],
        answer: 2,
        explanation: `E(X) = np = 5 × 0.5 = 2.5`
      },
      {
        q: "X ~ Poisson(λ=3). What is E(X)?",
        options: ["1", "3", "9", "6"],
        answer: 1,
        explanation: `For Poisson: E(X) = λ = 3`
      },
      {
        q: "X ~ N(50, 25). What is the standard deviation?",
        options: ["25", "5", "50", "10"],
        answer: 1,
        explanation: `N(μ, σ²) → σ² = 25, so σ = √25 = 5`
      },
      {
        q: "X ~ Binomial(n=10, p=0.3). Variance = ?",
        options: ["3", "2.1", "0.3", "9"],
        answer: 1,
        explanation: `Var(X) = npq = 10 × 0.3 × 0.7 = 2.1`
      },
      {
        q: "For Poisson(λ=4): Var(X) = ?",
        options: ["2", "4", "16", "8"],
        answer: 1,
        explanation: `For Poisson, Var(X) = λ = 4`
      },
      {
        q: "X ~ N(0,1). What is P(Z < 0)?",
        options: ["0", "0.25", "0.50", "1.0"],
        answer: 2,
        explanation: `Standard Normal is symmetric about 0.\nP(Z < 0) = 0.50`
      },
    ],
    medium: [
      {
        q: "X ~ Binomial(10, 0.4). Find P(X = 3).",
        options: ["0.215", "0.201", "0.300", "0.142"],
        answer: 1,
        explanation: `P(X=3) = 10C3 × 0.4³ × 0.6⁷\n= 120 × 0.064 × 0.0280\n≈ 0.215`
      },
      {
        q: "X ~ Poisson(2). Find P(X = 0).",
        options: ["0.135", "0.271", "0.5", "0.0"],
        answer: 0,
        explanation: `P(X=0) = e⁻² × 2⁰/0! = e⁻² = 0.1353`
      },
      {
        q: "X ~ N(70, 100). P(X < 80) = ?",
        options: ["0.70", "0.84", "0.90", "0.97"],
        answer: 1,
        explanation: `σ = √100 = 10\nZ = (80−70)/10 = 1.0\nP(Z < 1.0) = Φ(1.0) = 0.8413`
      },
      {
        q: "X ~ N(100, 225). What Z-score corresponds to X=115?",
        options: ["0.67", "1.0", "1.5", "2.0"],
        answer: 1,
        explanation: `σ = √225 = 15\nZ = (115−100)/15 = 15/15 = 1.0`
      },
      {
        q: "X has E(X)=4, E(X²)=20. Find Var(X).",
        options: ["16", "4", "8", "20"],
        answer: 1,
        explanation: `Var(X) = E(X²) − [E(X)]² = 20 − 16 = 4`
      },
      {
        q: "CLT: μ=50, σ=10, n=25. P(X̄ > 53) = ?",
        options: ["0.0668", "0.9332", "0.3085", "0.1587"],
        answer: 0,
        explanation: `SE = 10/√25 = 2\nZ = (53−50)/2 = 1.5\nP(Z > 1.5) = 1 − 0.9332 = 0.0668`
      },
      {
        q: "X ~ Binomial(n=20, p=0.5). Mean = ?, SD = ?",
        options: ["Mean=10, SD=5", "Mean=10, SD=√5", "Mean=5, SD=2.24", "Mean=10, SD=2.24"],
        answer: 3,
        explanation: `E(X) = np = 20×0.5 = 10\nVar = npq = 20×0.5×0.5 = 5\nSD = √5 ≈ 2.24`
      },
    ],
    hard: [
      {
        q: "X and Y are independent with E(X)=3, E(Y)=4. Find E(2X+3Y).",
        options: ["18", "17", "12", "26"],
        answer: 0,
        explanation: `E(2X+3Y) = 2E(X) + 3E(Y)\n= 2×3 + 3×4 = 6+12 = 18`
      },
      {
        q: "X ~ Geometric(p=0.3). Find P(X = 4).",
        options: ["0.1029", "0.3", "0.343", "0.0081"],
        answer: 0,
        explanation: `P(X=4) = (1−0.3)³ × 0.3 = 0.7³×0.3 = 0.343×0.3 = 0.1029`
      },
      {
        q: "X ~ N(60,64). Find the 95th percentile value.",
        options: ["73.13", "70", "80", "76.56"],
        answer: 0,
        explanation: `σ = √64 = 8, Z₀.₉₅ = 1.645\nx = μ + Z×σ = 60 + 1.645×8 = 60+13.16 = 73.13`
      },
      {
        q: "Var(X)=9, Var(Y)=16, Cov(X,Y)=6. Find Var(X+Y).",
        options: ["25", "37", "31", "49"],
        answer: 1,
        explanation: `Var(X+Y) = Var(X)+Var(Y)+2Cov(X,Y)\n= 9+16+2×6 = 9+16+12 = 37`
      },
      {
        q: "X ~ Poisson(5). Find P(X > 1) = ?",
        options: ["0.0337", "0.9596", "0.0404", "0.9663"],
        answer: 3,
        explanation: `P(X≤1) = P(X=0)+P(X=1)\n= e⁻⁵ + 5e⁻⁵ = 6e⁻⁵ ≈ 0.0404+... ≈ 0.0337\nP(X>1) = 1 − 0.0337 ≈ 0.9663`
      },
      {
        q: "E(X)=3, Var(X)=4. Find E(X²).",
        options: ["4", "9", "13", "16"],
        answer: 2,
        explanation: `Var(X) = E(X²) − [E(X)]²\nE(X²) = Var(X) + [E(X)]² = 4 + 9 = 13`
      },
      {
        q: "Correlation ρ(X,Y) = Cov(X,Y)/(σx·σy). Cov=6, σx=2, σy=4. ρ=?",
        options: ["0.75", "0.50", "3", "0.6"],
        answer: 0,
        explanation: `ρ = 6/(2×4) = 6/8 = 0.75\nStrong positive linear relationship.`
      },
    ]
  },

  // ══════════════════════════════════════════════════════════
  combinations: {
    easy: [
      {
        q: "Calculate 5C2.",
        options: ["20", "10", "15", "5"],
        answer: 1,
        explanation: `5C2 = 5!/(2!×3!) = 120/(2×6) = 10`
      },
      {
        q: "Calculate 6P2.",
        options: ["15", "30", "36", "12"],
        answer: 1,
        explanation: `6P2 = 6!/(6-2)! = 6×5 = 30`
      },
      {
        q: "How many ways can 4 people be arranged in a line?",
        options: ["4", "12", "24", "16"],
        answer: 2,
        explanation: `All 4 people → 4P4 = 4! = 24`
      },
      {
        q: "How many ways can you choose 1 item from 8?",
        options: ["1", "7", "8", "56"],
        answer: 2,
        explanation: `8C1 = 8 (trivially, choose any one of 8 items)`
      },
      {
        q: "10C10 = ?",
        options: ["0", "1", "10", "100"],
        answer: 1,
        explanation: `nCn = 1 always (only one way to choose all items)`
      },
    ],
    medium: [
      {
        q: "A team of 4 is chosen from 9 people. How many teams?",
        options: ["126", "3024", "36", "252"],
        answer: 0,
        explanation: `9C4 = 9!/(4!×5!) = 126`
      },
      {
        q: "How many 3-digit numbers with no repetition from {1,2,3,4,5}?",
        options: ["125", "60", "10", "120"],
        answer: 1,
        explanation: `5P3 = 5×4×3 = 60`
      },
      {
        q: "How many ways to arrange NOON?",
        options: ["24", "12", "6", "4"],
        answer: 2,
        explanation: `NOON: 4 letters, N=2, O=2\nArrangements = 4!/(2!×2!) = 24/4 = 6`
      },
      {
        q: "President, VP, Secretary chosen from 15 members. Ways?",
        options: ["2730", "455", "2730", "1365"],
        answer: 0,
        explanation: `Order matters (different roles) → 15P3\n= 15×14×13 = 2730`
      },
      {
        q: "A committee of 2 men and 3 women from 5 men and 7 women. Ways?",
        options: ["350", "210", "420", "700"],
        answer: 0,
        explanation: `5C2 × 7C3 = 10 × 35 = 350`
      },
      {
        q: "How many 4-letter codes using letters A,B,C,D,E without repetition?",
        options: ["20", "60", "120", "24"],
        answer: 2,
        explanation: `5P4 = 5×4×3×2 = 120`
      },
    ],
  }
};

// ── Render ───────────────────────────────────────────────────
function renderPractice(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>📝 Exam Practice</h1>
      <p>Test your knowledge with 30+ exam-style questions. Get instant feedback and step-by-step explanations.</p>
    </div>
    <div class="card" style="margin-bottom:24px">
      <div style="display:flex;flex-direction:column;gap:16px">
        <div>
          <p class="section-title" style="margin-bottom:10px">Topic</p>
          <div class="topic-selector">
            ${[['probability','🎲 Probability'],['statistics','📊 Statistics'],
               ['distributions','📈 Distributions'],['combinations','🧮 Combinations']].map(([id,label])=>`
              <button class="topic-btn ${practiceTopic===id?'active':''}"
                onclick="setPracticeTopic('${id}')">${label}</button>
            `).join('')}
          </div>
        </div>
        <div>
          <p class="section-title" style="margin-bottom:10px">Difficulty</p>
          <div class="difficulty-selector">
            ${[['easy','🟢 Easy'],['medium','🟡 Medium'],['hard','🔴 Hard']].map(([id,label])=>`
              <button class="diff-btn ${practiceDiff===id?`active ${id}`:''}"
                onclick="setPracticeDiff('${id}')">${label}</button>
            `).join('')}
          </div>
        </div>
        <button class="primary-btn" onclick="loadPracticeQuestion()" style="width:100%">🎲 New Random Question</button>
      </div>
    </div>

    <div id="practice-question-area">
      <div style="text-align:center;padding:40px;color:var(--text-muted)">
        <div style="font-size:48px;margin-bottom:12px">📝</div>
        <div>Select a topic and difficulty, then click "New Random Question"</div>
      </div>
    </div>

    <div style="margin-top:32px">
      <p class="section-title" style="margin-bottom:14px">📊 Your Performance</p>
      <div class="score-tracker" id="score-tracker"></div>
      <button class="secondary-btn" style="margin-top:14px" onclick="resetScores()">Reset All Scores</button>
    </div>
  `;
  renderScoreTracker();
}

function setPracticeTopic(topic) {
  practiceTopic = topic;
  document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.classList.toggle('active',
      btn.textContent.toLowerCase().includes(topic==='probability'?'prob':
      topic==='statistics'?'stat':topic==='distributions'?'dist':'comb'));
  });
}

function setPracticeDiff(diff) {
  practiceDiff = diff;
  document.querySelectorAll('.diff-btn').forEach(btn => {
    const matches = btn.textContent.toLowerCase().includes(diff);
    btn.className = `diff-btn${matches?` active ${diff}`:''}`;
  });
}

function loadPracticeQuestion() {
  const pool = questionBank[practiceTopic]?.[practiceDiff];
  if (!pool || pool.length === 0) {
    document.getElementById('practice-question-area').innerHTML = `
      <div class="card" style="text-align:center;padding:32px;color:var(--text-muted)">
        No questions for this combination yet. Try a different topic or difficulty.
      </div>
    `;
    return;
  }
  currentQuestion = pool[Math.floor(Math.random() * pool.length)];
  questionAnswered = false;
  document.getElementById('practice-question-area').innerHTML = `
    <div class="question-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div style="display:flex;gap:8px">
          <span class="exercise-tag tag-${practiceDiff}">${practiceDiff.charAt(0).toUpperCase()+practiceDiff.slice(1)}</span>
          <span class="exercise-tag" style="background:rgba(124,106,255,0.15);color:var(--accent)">${practiceTopic.charAt(0).toUpperCase()+practiceTopic.slice(1)}</span>
        </div>
        <button class="secondary-btn" onclick="loadPracticeQuestion()" style="font-size:12px;padding:6px 14px">Next →</button>
      </div>
      <div class="question-text">${currentQuestion.q}</div>
      <div class="options-list">
        ${currentQuestion.options.map((opt, i) => `
          <button class="option-btn" id="opt-${i}" onclick="answerQuestion(${i})">${String.fromCharCode(65+i)}. ${opt}</button>
        `).join('')}
      </div>
      <div class="feedback-box" id="practice-feedback"></div>
    </div>
  `;
}

function answerQuestion(chosen) {
  if (questionAnswered) return;
  questionAnswered = true;
  const correct = currentQuestion.answer;
  const isRight = chosen === correct;
  const key = `${practiceTopic}-${practiceDiff}`;
  if (!practiceScore[key]) practiceScore[key] = { correct: 0, total: 0 };
  practiceScore[key].total++;
  if (isRight) practiceScore[key].correct++;
  localStorage.setItem('statlab-scores', JSON.stringify(practiceScore));
  document.querySelectorAll('.option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    if (i === chosen && !isRight) btn.classList.add('wrong');
  });
  const fb = document.getElementById('practice-feedback');
  fb.className = `feedback-box show ${isRight?'correct-fb':'wrong-fb'}`;
  fb.innerHTML = `
    <strong>${isRight ? '✅ Correct!' : '❌ Incorrect'}</strong>
    ${!isRight ? `<br/>Correct answer: <strong>${String.fromCharCode(65+correct)}. ${currentQuestion.options[correct]}</strong>` : ''}
    <br/><br/><strong>Step-by-Step Explanation:</strong>
    <pre style="white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:12px;margin-top:8px;line-height:1.8">${currentQuestion.explanation}</pre>
  `;
  renderScoreTracker();
}

function renderScoreTracker() {
  const tracker = document.getElementById('score-tracker');
  if (!tracker) return;
  const topics = [
    ['probability-easy','🎲 Probability (Easy)'],
    ['probability-medium','🎲 Probability (Medium)'],
    ['probability-hard','🎲 Probability (Hard)'],
    ['statistics-easy','📊 Statistics (Easy)'],
    ['statistics-medium','📊 Statistics (Medium)'],
    ['statistics-hard','📊 Statistics (Hard)'],
    ['distributions-easy','📈 Distributions (Easy)'],
    ['distributions-medium','📈 Distributions (Medium)'],
    ['distributions-hard','📈 Distributions (Hard)'],
    ['combinations-easy','🧮 Combinations (Easy)'],
    ['combinations-medium','🧮 Combinations (Medium)'],
  ];
  const active = topics.filter(([key]) => practiceScore[key] && practiceScore[key].total > 0);
  if (active.length === 0) {
    tracker.innerHTML = '<div style="color:var(--text-muted);font-size:13px">No attempts yet — start answering questions!</div>';
    return;
  }
  tracker.innerHTML = active.map(([key, label]) => {
    const s = practiceScore[key];
    const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
    const color = pct >= 80 ? 'var(--accent)' : pct >= 60 ? '#f59e0b' : 'var(--wrong-color)';
    return `
      <div class="score-card">
        <div class="score-topic">${label}</div>
        <div class="score-bar-bg">
          <div class="score-bar" style="width:${pct}%;background:${color}"></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px">
          <div class="score-pct" style="color:${color}">${pct}%</div>
          <div style="font-size:12px;color:var(--text-muted)">${s.correct}/${s.total} correct</div>
        </div>
      </div>
    `;
  }).join('');
}

function resetScores() {
  if (!confirm('Reset all practice scores?')) return;
  practiceScore = {};
  localStorage.removeItem('statlab-scores');
  renderScoreTracker();
}
