
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{x: 9 * box, y: 10 * box}];
let food = randomFood();
let dir;
let score = 0;
let speed = 120;

const eatSound = new Audio("assets/sounds/pickup.mp3");
const gameOverSound = new Audio("assets/sounds/gameover.mp3");

// Poziomy trudności
const levelSpeeds = {
  "easy": 160,
  "medium": 120,
  "hard": 80
};

function setDifficulty(level) {
  speed = levelSpeeds[level] || 120;
  clearInterval(loop);
  loop = setInterval(draw, speed);
}

document.getElementById("difficulty").addEventListener("change", function() {
  setDifficulty(this.value);
});

document.addEventListener("keydown", direction);
function direction(event){
  if(event.keyCode == 37 && dir != "RIGHT") dir = "LEFT";
  else if(event.keyCode == 38 && dir != "DOWN") dir = "UP";
  else if(event.keyCode == 39 && dir != "LEFT") dir = "RIGHT";
  else if(event.keyCode == 40 && dir != "UP") dir = "DOWN";
}

function draw() {
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, 400, 400);

  for(let i = 0; i < snake.length; i++){
    ctx.fillStyle = (i == 0)? "#ff2d55" : "#ffffff";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#00ff00";
  ctx.fillRect(food.x, food.y, box, box);

  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Arial";
  ctx.fillText("Wynik: " + score, 10, 390);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(dir == "LEFT") snakeX -= box;
  if(dir == "RIGHT") snakeX += box;
  if(dir == "UP") snakeY -= box;
  if(dir == "DOWN") snakeY += box;

  if(snakeX == food.x && snakeY == food.y){
    food = randomFood();
    score++;
    eatSound.play();
  } else {
    snake.pop();
  }

  if (snakeX < 0 || snakeY < 0 || snakeX >= 400 || snakeY >= 400 || collision(snakeX, snakeY, snake)) {
    gameOverSound.play();
    clearInterval(loop);
    setTimeout(() => {
      alert("Koniec gry! Twój wynik: " + score);
      location.reload();
    }, 200);
    return;
  }

  let newHead = {x: snakeX, y: snakeY};
  snake.unshift(newHead);
}

function randomFood() {
  return {
    x: Math.floor(Math.random()*19+1) * box,
    y: Math.floor(Math.random()*19+1) * box
  };
}

function collision(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if(x == array[i].x && y == array[i].y) return true;
  }
  return false;
}

let loop = setInterval(draw, speed);
