// ── Year
document.getElementById("year").textContent = new Date().getFullYear();

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
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visible"), i * 80);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll(".reveal, .reveal-left").forEach(el => ro.observe(el));

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
}, { threshold: 0.1 });
const sl = document.getElementById("skillList");
if (sl) skillObs.observe(sl);

// ── Typing Effect
const roles = ["Full Stack Developer","IT Tech Support","Network Administrator","System Analyst"];
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
