function setup() {
  createCanvas(600, 400);
  background(150);

  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = "black";

  ellipse(50, 50, 50, 50);
  rect(100, 25, 100, 50)
  square(225, 25, 50)
  triangle(300, 75, 325, 25, 350, 75);
  quad(388, 31, 436, 20, 419, 63, 380, 76);

  stroke('white'); // Change the color
  strokeWeight(10); // Make the points 10 pixels in size
  point(475, 50, 50)

  line(500, 50, 550, 50)
}

function draw() {
}