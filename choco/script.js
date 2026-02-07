const chocolates = document.querySelectorAll(".chocolate");
const hearts = document.querySelectorAll(".heart");
const message = document.getElementById("message");
const finalBtn = document.getElementById("final-message-btn");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("bg-music");
const playBtn = document.getElementById("play-music-btn");

let collected = 0;
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ======== MUSIC ========
audio.volume = 0.15;
window.addEventListener("load", () => {
  audio.play().catch(() => playBtn.style.display = "block");
});

playBtn.addEventListener("click", () => {
  audio.play();
  playBtn.style.display = "none";
});

// ======== TYPEWRITER EFFECT ========
function typeWriter(element, text, delay = 50, callback) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, delay);
    } else if (callback) callback();
  }
  type();
}

// ======== CONFETTI ========
function createConfetti() {
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 15 + 8,
      speed: Math.random() * 2 + 1,
      color: Math.random() > 0.8 ? "gold" : `hsl(${Math.random() * 360}, 80%, 70%)`,
      rotation: Math.random() * 2 * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.05
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.y += p.speed;
    p.rotation += p.rotationSpeed;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });
  particles = particles.filter(p => p.y < canvas.height);
  if (particles.length > 0) requestAnimationFrame(animateConfetti);
}

// ======== CHOCOLATE CLICK ========
chocolates.forEach((choco, index) => {
  choco.addEventListener("click", () => {
    if (!choco.classList.contains("collected")) {
      choco.classList.add("collected");
      collected++;
      choco.classList.add("pop");
      setTimeout(() => choco.classList.remove("pop"), 300);
      hearts[index].classList.add("filled");
    }

    if (collected === chocolates.length) {
      createConfetti();
      animateConfetti();
      typeWriter(message, "Yay! You collected all chocolates! 🎉", 50, () => {
        finalBtn.classList.add("show");
      });
    }
  });
});


// ======== FINAL BUTTON ========
finalBtn.addEventListener("click", () => {
  window.open("loveletter.html", "_blank");
});
