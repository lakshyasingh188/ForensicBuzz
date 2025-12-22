const heroImages = [
    "heroine1.avif",
    "heroine2.jpg",
    "heroine3.jpg",
    "forensic4.png"
];

let index = 0;
const hero = document.querySelector(".hero");

setInterval(() => {
    index = (index + 1) % heroImages.length;
    hero.style.backgroundImage = `url('${heroImages[index]}')`;
}, 3000);
