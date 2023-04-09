let x;
let y;
let ballImage;

const radius = 50;

let deltaX;
let deltaY;

function preload() {
  ballImage = loadImage('./foot-ball.png');
}

function setup() {
  createCanvas(700, 700);

  x = random(0, width)
  y = random(0, height)

  deltaX = random(-5, 5)
  deltaY = random(-5, 5)
}

function draw() {
  background('green');

  image(ballImage, x, y, radius, radius);

  if(x <= 0 || x >= width - radius) deltaX *= -1;
  if(y <= 0 || y >= height - radius) deltaY *= -1;

  x += deltaX;
  y += deltaY;
}