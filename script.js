/* =============================================
   SCRIPT.JS — Personal Website
   ============================================= */

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Fade-up on Scroll (IntersectionObserver) ----
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ---- Active Nav Link on Scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
}, { passive: true });

// ---- Terminal Typewriter Animation ----
const terminalBody = document.getElementById('terminalBody');

const lines = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'out',    text: 'digital-forensics-investigator' },
  { type: 'prompt', text: '$ cat skills.txt' },
  { type: 'out',    text: 'Autopsy | EnCase | FTK | Wireshark' },
  { type: 'out',    text: 'Metasploit | Splunk | Volatility' },
  { type: 'prompt', text: '$ echo $MISSION' },
  { type: 'green',  text: 'Uncovering Digital Truth ✓' },
  { type: 'prompt', text: '$ locate threats --neutralize' },
  { type: 'out',    text: 'Scanning...' },
  { type: 'green',  text: 'All threats neutralized. [OK]' },
  { type: 'prompt', text: '$ _' },
];

if (terminalBody) {
  let lineIdx = 0;
  let charIdx = 0;
  let currentEl = null;

  function getClass(type) {
    switch(type) {
      case 'prompt': return 't-prompt';
      case 'out':    return 't-out';
      case 'green':  return 't-green';
      default:       return 't-out';
    }
  }

  function addCursor() {
    const existing = terminalBody.querySelector('.t-cursor');
    if (existing) existing.remove();
    const cursor = document.createElement('span');
    cursor.className = 't-cursor';
    terminalBody.appendChild(cursor);
  }

  function typeLine() {
    if (lineIdx >= lines.length) {
      addCursor();
      return;
    }

    const line = lines[lineIdx];

    if (charIdx === 0) {
      currentEl = document.createElement('div');
      currentEl.className = getClass(line.type);
      terminalBody.appendChild(currentEl);
    }

    if (charIdx < line.text.length) {
      currentEl.textContent += line.text[charIdx];
      charIdx++;
      const speed = line.type === 'prompt' ? 60 : 30;
      setTimeout(typeLine, speed);
    } else {
      lineIdx++;
      charIdx = 0;
      const pause = line.type === 'prompt' ? 400 : 120;
      setTimeout(typeLine, pause);
    }
  }

  // Delay start slightly
  setTimeout(typeLine, 800);
}

// ---- Footer Year ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Smooth active style for nav ----
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--cyan) !important; }`;
document.head.appendChild(style);
