let x;
let y;

const radius = 20;

let deltaX;
let deltaY;

function setup() {
  createCanvas(700, 700);
  background(220);

  x = random(0, width)
  y = random(0, height)

  deltaX = random(-5, 5)
  deltaY = random(-5, 5)
}

function draw() {
  background(220);

  circle(x, y, radius);

  x += deltaX;
  y += deltaY;


  if(x < 0 || x > width) deltaX *= -1;
  if(y < 0 || y > height) deltaY *= -1;
}