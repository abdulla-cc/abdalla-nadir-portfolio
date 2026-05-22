/* ======================================================
   ABDALLA NADIR — PORTFOLIO JAVASCRIPT
   Brooklyn-inspired design
   - Case study modal
   - Scroll reveal animations
   - Active nav link highlighting
   - Mobile menu toggle
   - Back to top button
   - Footer year
   - Name pronunciation
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
    process: 'Loaded and explored data → cleaned and encoded columns (OverTime, Gender, BusinessTravel) → engineered 3 new features (IncomePerYear, TenureRoleRatio, SeniorityScore) → built SQLite database with advanced SQL (CTEs, window functions, views) → identified 113 high-risk employees → auto-generated Excel report → built 2-page Power BI dashboard with 5 DAX measures.',
    insights: 'Sales Representatives earn the least ($2,626 avg) and leave at 39.76% — the highest attrition rate across all job roles.',
    output: '2-page Power BI dashboard — Page 1: professional overview with navy theme. Page 2: dark neon risk analysis with insight cards and high-risk employee flags.',
    images: ['Overview_dashboard.png', 'income_vs_attrition.png'],
    learned: 'End-to-end data pipeline design, advanced SQL, DAX in Power BI, feature engineering, automated Excel reporting with openpyxl, and presenting complex findings to business stakeholders.'
  }
];

/* ===== CASE STUDY MODAL ===== */
function buildSection(icon, label, content, extraClass = '') {
  return `
    <div class="cs-section ${extraClass}">
      <div class="cs-section-label"><span class="cs-icon">${icon}</span>${label}</div>
      ${content}
    </div>`;
}

function openCaseStudy(n) {
  const cs = caseStudies[n - 1];
  if (!cs) return;

  document.getElementById('csTag').textContent   = cs.tag;
  document.getElementById('csTitle').textContent = cs.title;

  const toolsHtml = `<div class="cs-tools">${cs.tools.map(t => `<span class="cs-tool-chip">${t}</span>`).join('')}</div>`;

  let imagesHtml = '';
  if (cs.images && cs.images.length > 0) {
    const imgs = cs.images.map(src =>
      `<img src="${src}" alt="Case Study Image" style="width:100%;border-radius:8px;margin-top:8px;">`
    ).join('');
    imagesHtml = buildSection('🖼️', 'Gallery', `<div>${imgs}</div>`, 'full-width');
  }

  document.getElementById('csBody').innerHTML =
    buildSection('📄', 'Overview',     `<p>${cs.overview}</p>`,  'full-width') +
    buildSection('🎯', 'Problem',      `<p>${cs.problem}</p>`) +
    buildSection('📊', 'Dataset',      `<p>${cs.dataset}</p>`) +
    buildSection('🛠',  'Tools Used',  toolsHtml) +
    buildSection('⚙️', 'Process',      `<p>${cs.process}</p>`,   'full-width') +
    buildSection('💡', 'Key Insights', `<p>${cs.insights}</p>`,  'full-width') +
    buildSection('📁', 'Final Output', `<p>${cs.output}</p>`,    'full-width') +
    imagesHtml +
    buildSection('🎓', 'What I Learned', `<p>${cs.learned}</p>`, 'full-width cs-learned');

  document.getElementById('caseStudyModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudy() {
  document.getElementById('caseStudyModal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ===== NAME PRONUNCIATION ===== */
let loadedVoices = [];

function speakName() {
  const btn = document.getElementById('speakNameBtn');
  if (!('speechSynthesis' in window)) { alert('Voice not supported in this browser.'); return; }
  speechSynthesis.cancel();
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance('Abdalla Nadir');
    utterance.lang  = 'en-US';
    utterance.rate  = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = loadedVoices.length ? loadedVoices : speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')))
      || voices.find(v => v.lang.startsWith('en-US'))
      || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;
    if (btn) btn.classList.add('speaking');
    utterance.onend  = () => btn && btn.classList.remove('speaking');
    utterance.onerror = () => btn && btn.classList.remove('speaking');
    speechSynthesis.speak(utterance);
  }, 120);
}

if ('speechSynthesis' in window) {
  function cacheVoices() { loadedVoices = speechSynthesis.getVoices(); }
  cacheVoices();
  speechSynthesis.onvoiceschanged = cacheVoices;
}

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {

  /* ----- Footer year ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Close modal on backdrop click ----- */
  const modal = document.getElementById('caseStudyModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) closeCaseStudy();
    });
  }

  /* ----- Close modal on Escape ----- */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCaseStudy();
  });

  /* ----- Mobile menu toggle ----- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'flex';
      mobileMenu.style.display = isOpen ? 'none' : 'flex';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
      });
    });
  }

  /* ----- Active nav link on scroll ----- */
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

  /* ----- Back to Top button ----- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  /* ----- Scroll reveal ----- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ----- Smooth scroll for all anchor links ----- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ----- Subtle parallax on hero blob ----- */
  const blob = document.querySelector('.hero-blob');
  if (blob) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      blob.style.transform = `translateY(${y * 0.12}px)`;
    }, { passive: true });
  }

});
