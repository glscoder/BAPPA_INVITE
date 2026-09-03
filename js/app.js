/**
 * Main Application Logic for Ganesh Chaturthi Digital Invitation
 * - Interactive temple door opening with 3D perspective
 * - Scroll-triggered entrance animations
 * - RSVP modal state & localStorage saving
 * - Add to Calendar (.ics & Google Calendar)
 * - WhatsApp sharing link
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const doorCurtain = document.getElementById("doorCurtain");
  const openInviteBtn = document.getElementById("openInviteBtn");
  const mainCardContainer = document.getElementById("invitationContainer");
  const audioToggleBtn = document.getElementById("audioToggleBtn");
  const rsvpModal = document.getElementById("rsvpModal");
  const openRsvpBtn = document.getElementById("openRsvpBtn");
  const closeRsvpBtn = document.getElementById("closeRsvpBtn");
  const rsvpForm = document.getElementById("rsvpForm");
  const rsvpSuccessMsg = document.getElementById("rsvpSuccessMsg");
  const shareWhatsAppBtn = document.getElementById("shareWhatsAppBtn");
  const addToCalendarBtn = document.getElementById("addToCalendarBtn");
  const scrollPrompt = document.getElementById("scrollPrompt");

  let invitationOpened = false;

  // --- Open Invitation Sequence ---
  function openInvitation() {
    if (invitationOpened) return;
    invitationOpened = true;

    // Start devotional audio (Tanpura + Flute + Temple Bell)
    if (window.sacredAudio) {
      window.sacredAudio.start();
    }

    // Trigger one-shot flower shower that falls once from up to down and vanishes
    if (window.festiveParticles && window.festiveParticles.isOnFirstPage) {
      window.festiveParticles.triggerFirstPageShower();
    }

    // Trigger door parting animation
    if (doorCurtain) {
      doorCurtain.classList.add("opened");
      setTimeout(() => {
        doorCurtain.style.pointerEvents = "none";
      }, 1400);
    }

    // Reveal hero content & trigger sequential element landing
    const heroSection = document.getElementById("heroSection");
    if (heroSection) {
      heroSection.classList.add("doors-opened");
    }

    const heroContent = document.getElementById("heroContent");
    if (heroContent) {
      heroContent.classList.add("revealed");
    }

    // Scroll prompt pulse
    if (scrollPrompt) {
      scrollPrompt.classList.add("visible");
    }
  }

  if (openInviteBtn) {
    openInviteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openInvitation();
    });
  }

  // Also trigger door open if user taps on the door itself
  if (doorCurtain) {
    doorCurtain.addEventListener("click", () => {
      openInvitation();
    });
  }

  // Audio Toggle
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener("click", () => {
      if (window.sacredAudio) {
        window.sacredAudio.toggleMute();
      }
    });
  }

  // Scroll to section helper
  if (scrollPrompt) {
    scrollPrompt.addEventListener("click", () => {
      const firstSection = document.getElementById("welcomeSection");
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // --- Intersection Observer for Scroll Animations ---
  const scrollElements = document.querySelectorAll(".scroll-reveal");
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          scrollObserver.unobserve(entry.target); // Locked permanently, no re-trigger position shifts
        }
      });
    },
    {
      threshold: 0.15,
      root: null,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  scrollElements.forEach((el) => scrollObserver.observe(el));

  // --- RSVP Modal Logic ---
  function toggleRsvpModal(show) {
    if (!rsvpModal) return;
    if (show) {
      rsvpModal.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      rsvpModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (openRsvpBtn) {
    openRsvpBtn.addEventListener("click", () => toggleRsvpModal(true));
  }

  if (closeRsvpBtn) {
    closeRsvpBtn.addEventListener("click", () => toggleRsvpModal(false));
  }

  if (rsvpModal) {
    rsvpModal.addEventListener("click", (e) => {
      if (e.target === rsvpModal) {
        toggleRsvpModal(false);
      }
    });
  }

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const guestName = document.getElementById("guestName")?.value || "Valued Guest";
      const guestCount = document.getElementById("guestCount")?.value || "1";
      const guestWishes = document.getElementById("guestWishes")?.value || "";

      // Save locally so state persists
      try {
        const existingRsvps = JSON.parse(localStorage.getItem("bappa_rsvps") || "[]");
        existingRsvps.push({
          name: guestName,
          count: guestCount,
          wishes: guestWishes,
          time: new Date().toISOString()
        });
        localStorage.setItem("bappa_rsvps", JSON.stringify(existingRsvps));
      } catch (err) {
        console.warn("Storage error", err);
      }

      // Show success celebration
      if (rsvpSuccessMsg) {
        rsvpForm.style.display = "none";
        rsvpSuccessMsg.style.display = "block";
      }

      // Play bell chime on RSVP
      if (window.sacredAudio) {
        window.sacredAudio.playTempleBellChime();
      }

      setTimeout(() => {
        toggleRsvpModal(false);
        // Reset form after closing
        setTimeout(() => {
          rsvpForm.reset();
          rsvpForm.style.display = "flex";
          if (rsvpSuccessMsg) rsvpSuccessMsg.style.display = "none";
        }, 500);
      }, 2500);
    });
  }

  // --- WhatsApp Sharing Feature ---
  if (shareWhatsAppBtn) {
    shareWhatsAppBtn.addEventListener("click", () => {
      const inviteUrl = window.location.href;
      const shareText = `🌺 *|| श्री गणेशाय नमः ||* 🌺\n\nWith the divine blessings of Lord Ganesha, the *Shah Family* cordially invites you and your family for *Ganesh Darshan*!\n\n🪔 *Ganpati Bappa Morya!*\nView our digital invitation card with divine darshan, aarti timings & directions here:\n👉 ${inviteUrl}`;
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(waUrl, "_blank");
    });
  }

  // --- Add To Calendar Feature (.ics & Google Calendar) ---
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener("click", () => {
      const eventDetails = {
        title: "Ganesh Chaturthi Celebration - Shah Family",
        description: "Join the Shah Family in celebrating Ganesh Chaturthi with Aarti, Darshan & Maha Prasad. Ganpati Bappa Morya!",
        location: "Shree Ganesh Kripa, 108 Temple Street, Mumbai - 400001",
        start: "20260905T093000",
        end: "20260905T213000"
      };

      // Google Calendar URL
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;

      // Generate ICS file data for native calendars
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Ganesh Chaturthi Invitation//EN",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `SUMMARY:${eventDetails.title}`,
        `DESCRIPTION:${eventDetails.description}`,
        `LOCATION:${eventDetails.location}`,
        `DTSTART:${eventDetails.start}`,
        `DTEND:${eventDetails.end}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      // On mobile devices, open Google Calendar or download ICS
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        window.open(gcalUrl, "_blank");
      } else {
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", "Ganesh-Chaturthi-Invitation.ics");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }

  // --- Mooshak Live Selfie Mirror & Backflip Camera Integration ---
  const cameraVideo = document.getElementById("selfieCameraVideo");
  const cameraFallback = document.getElementById("cameraFallback");
  const cameraToggleBtn = document.getElementById("cameraToggleBtn");
  const cameraFlipBtn = document.getElementById("cameraFlipBtn");
  const cameraBtnLabel = document.getElementById("cameraBtnLabel");
  const welcomeSection = document.getElementById("welcomeSection");
  let cameraStream = null;
  let isCameraStarting = false;
  let currentFacingMode = "user"; // "user" (front) or "environment" (back)

  async function startSelfieCamera(facingMode = currentFacingMode) {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }
    if (isCameraStarting) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("Camera API not supported on this browser.");
      return;
    }

    isCameraStarting = true;
    currentFacingMode = facingMode;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 480 },
          height: { ideal: 480 }
        },
        audio: false
      });

      cameraStream = stream;
      if (cameraVideo) {
        cameraVideo.srcObject = stream;
        await cameraVideo.play();
        cameraVideo.classList.add("active");
        if (facingMode === "environment") {
          cameraVideo.classList.add("back-facing");
        } else {
          cameraVideo.classList.remove("back-facing");
        }
        if (cameraFallback) cameraFallback.style.display = "none";
        if (cameraBtnLabel) cameraBtnLabel.textContent = "Camera On ✨";
      }
    } catch (err) {
      console.warn("Camera access was declined or unavailable:", err);
      if (cameraBtnLabel) cameraBtnLabel.textContent = "Enable Mirror";
    } finally {
      isCameraStarting = false;
    }
  }

  function stopSelfieCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }
    if (cameraVideo) {
      cameraVideo.classList.remove("active", "back-facing");
      cameraVideo.srcObject = null;
    }
    if (cameraFallback) {
      cameraFallback.style.display = "flex";
    }
    if (cameraBtnLabel) {
      cameraBtnLabel.textContent = "See Yourself";
    }
  }

  if (cameraToggleBtn) {
    cameraToggleBtn.addEventListener("click", () => {
      if (cameraStream) {
        stopSelfieCamera();
      } else {
        startSelfieCamera(currentFacingMode);
      }
    });
  }

  if (cameraFlipBtn) {
    cameraFlipBtn.addEventListener("click", () => {
      const nextMode = currentFacingMode === "user" ? "environment" : "user";
      startSelfieCamera(nextMode);
    });
  }

  if (cameraFallback) {
    cameraFallback.addEventListener("click", () => {
      startSelfieCamera(currentFacingMode);
    });
  }

  // Auto-start front camera when user scrolls to Page 2
  const scrollEl = document.getElementById("scrollViewport");
  if (scrollEl && welcomeSection) {
    let hasAttemptedAutoStart = false;
    scrollEl.addEventListener("scroll", () => {
      const welcomeRect = welcomeSection.getBoundingClientRect();
      const inView = welcomeRect.top < window.innerHeight * 0.7 && welcomeRect.bottom > window.innerHeight * 0.3;
      if (inView && !hasAttemptedAutoStart) {
        hasAttemptedAutoStart = true;
        startSelfieCamera("user");
      }
    }, { passive: true });
  }
});
