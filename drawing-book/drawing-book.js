let saveButton, clearButton, backgroundColor;

function setup() {
  backgroundColor = 200;
  createCanvas(710, 710);
  angleMode(DEGREES);
  background(backgroundColor);

  // Creating the save button for the file
  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);
}

// Save File Function
function saveFile() {
  save('design.jpg');
}

// Clear Screen function
function clearScreen() {
  background(backgroundColor);
}

function draw() {
  mouseIsPressed && line(mouseX, mouseY, pmouseX, pmouseY);
}
