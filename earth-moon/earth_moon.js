let earthSize = 150;
let moonSize = 75;

let angle = 0;
let distance = 150;

const width = 400;
const height = 400;

const cx = width / 2;
const cy = height / 2;

let moons = ['🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔'];
let moonIndex = 0;

let earths = ['🌎', '🌍', '🌏'];
let earthIndex = 0;

function setup() {
  createCanvas(width, height);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(32);

  angle++;

  if (angle % 45 === 0) {
    moonIndex++;
    if (moonIndex >= moons.length) {
      moonIndex = 0;
    }
  }

  if (angle % 120 === 0) {
    earthIndex++;
    if (earthIndex >= earths.length) {
      earthIndex = 0;
    }
  }

  let moonX = cx + cos(radians(angle)) * distance;
  let moonY = cy + sin(radians(angle)) * distance;

  textSize(earthSize);
  text(earths[earthIndex], cx, cy);

  textSize(moonSize);
  text(moons[moonIndex], moonX, moonY);
}