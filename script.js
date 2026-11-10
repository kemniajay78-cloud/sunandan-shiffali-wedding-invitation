(() => {
  const screen = document.querySelector("#envelope-screen");
  const envelope = document.querySelector("#envelope");
  const openPrompt = document.querySelector("#open-prompt");
  const musicToggle = document.querySelector(".music-toggle");
  const music = document.querySelector("#invitation-music");
  let opened = false;

  function openInvitation() {
    if (opened) return;
    opened = true;
    envelope.classList.add("is-opening");
    screen.classList.add("is-opening");
    window.setTimeout(() => {
      screen.classList.add("is-open");
      screen.setAttribute("aria-hidden", "true");
      document.body.classList.add("invitation-open");
    }, 1050);
    window.setTimeout(() => screen.remove(), 2100);
    startMusic();
  }

  envelope.addEventListener("click", openInvitation);
  openPrompt.addEventListener("click", openInvitation);

  function setMusicButton(isPlaying) {
    musicToggle.setAttribute("aria-pressed", String(isPlaying));
    musicToggle.setAttribute("aria-label", isPlaying ? "Turn music off" : "Turn music on");
    musicToggle.querySelector(".music-label").textContent = isPlaying ? "Music on" : "Music off";
  }

  function startMusic() {
    music.play().then(() => {
      setMusicButton(true);
    }).catch((error) => {
      setMusicButton(false);
      console.error("Unable to play the wedding invitation music.", error);
    });
  }

  function stopMusic() {
    music.pause();
    setMusicButton(false);
  }

  musicToggle.addEventListener("click", () => {
    if (music.paused) startMusic();
    else stopMusic();
  });

  const countdownTarget = new Date("2026-11-25T19:00:00+05:30").getTime();
  const timeParts = {
    days: document.querySelector("#days"),
    hours: document.querySelector("#hours"),
    minutes: document.querySelector("#minutes"),
    seconds: document.querySelector("#seconds"),
  };

  function updateCountdown() {
    const remaining = Math.max(0, countdownTarget - Date.now());
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining % 86400000) / 3600000),
      minutes: Math.floor((remaining % 3600000) / 60000),
      seconds: Math.floor((remaining % 60000) / 1000),
    };
    Object.entries(values).forEach(([unit, value]) => {
      timeParts[unit].textContent = unit === "days" ? String(value).padStart(3, "0") : String(value).padStart(2, "0");
    });
    if (remaining === 0) document.querySelector(".countdown-note").textContent = "The celebration is here — see you on the dance floor!";
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
})();
