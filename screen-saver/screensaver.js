let startX;
let startY;
let endX;
let endY;

let deltaStartX;
let deltaStartY;
let deltaEndX;
let deltaEndY;

let r;
let g;
let b;

const color_range = 10;
const range = 5;

let width;
let height;

function setup() {
  width=displayWidth;
  height=displayHeight;
  createCanvas(width, height);

  startX = random(width);
  startY = random(height);
  endX = random(width);
  endY = random(height);

  deltaStartX = random(-range, range);
  deltaStartY = random(-range, range);
  deltaEndX = random(-range, range);
  deltaEndY = random(-range, range);

  r = random(255);
  g = random(255);
  b = random(255);

  noFill();
  background(32);
}

function pick_random_color() {
  // pick a new color
  r += random(-color_range, color_range);
  g += random(-color_range, color_range);
  b += random(-color_range, color_range);

  r = constrain(r, 0, 255);
  g = constrain(g, 0, 255);
  b = constrain(b, 0, 255);
}

function draw() {
  // draw a line
  stroke(r, g, b, 100);
  line(startX, startY, endX, endY);

  pick_random_color();

  // move a bit
  startX += deltaStartX;
  startY += deltaStartY;
  endX += deltaEndX;
  endY += deltaEndY;

  if (startX < 0 || startX > width) {
    deltaStartX *= -1;
  }

  if (startY < 0 || startY > height) {
    deltaStartY *= -1;
  }

  if (endX < 0 || endX > width) {
    deltaEndX *= -1;
  }

  if (endY < 0 || endY > height) {
    deltaEndY *= -1;
  }
}