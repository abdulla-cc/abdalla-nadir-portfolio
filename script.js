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

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {

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
