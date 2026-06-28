// ── Year
document.getElementById("year").textContent = new Date().getFullYear();

// ── Hamburger menu
const hamburger = document.getElementById("hamburger");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

function openDrawer() {
  mobileDrawer.style.display = "flex";
  drawerOverlay.style.display = "block";
  // force reflow so transition fires
  mobileDrawer.getBoundingClientRect();
  drawerOverlay.getBoundingClientRect();
  hamburger.classList.add("open");
  mobileDrawer.classList.add("open");
  drawerOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  hamburger.classList.remove("open");
  mobileDrawer.classList.remove("open");
  drawerOverlay.classList.remove("open");
  document.body.style.overflow = "";
  // hide after transition ends so it's fully out of the way
  setTimeout(() => {
    mobileDrawer.style.display = "none";
    drawerOverlay.style.display = "none";
  }, 360);
}
hamburger.addEventListener("click", () => {
  hamburger.classList.contains("open") ? closeDrawer() : openDrawer();
});
drawerOverlay.addEventListener("click", closeDrawer);
mobileDrawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));

// ── Smooth Scroll
document.querySelectorAll("a[href^='#']").forEach(a => {
  a.addEventListener("click", function(e) {
    const t = document.querySelector(this.getAttribute("href"));
    if (!t) return; e.preventDefault();
    t.scrollIntoView({ behavior: "smooth" });
  });
});

// ── Sticky nav + active link
const navbar = document.getElementById("navbar");
const secs = document.querySelectorAll("section[id]");
const nlinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
  let cur = "";
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  nlinks.forEach(l => {
    l.classList.remove("active");
    if (l.getAttribute("href") === "#" + cur) l.classList.add("active");
  });
}, { passive: true });

// ── Scroll Reveal
const ro = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal, .reveal-left").forEach(el => {
  // If already in viewport on load (e.g. hero section on mobile), show immediately
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    el.classList.add("visible");
  } else {
    ro.observe(el);
  }
});

// ── Skill bar animation
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".skill-item").forEach((item, i) => {
        setTimeout(() => {
          item.classList.add("visible");
          const bar = item.querySelector(".sk-fill");
          if (bar) bar.style.width = bar.dataset.w;
        }, i * 120);
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: "0px 0px -20px 0px" });
const sl = document.getElementById("skillList");
if (sl) skillObs.observe(sl);

// ── Typing Effect
const roles = ["Full Stack Developer","IT Tech Support","Network Administrator","System Analyst","Data Encoder"];
let ri=0, ci=0, del=false;
const el = document.getElementById("typed");
function type() {
  const cur = roles[ri];
  if (del) {
    el.textContent = cur.substring(0, ci--);
    if (ci < 0) { del=false; ri=(ri+1)%roles.length; setTimeout(type,400); return; }
  } else {
    el.textContent = cur.substring(0, ci++);
    if (ci > cur.length) { del=true; setTimeout(type,2000); return; }
  }
  setTimeout(type, del ? 50 : 90);
}
setTimeout(type, 800);
