
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{x: 9 * box, y: 10 * box}];
let food = randomFood();
let dir = null;
let score = 0;

const eatSound = new Audio("assets/sounds/pickup.mp3");
const gameOverSound = new Audio("assets/sounds/gameover.mp3");

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
  if (e.key === "ArrowLeft" && dir !== "RIGHT") dir = "LEFT";
  else if (e.key === "ArrowUp" && dir !== "DOWN") dir = "UP";
  else if (e.key === "ArrowRight" && dir !== "LEFT") dir = "RIGHT";
  else if (e.key === "ArrowDown" && dir !== "UP") dir = "DOWN";
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };
}

function collision(x, y, array) {
  return array.some(seg => seg.x === x && seg.y === y);
}

function drawGame() {
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#ff2d55" : "#ffffff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#00ff00";
  ctx.fillRect(food.x, food.y, box, box);

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Wynik: " + score, 10, 390);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (dir === "LEFT") snakeX -= box;
  if (dir === "RIGHT") snakeX += box;
  if (dir === "UP") snakeY -= box;
  if (dir === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    food = randomFood();
    score++;
    new Audio("assets/sounds/pickup.mp3").play();
  } else {
    snake.pop();
  }

  if (snakeX < 0 || snakeY < 0 || snakeX >= 400 || snakeY >= 400 || collision(snakeX, snakeY, snake)) {
    gameOverSound.play();
    clearInterval(gameLoop);
    setTimeout(() => {
      alert("Koniec gry! Twój wynik: " + score);
      location.reload();
    }, 200);
    return;
  }

  const newHead = {x: snakeX, y: snakeY};
  snake.unshift(newHead);
}

const difficultyMap = {
  easy: 200,
  medium: 120,
  hard: 80
};

let gameLoop;
function startGame() {
  const diff = document.getElementById("difficulty").value;
  clearInterval(gameLoop);
  gameLoop = setInterval(drawGame, difficultyMap[diff]);
  snake = [{x: 9 * box, y: 10 * box}];
  dir = null;
  score = 0;
  food = randomFood();
}

document.getElementById("difficulty").addEventListener("change", startGame);
window.onload = startGame;
