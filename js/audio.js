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
      const now = this.audioCtx.currentTime;
      const partials = [587.33, 1174.66, 1762.0, 2349.32];
      const masterBellGain = this.audioCtx.createGain();
      masterBellGain.gain.setValueAtTime(0.3, now);
      masterBellGain.connect(this.audioCtx.destination);

      partials.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        const bellVolume = 0.08 / (idx + 1);
        gain.gain.setValueAtTime(bellVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + (3.5 - idx * 0.6));

        osc.connect(gain);
        gain.connect(masterBellGain);
        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch (e) {
      // Bell audio fallback
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
