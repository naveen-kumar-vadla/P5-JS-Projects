let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

let width;
let height;

function setup() {
  width=displayWidth;
  height=displayHeight;

  createCanvas(width, height);
  stroke(255);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.75;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = height / 2;
}

function draw() {
  background(230);

  // Draw the clock background
  noStroke();
  fill('#000000');
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill('#ffffff');
  ellipse(cx, cy, clockDiameter, clockDiameter);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(0);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  fill(0);
  textSize(20);
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);

    if (a === 0) text('3', x + 20, y + 5);
    if (a === 90) text('6', x - 5, y + 30);
    if (a === 180) text('9', x - 30, y + 5);
    if (a === 270) text('12', x - 5, y - 20);
  }
  endShape();
}
