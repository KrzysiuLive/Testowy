
function playSafeSound(sound) {
  if (!sound) return;
  try {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  } catch (e) {}
}

const navSound = new Audio("assets/sounds/nav.mp3");
const eatSound = new Audio("assets/sounds/pickup.mp3");
const gameOverSound = new Audio("assets/sounds/gameover.mp3");
const loginSound = new Audio("assets/sounds/login.mp3");

navSound.preload = "auto";
eatSound.preload = "auto";
gameOverSound.preload = "auto";
loginSound.preload = "auto";

window.addEventListener("click", () => {
  playSafeSound(navSound);
  playSafeSound(eatSound);
  playSafeSound(gameOverSound);
  playSafeSound(loginSound);
}, { once: true });

document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("click", () => {
    playSafeSound(navSound);
  });
});
