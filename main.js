const CANVAS_BORDER_COLOUR = "white";
const CANVAS_BACKBROUND_COLOUR = "black";
const SNAKE_COLOUR = "green";
const SNAKE_BORDER_COLOUR = "yellow";
const FOOD_COLOUR = "red";
const FOOD_BORDER_COLOUR = "red";

let canvas = document.getElementById("snakeGame");
let ctx = canvas.getContext("2d");
ctx.fillStyle = CANVAS_BACKBROUND_COLOUR;
ctx.strokeStyle = CANVAS_BORDER_COLOUR;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);

let snake = [
  { x: 300, y: 300 },
  { x: 290, y: 300 },
  { x: 280, y: 300 },
  { x: 270, y: 300 },
];

let dx = 10;
let dy = 0;
let foodX = 0;
let foodY = 0;

function drawSnakePart(snake) {
  ctx.fillStyle = SNAKE_COLOUR;
  ctx.strokeStyle = SNAKE_BORDER_COLOUR;
  ctx.fillRect(snake.x, snake.y, 10, 10);
  ctx.strokeRect(snake.x, snake.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function randomValue(min, max) {
  // return Math.floor(Math.random() * (max - min + 1) + min);
  return Math.round((Math.random() * (max-min) + min) / 10) * 10
}

function createFood() {
  foodX = randomValue(0, canvas.width - 10);
  foodY = randomValue(0, canvas.height - 10);
  snake.forEach(function isFoodOnSnake(snakeElement) {
    const foodOnSnake = snakeElement.x == foodX && snakeElement.y == foodY;
    if (foodOnSnake) {
      createFood();
    }
  });
}

function drawFood() {
  ctx.fillStyle = FOOD_COLOUR;
  ctx.strokeStyle = FOOD_BORDER_COLOUR;
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function advanceSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  const isEat = snake[0].x == foodX && snake[0].y == foodY;
  if (isEat) {
    createFood();
  } else snake.pop();
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function main() {
  setTimeout(function move() {
    clearCanvas();
    drawFood();
    advanceSnake();
    drawSnake();
    main();
  }, 50);
}

function changeDirectionOfMovement(e) {
  const LEFT = 37;
  const RIGHT = 39;
  const UP = 38;
  const DOWN = 40;
  const pressedKey = e.keyCode;

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (pressedKey === UP && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (pressedKey === LEFT && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (pressedKey === DOWN && !goingUp) {
    dx = 0;
    dy = 10;
  }
  if (pressedKey === RIGHT && !goingLeft) {
    dx = 10;
    dy = 0;
  }
}
main();

window.addEventListener("keydown", changeDirectionOfMovement);
