const slides = document.querySelectorAll('.slide');
const musicBtn = document.getElementById('musicBtn');
const audio = document.getElementById('backgroundMusic');
let currentSlide = 0;
let autoplayInterval;

// Función para mostrar slide
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

// Siguiente slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Botón de música
musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    musicBtn.textContent = '♪ Pausar música';
    musicBtn.classList.add('playing');
  } else {
    audio.pause();
    musicBtn.textContent = '♪ Reproducir música';
    musicBtn.classList.remove('playing');
  }
});

// Autoplay del carrusel cada 5 segundos
function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 5000);
}

// Iniciar todo
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar la primera imagen
  showSlide(0);
  
  // Iniciar autoplay
  startAutoplay();

  // Opcional: pausar autoplay cuando el mouse está sobre el carrusel
  const carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', () => startAutoplay());
});

// Partículas de corazones (bonito efecto)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particlesArray = [];
const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ff69b4'];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random() * 0.6 + 0.4;
  }

  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px Arial`;
    ctx.fillText('♡', this.x, this.y);
  }
}

function initParticles() {
  for (let i = 0; i < 60; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
