let aeroplane;
let bullets;

function preload() {
  aeroplane = loadImage('./aeroplane.png');
}

class Bullet {
  constructor(x) {
    this.x = x;
    this.y = height - 65;
    this.delta = 0;
    this.isOutOfCanvas = false;
  }

  draw() {
    strokeWeight(2.5);

    this.y += this.delta;

    stroke('brown');
    line(this.x - 10, this.y, this.x - 10, this.y + 10);
    line(this.x, this.y, this.x, this.y + 10);
    line(this.x + 10, this.y, this.x + 10, this.y + 10);

    stroke('white')
    point(this.x - 10, this.y);
    point(this.x, this.y);
    point(this.x + 10, this.y);

    this.delta -= 2;
    this.isOutOfCanvas = this.y < 0;
  }
}

function setup() {
  createCanvas(700, 700);
  aeroplane.loadPixels();
  bullets = [];
}

function mouseReleased() {
  bullets.push(new Bullet(mouseX + 25));
}

function draw() {
  background(220);
  textSize(10);

  image(aeroplane, mouseX, height - 50, 50, 50);
  bullets.forEach(b => b.draw());
  bullets = bullets.filter(b => !b.isOutOfCanvas);
  bullets.push(new Bullet(mouseX + 25));
}
