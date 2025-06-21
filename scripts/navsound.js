
const navSound = new Audio("assets/sounds/nav.mp3");
document.querySelectorAll("a").forEach(el => {
  el.addEventListener("click", () => {
    navSound.currentTime = 0;
    navSound.play();
  });
});
