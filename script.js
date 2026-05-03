/* ======================================================
   ABDALLA NADIR — PORTFOLIO JAVASCRIPT
   - Particle canvas animation (hero background)
   - Scroll-triggered section reveals
   - Navbar scroll behavior
   - Mobile menu toggle
   - Footer year
====================================================== */

/* ===== CASE STUDY MODAL ===== */
const caseStudies = [
  {
    tag: 'Excel · BI',
    title: 'Retail Sales Data Analysis',
    problem: 'Analyze retail sales performance and identify trends across region, category, and product segments.',
    dataset: 'Kaggle Superstore dataset — 9,800+ rows of transactional sales data.',
    tools: ['Microsoft Excel', 'Pivot Tables', 'Dynamic Slicers', 'KPI Dashboard'],
    process: 'Cleaned raw data, checked for missing values and inconsistencies. Created multi-dimensional pivot tables. Analyzed sales, profit, and quantity trends. Built an interactive dashboard with slicers for drill-down analysis.',
    insights: 'Identified sales and profit patterns across regions, categories, and sub-categories. Found key high-performing and underperforming segments.',
    output: 'Interactive Excel dashboard with dynamic slicers, KPI cards, and charts covering regional and category-level performance.',
    learned: 'Improved Excel data cleaning, pivot table analysis, dashboard design, and business storytelling skills.'
  },
  {
    tag: 'Power BI · DAX',
    title: 'HR Analytics Dashboard',
    problem: 'Understand employee attrition and identify the main factors linked to employees leaving the organization.',
    dataset: 'IBM HR Analytics dataset — 1,470 employee records with 35 attributes.',
    tools: ['Power BI', 'DAX', 'Excel', 'Data Modeling'],
    process: 'Cleaned and transformed the data in Excel. Created calculated DAX measures for attrition rate and KPIs. Built 6+ interactive visuals and added slicers for department, gender, and attrition filters.',
    insights: 'Overall attrition rate was 16.12%. R&D had the highest attrition (133 employees). Overtime, job role, and age group (28–35) were the strongest attrition factors.',
    output: 'Interactive Power BI dashboard showing attrition by department, job role, gender, age group, overtime, and income level.',
    learned: 'Improved Power BI, DAX measures, HR analytics, dashboard layout design, and data storytelling skills.'
  },
  {
    tag: 'SQL · Database',
    title: 'Job Application System Database',
    problem: 'Design a structured, normalized relational database to manage job applications, interviews, and offer statuses efficiently.',
    dataset: 'Custom-designed sample data — applicants, jobs, interviews, interviewers, documents, and job offers.',
    tools: ['MySQL / MariaDB', 'SQL DDL & DML', 'ERD Design', 'Normalisation (3NF)'],
    process: 'Designed the full ERD, normalized tables from 1NF to 3NF. Wrote DDL scripts to create all tables with primary/foreign keys. Implemented triggers, stored procedures, and custom SQL functions.',
    insights: 'A normalized 3NF schema eliminates data duplication and improves integrity. Auto-triggers on offer status changes streamline applicant notifications.',
    output: 'SQL-based job application database with 6 normalized tables, triggers, stored procedures (GetJobOffersForApplicant, GetJobsByLocation), and functions (CountJobOffersForJob, CalculateAverageSalary).',
    learned: 'Improved SQL querying, database normalization, schema design, trigger logic, and understanding of relational database systems.'
  }
];

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
  document.getElementById('csTag').textContent = cs.tag;
  document.getElementById('csTitle').textContent = cs.title;

  const toolsHtml = `<div class="cs-tools">${cs.tools.map(t => `<span class="cs-tool-chip">${t}</span>`).join('')}</div>`;

  document.getElementById('csBody').innerHTML =
    buildSection('🎯', 'Problem', `<p>${cs.problem}</p>`) +
    buildSection('📊', 'Dataset', `<p>${cs.dataset}</p>`) +
    buildSection('🛠', 'Tools Used', toolsHtml) +
    buildSection('⚙️', 'Process', `<p>${cs.process}</p>`, 'full-width') +
    buildSection('💡', 'Key Insights', `<p>${cs.insights}</p>`, 'full-width') +
    buildSection('📁', 'Final Output', `<p>${cs.output}</p>`, 'full-width') +
    buildSection('🎓', 'What I Learned', `<p>${cs.learned}</p>`, 'full-width cs-learned');

  const overlay = document.getElementById('caseStudyModal');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudy() {
  document.getElementById('caseStudyModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('caseStudyModal').addEventListener('click', function(e) {
    if (e.target === this) closeCaseStudy();
  });
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCaseStudy();
});

/* ===== NAME PRONUNCIATION (Web Speech API) ===== */
let loadedVoices = [];

function speakName() {
  const btn = document.getElementById('speakNameBtn');

  // Fallback for unsupported browsers
  if (!('speechSynthesis' in window)) {
    alert('Voice playback is not supported on this browser.');
    return;
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  // Small delay — Chrome needs time after cancel() before new speak()
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance('Abdalla Nadir');
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Pick a clear English voice
    const voices = loadedVoices.length ? loadedVoices : speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || voices.find(v => v.lang.startsWith('en-US'))
      || voices.find(v => v.lang.startsWith('en'));

    if (preferred) utterance.voice = preferred;

    // Visual feedback
    btn.classList.add('speaking');
    utterance.onend   = () => btn.classList.remove('speaking');
    utterance.onerror = () => btn.classList.remove('speaking');

    speechSynthesis.speak(utterance);
  }, 120);
}

// Preload voices (some browsers load them asynchronously)
if ('speechSynthesis' in window) {
  function cacheVoices() { loadedVoices = speechSynthesis.getVoices(); }
  cacheVoices();
  speechSynthesis.onvoiceschanged = cacheVoices;
}

/* ===== THEME TOGGLE ===== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeIcon.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeIcon.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ===== ROTATING QUOTES ===== */
const quotes = [
  { text: "Data is the new oil. It's valuable, but if unrefined it cannot really be used.", author: "Clive Humby" },
  { text: "The goal is to turn data into information, and information into insight.", author: "Carly Fiorina" },
  { text: "Without data, you're just another person with an opinion.", author: "W. Edwards Deming" },
  { text: "In God we trust. All others must bring data.", author: "W. Edwards Deming" },
  { text: "It is a capital mistake to theorize before one has data.", author: "Arthur Conan Doyle" },
  { text: "Data really powers everything that we do.", author: "Jeff Weiner" },
  { text: "Torture the data, and it will confess to anything.", author: "Ronald Coase" },
  { text: "The world is one big data problem.", author: "Andrew McAfee" },
  { text: "Data is not information, information is not knowledge, knowledge is not understanding.", author: "Clifford Stoll" },
  { text: "Numbers have an important story to tell. They rely on you to give them a clear and convincing voice.", author: "Stephen Few" },
];

// Pick a random quote — different on each page load
window.addEventListener('DOMContentLoaded', () => {
  const quoteText   = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  if (quoteText && quoteAuthor) {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent   = random.text;
    quoteAuthor.textContent = `— ${random.author}`;
  }
});
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== NAVBAR: Add .scrolled class on scroll ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ===== MOBILE MENU ===== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ===== SCROLL REVEAL ===== */
// Add .reveal class to all targetable elements
const revealTargets = [
  '.about-card',
  '.skills-cat',
  '.project-card',
  '.cert-card',
  '.edu-card',
  '.contact-card',
  '.stat',
  '.section-title',
  '.about-text p',
  '.contact-sub',
];

revealTargets.forEach((selector, i) => {
  document.querySelectorAll(selector).forEach((el, j) => {
    el.classList.add('reveal');
    // Stagger sibling elements slightly
    if (j === 1) el.classList.add('reveal-delay-1');
    if (j === 2) el.classList.add('reveal-delay-2');
    if (j === 3) el.classList.add('reveal-delay-3');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== ACTIVE NAV LINK HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--text-1)';
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

/* ================================================================
   PARTICLE CANVAS ANIMATION
   - Small glowing particles drift slowly across the canvas
   - Particles connect with thin lines when near each other
   - Mouse proximity gently repels nearby particles
================================================================ */

(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');

  // ---- Configuration ----
  const CONFIG = {
    particleCount:   90,       // number of particles
    maxSpeed:        0.35,     // max drift speed
    minRadius:       1.2,      // min particle radius
    maxRadius:       2.8,      // max particle radius
    connectDist:     130,      // max px to draw connection line
    mouseRadius:     120,      // repel radius around cursor
    mouseForce:      0.06,     // how hard particles repel from cursor
    lineOpacity:     0.18,     // max opacity of connection lines
    particleOpacity: 0.75,     // particle opacity
    // Colour palette — gold tones
    colors: [
      'rgba(255, 215,   0,',   // gold
      'rgba(255, 229, 102,',   // light gold
      'rgba(184, 134,  11,',   // dark gold
      'rgba(255, 193,   7,',   // amber gold
    ],
  };

  let W, H, particles = [];
  const mouse = { x: -9999, y: -9999 };

  // ---- Resize handling ----
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  // ---- Particle class ----
  class Particle {
    constructor() { this.reset(true); }

    reset(initial) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : (Math.random() > 0.5 ? -5 : H + 5);
      this.vx = (Math.random() - 0.5) * CONFIG.maxSpeed * 2;
      this.vy = (Math.random() - 0.5) * CONFIG.maxSpeed * 2;
      this.r  = CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius);
      this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
      this.baseOpacity = 0.3 + Math.random() * 0.5;
      this.opacity = 0;
      this.fadeIn  = true;
    }

    update() {
      // Fade in
      if (this.fadeIn) {
        this.opacity = Math.min(this.opacity + 0.005, this.baseOpacity * CONFIG.particleOpacity);
        if (this.opacity >= this.baseOpacity * CONFIG.particleOpacity) this.fadeIn = false;
      }

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouseRadius && dist > 0) {
        const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
        this.vx += (dx / dist) * force * CONFIG.mouseForce;
        this.vy += (dy / dist) * force * CONFIG.mouseForce;
      }

      // Speed damping — keep it gentle
      this.vx *= 0.995;
      this.vy *= 0.995;

      // Clamp speed
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > CONFIG.maxSpeed) {
        this.vx = (this.vx / speed) * CONFIG.maxSpeed;
        this.vy = (this.vy / speed) * CONFIG.maxSpeed;
      }

      this.x += this.vx;
      this.y += this.vy;

      // Wrap edges (with small margin)
      const m = 20;
      if (this.x < -m)  this.x = W + m;
      if (this.x > W+m) this.x = -m;
      if (this.y < -m)  this.y = H + m;
      if (this.y > H+m) this.y = -m;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);

      // Glow effect via shadow
      ctx.shadowColor  = this.color + '1)';
      ctx.shadowBlur   = 8;
      ctx.fillStyle    = this.color + this.opacity + ')';
      ctx.fill();
      ctx.shadowBlur   = 0;
    }
  }

  // ---- Initialise particles ----
  function initParticleList() {
    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // ---- Draw connection lines ----
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a  = particles[i];
        const b  = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d < CONFIG.connectDist) {
          const alpha = (1 - d / CONFIG.connectDist) * CONFIG.lineOpacity;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,215,0,${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  // ---- Animation loop ----
  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  // ---- Mouse tracking ----
  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // ---- Touch support ----
  canvas.addEventListener('touchmove', e => {
    const rect  = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouse.x = touch.clientX - rect.left;
    mouse.y = touch.clientY - rect.top;
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // ---- Kick off ----
  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas.parentElement);
  resize();
  initParticleList();
  animate();

})();
