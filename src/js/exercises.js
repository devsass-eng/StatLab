// ============================================================
// StatLab — Exercises (30+ Textbook-Style Worked Problems)
// ============================================================

const exercisesData = [

  // ══════════════════════════════════════════════════════════
  // PROBABILITY (10 exercises)
  // ══════════════════════════════════════════════════════════
  {
    id:'ex-1', topic:'Probability', difficulty:'easy',
    title:'Basic Probability — Bag of Balls',
    problem:`A bag contains 8 red balls, 5 blue balls, and 7 green balls.
(a) Find the total number of balls.
(b) Find P(Red).
(c) Find P(Blue).
(d) Find P(Not Green).`,
    solution:`SOLUTION
════════════════════════════════════════

(a) Total balls = 8 + 5 + 7 = 20

─────────────────────────────────────

(b) P(Red) = 8/20 = 2/5 = 0.4

─────────────────────────────────────

(c) P(Blue) = 5/20 = 1/4 = 0.25

─────────────────────────────────────

(d) P(Not Green) = 1 − P(Green)
                 = 1 − 7/20
                 = 13/20 = 0.65`
  },
  {
    id:'ex-2', topic:'Probability', difficulty:'easy',
    title:'Coin and Die — Sample Space',
    problem:`A fair coin is tossed and a fair die is rolled simultaneously.
(a) List the sample space.
(b) Find P(Head and even number).
(c) Find P(Tail and number > 4).`,
    solution:`SOLUTION
════════════════════════════════════════

(a) Sample Space S (12 outcomes):
S = {H1, H2, H3, H4, H5, H6,
     T1, T2, T3, T4, T5, T6}

─────────────────────────────────────

(b) P(Head AND even):
Favourable: {H2, H4, H6} → 3 outcomes
P = 3/12 = 1/4 = 0.25

─────────────────────────────────────

(c) P(Tail AND > 4):
Numbers > 4: {5, 6}
Favourable: {T5, T6} → 2 outcomes
P = 2/12 = 1/6 ≈ 0.1667`
  },
  {
    id:'ex-3', topic:'Probability', difficulty:'medium',
    title:'Addition Rule — Events A and B',
    problem:`P(A) = 0.45, P(B) = 0.30, P(A ∩ B) = 0.15.
(a) Find P(A ∪ B).
(b) Find P(A' ∩ B').
(c) Are A and B mutually exclusive? Explain.
(d) Are A and B independent? Justify with calculation.`,
    solution:`SOLUTION
════════════════════════════════════════

(a) Addition Rule:
P(A ∪ B) = P(A) + P(B) − P(A ∩ B)
          = 0.45 + 0.30 − 0.15
          = 0.60

─────────────────────────────────────

(b) By De Morgan's Law:
P(A' ∩ B') = 1 − P(A ∪ B)
           = 1 − 0.60 = 0.40

─────────────────────────────────────

(c) No. Mutually exclusive requires P(A ∩ B) = 0.
    Since P(A ∩ B) = 0.15 ≠ 0, they are NOT mutually exclusive.

─────────────────────────────────────

(d) Independence test: P(A ∩ B) = P(A) × P(B)?
    P(A) × P(B) = 0.45 × 0.30 = 0.135
    P(A ∩ B)   = 0.15

    0.15 ≠ 0.135 → NOT independent.`
  },
  {
    id:'ex-4', topic:'Probability', difficulty:'medium',
    title:"Bayes' Theorem — Disease Testing",
    problem:`A disease affects 2% of the population.
A diagnostic test is 95% sensitive (true positive rate) and 90% specific (true negative rate).
(a) If a randomly selected person tests positive, what is the probability they actually have the disease?
(b) If they test negative, what is the probability they are disease-free?`,
    solution:`SOLUTION
════════════════════════════════════════

Let D = has disease, T = tests positive.
P(D) = 0.02, P(T|D) = 0.95, P(T|D') = 0.10

─────────────────────────────────────

(a) P(D | T) using Bayes' Theorem:

P(T) = P(T|D)P(D) + P(T|D')P(D')
     = 0.95×0.02 + 0.10×0.98
     = 0.019 + 0.098 = 0.117

P(D|T) = P(T|D)·P(D) / P(T)
       = (0.95 × 0.02) / 0.117
       = 0.019 / 0.117
       ≈ 0.162 (16.2%)

─────────────────────────────────────

(b) P(D' | T') using Bayes':
P(T') = 1 − 0.117 = 0.883
P(T'|D') = 0.90, P(T'|D) = 0.05

P(D'|T') = P(T'|D')·P(D') / P(T')
          = (0.90 × 0.98) / 0.883
          = 0.882 / 0.883 ≈ 0.999`
  },
  {
    id:'ex-5', topic:'Probability', difficulty:'hard',
    title:'Without Replacement — Hypergeometric',
    problem:`A box contains 10 balls: 6 red and 4 blue. Three balls are drawn without replacement.
(a) Find P(all 3 are red).
(b) Find P(exactly 2 are blue).
(c) Find P(at least 1 red).`,
    solution:`SOLUTION
════════════════════════════════════════

Total ways = 10C3 = 120

─────────────────────────────────────

(a) P(all 3 red):
Ways = 6C3 = 20
P = 20/120 = 1/6 ≈ 0.1667

─────────────────────────────────────

(b) P(exactly 2 blue):
Ways = 4C2 × 6C1 = 6 × 6 = 36
P = 36/120 = 3/10 = 0.30

─────────────────────────────────────

(c) P(at least 1 red) = 1 − P(no red)
P(no red) = P(all 3 blue) = 4C3/120 = 4/120 = 1/30
P(at least 1 red) = 1 − 1/30 = 29/30 ≈ 0.967`
  },
  {
    id:'ex-6', topic:'Probability', difficulty:'medium',
    title:'Permutations and Combinations',
    problem:`(a) In how many ways can a president, secretary, and treasurer be elected from a club of 12 members?
(b) A committee of 4 is to be formed from 9 men and 6 women. How many committees contain exactly 2 women?
(c) How many 4-digit PINs can be formed from digits 1–9 with no repetition?`,
    solution:`SOLUTION
════════════════════════════════════════

(a) Order matters (different positions) → Permutation:
12P3 = 12! / (12−3)! = 12 × 11 × 10 = 1,320

─────────────────────────────────────

(b) Exactly 2 women from 6, and 2 men from 9:
Ways = 6C2 × 9C2
     = 15 × 36
     = 540 committees

─────────────────────────────────────

(c) Order matters, no repetition → Permutation:
9P4 = 9 × 8 × 7 × 6 = 3,024`
  },
  {
    id:'ex-7', topic:'Probability', difficulty:'hard',
    title:'Conditional Probability — Two-Stage',
    problem:`A factory has two machines, A and B. Machine A produces 60% of output, Machine B produces 40%.
Machine A has a 3% defect rate; Machine B has a 5% defect rate.
(a) Find P(defective item).
(b) Given an item is defective, find P(it came from Machine A).`,
    solution:`SOLUTION
════════════════════════════════════════

Let D = defective, A = from Machine A.
P(A) = 0.60, P(B) = 0.40
P(D|A) = 0.03, P(D|B) = 0.05

─────────────────────────────────────

(a) Total Probability:
P(D) = P(D|A)P(A) + P(D|B)P(B)
     = 0.03×0.60 + 0.05×0.40
     = 0.018 + 0.020
     = 0.038

─────────────────────────────────────

(b) Bayes' Theorem:
P(A|D) = P(D|A)·P(A) / P(D)
       = (0.03 × 0.60) / 0.038
       = 0.018 / 0.038
       ≈ 0.4737 (47.4%)`
  },
  {
    id:'ex-8', topic:'Probability', difficulty:'medium',
    title:'Binomial Distribution — Multiple Parts',
    problem:`A multiple-choice test has 10 questions, each with 4 options. A student guesses randomly.
Let X = number of correct answers.
(a) Identify the distribution and its parameters.
(b) Find P(X = 3).
(c) Find P(X ≥ 2).
(d) Find the mean and standard deviation.`,
    solution:`SOLUTION
════════════════════════════════════════

X ~ Binomial(n=10, p=0.25)
q = 1 − 0.25 = 0.75

─────────────────────────────────────

(b) P(X = 3) = 10C3 × 0.25³ × 0.75⁷
             = 120 × 0.015625 × 0.1335
             ≈ 0.2503

─────────────────────────────────────

(c) P(X ≥ 2) = 1 − P(X = 0) − P(X = 1)
P(X=0) = 0.75¹⁰ ≈ 0.0563
P(X=1) = 10 × 0.25 × 0.75⁹ ≈ 0.1877

P(X ≥ 2) = 1 − 0.0563 − 0.1877 ≈ 0.756

─────────────────────────────────────

(d) Mean    = np = 10 × 0.25 = 2.5
    Var(X)  = npq = 10 × 0.25 × 0.75 = 1.875
    SD(X)   = √1.875 ≈ 1.369`
  },
  {
    id:'ex-9', topic:'Probability', difficulty:'hard',
    title:'Poisson Distribution — Arrivals',
    problem:`Cars arrive at a toll booth at an average rate of 4 per minute.
(a) Find P(exactly 2 cars arrive in 1 minute).
(b) Find P(more than 3 cars arrive in 1 minute).
(c) What is the variance of cars arriving in 2 minutes?`,
    solution:`SOLUTION
════════════════════════════════════════

X ~ Poisson(λ = 4)

─────────────────────────────────────

(a) P(X = 2) = e⁻⁴ × 4² / 2!
             = 0.01832 × 16 / 2
             = 0.01832 × 8
             ≈ 0.1465

─────────────────────────────────────

(b) P(X > 3) = 1 − P(X ≤ 3)
P(X=0) = e⁻⁴ = 0.0183
P(X=1) = 4e⁻⁴ = 0.0733
P(X=2) = 8e⁻⁴ = 0.1465
P(X=3) = (64/6)e⁻⁴ = 0.1954
P(X≤3) = 0.4335

P(X > 3) = 1 − 0.4335 = 0.5665

─────────────────────────────────────

(c) For 2 minutes: λ = 4 × 2 = 8
For Poisson: Variance = λ = 8`
  },
  {
    id:'ex-10', topic:'Probability', difficulty:'hard',
    title:'Normal Distribution — Full Problem',
    problem:`The heights of students at a university are normally distributed with mean μ = 170 cm and standard deviation σ = 8 cm.
(a) Find P(a student is taller than 180 cm).
(b) Find P(a student is between 160 cm and 178 cm).
(c) Find the height below which 90% of students fall.`,
    solution:`SOLUTION
════════════════════════════════════════

X ~ N(μ=170, σ=8)

─────────────────────────────────────

(a) P(X > 180):
Z = (180 − 170) / 8 = 10/8 = 1.25
P(Z > 1.25) = 1 − Φ(1.25)
            = 1 − 0.8944 = 0.1056

About 10.56% of students are taller than 180 cm.

─────────────────────────────────────

(b) P(160 < X < 178):
Z₁ = (160 − 170) / 8 = −1.25
Z₂ = (178 − 170) / 8 = 1.00

P = Φ(1.00) − Φ(−1.25)
  = 0.8413 − 0.1056
  = 0.7357

─────────────────────────────────────

(c) Find x such that P(X < x) = 0.90:
From Z-table: Z = 1.282 for 90th percentile

x = μ + Z × σ
  = 170 + 1.282 × 8
  = 170 + 10.26
  = 180.26 cm`
  },

  // ══════════════════════════════════════════════════════════
  // STATISTICS (10 exercises)
  // ══════════════════════════════════════════════════════════
  {
    id:'ex-11', topic:'Statistics', difficulty:'easy',
    title:'Measures of Central Tendency',
    problem:`The marks of 10 students are: 45, 60, 55, 72, 48, 60, 85, 60, 70, 55.
(a) Find the mean.
(b) Find the median.
(c) Find the mode.
(d) Which measure best represents this data?`,
    solution:`SOLUTION
════════════════════════════════════════

Sorted data: 45, 48, 55, 55, 60, 60, 60, 70, 72, 85

─────────────────────────────────────

(a) Mean = Σx / n
  = (45+48+55+55+60+60+60+70+72+85) / 10
  = 610 / 10
  = 61

─────────────────────────────────────

(b) Median (n=10, even):
Middle values = 5th and 6th = 60 and 60
Median = (60 + 60) / 2 = 60

─────────────────────────────────────

(c) Mode = 60 (appears 3 times)

─────────────────────────────────────

(d) The mode (60) is best here because the data
is fairly symmetric and 60 represents the most
common score. The mean (61) is close, so both
are reasonable.`
  },
  {
    id:'ex-12', topic:'Statistics', difficulty:'medium',
    title:'Variance and Standard Deviation',
    problem:`Dataset: 4, 8, 6, 5, 3, 2, 8, 9, 2, 5
(a) Calculate the mean.
(b) Calculate the population variance.
(c) Calculate the population standard deviation.
(d) Calculate the coefficient of variation.`,
    solution:`SOLUTION
════════════════════════════════════════

Data: 4, 8, 6, 5, 3, 2, 8, 9, 2, 5; n = 10

─────────────────────────────────────

(a) Mean = Σx/n = (4+8+6+5+3+2+8+9+2+5)/10
        = 52/10 = 5.2

─────────────────────────────────────

(b) Deviations (xᵢ − x̄):
−1.2, 2.8, 0.8, −0.2, −2.2, −3.2, 2.8, 3.8, −3.2, −0.2

Squared deviations:
1.44, 7.84, 0.64, 0.04, 4.84, 10.24, 7.84, 14.44, 10.24, 0.04

Σ(xᵢ − x̄)² = 57.60

σ² = 57.60 / 10 = 5.76

─────────────────────────────────────

(c) σ = √5.76 = 2.4

─────────────────────────────────────

(d) CV = (σ / x̄) × 100
      = (2.4 / 5.2) × 100
      ≈ 46.15%`
  },
  {
    id:'ex-13', topic:'Statistics', difficulty:'medium',
    title:'Mean Deviation',
    problem:`The ages of 8 employees are: 25, 32, 38, 28, 45, 30, 27, 35.
(a) Find the mean.
(b) Find the mean deviation about the mean.
(c) Find the median.
(d) Find the mean deviation about the median.`,
    solution:`SOLUTION
════════════════════════════════════════

Sorted: 25, 27, 28, 30, 32, 35, 38, 45
n = 8

─────────────────────────────────────

(a) Mean = (25+32+38+28+45+30+27+35)/8
        = 260/8 = 32.5

─────────────────────────────────────

(b) |xᵢ − 32.5|:
7.5, 0.5, 5.5, 4.5, 12.5, 2.5, 5.5, 2.5

Σ|xᵢ − x̄| = 41

Mean Deviation (mean) = 41/8 = 5.125

─────────────────────────────────────

(c) Median = (30 + 32)/2 = 31

─────────────────────────────────────

(d) |xᵢ − 31|:
6, 1, 7, 3, 14, 1, 4, 4

Σ|xᵢ − 31| = 40

Mean Deviation (median) = 40/8 = 5.0`
  },
  {
    id:'ex-14', topic:'Statistics', difficulty:'hard',
    title:'Frequency Distribution Table & Grouped Mean',
    problem:`The marks of 20 students in an exam are:
12, 15, 18, 20, 15, 22, 17, 19, 15, 25,
18, 20, 16, 15, 23, 21, 18, 24, 20, 15

(a) Arrange in ascending order.
(b) Construct a frequency distribution table with columns: x, f, fx.
(c) Calculate the mean using the frequency table.
(d) Verify that it matches the arithmetic mean.`,
    solution:`SOLUTION
════════════════════════════════════════

(a) Ascending order:
12, 15, 15, 15, 15, 15, 16, 17, 18, 18,
18, 19, 20, 20, 20, 21, 22, 23, 24, 25

─────────────────────────────────────

(b & c) Frequency Table:

x   | f  | fx
────|────|────
12  | 1  | 12
15  | 5  | 75
16  | 1  | 16
17  | 1  | 17
18  | 3  | 54
19  | 1  | 19
20  | 3  | 60
21  | 1  | 21
22  | 1  | 22
23  | 1  | 23
24  | 1  | 24
25  | 1  | 25
────|────|────
Σf=20 | Σfx=368

Mean = Σfx / Σf = 368 / 20 = 18.4

─────────────────────────────────────

(d) Arithmetic Mean:
Σx = 12+15+15+15+15+15+16+17+18+18+18+19+20+20+20+21+22+23+24+25
   = 368
x̄ = 368/20 = 18.4 ✓ Matches!`
  },
  {
    id:'ex-15', topic:'Statistics', difficulty:'hard',
    title:'Hypothesis Testing — Z-Test',
    problem:`A company claims its product has a mean lifetime of 500 hours.
A sample of 36 products had a mean of 492 hours.
Population standard deviation σ = 30 hours.
Test at 5% significance level whether the claim is valid (two-tailed test).`,
    solution:`SOLUTION
════════════════════════════════════════

H₀: μ = 500 (claim is valid)
H₁: μ ≠ 500 (two-tailed)
α = 0.05, n = 36, σ = 30, x̄ = 492

─────────────────────────────────────

Step 1 — Critical values (α/2 = 0.025):
Z_critical = ±1.96

─────────────────────────────────────

Step 2 — Test Statistic:
Z = (x̄ − μ) / (σ/√n)
  = (492 − 500) / (30/√36)
  = −8 / (30/6)
  = −8 / 5
  = −1.6

─────────────────────────────────────

Step 3 — Decision:
|Z_calc| = 1.6 < Z_critical = 1.96

Fail to reject H₀.

─────────────────────────────────────

Conclusion:
At the 5% significance level, there is
insufficient evidence to reject the claim.
The product lifetime is consistent with 500 hours.`
  },
  {
    id:'ex-16', topic:'Statistics', difficulty:'hard',
    title:'T-Test — One Sample',
    problem:`A sample of 16 patients showed a mean recovery time of 8.5 days with sample standard deviation s = 2.4 days.
The standard recovery time is claimed to be 7 days.
Test at α = 0.05 (two-tailed) whether the sample differs from the standard.`,
    solution:`SOLUTION
════════════════════════════════════════

H₀: μ = 7
H₁: μ ≠ 7
n = 16, x̄ = 8.5, s = 2.4, df = 15

─────────────────────────────────────

SE = s/√n = 2.4/√16 = 2.4/4 = 0.6

t = (x̄ − μ₀) / SE
  = (8.5 − 7) / 0.6
  = 1.5 / 0.6
  = 2.5

─────────────────────────────────────

Critical value (two-tailed, df=15, α=0.05):
t_critical = ±2.131

─────────────────────────────────────

Decision:
|t_calc| = 2.5 > t_critical = 2.131

Reject H₀!

─────────────────────────────────────

Conclusion:
At 5% significance, there IS sufficient
evidence that recovery time significantly
differs from 7 days (mean is higher).`
  },
  {
    id:'ex-17', topic:'Statistics', difficulty:'medium',
    title:'Linear Regression',
    problem:`The following data shows hours studied (X) and test scores (Y):
X: 1, 2, 3, 4, 5
Y: 52, 58, 65, 70, 75

(a) Calculate the Pearson correlation coefficient r.
(b) Find the equation of the regression line ŷ = a + bx.
(c) Predict the score for 6 hours of study.`,
    solution:`SOLUTION
════════════════════════════════════════

n=5, ΣX=15, ΣY=320, ΣXY=1020, ΣX²=55, ΣY²=20778

─────────────────────────────────────

(a) Pearson r:
r = (nΣXY − ΣXΣY) / √[(nΣX² − (ΣX)²)(nΣY² − (ΣY)²)]

Numerator = 5×1020 − 15×320 = 5100 − 4800 = 300
Denom X   = 5×55 − 225 = 50
Denom Y   = 5×20778 − 102400 = 3490
r = 300 / √(50 × 3490) = 300 / √175000 = 300/418.3 ≈ 0.717

─────────────────────────────────────

(b) Regression coefficients:
b = (nΣXY − ΣXΣY) / (nΣX² − (ΣX)²)
  = 300 / 50 = 6

a = ȳ − b·x̄ = (320/5) − 6×(15/5)
  = 64 − 18 = 46

Regression line: ŷ = 46 + 6x

─────────────────────────────────────

(c) For x = 6:
ŷ = 46 + 6×6 = 46 + 36 = 82`
  },
  {
    id:'ex-18', topic:'Statistics', difficulty:'medium',
    title:'Chi-Square Goodness of Fit',
    problem:`A die is rolled 120 times and results observed:
Face:     1   2   3   4   5   6
Observed: 25  18  22  20  15  20

Test at α = 0.05 whether the die is fair.`,
    solution:`SOLUTION
════════════════════════════════════════

H₀: Die is fair (each face equally likely)
H₁: Die is NOT fair
Expected frequency for each face = 120/6 = 20

─────────────────────────────────────

χ² = Σ [(O − E)² / E]
   = (25−20)²/20 + (18−20)²/20 + (22−20)²/20
   + (20−20)²/20 + (15−20)²/20 + (20−20)²/20
   = 25/20 + 4/20 + 4/20 + 0/20 + 25/20 + 0/20
   = 1.25 + 0.20 + 0.20 + 0 + 1.25 + 0
   = 2.90

─────────────────────────────────────

df = k − 1 = 6 − 1 = 5
Critical value χ²(0.05, 5) = 11.07

─────────────────────────────────────

Decision:
χ²_calc = 2.90 < 11.07

Fail to reject H₀.
There is no significant evidence that the die is unfair.`
  },
  {
    id:'ex-19', topic:'Statistics', difficulty:'hard',
    title:'Confidence Interval — Population Mean',
    problem:`A random sample of 25 students scored a mean of 74 marks.
Assume population standard deviation σ = 10 marks.
(a) Construct a 95% confidence interval for the population mean.
(b) Construct a 99% confidence interval.
(c) Which interval is wider and why?`,
    solution:`SOLUTION
════════════════════════════════════════

n=25, x̄=74, σ=10, SE=σ/√n=10/5=2

─────────────────────────────────────

(a) 95% CI (Z = 1.96):
CI = x̄ ± Z × SE
   = 74 ± 1.96 × 2
   = 74 ± 3.92
   = (70.08, 77.92)

We are 95% confident μ is between 70.08 and 77.92.

─────────────────────────────────────

(b) 99% CI (Z = 2.576):
CI = 74 ± 2.576 × 2
   = 74 ± 5.152
   = (68.85, 79.15)

─────────────────────────────────────

(c) The 99% CI is wider because higher confidence
requires a larger margin of error. We trade
precision for certainty.`
  },
  {
    id:'ex-20', topic:'Statistics', difficulty:'medium',
    title:'Quartiles, IQR, and Outliers',
    problem:`Dataset: 12, 15, 17, 20, 22, 25, 28, 31, 35, 50
(a) Find Q1, Q2, and Q3.
(b) Calculate the IQR.
(c) Determine the lower and upper outlier fences.
(d) Identify any outliers.`,
    solution:`SOLUTION
════════════════════════════════════════

Sorted data (n=10):
12, 15, 17, 20, 22, 25, 28, 31, 35, 50

─────────────────────────────────────

(a) Q2 (Median):
Middle = (5th + 6th)/2 = (22 + 25)/2 = 23.5

Q1: Lower half → 12, 15, 17, 20, 22
Median of lower half = 17

Q3: Upper half → 25, 28, 31, 35, 50
Median of upper half = 31

─────────────────────────────────────

(b) IQR = Q3 − Q1 = 31 − 17 = 14

─────────────────────────────────────

(c) Outlier fences:
Lower fence = Q1 − 1.5×IQR = 17 − 21 = −4
Upper fence = Q3 + 1.5×IQR = 31 + 21 = 52

─────────────────────────────────────

(d) Any value below −4 or above 52 is an outlier.
All values are within (−4, 52) → No outliers.
Note: 50 is close to the fence but is NOT an outlier.`
  },

  // ══════════════════════════════════════════════════════════
  // RANDOM VARIABLES & DISTRIBUTIONS (10 exercises)
  // ══════════════════════════════════════════════════════════
  {
    id:'ex-21', topic:'Distributions', difficulty:'medium',
    title:'Random Variable — Probability Distribution',
    problem:`A biased coin gives P(Head) = 0.6. The coin is tossed 3 times. Let X = number of heads.
(a) Find the probability distribution of X.
(b) Calculate E(X).
(c) Calculate Var(X) and SD(X).`,
    solution:`SOLUTION
════════════════════════════════════════

X ~ Binomial(n=3, p=0.6)

─────────────────────────────────────

(a) Probability Distribution:

P(X=0) = 3C0 × 0.6⁰ × 0.4³ = 0.064
P(X=1) = 3C1 × 0.6¹ × 0.4² = 3×0.6×0.16 = 0.288
P(X=2) = 3C2 × 0.6² × 0.4¹ = 3×0.36×0.4 = 0.432
P(X=3) = 3C3 × 0.6³ × 0.4⁰ = 0.216

Check: 0.064+0.288+0.432+0.216 = 1 ✓

─────────────────────────────────────

(b) E(X) = np = 3 × 0.6 = 1.8

─────────────────────────────────────

(c) Var(X) = npq = 3×0.6×0.4 = 0.72
    SD(X) = √0.72 ≈ 0.849`
  },
  {
    id:'ex-22', topic:'Distributions', difficulty:'medium',
    title:'E(X) and Var(X) from a Table',
    problem:`A discrete random variable X has the following distribution:

X   | 0   | 1   | 2   | 3   | 4
P   | 0.1 | 0.2 | 0.4 | 0.2 | 0.1

(a) Verify that ΣP = 1.
(b) Find E(X).
(c) Find E(X²).
(d) Find Var(X) = E(X²) − [E(X)]².
(e) Find the standard deviation SD(X).`,
    solution:`SOLUTION
════════════════════════════════════════

(a) Sum = 0.1+0.2+0.4+0.2+0.1 = 1.0 ✓

─────────────────────────────────────

(b) E(X) = Σ x·P(x)
= 0×0.1 + 1×0.2 + 2×0.4 + 3×0.2 + 4×0.1
= 0 + 0.2 + 0.8 + 0.6 + 0.4
= 2.0

─────────────────────────────────────

(c) E(X²) = Σ x²·P(x)
= 0+1×0.2+4×0.4+9×0.2+16×0.1
= 0+0.2+1.6+1.8+1.6
= 5.2

─────────────────────────────────────

(d) Var(X) = E(X²) − [E(X)]²
= 5.2 − 4.0 = 1.2

─────────────────────────────────────

(e) SD(X) = √1.2 ≈ 1.095`
  },
  {
    id:'ex-23', topic:'Distributions', difficulty:'hard',
    title:'Central Limit Theorem',
    problem:`The time (minutes) customers wait in a bank queue has a population mean μ = 12 minutes and standard deviation σ = 4 minutes.
A random sample of 64 customers is observed.
(a) Describe the distribution of the sample mean X̄.
(b) Find P(X̄ < 11).
(c) Find P(11.5 < X̄ < 13).`,
    solution:`SOLUTION
════════════════════════════════════════

By CLT: X̄ ~ N(μ = 12, SE = σ/√n = 4/√64 = 0.5)

─────────────────────────────────────

(b) P(X̄ < 11):
Z = (11 − 12) / 0.5 = −1/0.5 = −2.0
P(Z < −2.0) = Φ(−2.0) = 0.0228 = 2.28%

─────────────────────────────────────

(c) P(11.5 < X̄ < 13):
Z₁ = (11.5 − 12) / 0.5 = −0.5 / 0.5 = −1.0
Z₂ = (13 − 12) / 0.5 = 1 / 0.5 = 2.0

P = Φ(2.0) − Φ(−1.0)
  = 0.9772 − 0.1587
  = 0.8185 = 81.85%`
  },
  {
    id:'ex-24', topic:'Distributions', difficulty:'medium',
    title:'Uniform Distribution',
    problem:`A bus arrives every 15 minutes. A passenger arrives at a random time.
Let X = waiting time (minutes). X ~ Uniform(0, 15).
(a) Find P(X < 5).
(b) Find P(3 < X < 10).
(c) Find E(X) and Var(X).`,
    solution:`SOLUTION
════════════════════════════════════════

X ~ Uniform(a=0, b=15)

─────────────────────────────────────

(a) P(X < 5) = (5 − 0) / (15 − 0) = 5/15 = 1/3 ≈ 0.333

─────────────────────────────────────

(b) P(3 < X < 10) = (10 − 3) / 15 = 7/15 ≈ 0.467

─────────────────────────────────────

(c) E(X) = (a + b)/2 = (0 + 15)/2 = 7.5 minutes

    Var(X) = (b − a)² / 12 = 225/12 = 18.75
    SD(X) = √18.75 ≈ 4.33 minutes`
  },
  {
    id:'ex-25', topic:'Distributions', difficulty:'hard',
    title:'Joint Probability — Covariance',
    problem:`X and Y have the joint distribution:

     Y=0   Y=1   Y=2
X=0 | 0.1  | 0.15 | 0.05
X=1 | 0.20 | 0.25 | 0.10
X=2 | 0.05 | 0.05 | 0.05

(a) Find the marginal distributions P(X) and P(Y).
(b) Find E(X) and E(Y).
(c) Find Cov(X, Y).`,
    solution:`SOLUTION
════════════════════════════════════════

(a) Marginal P(X):
P(X=0) = 0.1+0.15+0.05 = 0.30
P(X=1) = 0.20+0.25+0.10 = 0.55
P(X=2) = 0.05+0.05+0.05 = 0.15

Marginal P(Y):
P(Y=0) = 0.1+0.20+0.05 = 0.35
P(Y=1) = 0.15+0.25+0.05 = 0.45
P(Y=2) = 0.05+0.10+0.05 = 0.20

─────────────────────────────────────

(b) E(X) = 0×0.3 + 1×0.55 + 2×0.15 = 0.85
    E(Y) = 0×0.35 + 1×0.45 + 2×0.20 = 0.85

─────────────────────────────────────

(c) E(XY) = Σ Σ xy·P(X=x,Y=y)
= 0 + 0 + 0 + 0 + 1×1×0.25 + 1×2×0.10
+ 0 + 2×1×0.05 + 2×2×0.05
= 0.25 + 0.20 + 0.10 + 0.20 = 0.75

Cov(X,Y) = E(XY) − E(X)·E(Y)
          = 0.75 − 0.85×0.85
          = 0.75 − 0.7225 = 0.0275`
  },
  {
    id:'ex-26', topic:'Distributions', difficulty:'medium',
    title:'Geometric Distribution',
    problem:`A basketball player has a 40% chance of scoring on each free throw (independent attempts).
Let X = number of throws until first score.
(a) Find P(X = 3) — scores on the 3rd throw.
(b) Find P(X ≤ 3).
(c) Find E(X) and Var(X).`,
    solution:`SOLUTION
════════════════════════════════════════

X ~ Geometric(p=0.4), q = 0.6

─────────────────────────────────────

(a) P(X = 3):
P(X=3) = q²·p = 0.6² × 0.4
        = 0.36 × 0.4
        = 0.144

─────────────────────────────────────

(b) P(X ≤ 3):
P(X=1) = 0.4
P(X=2) = 0.6×0.4 = 0.24
P(X=3) = 0.144

P(X ≤ 3) = 0.4+0.24+0.144 = 0.784

─────────────────────────────────────

(c) E(X) = 1/p = 1/0.4 = 2.5 throws

    Var(X) = q/p² = 0.6/0.16 = 3.75`
  },
  {
    id:'ex-27', topic:'Distributions', difficulty:'hard',
    title:'Exponential Distribution — Reliability',
    problem:`The lifetime (hours) of a light bulb follows an Exponential distribution with mean 1000 hours.
(a) Find λ (the rate parameter).
(b) Find P(bulb lasts more than 800 hours).
(c) Find P(bulb lasts between 500 and 1500 hours).
(d) What is the median lifetime?`,
    solution:`SOLUTION
════════════════════════════════════════

X ~ Exponential(λ), E(X) = 1/λ = 1000
∴ λ = 0.001

─────────────────────────────────────

(b) P(X > 800) = e^(−λx) = e^(−0.001×800)
               = e^(−0.8)
               ≈ 0.4493 (44.93%)

─────────────────────────────────────

(c) P(500 < X < 1500):
P(X<1500) − P(X<500)
= (1−e^−1.5) − (1−e^−0.5)
= e^−0.5 − e^−1.5
= 0.6065 − 0.2231
= 0.3834

─────────────────────────────────────

(d) Median: P(X ≤ m) = 0.5
1 − e^(−λm) = 0.5
e^(−λm) = 0.5
−λm = ln(0.5)
m = −ln(0.5)/λ = ln(2)/0.001
m = 0.6931/0.001 = 693.1 hours`
  },
  {
    id:'ex-28', topic:'Statistics', difficulty:'hard',
    title:'Two-Sample T-Test',
    problem:`Two groups of students took different exam preparation programs.
Group A (n=15): mean=78, s=8
Group B (n=12): mean=72, s=10
Test at α=0.05 whether there is a significant difference in means (two-tailed, assume unequal variances).`,
    solution:`SOLUTION
════════════════════════════════════════

H₀: μ_A = μ_B
H₁: μ_A ≠ μ_B
α = 0.05

─────────────────────────────────────

SE = √[(s₁²/n₁) + (s₂²/n₂)]
   = √[(64/15) + (100/12)]
   = √[4.267 + 8.333]
   = √12.6 = 3.55

t = (x̄₁ − x̄₂) / SE
  = (78 − 72) / 3.55
  = 6 / 3.55 ≈ 1.69

─────────────────────────────────────

Welch df ≈ 20 (Satterthwaite formula)
t_critical (two-tail, α=0.05, df=20) = 2.086

─────────────────────────────────────

Decision:
|t_calc| = 1.69 < 2.086

Fail to reject H₀.
No significant difference between groups at 5% level.`
  },
  {
    id:'ex-29', topic:'Statistics', difficulty:'medium',
    title:'Skewness and Shape of Distribution',
    problem:`A dataset has the following statistics:
Mean = 75,  Median = 78,  Mode = 82,  SD = 10
(a) Calculate Pearson's coefficient of skewness.
(b) Describe the shape of the distribution.
(c) Which measure of central tendency would you recommend?`,
    solution:`SOLUTION
════════════════════════════════════════

(a) Pearson's skewness coefficient:
SK = 3(Mean − Median) / SD
   = 3(75 − 78) / 10
   = 3(−3) / 10
   = −9/10
   = −0.9

─────────────────────────────────────

(b) SK = −0.9 (negative value)
The distribution is NEGATIVELY SKEWED
(left-skewed). The tail extends to the left.
Mean < Median < Mode (75 < 78 < 82).

─────────────────────────────────────

(c) For skewed data, the MEDIAN is the best
measure of central tendency. It is not
affected by the extreme low values
that pull the mean down.`
  },
  {
    id:'ex-30', topic:'Distributions', difficulty:'hard',
    title:'Normal Distribution — Standardising and Finding Values',
    problem:`Examination marks follow a Normal distribution: μ = 65, σ = 12.
(a) What proportion of students score above 80?
(b) What proportion score between 50 and 75?
(c) The top 10% of students get a distinction. What is the minimum mark for a distinction?
(d) The bottom 15% fail. What is the pass mark?`,
    solution:`SOLUTION
════════════════════════════════════════

X ~ N(65, 12²)

─────────────────────────────────────

(a) P(X > 80):
Z = (80−65)/12 = 15/12 = 1.25
P(Z > 1.25) = 1 − 0.8944 = 0.1056 = 10.56%

─────────────────────────────────────

(b) P(50 < X < 75):
Z₁ = (50−65)/12 = −1.25
Z₂ = (75−65)/12 = 0.833
P = Φ(0.833) − Φ(−1.25)
  = 0.7977 − 0.1056 = 0.6921 = 69.21%

─────────────────────────────────────

(c) Top 10%: P(Z > z) = 0.10 → z = 1.282
x = 65 + 1.282 × 12 = 65 + 15.38 ≈ 80.4

Minimum distinction mark ≈ 80 marks.

─────────────────────────────────────

(d) Bottom 15%: P(Z < z) = 0.15 → z = −1.036
x = 65 + (−1.036) × 12 = 65 − 12.43 ≈ 52.6

Pass mark ≈ 53 marks.`
  },
];

// ── State ───────────────────────────────────────────────────
let exFilter = { topic: 'All', difficulty: 'All' };
let exCurrentId = null;
let exSolutionVisible = false;

// ── Render ───────────────────────────────────────────────────
function renderExercises(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>📖 Exercises</h1>
      <p>30 full university-level worked problems. Try each question, then reveal the complete solution.</p>
    </div>
    <div style="display:grid; grid-template-columns:280px 1fr; gap:24px; align-items:start">
      <!-- Sidebar -->
      <div>
        <div class="card" style="margin-bottom:16px">
          <p class="section-title" style="margin-bottom:10px">Filter by Topic</p>
          ${['All','Probability','Statistics','Distributions'].map(t=>`
            <button class="ex-filter-btn ${exFilter.topic===t?'active':''}"
              onclick="setExFilter('topic','${t}')">${t}</button>
          `).join('')}
          <p class="section-title" style="margin-bottom:10px;margin-top:16px">Filter by Difficulty</p>
          ${['All','easy','medium','hard'].map(d=>`
            <button class="ex-filter-btn ${exFilter.difficulty===d?'active':''}"
              onclick="setExFilter('difficulty','${d}')" style="text-transform:capitalize">${d}</button>
          `).join('')}
        </div>
        <div id="ex-list-panel"></div>
      </div>
      <!-- Main Panel -->
      <div id="ex-main-panel">
        <div class="card" style="text-align:center;padding:60px 40px;color:var(--text-muted)">
          <div style="font-size:56px;margin-bottom:16px">📖</div>
          <h3>Select an exercise from the list</h3>
          <p style="margin-top:8px;font-size:13px">Use the filters to find exercises by topic or difficulty</p>
        </div>
      </div>
    </div>
  `;
  renderExerciseList();
}

function setExFilter(key, val) {
  exFilter[key] = val;
  document.querySelectorAll('.ex-filter-btn').forEach(b=>{
    if (b.textContent.trim()===val||b.textContent.trim()===val) {
      const isTopicBtn = ['All','Probability','Statistics','Distributions'].includes(b.textContent.trim());
      const isDiffBtn  = ['All','easy','medium','hard'].includes(b.textContent.trim());
      b.classList.toggle('active',
        (key==='topic' && isTopicBtn && b.textContent.trim()===val) ||
        (key==='difficulty' && isDiffBtn && b.textContent.trim()===val) ||
        (exFilter.topic===b.textContent.trim()) || (exFilter.difficulty===b.textContent.trim())
      );
    }
  });
  renderExerciseList();
}

function renderExerciseList() {
  const filtered = exercisesData.filter(ex=>{
    const tOk = exFilter.topic==='All' || ex.topic===exFilter.topic;
    const dOk = exFilter.difficulty==='All' || ex.difficulty===exFilter.difficulty;
    return tOk && dOk;
  });
  const diffColor = { easy:'var(--accent)', medium:'#f59e0b', hard:'var(--wrong-color)' };
  const list = document.getElementById('ex-list-panel');
  if(!list) return;
  list.innerHTML = filtered.map(ex=>`
    <div class="ex-list-item ${exCurrentId===ex.id?'active':''}" onclick="openExercise('${ex.id}')">
      <div style="font-size:12px;font-weight:700;color:${diffColor[ex.difficulty]||'var(--text-muted)'};text-transform:uppercase;margin-bottom:2px">${ex.difficulty} • ${ex.topic}</div>
      <div style="font-size:13px;font-weight:600;color:var(--text-primary)">${ex.title}</div>
    </div>
  `).join('') || '<div class="card"><p style="color:var(--text-muted)">No exercises match filters.</p></div>';
}

function openExercise(id) {
  exCurrentId = id;
  exSolutionVisible = false;
  const ex = exercisesData.find(e=>e.id===id);
  if(!ex) return;
  const diffColor = { easy:'var(--accent)', medium:'#f59e0b', hard:'var(--wrong-color)' };
  document.getElementById('ex-main-panel').innerHTML = `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div>
          <span style="font-size:11px;font-weight:700;color:${diffColor[ex.difficulty]};text-transform:uppercase;background:${diffColor[ex.difficulty]}22;padding:4px 10px;border-radius:20px">${ex.difficulty}</span>
          <span style="margin-left:8px;font-size:11px;color:var(--text-muted)">${ex.topic}</span>
        </div>
      </div>
      <h3 style="margin-bottom:20px;color:var(--text-primary)">${ex.title}</h3>
      <div class="meaning-panel" style="margin-bottom:20px">
        <div class="meaning-title">📋 Question</div>
        <pre style="white-space:pre-wrap;font-family:inherit;margin:0;font-size:14px;line-height:1.7">${ex.problem}</pre>
      </div>
      <button class="primary-btn" id="ex-reveal-btn" onclick="toggleExSolution('${id}')" style="width:100%">
        🔍 Reveal Solution
      </button>
      <div id="ex-solution-box" class="hidden" style="margin-top:20px">
        <div class="steps-panel" style="font-size:13.5px;line-height:1.8">${ex.solution}</div>
      </div>
    </div>
  `;
  renderExerciseList();
}

function toggleExSolution(id) {
  exSolutionVisible = !exSolutionVisible;
  const box = document.getElementById('ex-solution-box');
  const btn = document.getElementById('ex-reveal-btn');
  if (!box||!btn) return;
  box.classList.toggle('hidden', !exSolutionVisible);
  btn.textContent = exSolutionVisible ? '🙈 Hide Solution' : '🔍 Reveal Solution';
}
