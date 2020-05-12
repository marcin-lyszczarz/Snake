
const CANVAS_BORDER_COLOUR = 'white';
const CANVAS_BACKBROUND_COLOUR = 'black';
const SNAKE_COLOUR = 'green';
const SNAKE_BORDER_COLOUR = 'yellow';
const FOOD_COLOUR = 'red';
const FOOD_BORDER_COLOUR = 'red';


let canvas = document.getElementById('snakeGame');
let ctx = canvas.getContext('2d');
ctx.fillStyle = CANVAS_BACKBROUND_COLOUR;
ctx.strokeStyle = CANVAS_BORDER_COLOUR;
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.strokeRect(0,0,canvas.width, canvas.height);

let snake = [
    {x: 300, y: 300},
    {x: 290, y: 300},
    {x: 280, y: 300},
    {x: 270, y: 300},
];

let dx = 10;
let dy = 0;

function drawSnakePart(snake){
    ctx.fillStyle = SNAKE_COLOUR;
    ctx.strokeStyle = SNAKE_BORDER_COLOUR;
    ctx.fillRect(snake.x, snake.y, 10, 10 );
    ctx.strokeRect(snake.x, snake.y, 10, 10);
    
}

function drawSnake(){
    snake.forEach(drawSnakePart);
}



function drawFood(){
    ctx.fillStyle = FOOD_COLOUR;
    ctx.strokeStyle = FOOD_BORDER_COLOUR;
    ctx.fillRect(200, 200, 10, 10 );
    ctx.strokeRect(200, 200, 10, 10);
}
// ]drawFood();


function advanceSnake(){
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}



