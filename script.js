/* ======================================================
   ABDALLA NADIR — PORTFOLIO JAVASCRIPT
   - Theme toggle (dark/light, localStorage-persisted)
   - Case study modal
   - Scroll reveal animations
   - Active nav link highlighting
   - Mobile menu toggle
   - Back-to-top button
   - Footer year
====================================================== */

/* ===== CASE STUDY DATA ===== */
const caseStudies = [
  {
    tag: 'Excel',
    title: 'Retail Sales Data Analysis',
    overview: 'An Excel-based retail sales analysis project focused on understanding sales, profit, quantity, and category performance using an interactive dashboard.',
    problem: 'Analyze retail sales performance and identify trends across regions, categories, and product segments to guide business decisions.',
    dataset: 'Superstore dataset with 9,800+ rows covering orders, products, regions, and customer segments.',
    tools: ['Excel', 'Pivot Tables', 'Slicers', 'Charts', 'Dashboard Design'],
    process: 'Cleaned the dataset, checked for missing values and inconsistencies, created pivot tables, analyzed sales/profit/quantity trends across all dimensions, and built an interactive Excel dashboard with KPI cards.',
    insights: 'Identified sales and profit patterns across regions, categories, and sub-categories. Technology was the highest-profit category; the West region led in sales.',
    output: 'Interactive Excel dashboard with slicers, KPI cards, bar charts, and visual summaries for business stakeholders.',
    learned: 'Improved skills in Excel data cleaning, pivot table analysis, dashboard design, and translating data findings into business insights.'
  },
  {
    tag: 'Power BI',
    title: 'HR Analytics Dashboard',
    overview: 'A Power BI dashboard project focused on analyzing employee attrition and identifying high-risk employee groups across departments, job roles, and demographics.',
    problem: 'Understand employee attrition and identify the main factors linked to employees leaving, enabling HR to take targeted action.',
    dataset: 'IBM HR Analytics dataset with 1,470 employees and 35 features including job role, income, overtime, and satisfaction scores.',
    tools: ['Power BI', 'DAX', 'Excel'],
    process: 'Cleaned the data, created DAX measures for attrition rate and averages, built interactive visuals with slicers, and designed a professional dark-themed dashboard.',
    insights: 'Overall attrition rate was 16.12%. R&D had the highest attrition count. Overtime, job role, and age group were the most significant attrition drivers.',
    output: 'Interactive Power BI dashboard showing attrition by department, job role, gender, age group, overtime, and other employee factors.',
    learned: 'Improved Power BI skills, DAX measure writing, HR analytics understanding, dashboard layout, and data storytelling for business audiences.'
  },
  {
    tag: 'SQL / Database',
    title: 'Student Management System',
    overview: 'A relational database project focused on managing students, courses, enrollments, and academic records using structured SQL design.',
    problem: 'Design a normalized database system to manage student records, courses, and enrollments with minimal redundancy and maximum data integrity.',
    dataset: 'Sample student, course, and enrollment records designed to simulate a real university database system.',
    tools: ['SQL', 'MySQL', 'Database Design', 'ERD'],
    process: 'Designed database tables, defined primary and foreign keys, established relationships, wrote SQL queries for CRUD operations, and tested all database interactions.',
    insights: 'A properly normalized database structure significantly reduces data duplication, improves query performance, and makes student records far easier to manage and scale.',
    output: 'SQL-based student management database with structured tables, relationships, constraints, and optimized queries.',
    learned: 'Improved SQL querying, relational database design, schema normalization, and understanding of how real-world systems store and retrieve data efficiently.'
  },
  {
    tag: 'Python / Pipeline',
    title: 'HR Analytics Pipeline',
    overview: 'End-to-end HR analytics pipeline analyzing 1,470 employee records to identify attrition drivers using Python, SQL, and Power BI.',
    problem: 'Identify the key drivers of employee attrition in a retail company and build a system to flag high-risk employees before they leave.',
    dataset: 'IBM HR Employee Attrition dataset — 1,470 employees, 35 columns. Source: Kaggle.',
    tools: ['Python', 'Pandas', 'SQL', 'SQLite', 'Power BI', 'DAX', 'openpyxl'],
    process: 'Loaded and explored data → cleaned and encoded columns → engineered 3 new features (IncomePerYear, TenureRoleRatio, SeniorityScore) → built SQLite database with advanced SQL → identified 113 high-risk employees → auto-generated Excel report → built 2-page Power BI dashboard with 5 DAX measures.',
    insights: 'Sales Representatives earn the least ($2,626 avg) and leave at 39.76% — the highest attrition rate across all job roles.',
    output: '2-page Power BI dashboard — overview with navy theme and a dark neon risk analysis page with insight cards and high-risk employee flags.',
    learned: 'End-to-end data pipeline design, advanced SQL, DAX in Power BI, feature engineering, automated Excel reporting with openpyxl, and presenting findings to business stakeholders.'
  },
  {
    tag: 'AI / Final Year Project',
    title: 'AI-Powered Supply Chain Optimization & Risk Management (SCOMS)',
    overview: 'Final Year Project at Multimedia University (B.CS in AI). A three-module AI pipeline integrating LSTM demand forecasting, Random Forest supplier risk classification, and EOQ/ROP inventory optimization for retail supply chain decision support — surfaced through a Streamlit dashboard with a role-based recommendation flow for store managers.',
    problem: 'Retail supply-chain managers juggle forecasting, supplier risk, and inventory in disconnected tools. SCOMS unifies all three into a single AI-driven decision support system so a store manager sees demand, risk, and reorder thresholds in one place.',
    dataset: 'Retail supply-chain dataset covering historical demand, supplier performance, lead times, defect rates, and disruption history — supporting both time-series forecasting and supplier-level risk scoring.',
    tools: ['Python', 'TensorFlow / Keras', 'Scikit-learn', 'XGBoost', 'Streamlit', 'NumPy', 'Pandas'],
    process: 'Architected an LSTM forecasting model (2 stacked layers, 64 / 32 units, 30-day sliding window) for 7–30 day demand prediction; configured an XGBoost benchmark across RMSE, MAE, and MAPE. Built a Random Forest classifier (100 estimators) scoring suppliers as Low / Medium / High risk across five operational features — delivery delay rate, fulfillment rate, lead-time variance, defect rate, and disruption history. Implemented an inventory module computing EOQ, Reorder Point, and Safety Stock dynamically from the forecast output. Finalized system architecture and validated the dataset strategy through a 5-chapter FYP research phase, benchmarking against 11 peer-reviewed supply-chain optimization papers (2020–2026) to justify the hybrid LSTM + XGBoost approach over RNN and ARIMA baselines.',
    insights: 'Hybrid LSTM + XGBoost forecasting outperforms standalone RNN and ARIMA baselines across the surveyed literature. Combining supplier risk classification with dynamic inventory thresholds turns raw forecasts into actionable reorder decisions — not just numbers.',
    output: 'Streamlit dashboard with a role-based recommendation flow: demand forecasts, supplier risk tiers, and live EOQ / ROP / safety-stock thresholds on one screen — designed for non-technical store managers.',
    learned: 'End-to-end ML system design (research → architecture → implementation), hybrid model selection backed by empirical benchmarking, applied deep learning for time-series forecasting, and translating an academic FYP into a tool a non-technical user can actually use.'
  },
  {
    tag: 'Machine Learning',
    title: 'XGBoost Diabetes Risk Models — Clinical & Behavioral',
    overview: 'Two parallel XGBoost binary classification pipelines predicting diabetes onset — one on a 2,000-patient clinical dataset and another on a 13-feature behavioral / socioeconomic dataset. Built end-to-end in Python with rigorous handling of class imbalance, feature engineering, and 5-fold hyperparameter search.',
    problem: 'Predict diabetes onset in a clinically actionable way: the model has to catch the minority (positive) class rather than default to majority-class prediction, which is the failure mode of naive accuracy-optimised classifiers on imbalanced medical data.',
    dataset: 'Two parallel datasets — (1) 2,000-patient clinical with Glucose, BMI, BloodPressure, Insulin, and Age; (2) a 50 / 50 balanced 13-feature behavioral & socioeconomic dataset.',
    tools: ['Python', 'XGBoost', 'SMOTE', 'GridSearchCV', 'Scikit-learn', 'Pandas', 'NumPy'],
    process: 'Engineered 2 clinical interaction features (BMI × Age, Glucose / Insulin ratio) and applied median imputation across 5 columns (956 Insulin nulls, 573 SkinThickness nulls) before training. Resolved class imbalance via SMOTE oversampling applied exclusively to the training split — keeping the test distribution realistic. Executed 5-fold GridSearchCV across 432 hyperparameter combinations; optimal config was max_depth=7, n_estimators=300, lr=0.05. The behavioral pipeline used stratified train / test splits and StandardScaler normalization; both pipelines validated via confusion matrices on all splits.',
    insights: 'Applying SMOTE only on the training split lifted minority-class F1 to 0.76 — the clinical model stays viable for detecting at-risk patients rather than defaulting to majority-class. Clinical pipeline hit 82% test accuracy on the minority class; behavioral pipeline reached 79.4% accuracy with balanced precision / recall (0.79 / 0.80).',
    output: 'Two production-style XGBoost classifiers published as shareable Google Colab notebooks — one for clinical-feature input, one for behavioral / socioeconomic input, both with reproducible training pipelines and confusion-matrix validation.',
    learned: 'Disciplined class-imbalance handling (SMOTE on training only, never test), large-scale hyperparameter optimisation, interaction-feature engineering for clinical interpretability, and treating confusion matrices — not raw accuracy — as the real metric for medical ML.'
  }
];

/* ===== CASE STUDY MODAL ===== */
function buildSection(icon, label, content, extraClass = '') {
  return `
    <div class="cs-section ${extraClass}">
      <div class="cs-section-label"><span class="msym">${icon}</span>${label}</div>
      ${content}
    </div>`;
}

function openCaseStudy(n) {
  const cs = caseStudies[n - 1];
  if (!cs) return;

  document.getElementById('csTag').textContent   = cs.tag;
  document.getElementById('csTitle').textContent = cs.title;

  const toolsHtml = `<div class="cs-tools">${cs.tools.map(t => `<span class="cs-tool-chip">${t}</span>`).join('')}</div>`;

  document.getElementById('csBody').innerHTML =
    buildSection('description', 'Overview',     `<p>${cs.overview}</p>`,  'full-width') +
    buildSection('flag',        'Problem',      `<p>${cs.problem}</p>`) +
    buildSection('database',    'Dataset',      `<p>${cs.dataset}</p>`) +
    buildSection('build',       'Tools Used',   toolsHtml) +
    buildSection('settings',    'Process',      `<p>${cs.process}</p>`,   'full-width') +
    buildSection('lightbulb',   'Key Insights', `<p>${cs.insights}</p>`,  'full-width') +
    buildSection('inventory_2', 'Final Output', `<p>${cs.output}</p>`,    'full-width') +
    buildSection('school',      'What I Learned', `<p>${cs.learned}</p>`, 'full-width cs-learned');

  document.getElementById('caseStudyModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudy() {
  document.getElementById('caseStudyModal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ===== THEME TOGGLE =====
   Initial theme is already applied by the inline script in <head>
   to avoid a flash. Here we wire the button and persist user choice. */
function applyThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  // In dark mode show the light_mode icon (action = switch to light), and vice versa.
  icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
}

function initTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'dark';
  applyThemeIcon(current);

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const now = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', now);
    try { localStorage.setItem('theme', now); } catch (e) {}
    applyThemeIcon(now);
  });
}

/* ===== LOADING SPLASH ===== */
function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  // Hide after the document has rendered + a short minimum hold so the logo is actually seen.
  const hide = () => {
    setTimeout(() => splash.classList.add('hidden'), 600);
    setTimeout(() => splash.remove(), 1100);
  };
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
}

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {

  initSplash();
  initTheme();

  /* Footer year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Close modal on backdrop click */
  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeCaseStudy(); });
  }

  /* Close modal on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCaseStudy();
  });

  /* Mobile menu toggle */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => navObserver.observe(s));

  /* Back to Top */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Scroll reveal */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* Smooth scroll for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
