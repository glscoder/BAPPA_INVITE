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

  // --- Next Page Jump Arrow Buttons ---
  const nextPageButtons = document.querySelectorAll(".next-page-btn");
  nextPageButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetSelector = btn.getAttribute("data-next-target");
      if (targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // --- Back to Top Button (Brings user smoothly to Invitation 1st Page) ---
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      const heroSection = document.getElementById("heroSection");
      const scrollViewport = document.getElementById("scrollViewport");
      if (scrollViewport) {
        scrollViewport.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Interactive Bappa Click / Tap Blessing Interaction ---
  const ganeshaHeroStage = document.getElementById("ganeshaHeroStage");
  const blessingParticlesContainer = document.getElementById("ganeshaBlessingParticles");

  const blessingQuotes = [
    "🙏 ॐ गं गणपतये नमः 🙏",
    "✨ सुखकर्ता दुःखहर्ता बाप्पांचे आशीर्वाद ✨",
    "🌸 गणपती बाप्पा मोरया • मंगलमूर्ती मोरया 🌸",
    "🪔 रिद्धि-सिद्धिदाता सुख-समृद्धि प्रदाता 🪔"
  ];
  let blessingQuoteIndex = 0;

  // Realistic Botanical Flower Patterns (Marigold, Hibiscus, Golden Lotus, Jasmine)
  const realisticFlowerSVGs = [
    // 1. Auspicious Marigold (गेंदा)
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF59D"/>
          <stop offset="30%" stop-color="#FFA000"/>
          <stop offset="70%" stop-color="#E65100"/>
          <stop offset="100%" stop-color="#BF360C"/>
        </radialGradient>
      </defs>
      <g transform="translate(50,50)">
        <path d="M0 -44 C8 -40 18 -46 22 -40 C30 -42 36 -34 40 -26 C46 -20 44 -10 46 0 C44 10 46 20 40 26 C36 34 30 42 22 40 C18 46 8 40 0 44 C-8 40 -18 46 -22 40 C-30 42 -36 34 -40 26 C-46 20 -44 10 -46 0 C-44 -10 -46 -20 -40 -26 C-36 -34 -30 -42 -22 -40 C-18 -46 -8 -40 0 -44Z" fill="url(#mgGrad)"/>
        <path d="M0 -30 C6 -27 12 -31 15 -27 C20 -28 24 -22 27 -17 C31 -13 30 -6 31 0 C30 6 31 13 27 17 C24 22 20 28 15 27 C12 31 6 27 0 30 C-6 27 -12 31 -15 27 C-20 28 -24 22 -27 17 C-31 13 -30 6 -31 0 C-30 -6 -31 -13 -27 -17 C-24 -22 -20 -28 -15 -27 C-12 -31 -6 -27 0 -30Z" fill="#FFB300" opacity="0.95"/>
        <circle r="12" fill="#FF8F00"/>
        <circle r="6" fill="#FFF9C4"/>
      </g>
    </svg>`,

    // 2. Sacred Red Hibiscus (जास्वंद)
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hibGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FF1744"/>
          <stop offset="55%" stop-color="#D50000"/>
          <stop offset="100%" stop-color="#880E4F"/>
        </radialGradient>
      </defs>
      <g transform="translate(50,50)">
        <path d="M0 -8 C-14 -36 -32 -28 -30 -8 C-28 6 -10 12 0 0" fill="url(#hibGrad)"/>
        <path d="M0 -8 C-14 -36 -32 -28 -30 -8 C-28 6 -10 12 0 0" fill="url(#hibGrad)" transform="rotate(72)"/>
        <path d="M0 -8 C-14 -36 -32 -28 -30 -8 C-28 6 -10 12 0 0" fill="url(#hibGrad)" transform="rotate(144)"/>
        <path d="M0 -8 C-14 -36 -32 -28 -30 -8 C-28 6 -10 12 0 0" fill="url(#hibGrad)" transform="rotate(216)"/>
        <path d="M0 -8 C-14 -36 -32 -28 -30 -8 C-28 6 -10 12 0 0" fill="url(#hibGrad)" transform="rotate(288)"/>
        <circle r="6" fill="#B71C1C"/>
        <line x1="0" y1="0" x2="16" y2="-20" stroke="#FFD600" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="16" cy="-20" r="3.2" fill="#FFEA00"/>
      </g>
    </svg>`,

    // 3. Golden Sacred Lotus (कमल)
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lotusGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFDE7"/>
          <stop offset="35%" stop-color="#FFD54F"/>
          <stop offset="80%" stop-color="#FF8F00"/>
          <stop offset="100%" stop-color="#E65100"/>
        </radialGradient>
      </defs>
      <g transform="translate(50,50)">
        <path d="M0 -38 C14 -22 18 0 0 10 C-18 0 -14 -22 0 -38Z" fill="url(#lotusGrad)"/>
        <path d="M0 -38 C14 -22 18 0 0 10 C-18 0 -14 -22 0 -38Z" fill="url(#lotusGrad)" transform="rotate(45)"/>
        <path d="M0 -38 C14 -22 18 0 0 10 C-18 0 -14 -22 0 -38Z" fill="url(#lotusGrad)" transform="rotate(90)"/>
        <path d="M0 -38 C14 -22 18 0 0 10 C-18 0 -14 -22 0 -38Z" fill="url(#lotusGrad)" transform="rotate(135)"/>
        <path d="M0 -38 C14 -22 18 0 0 10 C-18 0 -14 -22 0 -38Z" fill="url(#lotusGrad)" transform="rotate(180)"/>
        <path d="M0 -38 C14 -22 18 0 0 10 C-18 0 -14 -22 0 -38Z" fill="url(#lotusGrad)" transform="rotate(225)"/>
        <path d="M0 -38 C14 -22 18 0 0 10 C-18 0 -14 -22 0 -38Z" fill="url(#lotusGrad)" transform="rotate(270)"/>
        <path d="M0 -38 C14 -22 18 0 0 10 C-18 0 -14 -22 0 -38Z" fill="url(#lotusGrad)" transform="rotate(315)"/>
        <circle r="9" fill="#FFF59D"/>
      </g>
    </svg>`,

    // 4. Fragrant Jasmine / Mogra (मोगरा)
    `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mograGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="70%" stop-color="#FFFDE7"/>
          <stop offset="100%" stop-color="#FFE082"/>
        </radialGradient>
      </defs>
      <g transform="translate(50,50)">
        <path d="M0 -34 C8 -22 10 0 0 6 C-10 0 -8 -22 0 -34Z" fill="url(#mograGrad)" stroke="#FFE082" stroke-width="0.8"/>
        <path d="M0 -34 C8 -22 10 0 0 6 C-10 0 -8 -22 0 -34Z" fill="url(#mograGrad)" stroke="#FFE082" stroke-width="0.8" transform="rotate(60)"/>
        <path d="M0 -34 C8 -22 10 0 0 6 C-10 0 -8 -22 0 -34Z" fill="url(#mograGrad)" stroke="#FFE082" stroke-width="0.8" transform="rotate(120)"/>
        <path d="M0 -34 C8 -22 10 0 0 6 C-10 0 -8 -22 0 -34Z" fill="url(#mograGrad)" stroke="#FFE082" stroke-width="0.8" transform="rotate(180)"/>
        <path d="M0 -34 C8 -22 10 0 0 6 C-10 0 -8 -22 0 -34Z" fill="url(#mograGrad)" stroke="#FFE082" stroke-width="0.8" transform="rotate(240)"/>
        <path d="M0 -34 C8 -22 10 0 0 6 C-10 0 -8 -22 0 -34Z" fill="url(#mograGrad)" stroke="#FFE082" stroke-width="0.8" transform="rotate(300)"/>
        <circle r="6" fill="#FFF9C4"/>
      </g>
    </svg>`
  ];

  function triggerBappaBlessing(e) {
    if (window.sacredAudio) {
      window.sacredAudio.playTempleBellChime();
    }

    if (ganeshaHeroStage) {
      ganeshaHeroStage.classList.remove("blessing-pulse");
      void ganeshaHeroStage.offsetWidth; // Force CSS reflow
      ganeshaHeroStage.classList.add("blessing-pulse");
    }

    if (blessingParticlesContainer) {
      const flowerCount = 10;
      for (let i = 0; i < flowerCount; i++) {
        const flowerEl = document.createElement("div");
        flowerEl.className = "blessing-flower-item";
        flowerEl.innerHTML = realisticFlowerSVGs[i % realisticFlowerSVGs.length];

        const angle = (Math.PI * 2 * i) / flowerCount + (Math.random() * 0.4 - 0.2);
        const distance = 45 + Math.random() * 75;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 25;
        const rot = (Math.random() * 80 - 40) + "deg";

        flowerEl.style.setProperty("--tx", `${tx}px`);
        flowerEl.style.setProperty("--ty", `${ty}px`);
        flowerEl.style.setProperty("--rot", rot);
        flowerEl.style.left = "50%";
        flowerEl.style.top = "50%";

        blessingParticlesContainer.appendChild(flowerEl);
        setTimeout(() => flowerEl.remove(), 1900);
      }

      // Divine floating blessing toast
      const existingToast = document.querySelector(".bappa-blessing-toast");
      if (existingToast) existingToast.remove();

      const toast = document.createElement("div");
      toast.className = "bappa-blessing-toast";
      toast.textContent = blessingQuotes[blessingQuoteIndex % blessingQuotes.length];
      blessingQuoteIndex++;

      ganeshaHeroStage.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    }
  }

  if (ganeshaHeroStage) {
    ganeshaHeroStage.addEventListener("click", triggerBappaBlessing);
    ganeshaHeroStage.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerBappaBlessing(e);
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
