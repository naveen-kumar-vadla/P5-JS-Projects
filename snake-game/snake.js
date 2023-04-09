// the snake is divided into small segments, which are drawn and edited on each 'draw' call
const RIGHT = 'right';
const UP = 'up';
const LEFT = 'left';
const DOWN = 'down';

let snakeSize = 10;
let direction = RIGHT;

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;

let width;
let height;

function setup() {
  width=displayWidth - 100;
  height=displayHeight - 200;

  scoreElem = createDiv('Score = 0');
  scoreElem.position(25, 25);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  scoreElem.style('fontSize', '25px');

  createCanvas(width, height);
  frameRate(15);
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

  for (let i = 0; i < snakeSize; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < snakeSize - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }

  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}

function updateSnakeCoordinates() {
  for (let i = 0; i < snakeSize - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case RIGHT:
      xCor[snakeSize - 1] = xCor[snakeSize - 2] + diff;
      yCor[snakeSize - 1] = yCor[snakeSize - 2];
      break;
    case UP:
      xCor[snakeSize - 1] = xCor[snakeSize - 2];
      yCor[snakeSize - 1] = yCor[snakeSize - 2] - diff;
      break;
    case LEFT:
      xCor[snakeSize - 1] = xCor[snakeSize - 2] - diff;
      yCor[snakeSize - 1] = yCor[snakeSize - 2];
      break;
    case DOWN:
      xCor[snakeSize - 1] = xCor[snakeSize - 2];
      yCor[snakeSize - 1] = yCor[snakeSize - 2] + diff;
      break;
  }
}

function checkGameStatus() {
  if (
      xCor[xCor.length - 1] >= width ||
      xCor[xCor.length - 1] <= 0 ||
      yCor[yCor.length - 1] >= height ||
      yCor[yCor.length - 1] <= 0 ||
      checkSnakeCollision()
  ) {
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended!<br/> Your score was : ' + scoreVal);
  }
}

function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}

function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    snakeSize++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case 37:
      if (direction !== RIGHT) {
        direction = LEFT;
      }
      break;
    case 39:
      if (direction !== LEFT) {
        direction = RIGHT;
      }
      break;
    case 38:
      if (direction !== DOWN) {
        direction = UP;
      }
      break;
    case 40:
      if (direction !== UP) {
        direction = DOWN;
      }
      break;
  }
}
