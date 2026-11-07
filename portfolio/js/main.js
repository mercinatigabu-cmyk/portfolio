/* ========== 1. NAVBAR: turns dark when you scroll down ========== */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  // toggle(className, condition) adds the class if true, removes it if false
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* ========== 2. MOBILE MENU: open / close ========== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.classList.toggle("open");
});

// Close the menu after tapping a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
  });
});

/* ========== 3. ACTIVE LINK: highlights the section you are viewing ========== */
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" } // triggers when a section reaches the middle of the screen
);
sections.forEach((section) => sectionObserver.observe(section));

/* ========== 4. SCROLL REVEAL: elements fade in as you scroll ========== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ========== 5. PARALLAX: photo gently follows the mouse ========== */
const hero = document.getElementById("home");
const parallax = document.getElementById("heroParallax");

hero.addEventListener("mousemove", (e) => {
  // Position of the mouse from -0.5 to +0.5 across the screen
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  parallax.style.transform = `translate(${x * -22}px, ${y * -22}px)`;
});

// Return to center when the mouse leaves
hero.addEventListener("mouseleave", () => {
  parallax.style.transform = "translate(0, 0)";
});