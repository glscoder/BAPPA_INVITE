/**
 * Sacred Devotional Audio Engine for Ganesh Chaturthi Digital Invitation
 * - Plays custom local MP3 audio (Ek Dantaya Vakratundaya Flute track)
 * - Seamless looping, smooth fade-in and volume transitions
 * - Auspicious temple bell chime on door opening
 * - Mute / Unmute state management with UI reflection
 */

class SacredAudioController {
  constructor() {
    this.isPlaying = false;
    this.isMuted = false;
    this.audioElement = null;
    this.audioCtx = null;
    this.audioSource = "assets/audio/bgm.mp3";
    this.initAudioElement();
  }

  initAudioElement() {
    if (this.audioElement) return;
    this.audioElement = new Audio();
    this.audioElement.src = this.audioSource;
    this.audioElement.loop = true;
    this.audioElement.preload = "auto";
    this.audioElement.volume = 0.85;

    // Ensure loop playback continues smoothly
    this.audioElement.addEventListener("ended", () => {
      if (this.isPlaying && !this.isMuted) {
        this.audioElement.play().catch(() => {});
      }
    });
  }

  initAudioContext() {
    if (this.audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      console.warn("Web Audio API not available:", e);
    }
  }

  playTempleBellChime() {
    this.initAudioContext();
    if (!this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Master output gain with gentle limiting
      const masterBellGain = ctx.createGain();
      masterBellGain.gain.setValueAtTime(0.55, now);
      masterBellGain.connect(ctx.destination);

      // 1. Strike transient (metallic brass clapper tap)
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.007));
      }
      const strikeNoise = ctx.createBufferSource();
      strikeNoise.buffer = noiseBuffer;
      const strikeFilter = ctx.createBiquadFilter();
      strikeFilter.type = "bandpass";
      strikeFilter.frequency.setValueAtTime(1400, now);
      strikeFilter.Q.setValueAtTime(2.5, now);
      const strikeGain = ctx.createGain();
      strikeGain.gain.setValueAtTime(0.4, now);
      strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      strikeNoise.connect(strikeFilter);
      strikeFilter.connect(strikeGain);
      strikeGain.connect(masterBellGain);
      strikeNoise.start(now);

      // 2. Authentic Indian Mandir Bronze Bell Harmonics & Natural Acoustic Beating
      const baseFreq = 432.0; // Auspicious Vedic 432Hz Fundamental
      const bellPartials = [
        { ratio: 0.5, amp: 0.38, decay: 4.8, detune: 0 },    // Hum tone (Deep bronze chamber resonance)
        { ratio: 1.0, amp: 0.50, decay: 4.2, detune: -1.2 }, // Prime Strike note 1
        { ratio: 1.0, amp: 0.50, decay: 4.2, detune: 1.2 },  // Prime Strike note 2 (natural acoustic beat)
        { ratio: 1.19, amp: 0.32, decay: 3.6, detune: 0 },   // Tierce (Minor third resonance)
        { ratio: 1.50, amp: 0.28, decay: 3.2, detune: 1.5 }, // Quint (Sacred fifth)
        { ratio: 2.00, amp: 0.32, decay: 2.9, detune: -1.8 },// Nominal (Octave)
        { ratio: 2.76, amp: 0.20, decay: 2.4, detune: 0 },   // Superquint
        { ratio: 3.00, amp: 0.16, decay: 2.0, detune: 1.0 }, // Octave + Fifth
        { ratio: 4.10, amp: 0.12, decay: 1.6, detune: 0 },   // Upper shimmer
        { ratio: 5.40, amp: 0.08, decay: 1.1, detune: 0 },   // High bell ring sparkle
      ];

      bellPartials.forEach((p) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq * p.ratio + p.detune, now);

        gain.gain.setValueAtTime(p.amp, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gain);
        gain.connect(masterBellGain);
        osc.start(now);
        osc.stop(now + p.decay + 0.1);
      });
    } catch (e) {
      console.warn("Temple bell audio error:", e);
    }
  }

  start() {
    this.initAudioElement();
    this.playTempleBellChime();

    if (this.isPlaying && !this.isMuted) return;
    this.isPlaying = true;
    this.isMuted = false;

    if (this.audioElement) {
      this.audioElement.muted = false;
      this.audioElement.volume = 0.05;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Smooth natural fade in
            let vol = 0.05;
            const fadeInterval = setInterval(() => {
              if (!this.isPlaying || this.isMuted) {
                clearInterval(fadeInterval);
                return;
              }
              vol += 0.05;
              if (vol >= 0.85) {
                this.audioElement.volume = 0.85;
                clearInterval(fadeInterval);
              } else {
                this.audioElement.volume = vol;
              }
            }, 60);
          })
          .catch((err) => {
            console.warn("Audio playback initiated after interaction:", err);
          });
      }
    }

    this.updateUI();
  }

  toggleMute() {
    this.initAudioElement();

    if (!this.isPlaying) {
      this.start();
      return;
    }

    this.isMuted = !this.isMuted;

    if (this.audioElement) {
      if (this.isMuted) {
        this.audioElement.pause();
      } else {
        this.audioElement.play().catch(() => {});
      }
    }

    this.updateUI();
  }

  updateUI() {
    const audioBtn = document.getElementById("audioToggleBtn");
    const audioStatus = document.getElementById("audioStatusText");
    if (!audioBtn) return;

    if (!this.isPlaying || this.isMuted) {
      audioBtn.classList.remove("playing");
      audioBtn.classList.add("muted");
      audioBtn.setAttribute("aria-label", "Turn sacred music ON");
      if (audioStatus) audioStatus.textContent = "Music: Off";
    } else {
      audioBtn.classList.remove("muted");
      audioBtn.classList.add("playing");
      audioBtn.setAttribute("aria-label", "Turn sacred music OFF");
      if (audioStatus) audioStatus.textContent = "Music: Divine";
    }
  }
}

window.sacredAudio = new SacredAudioController();
