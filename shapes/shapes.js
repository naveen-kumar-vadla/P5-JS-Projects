function setup() {
  createCanvas(1000, 600);
  background(150);

  goBackButton = createButton('Back');
  goBackButton.position(20, 20);
  goBackButton.id = 'goBack';
  goBackButton.mousePressed(() => window.history.go(-1));
  goBackButton.style('cursor', 'pointer');

  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = "black";

  ellipse(150, 50, 50, 50);
  rect(200, 25, 100, 50)
  square(325, 25, 50)
  triangle(400, 75, 425, 25, 450, 75);
  quad(488, 31, 536, 20, 519, 63, 480, 76);

  stroke('white'); // Change the color
  strokeWeight(10); // Make the points 10 pixels in size
  point(575, 50, 50)

  line(600, 50, 650, 50)
}

function draw() {
}