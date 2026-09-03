/**
 * Ambient Marigold Petals & Golden Stardust Particle Engine
 * - Smooth 60fps GPU-optimized Canvas 2D
 * - Realistic fluttering flower petals (Orange, Golden Yellow, Maroon tipped)
 * - First page: Petals fall once from top to bottom and vanish completely
 * - Other pages: Continuous ambient loop ("else keep as it is")
 * - Twinkling golden stardust particles
 * - Responsive to resize & battery/tab friendly
 */

class FestiveParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d", { alpha: true });
    this.particles = [];
    this.sparkles = [];
    this.isRunning = false;
    this.animationFrameId = null;
    this.isOnFirstPage = true;

    // Detect high refresh / high DPI displays
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Particle pool settings
    this.maxPetals = window.innerWidth < 600 ? 22 : 36;
    this.maxSparkles = window.innerWidth < 600 ? 20 : 35;

    // Realistic Marigold shades
    this.petalColors = [
      { fill: "#FF9900", stroke: "#CC6600" }, // Saffron / Kesari
      { fill: "#FFB703", stroke: "#FB8500" }, // Marigold Golden Yellow
      { fill: "#E85D04", stroke: "#9D0208" }, // Deep Sunset Orange
      { fill: "#DC2626", stroke: "#7F1D1D" }, // Auspicious Sindoor Red
      { fill: "#FFD166", stroke: "#F77F00" }  // Bright Festive Gold
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize(), { passive: true });

    // Handle visibility changes to save battery
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });

    // Track scroll position to know if user is on the first page
    const scrollEl = document.getElementById("scrollViewport");
    if (scrollEl) {
      scrollEl.addEventListener("scroll", () => {
        const isFirst = scrollEl.scrollTop < 60;
        if (isFirst !== this.isOnFirstPage) {
          this.isOnFirstPage = isFirst;
          this.handlePageChange();
        }
      }, { passive: true });
    }

    // Check user accessibility preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      this.maxPetals = 8;
      this.maxSparkles = 10;
    }

    this.seedSparkles();
    // On first page: seed one-shot falling shower from up to down
    this.triggerFirstPageShower();
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  seedSparkles() {
    this.sparkles = [];
    for (let i = 0; i < this.maxSparkles; i++) {
      this.sparkles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: 0.8 + Math.random() * 2,
        alpha: Math.random(),
        alphaSpeed: 0.01 + Math.random() * 0.025,
        speedY: -0.15 - Math.random() * 0.3
      });
    }
  }

  createPetal(startY = null, isOneShot = false) {
    return {
      x: Math.random() * this.width,
      // If startY is provided, staggered above screen so they cascade from up to down
      y: startY !== null ? startY : -15,
      size: 3.5 + Math.random() * 4,
      color: this.petalColors[Math.floor(Math.random() * this.petalColors.length)],
      speedY: 0.6 + Math.random() * 0.9,
      speedX: -0.25 + Math.random() * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      oscillation: Math.random() * Math.PI * 2,
      oscSpeed: 0.015 + Math.random() * 0.02,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.03,
      opacity: 0.35 + Math.random() * 0.25,
      isOneShot: isOneShot,
      finished: false
    };
  }

  // Shower of petals that falls once from top to bottom and vanishes
  triggerFirstPageShower() {
    this.particles = [];
    for (let i = 0; i < this.maxPetals; i++) {
      // Stagger initial Y heights above the screen so petals shower gradually
      const startY = -15 - (Math.random() * (this.height * 0.85));
      this.particles.push(this.createPetal(startY, true));
    }
  }

  // Petals only shower once on the first page and vanish. No petals on remaining pages.
  seedLoopingParticles() {
    this.particles = [];
  }

  handlePageChange() {
    if (!this.isOnFirstPage) {
      // Scrolled to remaining pages: no petals should be there
      this.particles = [];
    }
  }

  drawPetal(p) {
    if (p.finished) return;

    const { ctx } = this;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.scale(Math.cos(p.flip), 1); // 3D flipping simulation

    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color.fill;
    ctx.strokeStyle = p.color.stroke;
    ctx.lineWidth = 0.35;

    // Organic teardrop petal curve
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
    ctx.fill();
    ctx.stroke();

    // Central vein
    ctx.beginPath();
    ctx.moveTo(0, -p.size * 0.6);
    ctx.lineTo(0, p.size * 0.7);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 0.4;
    ctx.stroke();

    ctx.restore();
  }

  drawSparkle(s) {
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = Math.abs(Math.sin(s.alpha));
    ctx.fillStyle = "#FFF7CC";
    ctx.shadowColor = "#F59E0B";
    ctx.shadowBlur = 4;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update() {
    // Update Petals
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.finished) continue;

      p.oscillation += p.oscSpeed;
      p.x += p.speedX + Math.sin(p.oscillation) * 0.7;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;
      p.flip += p.flipSpeed;

      // Reached bottom of screen: vanish completely
      if (p.y > this.height + 20) {
        p.finished = true;
      }
      if (p.x < -20) p.x = this.width + 10;
      if (p.x > this.width + 20) p.x = -10;
    }

    // Clean up finished particles
    if (this.particles.length > 0 && this.particles.every(p => p.finished)) {
      this.particles = [];
    }

    // Update Sparkles with gentle floating drift
    for (let i = 0; i < this.sparkles.length; i++) {
      const s = this.sparkles[i];
      s.alpha += s.alphaSpeed;
      s.y += s.speedY;
      s.x += Math.sin(s.alpha) * 0.45;

      if (s.y < -10) {
        s.y = this.height + 10;
        s.x = Math.random() * this.width;
      }
    }
  }

  render() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw sparkles
    for (let i = 0; i < this.sparkles.length; i++) {
      this.drawSparkle(this.sparkles[i]);
    }

    // Draw petals
    for (let i = 0; i < this.particles.length; i++) {
      this.drawPetal(this.particles[i]);
    }

    this.update();
    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.render();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.festiveParticles = new FestiveParticleSystem("petalsCanvas");
});
