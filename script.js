// ===== HERO SLIDER =====
const heroImages = [
  "heroine1.avif",
  "heroine2.jpg",
  "heroine3.jpg",
  "forensic4.png"
];

let index = 0;

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");

  if (hero) {
    setInterval(() => {
      index = (index + 1) % heroImages.length;
      hero.style.backgroundImage = `url('${heroImages[index]}')`;
    }, 3000);
  }
});

// ===== MOBILE MENU =====
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  if (nav) {
    nav.classList.toggle("show");
  }
}
