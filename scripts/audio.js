function createSound(path) {
  const audio = new Audio(path);
  audio.preload = "auto";
  return audio;
}

const navSound = createSound("assets/sounds/nav.mp3");
const eatSound = createSound("assets/sounds/pickup.mp3");
const gameOverSound = createSound("assets/sounds/gameover.mp3");
const loginSound = createSound("assets/sounds/login.mp3");

// Wymuś aktywację dźwięków po pierwszym kliknięciu
let audioEnabled = false;
window.addEventListener("click", () => {
  if (!audioEnabled) {
    [navSound, eatSound, gameOverSound, loginSound].forEach(s => {
      s.volume = 0;
      s.play().catch(() => {});
      s.pause();
      s.currentTime = 0;
      s.volume = 1;
    });
    audioEnabled = true;
  }
}, { once: true });

// Odtwarzaj dźwięk z pełnym resetem
function playSafeSound(sound) {
  if (!audioEnabled) return;
  try {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  } catch (e) {}
}

// Dodaj dźwięk kliknięcia linków/przycisków
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => playSafeSound(navSound));
  });
});
