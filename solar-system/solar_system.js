const RED = '#ff0000';
const YELLOW = '#FFFF64';
const ORANGE = '#FF6400';
const WHITE = '#FFFFFF';

const ALPHA = 40;
const STAR_SPEED = 1;

let width;
let height;

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const content_position = new Position(1500, 0);
const center = new Position(width / 3, height / 2);

class Planet {
  constructor(id, name, color, position, angle, speed, rotation, orbit_radius, planet_radius) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.alpha_color = color + ALPHA;
    this.position = position;
    this.angle = angle;
    this.speed = speed * STAR_SPEED;
    this.rotation = rotation;
    this.orbit_radius = orbit_radius;
    this.planet_radius = planet_radius;
    this.name_position = new Position(content_position.x, content_position.y + (id * 60));
  }

  draw_orbit() {
    strokeWeight(1);
    noFill(WHITE);
    stroke(this.alpha_color);
    circle(center.x, center.y, this.orbit_radius);
  }

  draw_planet() {
    noStroke();
    this.compute_values();

    fill(this.color);
    circle(this.position.x, this.position.y, this.planet_radius);
  }

  compute_values() {
    this.position.x = (+this.rotation * sin(this.angle)) + center.x;
    this.position.y = (+this.rotation * cos(this.angle)) + center.y;
    this.angle = this.speed + this.angle;
  }

  draw_name() {
    textSize(20);
    fill(this.color);
    text(this.name, this.name_position.x, this.name_position.y);
  }

  draw_line_between_planet_and_name() {
    strokeWeight(1);
    stroke(this.color);

    //draw line between name and planet
    if (this.is_cursor_on_name()) {
      line(this.position.x, this.position.y, this.name_position.x - 50, this.name_position.y - 5);
    }

    //draw small line before name
    line(this.name_position.x - 25, this.name_position.y - 5,
        this.name_position.x - 50, this.name_position.y - 5);

  }

  is_cursor_on_name() {
    return mouseX > this.name_position.x && mouseX < this.name_position.x + 50 && mouseY > this.name_position.y - 20 && mouseY < this.name_position.y;
  }

  draw() {
    this.draw_orbit();
    this.draw_planet();
    this.draw_name();
    this.draw_line_between_planet_and_name();

  }
}

class Moon extends Planet {
  constructor(id, name, color, position, angle, speed, rotation, orbit_radius, planet_radius, earth_pos) {
    super(id, name, color, position, angle, speed, rotation, orbit_radius, planet_radius);
    this.division_factor = 15;
    this.earth_pos = earth_pos;
  }

  compute_values() {
    this.position.x = (+this.rotation * sin(this.angle) / this.division_factor) + this.earth_pos.x;
    this.position.y = (+this.rotation * cos(this.angle) / this.division_factor) + this.earth_pos.y;
    this.angle = this.speed + this.angle;
  }
}

class Sun {
  constructor(id, name) {
    this.id = name;
    this.name = name;
    this.color = YELLOW;
    this.name_position = new Position(content_position.x, content_position.y + id * 60);
  }

  draw_sun() {
    strokeWeight(0.5);
    stroke(RED);
    for (let i = 1; i < 45; i += 4) {
      line(center.x, center.y, center.x + cos(i) * 45, center.y + sin(i) * 45);
    }
    stroke(YELLOW);
    for (let i = 2; i < 45; i += 2) {
      line(center.x, center.y, center.x + cos(i) * 40, center.y + sin(i) * 40);
    }
    stroke(ORANGE);
    for (let i = 3; i < 45; i += 4) {
      line(center.x, center.y, center.x + cos(i) * 35, center.y + sin(i) * 35);
    }
    noStroke();
    fill(YELLOW);
    circle(center.x, center.y, 40);
    fill(ORANGE);
    circle(center.x, center.y, 35);
    fill(RED);
    circle(center.x, center.y, 30);
  }

  draw_name() {
    textSize(20);
    fill(this.color);
    text(this.name, this.name_position.x, this.name_position.y);
  }

  draw_line_between_planet_and_name() {
    strokeWeight(1);
    stroke(this.color);

    //draw line between name and planet
    if (this.is_cursor_on_name()) {
      line(center.x, center.y, this.name_position.x - 50, this.name_position.y - 5);
    }

    //draw small line before name
    line(this.name_position.x - 25, this.name_position.y - 5,
        this.name_position.x - 50, this.name_position.y - 5);

  }

  is_cursor_on_name() {
    return mouseX > this.name_position.x && mouseX < this.name_position.x + 50 && mouseY > this.name_position.y - 20 && mouseY < this.name_position.y;
  }

  draw() {
    this.draw_sun();
    this.draw_name();
    this.draw_line_between_planet_and_name();
  }
}

function setup() {
  width=displayWidth;
  height=displayHeight;
  createCanvas(width, height);
  goBackButton = createButton('Back');
  goBackButton.position(20, 20);
  goBackButton.id = 'goBack';
  goBackButton.mousePressed(() => window.history.go(-1));
  goBackButton.style('cursor', 'pointer');
}

function draw_background_stars() {
  //background -- stars
  strokeWeight(0);
  randomSeed(500);
  for (let j = 0; j <= (height + width) * 2; j++) {
    fill(random(120, 255), random(120, 255), random(120, 255), random(80, 150));
    circle(random(width), random(width), random(3));
  }
}

const sun = new Sun(1, 'Sun');
const mercury = new Planet(2, 'Mercury', '#FFA503', new Position(center.x, center.y), 47.87, 0.04787, 90, 180, 20);
const venus = new Planet(3, 'Venus', '#FFD0AB', new Position(center.x, center.y), 35.02, 0.03502, 120, 240, 20);
const earth = new Planet(4, 'Earth', '#01C896', new Position(center.x, center.y), 29.78, 0.02978, 170, 340, 25);
const moon = new Moon(5, 'Moon', '#C8C8C8', new Position(earth.position.x, earth.position.y), 30.78, 0.07978, 350, 0, 10, earth.position);
const mars = new Planet(6, 'Mars', '#D21D1D', new Position(center.x, center.y), 24.077, 0.024077, 210, 420, 19.5);
const jupiter = new Planet(7, 'Jupiter', '#FF9890', new Position(center.x, center.y), 13.07, 0.01307, 320, 640, 30);
const saturn = new Planet(8, 'Saturn', '#FFA596', new Position(center.x, center.y), 20, 0.00969, 370, 740, 30);
const uranus = new Planet(9, 'Uranus', '#326496', new Position(center.x, center.y), 6.81, 0.00681, 420, 840, 20);
const neptune = new Planet(10, 'Neptune', '#3264C8', new Position(center.x, center.y), 5.43, 0.00543, 440, 880, 16.8);
const pluto = new Planet(11, 'Pluto', '#E6E6E6', new Position(center.x, center.y), 25.70, 0.0047, 470, 933, 16.7);

function draw() {
  background(0);
  draw_background_stars();

  //Tooltip
  fill(WHITE);
  textSize(15);
  text('Hover on name to see magic', content_position.x, content_position.y + 20);

  sun.draw();
  mercury.draw();
  venus.draw();
  earth.draw();
  moon.draw();
  mars.draw();
  jupiter.draw();
  saturn.draw();
  fill('#F0F0CB'); //Saturn Rings color
  noStroke();
  ellipse(saturn.position.x, saturn.position.y, 40, 5); //Draw Saturn Rings
  uranus.draw();
  neptune.draw();
  pluto.draw();
}